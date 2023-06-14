import React, { useState, useCallback, type ChangeEvent } from 'react';
import debounce from 'utils/debounce';
import useProductFetcher from 'hooks/useProductFetcher';
import List from 'components/List';
import './styles.scss';

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { loading, products, error, getProducts, setLoading } = useProductFetcher();

  const debouncedGetProducts = useCallback(
    debounce(getProducts, 300),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
    if (value) setLoading(true);
    debouncedGetProducts(value);
  };

  return (
    <div className='auto-complete'>
      <div className='auto-complete-wrapper'>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className={`search-input ${inputValue ? 'has-value' : ''}`}
        />
        <List query={inputValue} loading={loading} error={error} products={products}/>
      </div>
    </div>
  );
};

export default AutoComplete;
