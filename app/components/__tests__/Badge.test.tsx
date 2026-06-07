import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge component', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies default variant classes', () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('bg-gray-100');
    expect(badge).toHaveClass('text-gray-700');
  });

  it('applies active variant classes', () => {
    render(<Badge variant="active">Active</Badge>);
    const badge = screen.getByText('Active');
    expect(badge).toHaveClass('bg-secondary/10');
    expect(badge).toHaveClass('text-secondary');
  });

  it('applies primary variant classes', () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText('Primary');
    expect(badge).toHaveClass('bg-[#4F46E5]');
    expect(badge).toHaveClass('text-white');
  });
});
