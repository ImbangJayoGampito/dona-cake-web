import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CartPage from '../Step1PurchaseCartPage';
import { KeranjangService } from '@/services/keranjang-service';

// Mock the services
jest.mock('@/services/keranjang-service', () => ({
  KeranjangService: {
    getKeranjang: jest.fn(),
    updateKeranjang: jest.fn(),
  }
}));

jest.mock('@/services/produk-service', () => ({
  ProdukService: {
    formatPrice: jest.fn((price) => `Rp ${price.toLocaleString()}`),
  }
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

jest.mock('@/models/keranjang.model', () => ({
  Keranjang: class {
    id: number;
    produk_id: number;
    kuantitas: number;
    produk: any;
    constructor(data?: any) {
      this.id = data?.id || 0;
      this.produk_id = data?.produk_id || 0;
      this.kuantitas = data?.kuantitas || 0;
      this.produk = data?.produk || null;
    }
  }
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('CartPage (lihat_keranjang)', () => {
  const mockOnNext = jest.fn();
  const mockProduct = {
    id: 1,
    nama_produk: 'Test Product',
    harga: 100000,
    stok: 10,
    gambars: [{ gambar_url: 'test-image.jpg' }],
    isInStock: jest.fn().mockReturnValue(true),
  };

  const mockKeranjangItems = [
    {
      id: 1,
      produk_id: 1,
      kuantitas: 2,
      produk: mockProduct,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (KeranjangService.getKeranjang as jest.Mock).mockResolvedValue({
      data: { items: mockKeranjangItems, total_harga: 200000, jumlah_item: 2 },
      status: 'success',
    });
  });

  it('renders cart page with items', async () => {
    renderWithRouter(<CartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    expect(screen.getByText('Keranjang Belanja')).toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
  });

  it('disables next button when no items selected', async () => {
    renderWithRouter(<CartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
    expect(nextButton).toBeDisabled();
  });

  it('enables next button when items are selected', async () => {
    renderWithRouter(<CartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    await screen.findByText('Test Product');

    // Click the checkbox
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    await waitFor(() => {
      expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
    });

    const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
    expect(nextButton).not.toBeDisabled();
  });
});