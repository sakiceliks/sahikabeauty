// app/api/upload/route.js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { join } from 'path';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'service';

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // Dosya tipi kontrolü
    if (type === 'device' && file.type !== 'image/png') {
      return NextResponse.json({ error: 'Cihaz görselleri için sadece PNG formatı desteklenir' }, { status: 400 });
    }

    let fileName = file.name;
    let folderPath = '';

    // Yükleme yolu ve dosya adı ayarlamaları
    if (type === 'device') {
      // Cihaz görselleri için /assets/devices/ klasörüne kaydet
      folderPath = 'devices/';
      // Dosya adını slug olarak kullan
      fileName = formData.get('slug') || file.name;
      if (!fileName.endsWith('.png')) {
        fileName += '.png';
      }
    } else {
      // Hizmet görselleri için /assets/services/ klasörüne kaydet
      folderPath = 'services/';
    }

    // Vercel Blob'a yükle
    const blob = await put(join(folderPath, fileName), file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Yükleme hatası:', error);
    return NextResponse.json({ error: 'Yükleme başarısız' }, { status: 500 });
  }
}