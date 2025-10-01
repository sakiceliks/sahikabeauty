import { NextResponse } from "next/server"

// Geçici statik log verisi - gerçek uygulamada veritabanından gelecek
let logsData = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    user: "admin",
    action: "PUT",
    endpoint: "/api/carousel/1",
    status: "success",
    ipAddress: "192.168.1.1",
    details: "Carousel slide güncellendi"
  },
  {
    id: "2", 
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    user: "admin",
    action: "DELETE",
    endpoint: "/api/carousel/2",
    status: "success",
    ipAddress: "192.168.1.1",
    details: "Carousel slide silindi"
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    user: "admin",
    action: "PUT",
    endpoint: "/api/services/1",
    status: "success",
    ipAddress: "192.168.1.1",
    details: "Hizmet güncellendi"
  }
]

// GET - Tüm logları getir
export async function GET() {
  try {
    // Tarihe göre sırala (en yeni önce)
    const sortedLogs = logsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    
    return NextResponse.json({
      success: true,
      data: sortedLogs,
      count: sortedLogs.length
    })
  } catch (error) {
    console.error("Logs getirirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Loglar getirilemedi",
      },
      { status: 500 },
    )
  }
}

// POST - Yeni log ekle
export async function POST(request) {
  try {
    const body = await request.json()
    const { user, action, endpoint, status, ipAddress, details } = body

    const newLog = {
      id: (logsData.length + 1).toString(),
      timestamp: new Date().toISOString(),
      user: user || "admin",
      action,
      endpoint,
      status: status || "success",
      ipAddress: ipAddress || "127.0.0.1",
      details: details || ""
    }

    logsData.unshift(newLog) // En başa ekle

    return NextResponse.json({
      success: true,
      data: newLog,
    })
  } catch (error) {
    console.error("Log eklenirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Log eklenemedi",
      },
      { status: 500 },
    )
  }
}

// DELETE - Tüm logları temizle
export async function DELETE() {
  try {
    logsData = []
    
    return NextResponse.json({
      success: true,
      message: "Tüm loglar temizlendi",
    })
  } catch (error) {
    console.error("Loglar temizlenirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Loglar temizlenemedi",
      },
      { status: 500 },
    )
  }
}
