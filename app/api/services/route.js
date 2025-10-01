import { NextResponse } from 'next/server';
import { ServiceModel } from '@/models/service';
import { logPutAction, logDeleteAction } from "@/lib/logger"

// GET - Fetch all services or search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let result;

    if (search) {
      result = await ServiceModel.search(search);
    } else if (category) {
      result = await ServiceModel.findByCategory(category);
    } else {
      result = await ServiceModel.getAll();
    }

    if (result.success) {
      // Her service'e published field'ı ekle (yoksa false) ve image path'lerini düzelt
      const servicesWithPublished = result.data.map(service => {
        // Image path mapping
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
        
        return {
          ...service,
          published: service.published !== undefined ? service.published : false,
          image: imageMappings[service.image] || service.image
        };
      });
      
      return NextResponse.json({
        success: true,
        data: servicesWithPublished,
        count: servicesWithPublished.length
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Services API Error:", error);
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
    
    const result = await ServiceModel.create(body);

    if (result.success) {
      // Log the creation action
      await logAction("POST", "/api/services", "admin", "success", `Service created: ${body.title}`);
      
      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      // Log the error
      await logError("POST", "/api/services", "admin", new Error(result.error));
      
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Service creation error:", error);
    
    // Log the error
    await logError("POST", "/api/services", "admin", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// PUT - Update a service
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Service ID is required" 
        },
        { status: 400 }
      );
    }

    const result = await ServiceModel.update(id, updateData);

    if (result.success) {
      // Log the action
      await logPutAction(`/api/services/${id}`, "admin", `Service updated: ${updateData.title || 'Unknown'}`)

      return NextResponse.json({
        success: true,
        data: result.data,
      });
    } else {
      // Log the error
      await logError("PUT", `/api/services/${id}`, "admin", new Error(result.error));
      
      return NextResponse.json(
        { 
          success: false, 
          error: result.error 
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Service update error:", error);
    
    // Log the error
    await logError("PUT", `/api/services/${id}`, "admin", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}