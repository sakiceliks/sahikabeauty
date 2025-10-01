import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

// Mock Next.js Request
global.Request = class Request {
  constructor(input, init) {
    Object.defineProperty(this, 'url', {
      value: input,
      writable: false
    })
    this.method = init?.method || 'GET'
    this.headers = new Map(Object.entries(init?.headers || {}))
    this.body = init?.body
  }
  
  async json() {
    return JSON.parse(this.body)
  }
}

// Mock Next.js Response
global.Response = class Response {
  constructor(body, init) {
    this.body = body
    this.status = init?.status || 200
    this.headers = new Map(Object.entries(init?.headers || {}))
  }
  
  async json() {
    return JSON.parse(this.body)
  }
}

// Mock NextResponse
global.NextResponse = {
  json: jest.fn((data, init) => {
    const response = {
      json: () => Promise.resolve(data),
      status: init?.status || 200,
      headers: new Map(Object.entries(init?.headers || {}))
    }
    return response
  }),
  redirect: jest.fn((url, status) => ({
    status: status || 302,
    headers: new Map([['Location', url]])
  })),
  rewrite: jest.fn((url) => ({
    status: 200,
    headers: new Map([['x-rewrite-url', url]])
  }))
}

// Mock NextResponse module
jest.mock('next/server', () => ({
  NextRequest: class NextRequest {
    constructor(input, init) {
      Object.defineProperty(this, 'url', {
        value: input,
        writable: false
      })
      this.method = init?.method || 'GET'
      this.headers = new Map(Object.entries(init?.headers || {}))
      this.body = init?.body
    }
    
    async json() {
      return JSON.parse(this.body)
    }
  },
  NextResponse: {
    json: jest.fn((data, init) => {
      const response = {
        json: () => Promise.resolve(data),
        status: init?.status || 200,
        headers: new Map(Object.entries(init?.headers || {}))
      }
      return response
    }),
    redirect: jest.fn((url, status) => ({
      status: status || 302,
      headers: new Map([['Location', url]])
    })),
    rewrite: jest.fn((url) => ({
      status: 200,
      headers: new Map([['x-rewrite-url', url]])
    }))
  }
}))

// Mock window.Notification
Object.defineProperty(window, 'Notification', {
  value: jest.fn(() => ({
    onclick: jest.fn(),
    onshow: jest.fn(),
    onerror: jest.fn(),
    close: jest.fn(),
  })),
  writable: true,
})

// Mock Audio
Object.defineProperty(window, 'Audio', {
  value: jest.fn(() => ({
    play: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    volume: 0.5,
  })),
  writable: true,
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock fetch
global.fetch = jest.fn()

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

// Mock MongoDB
jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve({
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        find: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
        insertOne: jest.fn(),
        updateOne: jest.fn(),
        deleteOne: jest.fn(),
        sort: jest.fn().mockReturnThis(),
        toArray: jest.fn()
      }))
    }))
  }))
}))

// Mock ObjectId
jest.mock('mongodb', () => ({
  ObjectId: jest.fn((id) => ({ toString: () => id, valueOf: () => id })),
  isObjectId: jest.fn((id) => /^[0-9a-fA-F]{24}$/.test(id))
}))
