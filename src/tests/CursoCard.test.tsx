import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CursoCard from '../components/molecules/CursoCard'
import type { CursoMaestro } from '../config/cursos-maestro'

const mockCurso: CursoMaestro = {
  id: 'test-1',
  nombre: 'Curso de Prueba',
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

describe('CursoCard', () => {
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
    expect(dateTag).toHaveClass('bg-green-500')
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