import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PropertyCard } from '../../../../src/presentation/components/properties/PropertyCard/PropertyCard';
import type { Property } from '../../../../src/core/domain/entities/Property';

const mockProperty: Property = {
  id: '1',
  idOwner: 'owner-1',
  name: 'Beautiful Beach House',
  addressProperty: '123 Ocean Drive, Miami Beach, FL',
  priceProperty: 500000,
  imageUrl: 'https://example.com/image1.jpg',
  codeInternal: 12345,
  year: 2020,
};

describe('PropertyCard Component', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('should render property information', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    expect(screen.getByText('Beautiful Beach House')).toBeInTheDocument();
    expect(screen.getByText(/123 Ocean Drive/i)).toBeInTheDocument();
    expect(screen.getByText('$500,000')).toBeInTheDocument();
    expect(screen.getByText('2020')).toBeInTheDocument();
  });

  it('should render property image when available', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const image = screen.getByAltText('Beautiful Beach House - 123 Ocean Drive, Miami Beach, FL');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('should render placeholder when no image is available', () => {
    const propertyWithoutImage: Property = {
      ...mockProperty,
      imageUrl: '',
    };

    renderWithRouter(<PropertyCard property={propertyWithoutImage} />);

    const placeholder = screen.getByRole('img', { name: /property placeholder/i });
    expect(placeholder).toBeInTheDocument();
  });

  it('should render as an article element', () => {
    const { container } = renderWithRouter(<PropertyCard property={mockProperty} />);

    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('should contain a link to property detail page', () => {
    renderWithRouter(<PropertyCard property={mockProperty} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/properties/1');
  });

  it('should render address in address element', () => {
    const { container } = renderWithRouter(<PropertyCard property={mockProperty} />);

    const address = container.querySelector('address');
    expect(address).toBeInTheDocument();
    expect(address).toHaveTextContent('123 Ocean Drive, Miami Beach, FL');
  });

  it('should render year with time element', () => {
    const { container } = renderWithRouter(<PropertyCard property={mockProperty} />);

    const time = container.querySelector('time');
    expect(time).toBeInTheDocument();
    expect(time).toHaveAttribute('dateTime', '2020');
  });

  it('should format price correctly', () => {
    const propertyWithLargePrice: Property = {
      ...mockProperty,
      priceProperty: 1250000,
    };

    renderWithRouter(<PropertyCard property={propertyWithLargePrice} />);

    expect(screen.getByText('$1,250,000')).toBeInTheDocument();
  });

  it('should render property name in h3 element', () => {
    const { container } = renderWithRouter(<PropertyCard property={mockProperty} />);

    const heading = container.querySelector('h3');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Beautiful Beach House');
  });
});
