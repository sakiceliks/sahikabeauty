"use client"

import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { Bot, Send, Settings, TestTube, Eye, EyeOff, Save, RefreshCw } from "lucide-react"

export default function TelegramSettings() {
  const [config, setConfig] = useState({
    token: '',
    chatId: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState(false)
  const [showToken, setShowToken] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/telegram-config')
      const data = await response.json()

      if (data.success) {
        setConfig({
          token: data.data.token || '',
          chatId: data.data.chatId || ''
        })
      } else {
        toast.error('Konfigürasyon yüklenemedi')
      }
    } catch (error) {
      console.error('Config fetch error:', error)
      toast.error('Konfigürasyon yüklenirken hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!config.token || !config.chatId) {
      toast.error('Token ve Chat ID gerekli')
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/telegram-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Telegram ayarları başarıyla kaydedildi ve test edildi!')
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Ayarlar kaydedilirken hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  const handleTest = async () => {
    if (!config.token || !config.chatId) {
      toast.error('Token ve Chat ID gerekli')
      return
    }

    try {
      setTesting(true)
      const response = await fetch('/api/telegram-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Test mesajı başarıyla gönderildi!')
      } else {
        toast.error(`Test hatası: ${data.error}`)
      }
    } catch (error) {
      console.error('Test error:', error)
      toast.error('Test mesajı gönderilirken hata oluştu')
    } finally {
      setTesting(false)
    }
  }

  const handleSaveOnly = async () => {
    if (!config.token || !config.chatId) {
      toast.error('Token ve Chat ID gerekli')
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/telegram-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...config,
          skipTest: true
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Telegram ayarları başarıyla kaydedildi!')
      } else {
        toast.error(`Hata: ${data.error}`)
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Ayarlar kaydedilirken hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-muted rounded w-48 mb-2" />
            <div className="h-4 bg-muted rounded w-64" />
          </div>
        </div>
        <div className="card p-8">
          <div className="space-y-4">
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-10 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-10 bg-muted rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="h2 text-foreground">Telegram Bot Ayarları</h1>
          <p className="text-muted-foreground mt-2">Telegram bot konfigürasyonunu yönetin ve test edin</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchConfig}
            className="btn-secondary"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Yenile
          </button>
        </div>
      </div>

      <div className="card p-8">
        <div className="space-y-6">
          {/* Bot Token */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bot Token *
            </label>
            <div className="relative">
              <input
                type={showToken ? "text" : "password"}
                value={config.token}
                onChange={(e) => setConfig({ ...config, token: e.target.value })}
                className="input-field w-full pr-12"
                placeholder="Bot token'ınızı girin (örn: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz)"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              BotFather'dan aldığınız bot token'ını girin
            </p>
          </div>

          {/* Chat ID */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Chat ID *
            </label>
            <input
              type="text"
              value={config.chatId}
              onChange={(e) => setConfig({ ...config, chatId: e.target.value })}
              className="input-field w-full"
              placeholder="Chat ID'nizi girin (örn: 123456789)"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Mesajların gönderileceği chat ID'sini girin
            </p>
          </div>

          {/* Mevcut Ayarlar Bilgisi */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border">
            <div className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Mevcut Ayarlar</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p><strong>Token:</strong> {config.token ? `${config.token.substring(0, 10)}...${config.token.substring(config.token.length - 4)}` : 'Ayarlanmamış'}</p>
                  <p><strong>Chat ID:</strong> {config.chatId || 'Ayarlanmamış'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || !config.token || !config.chatId}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Kaydediliyor...' : 'Kaydet ve Test Et'}
            </button>
            
            <button
              onClick={handleSaveOnly}
              disabled={saving || !config.token || !config.chatId}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Kaydediliyor...' : 'Sadece Kaydet'}
            </button>
            
            <button
              onClick={handleTest}
              disabled={testing || !config.token || !config.chatId}
              className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {testing ? 'Test Ediliyor...' : 'Sadece Test Et'}
            </button>
          </div>
        </div>
      </div>

      {/* Kullanım Kılavuzu */}
      <div className="card p-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Telegram Bot Kurulum Kılavuzu
        </h3>
        
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h4 className="font-medium text-foreground mb-2">1. Bot Oluşturma</h4>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Telegram'da @BotFather'a mesaj gönderin</li>
              <li>/newbot komutunu kullanın</li>
              <li>Bot adınızı ve kullanıcı adınızı girin</li>
              <li>Bot token'ınızı kopyalayın</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">2. Chat ID Bulma</h4>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>@userinfobot'a mesaj gönderin</li>
              <li>Chat ID'nizi kopyalayın</li>
              <li>Veya grup/kanal ID'si için @getidsbot kullanın</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">3. Test Etme</h4>
            <p>Ayarları kaydettikten sonra otomatik olarak test mesajı gönderilir. Başarılı olursa bot çalışıyor demektir.</p>
          </div>
        </div>
      </div>

      {/* Son Gönderilen Mesajlar */}
      <div className="card p-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Send className="w-5 h-5" />
          Son Gönderilen Mesajlar
        </h3>
        
        <div className="text-sm text-muted-foreground">
          <p>Rezervasyon formundan gelen mesajlar burada görüntülenecek.</p>
          <p className="mt-2">
            <strong>Not:</strong> Mesaj geçmişi için Telegram uygulamanızı kontrol edin.
          </p>
        </div>
      </div>
    </div>
  )
}
