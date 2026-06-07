import React from 'react';
import { render, screen } from '@testing-library/react';
import { BentoCard } from '../BentoCard';

describe('BentoCard component', () => {
  it('renders children correctly', () => {
    render(
      <BentoCard>
        <p>Bento Content</p>
      </BentoCard>
    );
    expect(screen.getByText('Bento Content')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    const { container } = render(<BentoCard>Content</BentoCard>);
    const card = container.firstChild as HTMLElement;

    expect(card).toHaveClass('rounded-[24px]');
    expect(card).toHaveClass('bg-white/70');
    expect(card).toHaveClass('backdrop-blur-md');
  });

  it('applies custom className', () => {
    const { container } = render(
      <BentoCard className="custom-class">Content</BentoCard>
    );
    const card = container.firstChild as HTMLElement;

    expect(card).toHaveClass('custom-class');
  });
});
