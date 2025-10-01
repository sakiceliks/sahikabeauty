import { NextResponse } from "next/server"
import { addConnection, removeConnection } from "@/lib/sse-manager"

// GET - SSE endpoint for admin notifications
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const isAdmin = searchParams.get('admin') === 'true'
  
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    start(controller) {
      const connection = {
        write: (data) => {
          try {
            controller.enqueue(encoder.encode(data))
          } catch (error) {
            console.error('Error writing to SSE stream:', error)
          }
        },
        close: () => {
          try {
            controller.close()
          } catch (error) {
            console.error('Error closing SSE stream:', error)
          }
        }
      }
      
      addConnection(connection)
      
      // Send initial connection message
      connection.write(`data: ${JSON.stringify({ type: 'connected', message: 'SSE connection established' })}\n\n`)
      
      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        removeConnection(connection)
        connection.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    }
  })
}
