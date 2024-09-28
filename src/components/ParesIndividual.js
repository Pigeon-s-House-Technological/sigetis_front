import React, { useState } from 'react';
import './ParesIndividual.css';  // Importamos los estilos CSS

const ParesIndividual = () => {
  const [expandedGroup, setExpandedGroup] = useState(null);  // Estado para manejar qué grupo está expandido

  const toggleGroup = (groupIndex) => {
    if (expandedGroup === groupIndex) {
      setExpandedGroup(null);  // Colapsa el grupo si ya está expandido
    } else {
      setExpandedGroup(groupIndex);  // Expande el grupo seleccionado
    }
  };

  // Datos simulados de los grupos
  const groups = [
    {
      name: 'Grupo 1',
      description: 'Menu description.',
      members: [
        { name: 'Alan Meneces F.', leader: false },
        { name: 'Ever Blanco V.', leader: false },
        { name: 'Paola Soto', leader: false },
        { name: 'Boris Anthony U.', leader: true },
        { name: 'Jhoanson', leader: false }
      ]
    },
    {
      name: 'Grupo 2',
      description: 'Menu description.',
      members: []
    },
    {
      name: 'Grupo 3',
      description: 'Menu description.',
      members: []
    }
  ];

  return (
    <div className="evaluation-groups">
      <h2>Evaluacion por pares (Individual)</h2>
      {groups.map((group, index) => (
        <div key={index} className="group">
          <div className="group-header" onClick={() => toggleGroup(index)}>
            <span>{group.name}</span>
            <span>{expandedGroup === index ? '▲' : '▼'}</span>
          </div>
          {expandedGroup === index && (
            <div className="group-details">
              <p>{group.description}</p>
              {group.members.length > 0 ? (
                <div className="members">
                  <h4>Integrantes</h4>
                  <ul>
                    {group.members.map((member, idx) => (
                      <li key={idx}>
                        {member.name} {member.leader && <span>- Líder</span>}
                      </li>
                    ))}
                  </ul>
                  <button className="view-group-btn">Ver Grupo</button>
                </div>
              ) : (
                <p>No hay miembros asignados.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParesIndividual;
