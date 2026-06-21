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

jest.mock('@/models/pesanan.model', () => ({
  Pesanan: class {
    id: number;
    itemPesanans: any[];
    total_harga: number;
    status_pesanan: string;
    tgl_pesanan: string;
    constructor(data?: any) {
      this.id = data?.id || 1;
      this.itemPesanans = data?.itemPesanans || [];
      this.total_harga = data?.total_harga || 200000;
      this.status_pesanan = data?.status_pesanan || 'MENUNGGU_PEMBAYARAN';
      this.tgl_pesanan = data?.tgl_pesanan || new Date().toISOString();
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

// Mock services
jest.mock('@/services/pesanan-service', () => ({
  PesananService: {
    getPesananById: jest.fn().mockResolvedValue({
      data: {
        id: 1,
        itemPesanans: [
          {
            id: 1,
            produk: {
              id: 1,
              nama_produk: 'Test Product',
              harga: 100000,
              gambars: [{ id: 1, gambar_url: 'test-image.jpg' }]
            },
            kuantitas: 2,
            subtotal: 200000
          }
        ],
        total_harga: 200000,
        status_pesanan: 'MENUNGGU_PEMBAYARAN',
        tgl_pesanan: new Date().toISOString(),
      }
    }),
    updatePesananStatus: jest.fn().mockResolvedValue({
      isSuccess: () => true,
      data: { id: 1, status_pesanan: 'DIBAYAR' }
    }),
  }
}));

// Now import everything
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PayOrderPage from '../PayOrderPage';

describe('PayOrderPage', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  it('renders the payment page without crashing', () => {
    const { container } = renderWithRouter(<PayOrderPage />);
    expect(container).toBeTruthy();
  });

  it('renders payment page structure', () => {
    const { container } = renderWithRouter(<PayOrderPage />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });
});