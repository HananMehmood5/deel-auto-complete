import React from 'react';
import "./styles.scss"

interface PlaceholderProps {
  type: 'listItem' | '';
}

const Placeholder: React.FC<PlaceholderProps> = ({ type }) => {
    if (type === 'listItem') { 
        return <div className='placeholder' />;
    }

    return <></>;
};

export default Placeholder;