// ⚠️ IMPORTANT: These mocks MUST be at the VERY TOP, before any imports
jest.mock('@/assets/placeholder.png', () => 'test-image-stub');

// Mock the models
jest.mock('@/models/gambar.model', () => ({
  Gambar: class {
    id: number;
    gambar_url: string;
    constructor(data?: { id?: number; gambar_url?: string }) {
      this.id = data?.id || 0;
      this.gambar_url = data?.gambar_url || 'https://via.placeholder.com/150';
    }
  }
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  useLocation: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => {
    return <a href={to}>{children}</a>;
  },
}));

// Mock the auth store
jest.mock('@/lib/state/logged-user', () => ({
  useAuthStore: jest.fn(() => ({
    user: { id: 1, name: 'Test User' },
    setUser: jest.fn(),
    logout: jest.fn(),
    loadUser: jest.fn(),
  })),
}));

// Mock the booking service
jest.mock('@/services/booking-service', () => ({
  createBooking: jest.fn().mockResolvedValue({
    isSuccess: () => true,
    data: {
      id: 1,
      pelanggan_id: 1,
      status: 'PENDING',
      created_at: new Date().toISOString(),
    }
  }),
}));

// Mock the booking model
jest.mock('@/models/booking.model', () => ({
  Booking: class {
    id: number;
    pelanggan_id: number;
    status: string;
    created_at: string;
    constructor(data?: any) {
      this.id = data?.id || 1;
      this.pelanggan_id = data?.pelanggan_id || 1;
      this.status = data?.status || 'PENDING';
      this.created_at = data?.created_at || new Date().toISOString();
    }
  }
}));

// Now import everything
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import BookingLayout from '../layout';

describe('BookingLayout', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  it('renders the booking layout without crashing', () => {
    const { container } = renderWithRouter(<BookingLayout />);
    expect(container).toBeTruthy();
  });

  it('renders the booking layout structure', () => {
    const { container } = renderWithRouter(<BookingLayout />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});
