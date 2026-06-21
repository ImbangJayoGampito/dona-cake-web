// ⚠️ IMPORTANT: These mocks MUST be at the VERY TOP, before any imports
jest.mock('@/assets/placeholder.png', () => 'test-image-stub');

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
    user: null,
    setUser: jest.fn(),
    logout: jest.fn(),
    loadUser: jest.fn(),
  })),
}));

// Mock auth service
jest.mock('@/services/auth-service', () => ({
  login: jest.fn().mockResolvedValue({
    isSuccess: () => true,
    data: {
      user: { id: 1, name: 'Test User', email: 'test@example.com' },
      token: 'test-token'
    }
  }),
}));

// Now import everything
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../login';

describe('LoginPage', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    );
  };

  it('renders the login page without crashing', () => {
    const { container } = renderWithRouter(<LoginPage />);
    expect(container).toBeTruthy();
  });

  it('renders login form elements', () => {
    const { container } = renderWithRouter(<LoginPage />);
    expect(container.querySelector('form')).toBeInTheDocument();
  });
});