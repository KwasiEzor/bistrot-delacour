import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TestimonialsCarousel from '../TestimonialsCarousel'
import { getTestimonials } from '../../api/services'

// Mock the API service
vi.mock('../../api/services', () => ({
  getTestimonials: vi.fn(),
}))

const mockTestimonials = [
  {
    id: '1',
    author: 'John Doe',
    quote: 'Excellent food!',
    rating: 5,
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    author: 'Jane Smith',
    quote: 'Great atmosphere.',
    rating: 4,
    createdAt: '2023-01-02',
  },
]

describe('TestimonialsCarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render loading state initially', () => {
    vi.mocked(getTestimonials).mockReturnValue(new Promise(() => {}))
    render(<TestimonialsCarousel />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should render testimonials after fetching', async () => {
    vi.mocked(getTestimonials).mockResolvedValue({ data: mockTestimonials })
    render(<TestimonialsCarousel />)

    await waitFor(() => {
      expect(screen.getByText('"Excellent food!"')).toBeInTheDocument()
    })
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
