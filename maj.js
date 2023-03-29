import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("tasks")
      .onSnapshot((snapshot) => {
        const newTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(newTasks);
      });
    return () => unsubscribe();
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();
    firebase.firestore().collection("tasks").add({ text: newTask });
    setNewTask("");
  };

  const handleEditTask = (id, text) => {
    setEditTask(id);
    setEditedTask(text);
  };

  const handleUpdateTask = (e, id) => {
    e.preventDefault();
    firebase.firestore().collection("tasks").doc(id).update({ text: editedTask });
    setEditTask(null);
    setEditedTask("");
  };

  const handleDeleteTask = (id) => {
    firebase.firestore().collection("tasks").doc(id).delete();
  };

  return (
    <>
      <h1>Task List</h1>
      <form onSubmit={handleAddTask}>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTask === task.id ? (
              <form onSubmit={(e) => handleUpdateTask(e, task.id)}>
                <input type="text" value={editedTask} onChange={(e) => setEditedTask(e.target.value)} />
                <button type="submit">Update Task</button>
              </form>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEditTask(task.id, task.text)}>Edit</button>
                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TaskList;