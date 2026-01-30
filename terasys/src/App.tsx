import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isNavbarLight, setIsNavbarLight] = useState(false);

  return (
    <div className="App">
      <Navbar isLight={isNavbarLight} />
      <main>
        <Home onSectionChange={(index) => setIsNavbarLight(index > 0)} />
      </main>
    </div>
  );
}

export default App;
