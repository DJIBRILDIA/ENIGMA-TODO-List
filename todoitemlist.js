import React, { useState } from "react";

function AjouterTache({ ajouterTache }) {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");

  const soumettreFormulaire = (e) => {
    e.preventDefault();

    const nouvelleTache = {
      titre,
      description,
    };

    ajouterTache(nouvelleTache);
    setTitre("");
    setDescription("");
  };

  return (
    <form onSubmit={soumettreFormulaire}>
      <label>
        Titre :
        <input
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
      </label>
      <br />
      <label>
        Description :
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AjouterTache;
const ajouterTache = (nouvelleTache) => {
    fetch('/api/taches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nouvelleTache)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  };
  