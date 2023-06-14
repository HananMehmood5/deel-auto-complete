import React, { useState, useEffect } from 'react';
import type { Product } from 'utils/types';
import ListItem from './Item';
import { getStatusText } from './utils';
import './styles.scss';

interface Props {
  query: string
  loading: boolean
  error?: string
  products: Product[]
}

const List: React.FC<Props> = ({ query, loading, error, products }) => {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setFocusedIndex(prevIndex => Math.max(prevIndex - 1, 0));
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        setFocusedIndex(prevIndex => Math.min(prevIndex + 1, products.length - 1));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [products.length]);

  if (!query) {
    return <></>;
  }

  const statusText = getStatusText(error, loading, products.length, query);

  return (
    <ul className={`list-container ${statusText ? 'status' : ''}`} role='list'>
        {statusText && (
          <p className='status-text' role='status'>{statusText}</p>
        )}
        {!statusText && products.map((product, index) => (
          <ListItem
            key={product.id}
            name={product.name}
            query={query}
            focused={index === focusedIndex}
          />
        ))}
    </ul>
  );
};

export default List;
