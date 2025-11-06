import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '../../../../src/presentation/components/common/SearchBar/SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnFilterClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render search input and buttons', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    expect(screen.getByPlaceholderText(/search properties/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search properties/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open filters/i })).toBeInTheDocument();
  });

  it('should update input value when typing', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const input = screen.getByPlaceholderText(/search properties/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Miami Beach' } });

    expect(input.value).toBe('Miami Beach');
  });

  it('should call onSearch when search button is clicked', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const input = screen.getByPlaceholderText(/search properties/i);
    const searchButton = screen.getByRole('button', { name: /search properties/i });

    fireEvent.change(input, { target: { value: 'Test Property' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Test Property');
  });

  it('should call onSearch when Enter key is pressed', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const input = screen.getByPlaceholderText(/search properties/i);
    fireEvent.change(input, { target: { value: 'Test Property' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnSearch).toHaveBeenCalledWith('Test Property');
  });

  it('should trim whitespace from search term', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const input = screen.getByPlaceholderText(/search properties/i);
    const searchButton = screen.getByRole('button', { name: /search properties/i });

    fireEvent.change(input, { target: { value: '  Test Property  ' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Test Property');
  });

  it('should call onFilterClick when filter button is clicked', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const filterButton = screen.getByRole('button', { name: /open filters/i });
    fireEvent.click(filterButton);

    expect(mockOnFilterClick).toHaveBeenCalledTimes(1);
  });

  it('should disable inputs when isLoading is true', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
        isLoading={true}
      />
    );

    const input = screen.getByPlaceholderText(/search properties/i);
    const searchButton = screen.getByRole('button', { name: /search properties/i });

    expect(input).toBeDisabled();
    expect(searchButton).toBeDisabled();
  });

  it('should use custom placeholder when provided', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
        placeholder="Custom placeholder"
      />
    );

    const input = screen.getByPlaceholderText('Custom placeholder');
    expect(input).toBeInTheDocument();
  });

  it('should submit form when Enter is pressed in search input', () => {
    render(
      <SearchBar 
        onSearch={mockOnSearch} 
        onFilterClick={mockOnFilterClick} 
      />
    );

    const input = screen.getByPlaceholderText(/search properties/i);
    fireEvent.change(input, { target: { value: 'Beach House' } });
    fireEvent.submit(input.closest('form')!);

    expect(mockOnSearch).toHaveBeenCalledWith('Beach House');
  });
});
