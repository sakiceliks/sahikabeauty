import { ServiceModel } from '@/models/service';
import { NextResponse } from 'next/server';


const serviceModel = new ServiceModel();

// GET - Fetch all services or search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let services;

    if (search) {
      services = await serviceModel.search(search);
    } else if (category) {
      services = await serviceModel.findByCategory(category);
    } else {
      services = await serviceModel.findAll();
    }

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length
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

// POST - Create a new service
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['slug', 'category', 'title', 'description'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { 
            success: false, 
            error: `Missing required field: ${field}` 
          },
          { status: 400 }
        );
      }
    }

    // Check if slug already exists
    const existingService = await serviceModel.findBySlug(body.slug);
    if (existingService) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Service with this slug already exists' 
        },
        { status: 400 }
      );
    }

    const service = await serviceModel.create(body);

    return NextResponse.json({
      success: true,
      data: service
    }, { status: 201 });
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
