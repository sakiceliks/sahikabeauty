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
