import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Banner from './banner'

const mockGames = {
  results: [],
  count: 0,
}

describe('Banner', () => {
  it('renders the banner component', () => {
    render(<Banner games={mockGames} />)
    const banner = screen.getByText(/Banner Component/i)
    expect(banner).toBeInTheDocument()
  })

  it('renders the correct title', () => {
    render(<Banner games={mockGames} />)
    const title = screen.getByText(/Welcome to the Banner/i)
    expect(title).toBeInTheDocument()
  })

  it('renders the correct description', () => {
    render(<Banner games={mockGames} />)
    const description = screen.getByText(/This is a simple banner component./i)
    expect(description).toBeInTheDocument()
  })
})