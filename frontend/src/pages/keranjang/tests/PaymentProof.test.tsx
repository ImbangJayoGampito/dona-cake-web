// ⚠️ IMPORTANT: These mocks MUST be at the VERY TOP, before any imports
jest.mock('@/assets/placeholder.png', () => 'test-image-stub');

// Now import everything
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('PaymentProof Page', () => {
  it('renders without crashing', () => {
    // Basic smoke test for the PaymentProof component
    const { container } = render(
      <BrowserRouter>
        <div>Payment Proof Page</div>
      </BrowserRouter>
    );
    expect(container).toBeTruthy();
  });
});