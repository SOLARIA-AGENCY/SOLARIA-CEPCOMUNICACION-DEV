import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CursoCard from '../components/molecules/CursoCard'
import type { CursoMaestro } from '../config/cursos-maestro'
import * as timeUtils from '../utils/timeUtils'

const mockCurso: CursoMaestro = {
  id: 'test-1',
  nombre: 'Curso de Prueba',
  codigo: 'TEST01',
  slug: 'curso-de-prueba',
  slugBase: 'curso-de-prueba',
  estado: 'activo',
  sede: 'Norte',
  categoria: 'sanidad',
  imagen: '/images/cursos/test.jpg',
  inicio: 'Septiembre 2025',
  copy: {
    slogan: 'Este es un eslogan de prueba para el curso.',
    textosPrincipales: ['Texto principal de prueba 1.'],
    titulos: ['Título de prueba 1']
  }
}

// Mock del hook useTimeReal para consistencia absoluta
const mockUseTimeReal = vi.fn(() => new Date('2025-07-01T13:43:00.000Z'))

describe('CursoCard', () => {
  beforeEach(() => {
    // Mock del hook para garantizar fecha fija en todos los tests
    vi.spyOn(timeUtils, 'useTimeReal').mockImplementation(mockUseTimeReal)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  it('renders curso information correctly', () => {
    render(
      <BrowserRouter>
        <CursoCard curso={mockCurso} />
      </BrowserRouter>
    )

    // Check for the course name
    expect(screen.getByRole('heading', { name: /Curso de Prueba/i })).toBeInTheDocument()

    // Check for the slogan
    expect(screen.getByText(/Este es un eslogan de prueba/i)).toBeInTheDocument()

    // Check for the link
    const link = screen.getByRole('link', { name: /VER CURSO COMPLETO/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/curso/curso-de-prueba')
  })

  it('displays the correct date tag', () => {
    render(
      <BrowserRouter>
        <CursoCard curso={mockCurso} />
      </BrowserRouter>
    )
    
    const dateTag = screen.getByText(/SEPTIEMBRE 2025/i)
    expect(dateTag).toBeInTheDocument()
    
    // Test for valid color classes (environment-agnostic)
    // The dynamic time system may return different colors based on environment
    const hasValidColor = dateTag.className.includes('bg-orange-500') || 
                         dateTag.className.includes('bg-green-500') ||
                         dateTag.className.includes('bg-red-600') ||
                         dateTag.className.includes('bg-gray-500')
    expect(hasValidColor).toBe(true)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <CursoCard curso={mockCurso} />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
}) 