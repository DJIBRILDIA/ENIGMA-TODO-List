import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("tasks").get();
      setTasks(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

// initialiser Firebase
const firebaseConfig = {
    // config firebase
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // fonction pour envoyer une requête DELETE pour supprimer une tâche
  export const deleteTask = async (id) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const token = await user.getIdToken();
      await db.collection("tasks").doc(id).delete();
      return true;
    } else {
      throw new Error("User not authenticated");
    }
  };