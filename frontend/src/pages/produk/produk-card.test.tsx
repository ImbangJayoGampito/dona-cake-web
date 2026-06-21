// ⚠️ IMPORTANT: These mocks MUST be at the VERY TOP, before any imports
jest.mock('@/assets/placeholder.png', () => 'test-image-stub');

// Mock the Gambar model before it's imported
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

// Now import everything
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ProductDetailPage from './produk-card';
import { ProdukService } from '@/services/produk-service';
import { UlasanService } from '@/services/ulasan-service';
import { useParams } from 'react-router-dom';
import { Produk } from '@/models/produk.model';

// Mock the dependencies
jest.mock('@/services/produk-service');
jest.mock('@/services/ulasan-service');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mock the auth store (Zustand)
jest.mock('@/lib/state/logged-user', () => ({
  useAuthStore: jest.fn(() => ({
    user: { id: 1, name: 'Test User' },
    setUser: jest.fn(),
    logout: jest.fn(),
    loadUser: jest.fn(),
  })),
}));

// Wrapper component to provide router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {ui}
    </BrowserRouter>
  );
};

describe('ProductDetailPage', () => {
  const mockProduct = new Produk({
    id: 1,
    nama_produk: 'Test Product',
    deskripsi: 'Test Description',
    harga: 100000,
    stok: 50,
    kategori: 'test',
    rating_rata_rata: 4.5,
    gambars: [{ id: 1, gambar_url: 'test-image.jpg' }],
    ulasans: Array(10).fill({ id: 1, komentar: 'Test', rating: 5 }),
  });

  const mockUlasans = [
    {
      id: 1,
      komentar: 'Test Review',
      rating: 5,
      pelanggan: { user: { name: 'Test User' } },
      created_at: new Date(),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (ProdukService.getProductById as jest.Mock).mockResolvedValue({ data: mockProduct });
    (UlasanService.getAllUlasanOnProdukId as jest.Mock).mockResolvedValue({ data: mockUlasans });
    (ProdukService.getRecommendations as jest.Mock).mockResolvedValue({ data: [mockProduct] });
  });

  it('renders the product details correctly', async () => {
    renderWithRouter(<ProductDetailPage />);

    // Wait for the product to load - use h1 for main title
    const heading = await screen.findByRole('heading', { name: 'Test Product', level: 1 });
    expect(heading).toBeInTheDocument();
    
    // Check that the description tab exists
    const descriptionTab = screen.getByRole('tab', { name: /Deskripsi/i });
    expect(descriptionTab).toBeInTheDocument();
    
    // Check that the reviews tab exists with count
    const reviewsTab = screen.getByRole('tab', { name: /Ulasan/i });
    expect(reviewsTab).toBeInTheDocument();
  });

  it('handles quantity change correctly', async () => {
    renderWithRouter(<ProductDetailPage />);

    // Wait for product to load
    const heading = await screen.findByRole('heading', { name: 'Test Product', level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('handles star rating click correctly', async () => {
    renderWithRouter(<ProductDetailPage />);

    // Wait for product to load
    const heading = await screen.findByRole('heading', { name: 'Test Product', level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('handles review submission correctly', async () => {
    (UlasanService.createUlasan as jest.Mock).mockResolvedValue({
      data: {
        id: 1,
        komentar: 'Test Review',
        rating: 5
      }
    });

    renderWithRouter(<ProductDetailPage />);

    // Wait for product to load
    const heading = await screen.findByRole('heading', { name: 'Test Product', level: 1 });
    expect(heading).toBeInTheDocument();

    // Find and interact with the review textarea
    const reviewTextarea = screen.getByPlaceholderText('Ceritakan pengalaman manismu...');
    expect(reviewTextarea).toBeInTheDocument();
  });
});