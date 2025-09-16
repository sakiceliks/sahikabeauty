// app/api/blog/[id]/route.js
import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'blog.json');

// DELETE - Blog yazısını sil
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const data = await readFile(dataFilePath, 'utf8');
    let blogPosts = JSON.parse(data);
    
    const index = blogPosts.findIndex(post => post.id === parseInt(id));
    
    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: 'Blog yazısı bulunamadı'
      }, { status: 404 });
    }
    
    blogPosts.splice(index, 1);
    
    await writeFile(dataFilePath, JSON.stringify(blogPosts, null, 2));
    
    return NextResponse.json({
      success: true,
      message: 'Blog yazısı başarıyla silindi'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Blog yazısı silinirken hata oluştu'
    }, { status: 500 });
  }
}
