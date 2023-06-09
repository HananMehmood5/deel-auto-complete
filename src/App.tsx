import React from 'react';
import AutoComplete from './components/AutoComplete';
import './app.scss';

const App: React.FC = () => {
  return (
    <div>
      <header className='header'>
        <h1>Deel - Home Assignment</h1>
        <h3><code>AutoComplete</code></h3>
      </header>
      <AutoComplete />
    </div>
  );
};

export default App;
