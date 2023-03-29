import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const snapshot = await firebase.firestore().collection('tasks').get();
      const newTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(newTasks);
    };
    getTasks();
  }, []);

  return (
    <div>
      <h1>Liste des tâches :</h1>
      {tasks.map((task) => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;