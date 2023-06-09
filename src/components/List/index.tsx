import React, { useState, useEffect, useMemo } from 'react';
import type { Product } from 'utils/types';
import ListItem from './Item';
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

  const statusText = useMemo(() => {
    let text = '';
    if (loading) {
      text = 'Loading...';
    } else if (error) {
      text = error;
    } else if ((products.length === 0) && query.length > 0) {
      text = `No results found for the query "${query}". Try "Gloves"? 🤔`;
    }
    return text;
  }, [error, loading, products.length, query]);

  if (!query) {
    return <></>;
  }

  return (
        <ul className={`list-container ${statusText ? 'status' : ''}`}>
            {statusText && (
                <p className='status-text'>{statusText}</p>
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
