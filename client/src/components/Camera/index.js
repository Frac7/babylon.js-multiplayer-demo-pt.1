import { FollowCamera, Vector3 } from '@babylonjs/core';

export default class Camera {
  constructor(canvas) {
    this.camera = new FollowCamera('Camera', new Vector3(0, 2.5, 0));

    // Attach the input control to the canvas
    this.camera.attachControl(canvas, true);
  }
}
