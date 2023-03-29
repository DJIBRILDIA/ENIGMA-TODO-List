import React, { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../api/tasks";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // récupérer la liste des tâches au chargement du composant
    getTasks().then((data) => setTasks(data));
  }, []);

  const handleDelete = (id) => {
    // envoyer une requête DELETE pour supprimer la tâche correspondante
    deleteTask(id).then(() => {
      // mettre à jour la liste des tâches après suppression
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    });
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleDelete(task.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;