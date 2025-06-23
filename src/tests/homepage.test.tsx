import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'

describe('HomePage', () => {
  it('renders CEP Formación content', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    // Buscar contenido específico de CEP
    const cepContent = screen.getByText(/PROFESORES CUALIFICADOS/i)
    expect(cepContent).toBeInTheDocument()
  })

  it('renders cursos section', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    const cursosSection = screen.getByText(/CURSOS INICIO SEPTIEMBRE 2025/i)
    expect(cursosSection).toBeInTheDocument()
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

  it('renders contact information', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    const telefono = screen.getByText(/922 219 257/i)
    expect(telefono).toBeInTheDocument()
  })
}) 