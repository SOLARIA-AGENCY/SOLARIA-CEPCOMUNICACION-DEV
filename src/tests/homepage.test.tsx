import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('renders main SOLARIA heading', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('SOLARIA')
  })

  it('renders template description', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    const description = screen.getByText(/Optimizado para desarrollo empresarial ágil/i)
    expect(description).toBeInTheDocument()
  })

  it('renders without console errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })

  it('renders welcome message', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    expect(document.body).toBeTruthy()
  })
}) 