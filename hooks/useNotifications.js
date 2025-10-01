import { useEffect, useState } from 'react'

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [isConnected, setIsConnected] = useState(false)

    // Tarayıcı bildirimi göster
    const showBrowserNotification = (data) => {
      console.log('showBrowserNotification called with:', data)
      console.log('Notification permission:', Notification.permission)
      
      // Bildirim sesi çal
      try {
        const audio = new Audio('/notification-sound.mp3')
        audio.volume = 0.5
        audio.play().catch(() => {
          // Ses dosyası yoksa varsayılan ses çal
          console.log('Custom notification sound not found, using default')
          // Alternatif: Web Audio API ile basit ses
          try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()
            
            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1)
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
            
            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.3)
          } catch (audioError) {
            console.log('Web Audio API error:', audioError)
          }
        })
      } catch (error) {
        console.log('Audio error:', error)
      }
      
      if (Notification.permission === 'granted') {
        console.log('Creating browser notification:', data.title)
        
        try {
          const notification = new Notification(data.title, {
            body: data.message,
            icon: '/favicon-32x32.png',
            badge: '/favicon-32x32.png',
            tag: `${data.type}-${data.data.id || data.data.talepId}`,
            requireInteraction: true,
            silent: false // Ses açık
          })
          
          console.log('Notification created successfully:', notification)
          
          notification.onclick = () => {
            console.log('🔔 Notification clicked')
            window.focus()
            notification.close()
          }
          
          notification.onshow = () => {
            console.log('✅ Notification SHOWN on screen!')
          }
          
          notification.onerror = (error) => {
            console.error('❌ Notification error:', error)
          }
          
          // 5 saniye sonra otomatik kapat
          setTimeout(() => {
            if (notification) {
              notification.close()
              console.log('Notification auto-closed')
            }
          }, 5000)
          
        } catch (notificationError) {
          console.error('Error creating notification:', notificationError)
        }
      } else {
        console.log('Notification permission not granted:', Notification.permission)
      }
      
      // Alternatif: Modal bildirim göster
      console.log('🔄 Showing modal notification as fallback...')
      showModalNotification(data)
    }
    
    // Modal bildirim göster
    const showModalNotification = (data) => {
      // Bildirim listesine ekle
      setNotifications(prev => [
        {
          id: `${data.type}-${data.data.id || data.data.talepId}`,
          type: data.type,
          title: data.title,
          message: data.message,
          data: data.data,
          timestamp: new Date().toISOString()
        },
        ...prev.slice(0, 9)
      ])
      
      // Sayfa başlığını değiştir
      const originalTitle = document.title
      document.title = `🔔 ${data.title} - ${originalTitle}`
      
      // 3 saniye sonra başlığı geri al
      setTimeout(() => {
        document.title = originalTitle
      }, 3000)
      
      console.log('✅ Modal notification added to list')
    }

  useEffect(() => {
    let eventSource = null
    let pollInterval = null

    const connectSSE = () => {
      try {
        eventSource = new EventSource('/api/notifications?admin=true')
        
        eventSource.onopen = () => {
          console.log('SSE connection opened')
          setIsConnected(true)
        }

        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log('SSE message received:', data)
            console.log('SSE message type:', data.type)
            
            if (data.type === 'new_reservation' || data.type === 'new_contact') {
              console.log('Processing notification:', data.type)
              showBrowserNotification(data)
              
              // Bildirim listesine ekle
              setNotifications(prev => [
                {
                  id: `${data.type}-${data.data.id || data.data.talepId}`,
                  type: data.type,
                  title: data.title,
                  message: data.message,
                  data: data.data,
                  timestamp: new Date().toISOString()
                },
                ...prev.slice(0, 9) // Son 10 bildirimi tut
              ])
            }
          } catch (error) {
            console.error('Error parsing SSE message:', error)
          }
        }

        eventSource.onerror = (error) => {
          console.error('SSE connection error:', error)
          setIsConnected(false)
          
          // 5 saniye sonra yeniden bağlan (daha uzun bekle)
          setTimeout(() => {
            if (eventSource) {
              eventSource.close()
            }
            console.log('Reconnecting SSE...')
            connectSSE()
          }, 5000)
        }
      } catch (error) {
        console.error('Error creating SSE connection:', error)
        setIsConnected(false)
      }
    }

    // Polling fallback - her 2 saniyede bir kontrol et (daha sık)
    const startPolling = () => {
      console.log('Starting polling...')
      pollInterval = setInterval(async () => {
        try {
          console.log('Polling: Checking for new contacts...')
          const response = await fetch('/api/contact')
          const data = await response.json()
          if (data.success && data.data && data.data.length > 0) {
            const latestContact = data.data[0]
            
            // Local storage'dan son kontrol edilen mesajı al
            const lastCheckedId = localStorage.getItem('lastCheckedContactId')
            const currentContactId = latestContact._id.toString()
            
            console.log('Polling: Last checked ID:', lastCheckedId)
            console.log('Polling: Current contact ID:', currentContactId)
            
            // Yeni mesaj varsa bildirim göster
            if (lastCheckedId !== currentContactId) {
              console.log('Polling: New contact found:', latestContact)
              const notificationData = {
                type: 'new_contact',
                title: 'Yeni İletişim Mesajı',
                message: `${latestContact.name} adlı kişiden yeni mesaj alındı`,
                data: {
                  id: latestContact._id,
                  name: latestContact.name,
                  email: latestContact.email,
                  phone: latestContact.phone,
                  message: latestContact.message,
                  timestamp: latestContact.createdAt
                }
              }
              console.log('Polling: Showing browser notification...')
              showBrowserNotification(notificationData)
              setNotifications(prev => [notificationData, ...prev.slice(0, 9)])
              
              // Son kontrol edilen mesajı güncelle
              localStorage.setItem('lastCheckedContactId', currentContactId)
            }
          }
        } catch (error) {
          console.error('Polling error:', error)
        }
      }, 2000) // 2 saniyede bir kontrol et (daha sık)
    }

    // Bildirim izni iste
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission)
        if (permission === 'granted') {
          connectSSE()
          startPolling()
          
          // Test bildirimi gönder
          setTimeout(() => {
            console.log('Sending test notification...')
            // Basit test bildirimi
            try {
              const testNotification = new Notification('Test Bildirimi', {
                body: 'Bildirim sistemi çalışıyor!',
                icon: '/favicon-32x32.png'
              })
              console.log('Test notification created:', testNotification)
            } catch (error) {
              console.error('Test notification error:', error)
            }
            
            showBrowserNotification({
              type: 'test',
              title: 'Test Bildirimi',
              message: 'Bildirim sistemi çalışıyor!',
              data: { id: 'test' }
            })
          }, 2000)
          
          // Ek test bildirimi
          setTimeout(() => {
            console.log('Sending second test notification...')
            showBrowserNotification({
              type: 'test2',
              title: 'İkinci Test',
              message: 'Bu da ikinci test bildirimi!',
              data: { id: 'test2' }
            })
          }, 5000)
        }
      })
    } else if (Notification.permission === 'granted') {
      connectSSE()
      startPolling()
      
      // Test bildirimi gönder
      setTimeout(() => {
        console.log('Sending test notification...')
        // Basit test bildirimi
        try {
          const testNotification = new Notification('Test Bildirimi', {
            body: 'Bildirim sistemi çalışıyor!',
            icon: '/favicon-32x32.png'
          })
          console.log('Test notification created:', testNotification)
        } catch (error) {
          console.error('Test notification error:', error)
        }
        
        showBrowserNotification({
          type: 'test',
          title: 'Test Bildirimi',
          message: 'Bildirim sistemi çalışıyor!',
          data: { id: 'test' }
        })
      }, 2000)
      
      // Ek test bildirimi
      setTimeout(() => {
        console.log('Sending second test notification...')
        showBrowserNotification({
          type: 'test2',
          title: 'İkinci Test',
          message: 'Bu da ikinci test bildirimi!',
          data: { id: 'test2' }
        })
      }, 5000)
    }

    // Sayfa görünürlük değişikliklerini dinle
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Page hidden, continuing polling...')
      } else {
        console.log('Page visible, reconnecting SSE...')
        if (eventSource) {
          eventSource.close()
        }
        connectSSE()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (eventSource) {
        eventSource.close()
        setIsConnected(false)
      }
      if (pollInterval) {
        clearInterval(pollInterval)
      }
    }
  }, [notifications])

  const clearNotifications = () => {
    setNotifications([])
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  return {
    notifications,
    isConnected,
    clearNotifications,
    removeNotification
  }
}
