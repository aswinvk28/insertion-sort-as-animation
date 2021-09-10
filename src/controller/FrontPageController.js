import React from 'react';
import Phaser from 'phaser';
import PlayingCards from '../Phaser/Scenes/PlayingCards';

export default class FrontPageController extends React.Component {
  constructor(props) {
    super(props);
    this.window = window;
  }

  componentDidMount() {
    const config = {
      width: this.window.innerWidth,
      height: this.window.innerHeight,
      type: Phaser.Arcade,
      canvasElement: '#canvas',
      backgroundColor: "rgb(150, 213, 209)",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 0},
          debug: true
        }
      }
    };

    this.game = new Phaser.Game(config);
    this.game.scene.add('PlayingCards', PlayingCards);
    this.game.scene.start('PlayingCards', {
      window: this.window,
    });
  }

  render() {
    return null;
  }
}