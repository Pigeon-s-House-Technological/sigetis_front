import React, { useState } from 'react';
import './GestionAct.css';

function GestionAct() {
  const [tasks, setTasks] = useState([
    //{ id: 1, name: 'H1', assigned: 'Tarea1', taskStatus: '', startDate: '', endDate: '', result: '' },
    //{ id: 2, name: 'H2', assigned: 'Tarea2', taskStatus: '', startDate: '', endDate: '', result: '' },
    //{ id: 3, name: 'H3', assigned: '', taskStatus: '', startDate: '', endDate: '', result: '' },
    //{ id: 4, name: 'H4', assigned: '', taskStatus: '', startDate: '', endDate: '', result: '' },
  ]);

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, name: `H${tasks.length + 1}`, assigned: '', taskStatus: '', startDate: '', endDate: '', result: '' },
    ]);
  };

  return (
    <div className="container">
      <button className="add-button" onClick={handleAddTask}>
        AGREGAR HU
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Asignado</th>
            <th>Estado</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <div className="task-name">
                  <span className="arrow-up">^</span>
                  {task.name}
                </div>
              </td>
              <td>
                <div className="assigned">
                  <span className="user-icon">👤</span>
                  {task.assigned}
                  <span className="text">Tarea</span>
                  <span className="plus-icon">+</span>
                </div>
              </td>
              <td>{task.taskStatus}</td>
              <td>{task.startDate}</td>
              <td>{task.endDate}</td>
              <td>{task.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GestionAct;
