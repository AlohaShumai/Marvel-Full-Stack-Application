import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Characters from './pages/Characters';
import CharacterDetail from './pages/CharacterDetail';
import NotFound from './pages/NotFound';
import AddCharacter from './pages/AddCharacter';
import EditCharacter from './pages/EditCharacter';
import NavBar from './Components/navigationbar';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/characters/:id/edit" element={<EditCharacter />} />
          <Route path="/add" element={<AddCharacter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
