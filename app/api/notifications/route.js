import { NextResponse } from "next/server"

// In-memory store for SSE connections
const connections = new Set()

// Add connection to store
export function addConnection(connection) {
  connections.add(connection)
  console.log(`SSE connection added. Total connections: ${connections.size}`)
}

// Remove connection from store
export function removeConnection(connection) {
  connections.delete(connection)
  console.log(`SSE connection removed. Total connections: ${connections.size}`)
}

// Broadcast notification to all connected clients
export function broadcastNotification(data) {
  console.log(`Broadcasting notification to ${connections.size} connections:`, data)
  
  connections.forEach(connection => {
    try {
      connection.write(`data: ${JSON.stringify(data)}\n\n`)
    } catch (error) {
      console.error('Error sending SSE message:', error)
      connections.delete(connection)
    }
  })
}

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
