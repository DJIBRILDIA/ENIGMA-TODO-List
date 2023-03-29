

const express = require('express');
const app = express();
const firebase = require('firebase');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Initialisation de Firebase
const firebaseConfig = { /* configuration de Firebase */ };
firebase.initializeApp(firebaseConfig);
const serviceAccount = require('path/to/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Middleware pour vérifier l'authentification de l'utilisateur avec un token JWT
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    jwt.verify(req.token, 'secretKey', (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = authData;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

// Endpoint pour ajouter une tâche
app.post('/api/tasks', verifyToken, (req, res) => {
  const { title, description } = req.body;
  db.collection('tasks').add({
    title,
    description,
    completed: false,
    userId: req.user.id // on récupère l'id de l'utilisateur depuis le token JWT
  })
    .then(() => res.sendStatus(200))
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});


