import { ServiceModel } from '@/models/service';
import { NextResponse } from 'next/server';

const serviceModel = new ServiceModel();

// GET - Fetch service by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const service = await serviceModel.findById(id);

    if (!service) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Service not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service
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

// PUT - Update service by ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    // If slug is being updated, check if it already exists
    if (body.slug) {
      const existingService = await serviceModel.findBySlug(body.slug);
      if (existingService && existingService.id !== parseInt(id)) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Service with this slug already exists' 
          },
          { status: 400 }
        );
      }
    }

    const service = await serviceModel.update(id, body);

    return NextResponse.json({
      success: true,
      data: service
    });
  } catch (error) {
    if (error.message === 'Service not found') {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete service by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const result = await serviceModel.delete(id);

    return NextResponse.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    if (error.message === 'Service not found') {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
