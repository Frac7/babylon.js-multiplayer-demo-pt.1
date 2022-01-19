import { HemisphericLight, Vector3 } from '@babylonjs/core';

export default class Light {
  constructor() {
    this.light = new HemisphericLight('Light', new Vector3(0.5, 1, 0.5));
  }
}
