import React from 'react';
import './styles.scss';

interface Props {
  query: string
  name: string
  focused: boolean
}

const ListItem: React.FC<Props> = ({ query, name, focused }) => {
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = name.split(regex);

  return (
    <li className={`list-item ${focused ? 'focused' : ''}`}>
        {parts.map((part, index) =>
          regex.test(part)
            ? <strong key={index}>{part}</strong>
            : <span key={index}>{part}</span>
        )}
    </li>
  );
};

export default ListItem;
