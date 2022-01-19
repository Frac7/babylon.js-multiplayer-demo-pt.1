import {
  StandardMaterial,
  Texture,
  MeshBuilder,
} from '@babylonjs/core';

import { objectToVector3 } from '../../utilities';

export default class Player {
  constructor(id, transform, isCurrentPlayer, camera) {
    this.id = id;
    this.isCurrentPlayer = isCurrentPlayer;

    this.player = new MeshBuilder.CreateSphere(`Player ${id}`, {
      segments: 16,
      diameter: 2,
    });

    const material = new StandardMaterial('PlayerMaterial');

    material.diffuseTexture = new Texture('assets/textures/balldimpled.png');

    this.player.material = material;

    this.place(transform);

    if (this.isCurrentPlayer) {
      this.camera = camera;
      this.camera.lockedTarget = this.player;
    }
  }

  move(translation, speed) {}

  place(transform) {
    const { position } = transform;
    const positionToVector3 = objectToVector3(position);

    this.player.position = positionToVector3;
  }

  remove() {
    if (this.isCurrentPlayer) {
      this.scene.onBeforeRenderObservable.remove(this.renderObserver);
    }
    this.player.dispose();
  }
}
