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
    user: { id: 1, name: 'Test User', role: 'ADMIN' },
    setUser: jest.fn(),
    logout: jest.fn(),
    loadUser: jest.fn(),
  })),
}));

// Mock services
jest.mock('@/services/transaksi-service', () => ({
  TransaksiService: {
    getDashboardStats: jest.fn().mockResolvedValue({
      data: {
        totalRevenue: 1000000,
        totalOrders: 50,
        pendingOrders: 5,
        completedOrders: 45,
      }
    }),
  }
}));

// Now import everything
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import DashboardOverview from '../DashboardOverview';

describe('DashboardOverview', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  it('renders the admin dashboard without crashing', () => {
    const { container } = renderWithRouter(<DashboardOverview />);
    expect(container).toBeTruthy();
  });

  it('renders dashboard structure', () => {
    const { container } = renderWithRouter(<DashboardOverview />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});