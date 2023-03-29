import React from 'react';
import MonComposant from './MonComposant';

class MonAutreComposant extends React.Component {
  render() {
    return (
      <div>
        <h1>Mon Autre Composant</h1>
        <MonComposant />
      </div>
    );
  }
}
