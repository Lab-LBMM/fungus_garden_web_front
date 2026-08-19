import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, Check, Square, CheckSquare } from 'lucide-react';
import './SearchableSelect.css';

export interface SelectOption {
  label: string;
  value: string;
  count?: number;
}

interface SearchableSelectProps {
  label?: string;
  placeholder: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string | null) => void;
  icon?: React.ReactNode;
  id?: string;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  icon,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleSelect = (val: string) => {
    if (value === val) {
      onChange(null);
    } else {
      onChange(val);
    }
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setSearchTerm('');
  };

  return (
    <div className="searchable-select-wrap" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="searchable-select__label">
          {label}
        </label>
      )}
      <div
        id={id}
        className={`searchable-select__trigger ${isOpen ? 'searchable-select__trigger--open' : ''} ${
          value ? 'searchable-select__trigger--has-value' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        <div className="searchable-select__trigger-content">
          {icon && <span className="searchable-select__icon">{icon}</span>}
          <span className="searchable-select__value">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <div className="searchable-select__trigger-actions">
          {value && (
            <button
              type="button"
              className="searchable-select__clear-btn"
              onClick={handleClear}
              title="Limpar seleção"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`searchable-select__chevron ${isOpen ? 'searchable-select__chevron--rotated' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="searchable-select__dropdown">
          <div className="searchable-select__search-box">
            <Search size={14} className="searchable-select__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="searchable-select__search-input"
              placeholder="Escreva para buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="searchable-select__search-clear"
                onClick={() => setSearchTerm('')}
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="searchable-select__options-list">
            <button
              type="button"
              className={`searchable-select__option ${!value ? 'searchable-select__option--selected' : ''}`}
              onClick={() => {
                onChange(null);
                setIsOpen(false);
                setSearchTerm('');
              }}
            >
              <span>{placeholder}</span>
              {!value && <Check size={14} className="searchable-select__check" />}
            </button>

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = value === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`searchable-select__option ${
                      isSelected ? 'searchable-select__option--selected' : ''
                    }`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    <span className="searchable-select__option-text">{opt.label}</span>
                    {opt.count !== undefined && (
                      <span className="searchable-select__option-count">({opt.count})</span>
                    )}
                    {isSelected && <Check size={14} className="searchable-select__check" />}
                  </button>
                );
              })
            ) : (
              <div className="searchable-select__empty">Nenhum resultado para "{searchTerm}"</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface SearchableMultiSelectProps {
  label?: string;
  placeholder: string;
  options: SelectOption[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  icon?: React.ReactNode;
  id?: string;
}

export const SearchableMultiSelect: React.FC<SearchableMultiSelectProps> = ({
  label,
  placeholder,
  options,
  selectedValues,
  onChange,
  icon,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const toggleOption = (val: string) => {
    if (selectedValues.includes(val)) {
      onChange(selectedValues.filter((v) => v !== val));
    } else {
      onChange([...selectedValues, val]);
    }
  };

  const handleSelectAll = () => {
    const allFilteredVals = filteredOptions.map((o) => o.value);
    const newSelected = Array.from(new Set([...selectedValues, ...allFilteredVals]));
    onChange(newSelected);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) return selectedValues[0];
    return `${selectedValues.length} selecionados (${selectedValues.join(', ')})`;
  };

  return (
    <div className="searchable-select-wrap" ref={containerRef}>
      {label && (
        <label htmlFor={id} className="searchable-select__label">
          {label}
        </label>
      )}

      <div
        id={id}
        className={`searchable-select__trigger ${isOpen ? 'searchable-select__trigger--open' : ''} ${
          selectedValues.length > 0 ? 'searchable-select__trigger--has-value' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        <div className="searchable-select__trigger-content">
          {icon && <span className="searchable-select__icon">{icon}</span>}
          <span className="searchable-select__value">{getDisplayText()}</span>
        </div>

        <div className="searchable-select__trigger-actions">
          {selectedValues.length > 0 && (
            <button
              type="button"
              className="searchable-select__clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClearAll();
              }}
              title="Limpar todos"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={16}
            className={`searchable-select__chevron ${isOpen ? 'searchable-select__chevron--rotated' : ''}`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="searchable-select__dropdown searchable-select__dropdown--multi">
          <div className="searchable-select__search-box">
            <Search size={14} className="searchable-select__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              className="searchable-select__search-input"
              placeholder="Escreva para buscar na lista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                className="searchable-select__search-clear"
                onClick={() => setSearchTerm('')}
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className="searchable-select__multi-actions">
            <button type="button" onClick={handleSelectAll} className="searchable-select__action-btn">
              Marcar Todos ({filteredOptions.length})
            </button>
            {selectedValues.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="searchable-select__action-btn searchable-select__action-btn--danger"
              >
                Limpar Seleções ({selectedValues.length})
              </button>
            )}
          </div>

          <div className="searchable-select__options-list">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isChecked = selectedValues.includes(opt.value);
                return (
                  <label
                    key={opt.value}
                    className={`searchable-select__checkbox-option ${
                      isChecked ? 'searchable-select__checkbox-option--checked' : ''
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOption(opt.value)}
                      className="searchable-select__checkbox-input"
                    />
                    <span className="searchable-select__checkbox-custom">
                      {isChecked ? <CheckSquare size={16} /> : <Square size={16} />}
                    </span>
                    <span className="searchable-select__option-text">{opt.label}</span>
                    {opt.count !== undefined && (
                      <span className="searchable-select__option-count">({opt.count})</span>
                    )}
                  </label>
                );
              })
            ) : (
              <div className="searchable-select__empty">Nenhum resultado para "{searchTerm}"</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
