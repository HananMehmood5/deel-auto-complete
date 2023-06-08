import React, { useState, ChangeEvent } from 'react';
import debounce from 'utils/debounce';
import useProductFetcher from "hooks/useProductFetcher"
import './styles.css';

interface Option {
  id: number;
  name: string;
}

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { loading, products, error, getProducts } = useProductFetcher();
  console.log("xx loading, products, error", loading, products, error);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    console.log("xx value", value);
    debounce((query: string) => {
      console.log("xx debounced value", value);
      getProducts(query);
    }, 300)(value)
  };

  return (
    <div className={`autocomplete-container${products?.length ? ' show-results' : ''}`}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to search..."
        className={`autocomplete-input${inputValue ? ' expand' : ''}`}
      />
      {/* {products.length && (
        <ul className="autocomplete-options">
          {products.map(({ id, name }) => (
            <li key={id} className="autocomplete-option">
              <span>
                {name.substring(0, inputValue.length)}
                <strong>{name.substring(inputValue.length)}</strong>
              </span>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default AutoComplete;