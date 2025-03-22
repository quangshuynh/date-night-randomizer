import React from 'react';
import Randomizer from './components/Randomizer';
import Header from './components/Header'
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Randomizer />
    </div>
  );
}

export default App;
