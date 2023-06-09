import React, { useState, ChangeEvent } from 'react';
import debounce from 'utils/debounce';
import useProductFetcher from "hooks/useProductFetcher"
import List from "components/List"
import './styles.css';

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { loading, products, error, getProducts } = useProductFetcher();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  
    debounce((query: string) => {
      getProducts(query);
    }, 500)(value)
  };

  return (
    <div className='auto-complete'>
      <div className='auto-complete__wrapper'>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search..."
          className={`autocomplete-input`}
        />
        <List query={inputValue} loading={loading} error={error} products={products}/>
      </div>
    </div>
  );
};

export default AutoComplete;