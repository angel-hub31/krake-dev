// src/App.jsx
import { useEffect, useState } from 'react';
import PersonajeCard from './components/PersonajeCard';
import './index.css';

function App() {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    const cargarPersonajes = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character');
        const datos = await response.json();

        setPersonajes(datos.results.slice(0, 20));

      } catch (error) {
        console.log("Error al consumir la Api: ", error);

      }
    };
    cargarPersonajes();

  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Personajes de Rick y Morty</h1>
      </header>

      <div className="grid-container">
        {personajes.map(personaje => (
          <PersonajeCard key={personaje.id} personaje={personaje} />
        ))}
      </div>
    </div>
  );
}

export default App;