import { render, screen, fireEvent } from '@testing-library/react';
import { FilterModal } from '../../../../src/presentation/components/common/FilterModal/FilterModal';

describe('FilterModal Component', () => {
  const mockOnApply = jest.fn();
  const mockOnClose = jest.fn();
  const mockOnClear = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal when isOpen is true', () => {
    render(
      <FilterModal
        isOpen={true}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/filters/i)).toBeInTheDocument();
  });

  it('should not render modal when isOpen is false', () => {
    render(
      <FilterModal
        isOpen={false}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should update address input value', () => {
    render(
      <FilterModal
        isOpen={true}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    const addressInput = screen.getByPlaceholderText(/enter address/i) as HTMLInputElement;
    fireEvent.change(addressInput, { target: { value: 'Miami Beach' } });

    expect(addressInput.value).toBe('Miami Beach');
  });

  it('should show error when max price is less than min price', () => {
    render(
      <FilterModal
        isOpen={true}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    const minPriceInput = screen.getByPlaceholderText(/min price/i);
    const maxPriceInput = screen.getByPlaceholderText(/max price/i);

    fireEvent.change(minPriceInput, { target: { value: '500000' } });
    fireEvent.change(maxPriceInput, { target: { value: '100000' } });

    expect(screen.getByText(/el precio máximo no puede ser menor al precio mínimo/i)).toBeInTheDocument();
  });

  it('should disable apply button when there is a price error', () => {
    render(
      <FilterModal
        isOpen={true}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    const minPriceInput = screen.getByPlaceholderText(/min price/i);
    const maxPriceInput = screen.getByPlaceholderText(/max price/i);
    const applyButton = screen.getByRole('button', { name: /apply/i });

    fireEvent.change(minPriceInput, { target: { value: '500000' } });
    fireEvent.change(maxPriceInput, { target: { value: '100000' } });

    expect(applyButton).toBeDisabled();
  });

  it('should call onClose when close button is clicked', () => {
    render(
      <FilterModal
        isOpen={true}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClear when clear button is clicked', () => {
    render(
      <FilterModal
        isOpen={true}
        onApply={mockOnApply}
        onClose={mockOnClose}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
