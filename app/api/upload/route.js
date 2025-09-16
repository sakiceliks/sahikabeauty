// app/api/upload/route.js
import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { join } from "path"

export const runtime = "nodejs"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")
    const type = formData.get("type") || "service"
    const deviceName = formData.get("deviceName")

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 })
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Sadece resim dosyaları desteklenir" }, { status: 400 })
    }

    let fileName = file.name
    let folderPath = ""

    // Yükleme yolu ve dosya adı ayarlamaları
    if (type === "device") {
      // Cihaz görselleri için /devices/ klasörüne kaydet
      folderPath = "devices/"
      if (deviceName) {
        // Device name varsa onu kullan, yoksa orijinal dosya adını kullan
        const extension = file.name.split(".").pop()
        fileName = `${deviceName.toLowerCase().replace(/\s+/g, "-")}.${extension}`
      }
    } else {
      // Hizmet görselleri için /services/ klasörüne kaydet
      folderPath = "services/"
    }

    const timestamp = Date.now()
    const extension = fileName.split(".").pop()
    const nameWithoutExt = fileName.replace(`.${extension}`, "")
    const uniqueFileName = `${nameWithoutExt}-${timestamp}.${extension}`

    // Vercel Blob'a yükle
    const blob = await put(join(folderPath, uniqueFileName), file, {
      access: "public",
      contentType: file.type,
    })

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
      blob: blob,
    })
  } catch (error) {
    console.error("Yükleme hatası:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Yükleme başarısız: " + error.message,
      },
      { status: 500 },
    )
  }
}
