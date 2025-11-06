import { useState, type KeyboardEvent } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  onFilterClick: () => void;
  placeholder?: string;
  isLoading?: boolean;
}

export const SearchBar = ({
  onSearch,
  onFilterClick,
  placeholder = 'Search properties...',
  isLoading = false,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar__wrapper">
        <div className="search-bar__container">
          <input
            type="text"
            className="search-bar__input"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button
            className="search-bar__button"
            onClick={handleSearch}
            disabled={isLoading}
            aria-label="Search"
          >
            <Search className="search-bar__icon" size={20} />
          </button>
        </div>

        <button className="search-bar__filters-button" onClick={onFilterClick}>
          <SlidersHorizontal className="search-bar__filter-icon" size={20} />
          Filters
        </button>
      </div>
    </div>
  );
};
