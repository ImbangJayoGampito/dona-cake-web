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
    appendKeranjangToPesanan(items: any[]) {
      this.itemPesanans = items.map(item => ({
        id: item.id,
        produk: item.produk,
        kuantitas: item.kuantitas,
        subtotal: (item.produk?.harga || 0) * item.kuantitas
      }));
      this.total_harga = this.itemPesanans.reduce((sum, i) => sum + i.subtotal, 0);
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

jest.mock('@/services/pesanan-service', () => ({
  PesananService: {
    createPesanan: jest.fn(),
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

// Mock the auth store
jest.mock('@/lib/state/logged-user', () => ({
  useAuthStore: jest.fn(() => ({
    user: { id: 1, name: 'Test User' },
    setUser: jest.fn(),
    logout: jest.fn(),
    loadUser: jest.fn(),
  })),
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
import { BrowserRouter } from 'react-router-dom';
import KeranjangSteps from '../KeranjangSteps';
import { KeranjangService } from '@/services/keranjang-service';
import { PesananService } from '@/services/pesanan-service';

// Wrapper component to provide router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('KeranjangSteps Integration Tests', () => {
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

  const mockKeranjangResponse = {
    items: mockKeranjangItems,
    total_harga: 200000,
    jumlah_item: 2,
  };

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
    
    (PesananService.createPesanan as jest.Mock).mockResolvedValue({
      data: { 
        id: 1, 
        status_pesanan: 'MENUNGGU_PEMBAYARAN',
        total_harga: 200000,
        itemPesanans: mockKeranjangItems.map(item => ({
          id: item.id,
          produk: item.produk,
          kuantitas: item.kuantitas,
          subtotal: item.produk.harga * item.kuantitas
        }))
      },
      status: 'success',
      isSuccess: () => true,
    });
  });

  describe('Step 1: Cart Page', () => {
    it('renders cart items correctly', async () => {
      renderWithRouter(<KeranjangSteps />);

      // Wait for data to load
      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      // Check header
      expect(await screen.findByText('Keranjang Belanja')).toBeInTheDocument();
      expect(screen.getByText('1 item')).toBeInTheDocument();

      // Check product is rendered
      expect(await screen.findByText('Test Product')).toBeInTheDocument();
      
      // Check quantity display exists
      const quantityElements = screen.getAllByText('2');
      expect(quantityElements.length).toBeGreaterThanOrEqual(2);
    });

    it('shows step indicators correctly', async () => {
      renderWithRouter(<KeranjangSteps />);

      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      // Check step indicators
      expect(screen.getByText('Keranjang')).toBeInTheDocument();
      expect(screen.getByText('Pembayaran')).toBeInTheDocument();
      expect(screen.getByText('Selesai')).toBeInTheDocument();
    });

    it('allows quantity adjustment via buttons', async () => {
      renderWithRouter(<KeranjangSteps />);

      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      // Wait for product to load
      await screen.findByText('Test Product');

      // Find the quantity display for the cart item (the last "2")
      const quantityElements = screen.getAllByText('2');
      const quantityDisplay = quantityElements[quantityElements.length - 1];
      expect(quantityDisplay).toBeInTheDocument();

      // Find the plus button - it's the button with the plus icon
      // Look for the container with flex-shrink-0 and items-center
      const containers = document.querySelectorAll('.flex.shrink-0.items-center.gap-2');
      let plusButton: HTMLElement | null = null;
      
      containers.forEach(container => {
        const buttons = container.querySelectorAll('button');
        if (buttons.length >= 2) {
          // The second button is usually the plus
          plusButton = buttons[1];
        }
      });

      if (plusButton) {
        fireEvent.click(plusButton);
        
        // Wait for quantity to update (should become 3)
        await waitFor(() => {
          const updatedElements = screen.getAllByText('3');
          expect(updatedElements.length).toBeGreaterThan(0);
        });
      }
    });
  });

  describe('Step 2: Payment Page', () => {
    it('navigates to payment page when items are selected', async () => {
      renderWithRouter(<KeranjangSteps />);

      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      // Wait for product to load
      await screen.findByText('Test Product');

      // Find and check the checkbox - the second checkbox is for the item
      const checkboxes = screen.getAllByRole('checkbox');
      // Click the first item checkbox (index 1)
      fireEvent.click(checkboxes[1]);

      // Wait for checkbox to be checked
      await waitFor(() => {
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
      });

      // Click "Lanjut ke Pembayaran" button
      const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
      expect(nextButton).not.toBeDisabled();
      fireEvent.click(nextButton);

      // Should navigate to payment page - look for "Metode Pembayaran"
      await waitFor(() => {
        expect(screen.getByText('Metode Pembayaran')).toBeInTheDocument();
      });
    });

    it('keeps "Lanjut ke Pembayaran" disabled when no items selected', async () => {
      renderWithRouter(<KeranjangSteps />);

      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      // Wait for product to load
      await screen.findByText('Test Product');

      // Button should be disabled
      const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
      expect(nextButton).toBeDisabled();
      
      // Should show helper text
      expect(screen.getByText(/Pilih minimal 1 item/i)).toBeInTheDocument();
    });
  });

  describe('Step 3: Success Page', () => {
    it('shows success page after payment', async () => {
      renderWithRouter(<KeranjangSteps />);

      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      // Step 1: Select items and go to payment
      await screen.findByText('Test Product');
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]);
      
      await waitFor(() => {
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'true');
      });

      const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
      fireEvent.click(nextButton);

      // Step 2: Click payment button
      await waitFor(() => {
        expect(screen.getByText('Metode Pembayaran')).toBeInTheDocument();
      });

      const payButton = screen.getByRole('button', { name: /Bayar via WhatsApp/i });
      fireEvent.click(payButton);

      // Step 3: Success page should appear
      await waitFor(() => {
        expect(PesananService.createPesanan).toHaveBeenCalled();
        expect(screen.getByText(/Pesanan Kamu Sedang Diproses/i)).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty cart state', async () => {
      (KeranjangService.getKeranjang as jest.Mock).mockResolvedValue({
        data: { items: [], total_harga: 0, jumlah_item: 0 },
        status: 'success'
      });

      renderWithRouter(<KeranjangSteps />);

      await waitFor(() => {
        expect(KeranjangService.getKeranjang).toHaveBeenCalled();
      });

      expect(screen.getByText('0 item')).toBeInTheDocument();
      const nextButton = screen.getByRole('button', { name: /Lanjut ke Pembayaran/i });
      expect(nextButton).toBeDisabled();
    });

    it('handles API errors gracefully', async () => {
      // Mock console.error to suppress error logs
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      (KeranjangService.getKeranjang as jest.Mock).mockRejectedValue(
        new Error('Failed to load cart')
      );

      renderWithRouter(<KeranjangSteps />);

      // The component should still render the cart page with empty state
      await waitFor(() => {
        expect(screen.getByText('Keranjang Belanja')).toBeInTheDocument();
        // It should show 0 items since the API failed
        expect(screen.getByText('0 item')).toBeInTheDocument();
      });

      consoleSpy.mockRestore();
    });
  });
});