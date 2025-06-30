import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import TodosLosCursosPage from '../pages/TodosLosCursosPage'

describe('TodosLosCursosPage', () => {
  it('renders the main title', () => {
    render(
      <BrowserRouter>
        <TodosLosCursosPage />
      </BrowserRouter>
    )
    const mainTitle = screen.getByRole('heading', { name: /Todos Nuestros Cursos/i, level: 1 })
    expect(mainTitle).toBeInTheDocument()
  })

  it('renders both campus sections', () => {
    render(
      <BrowserRouter>
        <TodosLosCursosPage />
      </BrowserRouter>
    )
    const norteSection = screen.getByRole('heading', { name: /SEDE CEP NORTE/i, level: 2 })
    const santaCruzSection = screen.getByRole('heading', { name: /SEDE CEP SANTA CRUZ/i, level: 2 })
    
    expect(norteSection).toBeInTheDocument()
    expect(santaCruzSection).toBeInTheDocument()
  })

  it('renders search input field', () => {
    render(
      <BrowserRouter>
        <TodosLosCursosPage />
      </BrowserRouter>
    )
    const searchInput = screen.getByPlaceholderText(/Buscar un curso por nombre.../i)
    expect(searchInput).toBeInTheDocument()
  })

  it('matches snapshot', () => {
    const { asFragment } = render(
      <BrowserRouter>
        <TodosLosCursosPage />
      </BrowserRouter>
    )
    expect(asFragment()).toMatchSnapshot()
  })
}) 