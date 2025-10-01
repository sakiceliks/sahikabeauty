// Log sistemi utility fonksiyonları

export const logAction = async (action, endpoint, user = "admin", status = "success", details = "") => {
  try {
    const logData = {
      user,
      action,
      endpoint,
      status,
      details,
      ipAddress: "127.0.0.1" // Gerçek uygulamada request'ten alınacak
    }

    // Log API'sine POST isteği gönder
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/admin/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(logData)
    })

    if (!response.ok) {
      console.error("Log kaydedilemedi:", response.statusText)
    }
  } catch (error) {
    console.error("Log kaydedilirken hata:", error)
  }
}

// PUT işlemi için log
export const logPutAction = (endpoint, user = "admin", details = "") => {
  return logAction("PUT", endpoint, user, "success", details)
}

// DELETE işlemi için log
export const logDeleteAction = (endpoint, user = "admin", details = "") => {
  return logAction("DELETE", endpoint, user, "success", details)
}

// Hata logu
export const logError = (action, endpoint, user = "admin", error) => {
  return logAction(action, endpoint, user, "error", error.message || "Bilinmeyen hata")
}
