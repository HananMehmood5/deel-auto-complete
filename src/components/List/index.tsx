import React from 'react';
import type { Product } from "utils/types"
import Placeholder from 'components/Placeholder';
import ListItem from "./Item";
import './styles.scss';

interface Props {
    query: string;
    loading: boolean;
    error?: string;
    products: Product[];
}

const List: React.FC<Props> = ({ query, loading, error, products }) => {

    if (loading) { 
        return (
            <div className='loading-container'>
                <p>Loading...</p>
            </div>
        )
    }

    if (error) { 
        
    }

    return (
        <ul className="autocomplete-options">
            {products.map(({ id, name }) => (
                <ListItem key={id} name={name} query={query}/>
            ))}
        </ul>
  );
};

export default List;