'use client'

import { useState, useEffect } from 'react'

export default function DebugNotifications() {
  const [permission, setPermission] = useState('')
  const [testResult, setTestResult] = useState('')
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPermission(Notification.permission)
      addLog(`Notification permission: ${Notification.permission}`)
    }
  }, [])

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      addLog(`Permission requested: ${result}`)
    } catch (error) {
      addLog(`Permission error: ${error.message}`)
    }
  }

  const testSimpleNotification = () => {
    try {
      addLog('Testing simple notification...')
      const notification = new Notification('Test Bildirimi', {
        body: 'Bu basit bir test bildirimidir',
        icon: '/favicon-32x32.png'
      })
      
      notification.onshow = () => {
        addLog('✅ Notification SHOWN on screen!')
        setTestResult('✅ Bildirim ekranda göründü!')
      }
      
      notification.onerror = (error) => {
        addLog(`❌ Notification ERROR: ${error}`)
        setTestResult(`❌ Bildirim hatası: ${error}`)
      }
      
      notification.onclick = () => {
        addLog('🔔 Notification clicked!')
        notification.close()
      }
      
      addLog('Simple notification created successfully')
      setTestResult('Bildirim oluşturuldu, ekranda görünüyor mu?')
    } catch (error) {
      addLog(`Simple notification error: ${error.message}`)
      setTestResult(`Hata: ${error.message}`)
    }
  }

  const testAdvancedNotification = () => {
    try {
      addLog('Testing advanced notification...')
      const notification = new Notification('Gelişmiş Test', {
        body: 'Bu gelişmiş bir test bildirimidir',
        icon: '/favicon-32x32.png',
        badge: '/favicon-32x32.png',
        tag: 'test-advanced',
        requireInteraction: true,
        silent: false
      })
      addLog('Advanced notification created successfully')
      setTestResult('Gelişmiş bildirim başarılı')
    } catch (error) {
      addLog(`Advanced notification error: ${error.message}`)
      setTestResult(`Gelişmiş hata: ${error.message}`)
    }
  }

  const testAudioNotification = () => {
    try {
      addLog('Testing audio notification...')
      
      // Ses çal
      const audio = new Audio('/notification-sound.mp3')
      audio.volume = 0.5
      audio.play().catch(() => {
        addLog('Audio file not found, using Web Audio API')
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
          addLog('Web Audio API sound played')
        } catch (audioError) {
          addLog(`Web Audio API error: ${audioError.message}`)
        }
      })
      
      const notification = new Notification('Sesli Test', {
        body: 'Bu sesli bir test bildirimidir',
        icon: '/favicon-32x32.png',
        silent: false
      })
      addLog('Audio notification created successfully')
      setTestResult('Sesli bildirim başarılı')
    } catch (error) {
      addLog(`Audio notification error: ${error.message}`)
      setTestResult(`Sesli hata: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Bildirim Debug Sayfası</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bildirim Durumu</h2>
          <div className="space-y-4">
            <div>
              <strong>İzin Durumu:</strong> 
              <span className={`ml-2 px-3 py-1 rounded-full text-sm ${
                permission === 'granted' ? 'bg-green-100 text-green-800' :
                permission === 'denied' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {permission}
              </span>
            </div>
            
            {permission !== 'granted' && (
              <button
                onClick={requestPermission}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Bildirim İzni İste
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Bildirimleri</h2>
          <div className="space-y-4">
            <button
              onClick={testSimpleNotification}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
            >
              Basit Test
            </button>
            
            <button
              onClick={testAdvancedNotification}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
            >
              Gelişmiş Test
            </button>
            
            <button
              onClick={testAudioNotification}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Sesli Test
            </button>
          </div>
          
          {testResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <strong>Son Test Sonucu:</strong> {testResult}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tarayıcı Ayarları Kontrolü</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">Chrome için:</h3>
              <p className="text-sm text-yellow-700">
                1. Adres çubuğundaki 🔔 ikonuna tıklayın<br/>
                2. "Bildirimlere izin ver" seçin<br/>
                3. Sayfayı yenileyin
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
              <h3 className="font-semibold text-blue-800 mb-2">Sistem Ayarları:</h3>
              <p className="text-sm text-blue-700">
                <strong>macOS:</strong> System Preferences → Notifications → Chrome<br/>
                <strong>Windows:</strong> Settings → System → Notifications → Chrome<br/>
                <strong>Linux:</strong> Desktop environment notification settings
              </p>
            </div>
            
            <div className="p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="font-semibold text-red-800 mb-2">Önemli:</h3>
              <p className="text-sm text-red-700">
                • Bildirimler sadece aktif sekmede çalışır<br/>
                • Sayfa arka plandaysa bildirimler görünmeyebilir<br/>
                • Do Not Disturb modu bildirimleri engeller
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Debug Logları</h2>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
