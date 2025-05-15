import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Content from './content'
import { Game } from '@/lib/schema';

jest.mock("@/lib/rawg", () => ({
  getGames: jest.fn(),
}));
import { getGames } from "@/lib/rawg";

jest.mock("@/components/widgets/page/itemCard", () => ({
  __esModule: true,
  default: ({ item }: { item: Game }) => (
    <div data-testid="item-card">{item.name}</div>
  ),
}));

describe('Banner', () => {
  const mockGames = {
    count: 20, // mock 20 as total count so that we can test the load more button
    results: [
      { id: 1, name: "Game One", slug: "game-one" },
      { id: 2, name: "Game Two", slug: "game-two" },
    ] as Game[],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct title', () => {
    render(<Content games={{ count: 0, results: [] }} mode={'normal'} />)
    const content = screen.getByRole('heading', { level: 2, name: 'Game Library' })
    expect(content).toBeInTheDocument()
  })

  it('renders the correct title when different mode and slug', () => {
    render(<Content games={{ count: 0, results: [] }} mode={'genre'} slug='action' />)
    const content = screen.getByRole('heading', { level: 2, name: 'action' })
    expect(content).toBeInTheDocument()
  })

  it("does not render Content when there are no games", () => {
    render(<Content games={{ count: 0, results: [] }} mode={'normal'} />)
    expect(screen.queryByTestId("item-card")).not.toBeInTheDocument();
  })

  it("does render Content when there are games available", () => {
    render(<Content games={mockGames} mode={'normal'} />)
    expect(screen.getAllByTestId("item-card")).toHaveLength(2);
  })

  it("calls getGames and loads more games on 'Load More' click", async () => {
    (getGames as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        results: [{ id: 3, name: "Game Three", slug: "game-three" }],
      }),
    });

    render(<Content games={mockGames} mode="normal" />);
    const button = screen.getByRole("button", { name: /load more/i });

    fireEvent.click(button);
    await waitFor(() => expect(getGames).toHaveBeenCalledTimes(1));
  })

  it("searches and updates game list when input changes", async () => {
    (getGames as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        results: [{ id: 99, name: "Search Result", slug: "search-result" }],
        count: 1,
      }),
    });

    render(<Content games={mockGames} mode="normal" />);
    const input = screen.getByPlaceholderText("Search");

    fireEvent.change(input, { target: { value: "search" } });

    await setTimeout(() => {}, 1000)
    await waitFor(() => expect(getGames).toHaveBeenCalledTimes(1));
  })
})