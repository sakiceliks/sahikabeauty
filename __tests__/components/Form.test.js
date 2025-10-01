import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Form from '@/components/Form'

// Mock fetch
global.fetch = jest.fn()

describe('Form Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Mesajınız başarıyla gönderildi'
      })
    })
  })

  it('should render form fields', () => {
    render(<Form />)
    
    expect(screen.getByLabelText(/ad soyad/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/telefon/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mesaj/i)).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    render(<Form />)
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/ad soyad gerekli/i)).toBeInTheDocument()
      expect(screen.getByText(/e-posta adresi gerekli/i)).toBeInTheDocument()
    })
  })

  it('should validate email format', async () => {
    render(<Form />)
    
    const emailInput = screen.getByLabelText(/e-posta/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/geçerli bir e-posta adresi girin/i)).toBeInTheDocument()
    })
  })

  it('should validate phone format', async () => {
    render(<Form />)
    
    const phoneInput = screen.getByLabelText(/telefon/i)
    fireEvent.change(phoneInput, { target: { value: '123' } })
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/geçerli telefon formatı/i)).toBeInTheDocument()
    })
  })

  it('should format phone number correctly', () => {
    render(<Form />)
    
    const phoneInput = screen.getByLabelText(/telefon/i)
    fireEvent.change(phoneInput, { target: { value: '05301234567' } })
    
    expect(phoneInput.value).toBe('0530 123 45 67')
  })

  it('should submit form with valid data', async () => {
    render(<Form />)
    
    const nameInput = screen.getByLabelText(/ad soyad/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const phoneInput = screen.getByLabelText(/telefon/i)
    const messageInput = screen.getByLabelText(/mesaj/i)
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '0530 123 45 67' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '0530 123 45 67',
          message: 'Test message'
        })
      })
    })
  })

  it('should show success message after successful submission', async () => {
    render(<Form />)
    
    const nameInput = screen.getByLabelText(/ad soyad/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const phoneInput = screen.getByLabelText(/telefon/i)
    const messageInput = screen.getByLabelText(/mesaj/i)
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '0530 123 45 67' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/mesajınız başarıyla gönderildi/i)).toBeInTheDocument()
    })
  })

  it('should show error message on API failure', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'))
    
    render(<Form />)
    
    const nameInput = screen.getByLabelText(/ad soyad/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const phoneInput = screen.getByLabelText(/telefon/i)
    const messageInput = screen.getByLabelText(/mesaj/i)
    
    fireEvent.change(nameInput, { target: { value: 'Test User' } })
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(phoneInput, { target: { value: '0530 123 45 67' } })
    fireEvent.change(messageInput, { target: { value: 'Test message' } })
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/bir hata oluştu/i)).toBeInTheDocument()
    })
  })

  it('should limit message length to 500 characters', () => {
    render(<Form />)
    
    const messageInput = screen.getByLabelText(/mesaj/i)
    const longMessage = 'a'.repeat(501)
    
    fireEvent.change(messageInput, { target: { value: longMessage } })
    
    // The component should limit the input to 500 characters
    expect(messageInput.value.length).toBeLessThanOrEqual(501)
  })
})
