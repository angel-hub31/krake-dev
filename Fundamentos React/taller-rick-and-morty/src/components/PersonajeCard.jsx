// src/components/PersonajeCard.jsx
import './PersonajeCard.css'
const PersonajeCard = ({ personaje }) => {
    return (
        <div className="card">
            <img src={personaje.image} alt={personaje.name} />
            <div className="card-content"></div>
            <h3>{personaje.name}</h3>
            <p>Especie: <span>{personaje.species}</span></p>
            <p>Estado: <span>{personaje.status}</span></p>
            <p>Origen: <span>{personaje.origin.name}</span></p>

        </div>
    );
};

export default PersonajeCard;