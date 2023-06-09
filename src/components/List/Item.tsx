import React from 'react';
import './styles.scss';

interface Props {
    query: string;
    name: string;
}

const List: React.FC<Props> = ({ query, name }) => {
  return (
    <li className="autocomplete-option">
        <span>
        {name.substring(0, query.length)}
        <strong>{name.substring(query.length)}</strong>
        </span>
    </li>
        
  );
};

export default List;