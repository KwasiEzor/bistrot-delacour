import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import TestimonialsCarousel from '../TestimonialsCarousel'
import { getTestimonials } from '../../api/services'

// Mock the API service
vi.mock('../../api/services', () => ({
  getTestimonials: vi.fn(),
}))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

const mockTestimonials = [
  {
    id: 1,
    documentId: '1',
    author: 'John Doe',
    quote: 'Excellent food!',
    rating: 5,
    isFeatured: true,
    order: 1,
    date: '2023-01-01',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    publishedAt: '2023-01-01',
  },
  {
    id: 2,
    documentId: '2',
    author: 'Jane Smith',
    quote: 'Great atmosphere.',
    rating: 4,
    isFeatured: true,
    order: 2,
    date: '2023-01-02',
    createdAt: '2023-01-02',
    updatedAt: '2023-01-02',
    publishedAt: '2023-01-02',
  },
]

const mockResponse = {
  data: mockTestimonials,
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 2,
    },
  },
}

describe('TestimonialsCarousel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('should render loading state initially', () => {
    vi.mocked(getTestimonials).mockReturnValue(new Promise(() => {}))
    render(<TestimonialsCarousel />, { wrapper: TestWrapper })
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should render testimonials after fetching', async () => {
    vi.mocked(getTestimonials).mockResolvedValue(mockResponse)
    render(<TestimonialsCarousel />, { wrapper: TestWrapper })

    await waitFor(() => {
      expect(screen.getByText('"Excellent food!"')).toBeInTheDocument()
    })
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
