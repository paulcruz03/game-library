/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Banner from './banner'
import { Game } from '@/lib/schema';

jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }: any) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: any) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: any) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: (props: any) => <button data-testid="carousel-next" {...props}>Next</button>,
  CarouselPrevious: (props: any) => <button data-testid="carousel-prev" {...props}>Prev</button>,
}));

describe('Banner', () => {
  it('renders the correct title', () => {
    render(<Banner games={{ count: 0, results: [] }} />)
    const banner = screen.getByRole('heading', { level: 2, name: 'Highly Rated Games of All Time' })
    expect(banner).toBeInTheDocument()
  })

  it("does render CarouselContent when there are games available", () => {
    render(<Banner games={{ count: 0, results: [
      { id: 1, name: "Game One", rating: 4.9 },
      { id: 2, name: "Game Two", rating: 4.8 },
    ] as Game[] }} />);
    expect(screen.getByTestId("carousel-content")).toBeInTheDocument();
    expect(screen.getAllByTestId("carousel-item")).toHaveLength(2);
  });

  it("does not render CarouselContent when there are no games", () => {
    render(<Banner games={{ count: 0, results: [] }} />);
    expect(screen.queryByTestId("carousel-content")).not.toBeInTheDocument();
  });
})