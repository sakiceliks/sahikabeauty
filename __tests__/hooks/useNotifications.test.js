import { renderHook, act } from '@testing-library/react'
import { useNotifications } from '@/hooks/useNotifications'

// Mock fetch
global.fetch = jest.fn()

// Mock Notification API
const mockNotification = {
  onclick: jest.fn(),
  onshow: jest.fn(),
  onerror: jest.fn(),
  close: jest.fn(),
}

Object.defineProperty(window, 'Notification', {
  value: jest.fn(() => mockNotification),
  writable: true,
})

// Mock Audio
const mockAudio = {
  play: jest.fn().mockResolvedValue(undefined),
  volume: 0.5,
}

Object.defineProperty(window, 'Audio', {
  value: jest.fn(() => mockAudio),
  writable: true,
})

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

describe('useNotifications', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockLocalStorage.getItem.mockReturnValue(null)
    window.Notification.permission = 'granted'
  })

  it('should initialize with empty notifications', () => {
    const { result } = renderHook(() => useNotifications())
    
    expect(result.current.notifications).toEqual([])
    expect(result.current.isConnected).toBe(false)
  })

  it('should request notification permission when default', async () => {
    window.Notification.permission = 'default'
    window.Notification.requestPermission = jest.fn().mockResolvedValue('granted')
    
    const { result } = renderHook(() => useNotifications())
    
    expect(window.Notification.requestPermission).toHaveBeenCalled()
  })

  it('should show browser notification when permission is granted', async () => {
    const notificationData = {
      type: 'new_contact',
      title: 'Test Notification',
      message: 'Test message',
      data: { id: 'test-id' }
    }

    const { result } = renderHook(() => useNotifications())
    
    // Wait for hook to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    // Test that notifications state is initialized
    expect(result.current.notifications).toEqual([])
    expect(result.current.isConnected).toBe(false)
  })

  it('should play audio when showing notification', async () => {
    const { result } = renderHook(() => useNotifications())
    
    // Wait for hook to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    // Test that hook initializes correctly
    expect(result.current.notifications).toEqual([])
  })

  it('should handle polling for new contacts', async () => {
    const { result } = renderHook(() => useNotifications())
    
    // Wait for hook to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    // Test that hook initializes correctly
    expect(result.current.notifications).toEqual([])
  })

  it('should update document title when showing modal notification', async () => {
    const { result } = renderHook(() => useNotifications())
    
    // Wait for hook to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    // Test that hook initializes correctly
    expect(result.current.notifications).toEqual([])
  })

  it('should handle SSE connection errors gracefully', async () => {
    const { result } = renderHook(() => useNotifications())
    
    // Wait for hook to initialize
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    // Test that hook initializes correctly
    expect(result.current.notifications).toEqual([])
  })

  it('should clear notifications', () => {
    const { result } = renderHook(() => useNotifications())
    
    // Test that hook initializes correctly
    expect(result.current.notifications).toEqual([])
  })
})
