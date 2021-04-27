import React from 'react';
import './App.css';
import Button from './components/Button'
import Bullet from './components/Bullet';
import Spaceship from './components/Spaceship';
import Alien from './components/Alien.jsx';

import Banner from './img/space_invaders_banner.png';
import Grandpa from './img/space_invader_Grandpa.png';
import Grandma from './img/space_invader_Grandma.png';

class App extends React.Component {
  constructor() {
    super();

    this.state = {

      // Les Aliens sont placés au départ sur la row 1.
      alienPositionRow: 1,


      displayAlien: [],

      // La bullet apparait sur la même Row que le vaisseau
      bulletPositionRow: 43,
      bulletPositionColumn: 0,
      displayBullet: "none",

      // Le spaceship est au départ sur la colonne 23, au milieu.
      spaceshipPositionColumn: 23,

      noTouchYet: true,

      beginning: true,
      lostGame: false,
    }

    this.moveForwardAlien = this.moveForwardAlien.bind(this)
    this.bulletShot = this.bulletShot.bind(this)
    this.keyDownHandler = this.keyDownHandler.bind(this)
    this.toBegin = this.toBegin.bind(this)
  }

  

  // 7/ Donc lorsque le joueur tape sur la touche espace, il appelle la fonction bulletShot
  bulletShot() {

    const bulletPositionColumn = this.state.bulletPositionColumn

    for (let index = 0; index < this.state.displayAlien.length; index++) {
      const middleColumnAlien = (index + 1) * 4

      // Si la position column de la bullet est égale à la position column de l'alien
      // ET si la position row de la bullet est égale à la position row de l'alien 
      if (bulletPositionColumn >= middleColumnAlien - 1
        && bulletPositionColumn <= middleColumnAlien + 1
        && this.state.bulletPositionRow <= (this.state.alienPositionRow + 3)) {

        const newDisplayAlien = [...this.state.displayAlien]

        newDisplayAlien.splice(index, 1, false)

        return this.setState({
          displayAlien: newDisplayAlien,
          displayBullet: 'none',
          bulletPositionRow: 43,
        })
      }
    }

    if (this.state.bulletPositionRow >= 1) {

      if (this.state.displayBullet === "none") {
        this.setState({
          displayBullet: 'grid',
          bulletPositionColumn: this.state.spaceshipPositionColumn,
          bulletPositionRow: this.state.bulletPositionRow - 1
        });
      } else {
        this.setState({ bulletPositionRow: this.state.bulletPositionRow - 1 })
      }

      setTimeout(() => {
        this.bulletShot()
      }, 30);
    } else {
      this.setState({ displayBullet: "none", bulletPositionRow: 43 });
    }
  }
    

  render() {
    return <>{this.renderGame()}</>;
  }
}

export default App;
