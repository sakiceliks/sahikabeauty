// app/api/upload/route.js
import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { join } from "path"
import { logAction, logError } from "@/lib/logger"

export const runtime = "nodejs"
export const maxDuration = 60 // 60 seconds timeout

export async function POST(request) {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN environment variable is not set")
      return NextResponse.json({ 
        success: false,
        error: "Blob storage is not configured. Please set BLOB_READ_WRITE_TOKEN environment variable." 
      }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get("file")
    const type = formData.get("type") || "service"
    const deviceName = formData.get("deviceName")

    console.log("Upload request received:", { 
      fileName: file?.name, 
      fileSize: file?.size, 
      fileType: file?.type,
      uploadType: type,
      deviceName 
    })

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
    } else if (type === "testimonial") {
      // Testimonial görselleri için /testimonials/ klasörüne kaydet
      folderPath = "testimonials/"
    } else {
      // Hizmet görselleri için /services/ klasörüne kaydet
      folderPath = "services/"
    }

    const timestamp = Date.now()
    const extension = fileName.split(".").pop()
    const nameWithoutExt = fileName.replace(`.${extension}`, "")
    const uniqueFileName = `${nameWithoutExt}-${timestamp}.${extension}`

    // Vercel Blob'a yükle
    console.log("Uploading to Vercel Blob:", { 
      path: join(folderPath, uniqueFileName),
      contentType: file.type,
      fileSize: file.size 
    })
    
    // Add timeout and retry logic
    const uploadWithTimeout = async () => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 45000) // 45 second timeout
      
      try {
        const blob = await put(join(folderPath, uniqueFileName), file, {
          access: "public",
          contentType: file.type,
        })
        clearTimeout(timeoutId)
        return blob
      } catch (error) {
        clearTimeout(timeoutId)
        throw error
      }
    }
    
    const blob = await uploadWithTimeout()

    console.log("Upload successful:", { 
      url: blob.url,
      pathname: blob.pathname 
    })

    // Log the upload action
    await logAction("POST", "/api/upload", "admin", "success", `File uploaded: ${file.name} (${type})`);

    return NextResponse.json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      downloadUrl: blob.downloadUrl,
      blob: blob,
    })
  } catch (error) {
    // Log the error
    await logError("POST", "/api/upload", "admin", error);
    console.error("Yükleme hatası:", error)
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })
    
    // Handle specific error types
    let errorMessage = "Yükleme başarısız"
    let statusCode = 500
    
    if (error.name === 'AbortError' || error.code === 'ECONNRESET') {
      errorMessage = "Dosya yükleme zaman aşımına uğradı. Lütfen daha küçük bir dosya deneyin."
      statusCode = 408
    } else if (error.message.includes('aborted')) {
      errorMessage = "Bağlantı kesildi. Lütfen tekrar deneyin."
      statusCode = 408
    } else if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
      errorMessage = "Depolama yapılandırması eksik. Lütfen yönetici ile iletişime geçin."
      statusCode = 500
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: statusCode },
    )
  }
}
