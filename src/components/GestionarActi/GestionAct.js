import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AgregarHU from './AgregarHU';

function GestionAct() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', images: [] });

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateTask = () => {
    if (newTask.title) { 
      setTasks([...tasks, { id: tasks.length + 1, name: newTask.title, assigned: '', taskStatus: '', startDate: '', endDate: '', result: '' }]);
      setNewTask({ title: '', description: '', images: [] });
      handleCloseModal();
    } else {
      alert('Por favor, ingresa un título.');
    }
  };

  return (
    <div className="container mt-4">
      <button className="btn btn-primary mb-3" onClick={handleAddTask}>
        AGREGAR HU
      </button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva historia de usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AgregarHU newTask={newTask} setNewTask={setNewTask} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCreateTask}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table" >
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
              <td>{task.name}</td>
              <td>{task.assigned}</td>
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
