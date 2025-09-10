// app/api/blog/route.js
import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'blog.json');

// GET - Tüm blog yazılarını getir
export async function GET() {
  try {
    const data = await readFile(dataFilePath, 'utf8');
    const blogPosts = JSON.parse(data);
    
    return NextResponse.json({
      success: true,
      data: blogPosts
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Blog yazıları okunurken hata oluştu'
    }, { status: 500 });
  }
}

// POST - Yeni blog yazısı oluştur
export async function POST(request) {
  try {
    const newPost = await request.json();
    
    const data = await readFile(dataFilePath, 'utf8');
    const blogPosts = JSON.parse(data);
    
    // Yeni ID oluştur
    const newId = Math.max(...blogPosts.map(post => post.id), 0) + 1;
    newPost.id = newId;
    
    // Tarih ekle (eğer yoksa)
    if (!newPost.date) {
      newPost.date = new Date().toLocaleDateString('tr-TR');
    }
    
    // Görüntülenme sayısı (eğer yoksa)
    if (!newPost.views) {
      newPost.views = 0;
    }
    
    blogPosts.push(newPost);
    
    await writeFile(dataFilePath, JSON.stringify(blogPosts, null, 2));
    
    return NextResponse.json({
      success: true,
      data: newPost
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Blog yazısı oluşturulurken hata oluştu'
    }, { status: 500 });
  }
}

// PUT - Blog yazısını güncelle
export async function PUT(request) {
  try {
    const updatedPost = await request.json();
    const { id } = updatedPost;
    
    const data = await readFile(dataFilePath, 'utf8');
    let blogPosts = JSON.parse(data);
    
    const index = blogPosts.findIndex(post => post.id === id);
    
    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: 'Blog yazısı bulunamadı'
      }, { status: 404 });
    }
    
    blogPosts[index] = { ...blogPosts[index], ...updatedPost };
    
    await writeFile(dataFilePath, JSON.stringify(blogPosts, null, 2));
    
    return NextResponse.json({
      success: true,
      data: blogPosts[index]
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Blog yazısı güncellenirken hata oluştu'
    }, { status: 500 });
  }
}