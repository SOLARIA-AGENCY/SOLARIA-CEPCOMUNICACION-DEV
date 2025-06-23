import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

/**
 * APP INTEGRATION TESTS
 * Valida que la aplicación se renderice correctamente con la nueva barra de navegación y rutas.
 */

describe('App Integration Tests', () => {
  it('renders main heading and basic navigation', () => {
    render(<App />)

    // Verificar el heading principal actualizado
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('SOLARIA')

    // Verificar que existen links de dashboard y solaria.agency
    const allLinks = screen.getAllByRole('link')
    const dashboardLinks = allLinks.filter(link => 
      link.getAttribute('href') === '/dashboard'
    )
    const agencyLinks = allLinks.filter(link => 
      link.getAttribute('href') === 'https://solaria.agency'
    )

    expect(dashboardLinks.length).toBeGreaterThan(0)
    expect(agencyLinks.length).toBeGreaterThan(0)
  })

  it('loads without console errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<App />)
    
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  })
}) 