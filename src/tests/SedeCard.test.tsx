import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SedeCard from '../components/molecules/SedeCard';

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderSedeCard = (props = {}) => {
  const defaultProps = {
    nombre: 'Norte',
    slug: 'cep-norte',
    imagen: '/images/sedes/cep-norte.jpg',
    descripcion: 'Campus situado en la zona norte de Tenerife',
    ...props
  };

  return render(
    <BrowserRouter>
      <SedeCard {...defaultProps} />
    </BrowserRouter>
  );
};

describe('SedeCard', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders sede information correctly', () => {
    renderSedeCard();
    
    expect(screen.getByText('CEP NORTE')).toBeInTheDocument();
    expect(screen.getByText('Campus Norte')).toBeInTheDocument();
    expect(screen.getByText('Campus situado en la zona norte de Tenerife')).toBeInTheDocument();
    expect(screen.getByText('Ver Cursos')).toBeInTheDocument();
  });

  it('navigates to correct sede URL when clicked', () => {
    renderSedeCard();
    
    const sedeCard = screen.getByText('CEP NORTE').closest('div');
    fireEvent.click(sedeCard!);
    
    expect(mockNavigate).toHaveBeenCalledWith('/sede/cep-norte');
  });

  it('navigates to Santa Cruz sede correctly', () => {
    renderSedeCard({
      nombre: 'Santa Cruz',
      slug: 'cep-santa-cruz',
      imagen: '/images/sedes/cep-santa-cruz.jpg',
      descripcion: 'Campus principal en Santa Cruz de Tenerife'
    });
    
    const sedeCard = screen.getByText('CEP SANTA CRUZ').closest('div');
    fireEvent.click(sedeCard!);
    
    expect(mockNavigate).toHaveBeenCalledWith('/sede/cep-santa-cruz');
  });

  it('displays correct campus image', () => {
    renderSedeCard();
    
    const image = screen.getByAltText('Campus Norte');
    expect(image).toHaveAttribute('src', '/images/sedes/cep-norte.jpg');
  });
}); 