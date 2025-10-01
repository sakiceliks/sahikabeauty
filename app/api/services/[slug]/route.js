// app/api/services/[slug]/route.js

import { NextResponse } from 'next/server';
import { ServiceModel } from '@/models/service';
import { ObjectId } from 'mongodb';
import { logPutAction, logDeleteAction } from "@/lib/logger";

// GET - Fetch service by slug or _id
export async function GET(request, { params }) {
  try {
    const { slug } = params;
    let service = null;

    console.log("Fetching service with slug:", slug);

    if (ObjectId.isValid(slug)) {
      // If it's a valid ObjectId, search by _id
      const result = await ServiceModel.getById(slug);
      service = result.success ? result.data : null;
    } else {
      // If it's not an ObjectId, search by slug
      // For now, we'll search in all services and find by slug
      const allServices = await ServiceModel.getAll();
      if (allServices.success) {
        service = allServices.data.find(s => s.slug === slug);
      }
    }

    console.log("Service found:", service ? "Yes" : "No");

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: 'Service not found'
        },
        { status: 404 }
      );
    }

    // Service'e published field'ı ekle (yoksa false) ve image path'ini düzelt
    const imageMappings = {
      '/assets/services/dudak-renklendirme.png': '/slide/sld11.png',
      '/assets/services/ignesiz-mezoterapi.png': '/slide/sld10.png',
      '/assets/services/24k-altin-bakim.png': '/slide/sld9.png',
      '/assets/services/cilt-genclestirme.png': '/slide/sld8.png',
      '/assets/services/lazer-epilasyon.png': '/slide/sld1.png',
      '/assets/services/ipl-epilasyon.png': '/slide/sld2.png',
      '/assets/services/elastik-bant-epilasyon.png': '/slide/sld3.png',
      '/assets/services/bolgesel-incelme.png': '/slide/sld4.png',
      '/assets/services/anti-cellulite.png': '/slide/sld5.png',
      '/assets/services/ozon-terapi.png': '/slide/sld6.png',
      '/assets/services/hydrafacial.png': '/slide/sld7.png'
    };
    
    const serviceWithPublished = {
      ...service,
      published: service.published !== undefined ? service.published : false,
      image: imageMappings[service.image] || service.image
    };

    return NextResponse.json({
      success: true,
      data: serviceWithPublished
    });
  } catch (error) {
    console.error("Service fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

// PUT - Update service by slug or _id
export async function PUT(request, { params }) {
  try {
    const { slug } = params;
    const body = await request.json();
    
    console.log("Updating service with slug:", slug);
    console.log("Update data:", body);

    // MongoDB connection test
    try {
      const client = await import('@/lib/mongodb').then(m => m.default);
      await client;
      console.log("MongoDB connection test passed");
    } catch (connectionError) {
      console.error("MongoDB connection test failed:", connectionError);
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed"
        },
        { status: 500 }
      );
    }

    // ObjectId validation
    let serviceId = slug;
    if (ObjectId.isValid(slug)) {
      serviceId = slug;
    } else {
      // If it's not an ObjectId, find by slug first
      const allServices = await ServiceModel.getAll();
      if (allServices.success) {
        const service = allServices.data.find(s => s.slug === slug);
        if (service) {
          serviceId = service._id;
        } else {
          return NextResponse.json(
            {
              success: false,
              error: "Service not found"
            },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "Could not fetch services"
          },
          { status: 500 }
        );
      }
    }

    console.log("Using serviceId:", serviceId);
    console.log("Update body:", body);
    console.log("Device object:", body.device);

    // ObjectId validation
    if (!ObjectId.isValid(serviceId)) {
      console.error("Invalid ObjectId:", serviceId);
      return NextResponse.json(
        {
          success: false,
          error: "Invalid service ID format"
        },
        { status: 400 }
      );
    }

    const result = await ServiceModel.update(serviceId, body);
    console.log("Update result:", result);

    if (result.success) {
      // Log the action
      try {
        await logPutAction(`/api/services/${slug}`, "admin", {
          serviceId: serviceId,
          updateData: body
        });
      } catch (logError) {
        console.error("Logging error:", logError);
      }

      return NextResponse.json({
        success: true,
        data: result.data
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete service by slug or _id
export async function DELETE(request, { params }) {
  try {
    const { slug } = params;
    
    console.log("Deleting service with slug:", slug);

    let serviceId = slug;
    if (!ObjectId.isValid(slug)) {
      // If it's not an ObjectId, find by slug first
      const allServices = await ServiceModel.getAll();
      if (allServices.success) {
        const service = allServices.data.find(s => s.slug === slug);
        if (service) {
          serviceId = service._id;
        } else {
          return NextResponse.json(
            {
              success: false,
              error: "Service not found"
            },
            { status: 404 }
          );
        }
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "Could not fetch services"
          },
          { status: 500 }
        );
      }
    }

    const result = await ServiceModel.delete(serviceId);

    if (result.success) {
      // Log the action
      try {
        await logDeleteAction(`/api/services/${slug}`, "admin", {
          serviceId: serviceId
        });
      } catch (logError) {
        console.error("Logging error:", logError);
      }

      return NextResponse.json({
        success: true,
        data: result.data
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}