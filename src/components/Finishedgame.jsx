import React from 'react';
import './style/Alien.css';
import ImgAlien from '../img/alien2.png'
import './style/Bullet.css';
import BulletImg from '../img/bullet.png';
import './style/Button.css';
import './Button.jsx';
import './Bullet.jsx';
import './Spaceship.jsx';



class Finishedgame extends React.Component {

 renderGame() {

// Si il ne reste aucun alien ou si on a perdu le jeu.
if (this.props.displayAlien.length !== 0 && (this.props.displayAlien.indexOf(true) === -1 || this.props.lostGame)) {
    return (
      <div className='container'>

        <img className='banner' src={Banner} alt='Title Game Banner' />

        <img className='grandpaImg' src={Grandpa} alt='Space Invader Grandpa' />

        <img className='grandmaImg' src={Grandma} alt='Space Invader Grandma' />

        <span className='grandpa'> Grandpa </span>
        <span className='grandma'> Grandma </span>

        <h2 className='gameOverDisplay'>
          {/* Si lostGame égale à true alors afficher Game Over sinon afficher You won */}
          {this.props.lostGame === true ? "GAME OVER" : "YOU WON !!!"}
        </h2>

      </div>
    );
  } else {
    // 1/ Le state beginning est par defaut sur true donc la 1ere page que l'on a est celle çi.
    if (this.props.beginning) {
      return (
        <div id='firstMenu'>
          <h1>Space Invaders </h1>
          <section>Déplacez vous de droite à gauche en tirant sur les extraterrestres avant qu'ils ne descendent sur vous .</section>
          {/* 2/ Lorsque que l'on click sur ce button, ça appelle la fonction toBegin  */}
          <Button begin={this.toBegin}></Button>
        </div>
      )
    } else {
      return (
        // 4/ On arrive ici car aucune des autres conditions n'est bonne.
        // Lorsque que l'on presse une touche la fonction keyDownHandler est appliqué avec
        // la touche du clavier tapée.
        <div
          onKeyDown={(e) => { this.keyDownHandler(e) }}
          id="bigDiv"
          // tabindex permet de capturer le focus de la div, par défault on ne peut pas.
          tabIndex={1}>

          {/* Ici on parcours le tableau displayAlien grâce à map et on crée autant de 
          Alien qu'il y a d'élement dans le tableaux */}
          {
            this.props.displayAlien.map((elem, index) => {
              if (elem) {
                // On assigne à tout les éléments une key, nécessaire pour aider React à modifier ou supprimé un élément.
                // Ici GridPosition Column correspond à l'index de l'élément + 1 le tout multiplié par 4. 
                // Cela nous permet de tous les décaler de 4 colonnes. le + 1 était necessaire car l'index 
                // commence à 0 et 0*4 égale la tête à toto les amis.
                // Tout les Aliens ont la même valeur de row car ils sont sur la même ligne et avance à la même allure. 
                return <Alien key={index} gridPositionColumn={(index + 1) * 4} gridPositionRow={this.props.alienPositionRow} />
              }
            })
          }

          <Bullet display={this.props.displayBullet} gridPositionColumn={this.props.bulletPositionColumn}
            gridPositionRow={this.props.bulletPositionRow} />

          <Spaceship
            gridPositionColumn={this.props.spaceshipPositionColumn}
            gridPositionRow={39} />

        </div>
      );
    }
  }
}
}
export default Finishedgame