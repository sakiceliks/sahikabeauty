// app/api/services/[slug]/route.js

import { NextResponse } from 'next/server';
import { ServiceModel } from '@/models/service';
import { ObjectId } from 'mongodb';

const serviceModel = new ServiceModel();

// GET - Fetch service by slug or _id
export async function GET(request, { params }) {
  try {
    const { slug } = params; // Change id to slug
    let service = null;

    if (ObjectId.isValid(slug)) {
      service = await serviceModel.findById(slug);
    } else {
      service = await serviceModel.findBySlug(slug);
    }

    // ... (rest of the GET function)
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