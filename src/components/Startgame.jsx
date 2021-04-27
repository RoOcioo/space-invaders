import React from 'react';
import './style/Alien.css';
import ImgAlien from '../img/alien2.png'
import './style/Bullet.css';
import BulletImg from '../img/bullet.png';


componentDidUpdate() {
    if (document.getElementById("bigDiv")) {
      document.getElementById("bigDiv").focus()
    }
  }

  // 3/ La fonction toBegin change le state beginning en false.
  toBegin() {
    this.setState({
      beginning: false,
      // Au départ displayAlien est un array vide. 
      // Grâce à la méthode fill on lui ajoute 10 éléments de valeurs true à partir de l'index 0
      displayAlien: (new Array(10)).fill(true, 0)
    })
  }

  // 5/ Ici la touche 39 représente le keycode de la flêche de droite
  // touche 37 keycode de la flêche de gauche
  // touche 32 keycode de la touche espace
  keyDownHandler(e) {

    // Lorsque l'on bouge le spaceship pour la 1ère fois ou on tir alors les Aliens se mettent
    // à avancer au même moment.
    if (this.state.noTouchYet) {
      if (e.keyCode === 39) {
        this.moveForwardAlien()
        this.setState({
          spaceshipPositionColumn: this.props.spaceshipPositionColumn + 1,
          noTouchYet: false
        })
      } else if (e.keyCode === 37) {
        this.moveForwardAlien()
        this.setState({
          spaceshipPositionColumn: this.props.spaceshipPositionColumn - 1,
          noTouchYet: false
        })
      } else if (e.keyCode === 32 && this.props.displayBullet === 'none') {
        this.setState({ noTouchYet: false })
        this.bulletShot();
        this.moveForwardAlien()
      } else {

      }
    } else {

      // Lorsque le joueur tape la touche de gauche ou de droite, on change la colonne
      // sur laquelle le spaceship est grâce à la state spaceshipPositionColumn qui est
      // envoyé en props au composant Spaceship
      if (e.keyCode === 39 && this.props.spaceshipPositionColumn < 40) {
        this.setState({ spaceshipPositionColumn: this.state.spaceshipPositionColumn + 1 })
      } else if (e.keyCode === 37 && this.props.spaceshipPositionColumn > 5) {
        this.setState({ spaceshipPositionColumn: this.state.spaceshipPositionColumn - 1 })
      }
      //  Si le joueur tape sur la touche espace il appelle la fonction bulletShot
      else if (e.keyCode === 32) {
        this.bulletShot();
      }
    }
  }

  // 6/ la fonction moveForwardAlien à été appellé lorsque le joueur a bouger son spaceship ou a tirer
  // pour la 1ère fois.
  moveForwardAlien() {
    // Condition : Si il reste un alien  
    if (this.props.displayAlien.indexOf(true) !== -1) {
      // si la position row des aliens est inferieur ou égale à 35 sur la grid
      if (this.props.alienPositionRow <= 35) {
        // On avance d'une ligne sur la grid
        this.setState({ alienPositionRow: this.props.alienPositionRow + 1 });
        // SetTimeout permet d'attendre 1/2 seconde avant de relancer la fonction mooveForwardAlien
        // Encore une fois.
        setTimeout(() => {
          this.moveForwardAlien();
        }, 500);
      } else {
        // Si aucune des conditions n'est respecté alors le jeu est perdu car au moins un alien
        // est parvenue à la même row que le spaceship.
        this.setState({
          lostGame: true
        });
      }
    }
  }
export default Startgame;