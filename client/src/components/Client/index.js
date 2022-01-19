import Scene from '../Scene';
import Player from '../Player';

import { INIT, SPAWN, MOVEMENT, REMOVE, OTHERS } from './constants';

export default class Client {
  constructor() {    
    this.players = [];
  
    this.ws = new WebSocket('ws://localhost:5000');

    this.ws.onopen = () => {
      this.scene = new Scene();
    }

    this.ws.onmessage = msg => {
      const { id, command, payload } = JSON.parse(msg.data);
      const player = this.players.find(playerItem => playerItem.id === id);
      
      // Connection parameters
      if (command === INIT) {
        const player = new Player(id, payload.transform, true, this.scene.getBabylonCamera());
        this.players.push(player);
      }

      if (command === OTHERS) {
        payload.others.forEach(({ id, transform }) => {
          const player = new Player(id, transform);
          this.players.push(player);
        });
      }

      // Other client connection parameters
      if (command === SPAWN) {
        const player = new Player(id, payload.transform);
        this.players.push(player);
      }

      if (command === MOVEMENT) {}

      if (command === REMOVE) {
        player.remove();
        this.players = this.players.filter(playerItem => playerItem.id !== id);
      }
    };
  }
}
