import { NextResponse } from 'next/server';
import { categories } from '../../../data/services';

// GET - Fetch all categories
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}