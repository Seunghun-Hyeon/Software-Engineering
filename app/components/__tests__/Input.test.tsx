import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../Input';
import { Search } from 'lucide-react';

describe('Input component', () => {
  it('renders correctly with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input id="test-input" label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const { container } = render(
      <Input icon={<Search data-testid="search-icon" />} />
    );
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('toggles password visibility', () => {
    const { container } = render(
      <Input type="password" placeholder="Password" />
    );
    const input = screen.getByPlaceholderText('Password');

    // Initial type should be password
    expect(input).toHaveAttribute('type', 'password');

    // Find the toggle button
    const toggleButton = container.querySelector('button');
    expect(toggleButton).toBeInTheDocument();

    // Click to show password
    fireEvent.click(toggleButton!);
    expect(input).toHaveAttribute('type', 'text');

    // Click to hide password
    fireEvent.click(toggleButton!);
    expect(input).toHaveAttribute('type', 'password');
  });
});
