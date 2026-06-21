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

jest.mock('@/models/produk.model', () => ({
  Produk: class {
    id: number;
    nama_produk: string;
    harga: number;
    stok: number;
    constructor(data?: any) {
      this.id = data?.id || 0;
      this.nama_produk = data?.nama_produk || 'Test Product';
      this.harga = data?.harga || 100000;
      this.stok = data?.stok || 10;
    }
    isInStock() {
      return this.stok > 0;
    }
  }
}));

// Mock the services
jest.mock('@/services/keranjang-service', () => ({
  KeranjangService: {
    getKeranjang: jest.fn(),
    updateKeranjang: jest.fn().mockResolvedValue({ status: 'success' }),
  }
}));

jest.mock('@/services/produk-service', () => ({
  ProdukService: {
    formatPrice: jest.fn((price) => `Rp ${price.toLocaleString()}`),
  }
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => {
    return <a href={to}>{children}</a>;
  },
}));

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Now import everything
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Step1PurchaseCartPage from '../Step1PurchaseCartPage';
import { KeranjangService } from '@/services/keranjang-service';
import { ProdukService } from '@/services/produk-service';

describe('Step1PurchaseCartPage Component Tests', () => {
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
    {
      id: 2,
      produk_id: 2,
      kuantitas: 1,
      produk: {
        id: 2,
        nama_produk: 'Second Product',
        harga: 50000,
        stok: 5,
        isInStock: jest.fn().mockReturnValue(true),
      },
    },
  ];

  const mockKeranjangResponse = {
    items: mockKeranjangItems,
    total_harga: 250000,
    jumlah_item: 3,
  };

  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (KeranjangService.getKeranjang as jest.Mock).mockResolvedValue({
      data: mockKeranjangResponse,
      status: 'success',
      message: 'Success'
    });

    (KeranjangService.updateKeranjang as jest.Mock).mockResolvedValue({
      status: 'success',
      data: mockKeranjangItems[0]
    });
  });

  it('renders loading state initially', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    // Should show loading skeletons
    expect(screen.getByText('Keranjang Belanja')).toBeInTheDocument();
    expect(screen.getByText('0 item')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton').length).toBeGreaterThan(0);
  });

  it('renders cart items after data loads', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Check header
    expect(await screen.findByText('Keranjang Belanja')).toBeInTheDocument();
    expect(screen.getByText('3 item')).toBeInTheDocument();

    // Check products are rendered
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Second Product')).toBeInTheDocument();

    // Check prices are formatted
    expect(screen.getByText('Rp 100,000')).toBeInTheDocument();
    expect(screen.getByText('Rp 50,000')).toBeInTheDocument();
  });

  it('shows empty cart message when no items', async () => {
    (KeranjangService.getKeranjang as jest.Mock).mockResolvedValue({
      data: { items: [], total_harga: 0, jumlah_item: 0 },
      status: 'success'
    });

    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    expect(screen.getByText('Keranjang Anda kosong')).toBeInTheDocument();
  });

  it('allows selecting and deselecting items', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Find checkboxes
    const checkboxes = screen.getAllByRole('checkbox');

    // First checkbox is "Select All", second is first item, third is second item
    expect(checkboxes.length).toBe(3);

    // Click first item checkbox
    fireEvent.click(checkboxes[1]);

    // Should update selection count
    await waitFor(() => {
      expect(screen.getByText('Pilih Semua (1)')).toBeInTheDocument();
    });

    // Click second item checkbox
    fireEvent.click(checkboxes[2]);

    // Should update selection count to 2
    await waitFor(() => {
      expect(screen.getByText('Pilih Semua (2)')).toBeInTheDocument();
    });
  });

  it('allows quantity adjustment', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Find quantity controls for first item
    const minusButtons = screen.getAllByText('-');
    const plusButtons = screen.getAllByText('+');

    // Click plus button for first item
    fireEvent.click(plusButtons[0]);

    // Should update quantity to 3
    await waitFor(() => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    // Click minus button for first item
    fireEvent.click(minusButtons[0]);

    // Should update quantity back to 2
    await waitFor(() => {
      const quantityElements = screen.getAllByText('2');
      expect(quantityElements.length).toBeGreaterThan(0);
    });
  });

  it('disables minus button when quantity is 1', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Find minus buttons
    const minusButtons = screen.getAllByText('-');

    // Second item has quantity 1, so its minus button should be disabled
    expect(minusButtons[1]).toBeDisabled();
  });

  it('shows stock warnings for low stock items', async () => {
    const lowStockProduct = {
      id: 3,
      nama_produk: 'Low Stock Product',
      harga: 75000,
      stok: 2,
      isInStock: jest.fn().mockReturnValue(true),
    };

    const lowStockItems = [
      {
        id: 3,
        produk_id: 3,
        kuantitas: 1,
        produk: lowStockProduct,
      },
    ];

    (KeranjangService.getKeranjang as jest.Mock).mockResolvedValue({
      data: { items: lowStockItems, total_harga: 75000, jumlah_item: 1 },
      status: 'success'
    });

    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Should show low stock warning
    expect(await screen.findByText(/Stok tersisa hanya 2/i)).toBeInTheDocument();
  });

  it('shows out of stock warning for unavailable items', async () => {
    const outOfStockProduct = {
      id: 4,
      nama_produk: 'Out of Stock Product',
      harga: 80000,
      stok: 0,
      isInStock: jest.fn().mockReturnValue(false),
    };

    const outOfStockItems = [
      {
        id: 4,
        produk_id: 4,
        kuantitas: 1,
        produk: outOfStockProduct,
      },
    ];

    (KeranjangService.getKeranjang as jest.Mock).mockResolvedValue({
      data: { items: outOfStockItems, total_harga: 80000, jumlah_item: 1 },
      status: 'success'
    });

    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Should show out of stock warning
    expect(await screen.findByText(/Stok Habis/i)).toBeInTheDocument();
  });

  it('calculates subtotal correctly', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Check subtotal calculation: 2 * 100000 + 1 * 50000 = 250000
    expect(screen.getByText('Rp 250,000')).toBeInTheDocument();
  });

  it('disables continue button when no items selected', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Button should be disabled initially
    const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
    expect(nextButton).toBeDisabled();
    expect(screen.getByText(/Pilih minimal 1 item/i)).toBeInTheDocument();
  });

  it('enables continue button when items are selected', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Select first item
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    // Button should be enabled
    await waitFor(() => {
      const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
      expect(nextButton).not.toBeDisabled();
    });
  });

  it('calls onNext with selected items when continue button clicked', async () => {
    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    await waitFor(() => {
      expect(KeranjangService.getKeranjang).toHaveBeenCalled();
    });

    // Wait for products to load
    await screen.findByText('Test Product');

    // Select first item
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    // Click continue button
    const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
    fireEvent.click(nextButton);

    // Should call onNext with selected items
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
      const calledWith = mockOnNext.mock.calls[0][0];
      expect(calledWith.length).toBe(1);
      expect(calledWith[0].id).toBe(1);
    });
  });

  it('handles API errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    (KeranjangService.getKeranjang as jest.Mock).mockRejectedValue(
      new Error('Failed to load cart')
    );

    render(<Step1PurchaseCartPage onNext={mockOnNext} />);

    // The component should still render with empty state
    await waitFor(() => {
      expect(screen.getByText('Keranjang Belanja')).toBeInTheDocument();
      expect(screen.getByText('0 item')).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});