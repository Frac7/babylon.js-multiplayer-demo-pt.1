import {
  MeshBuilder,
  StandardMaterial,
  Texture,
  CubeTexture,
} from '@babylonjs/core';

export default class World {
  constructor() {
    this.createGround();
    this.createSkyBox();
  }

  createGround() {
    this.ground = MeshBuilder.CreateGround('Ground', {
      height: 128,
      width: 128,
    });

    const material = new StandardMaterial('GroundMaterial');

    material.diffuseTexture = new Texture('assets/textures/ground.jpg');
    // Texture scale (repeat texture)
    material.diffuseTexture.uScale = 4;
    material.diffuseTexture.vScale = 4;

    this.ground.material = material;
  }

  createSkyBox() {
    this.skyBox = MeshBuilder.CreateBox('SkyBox', { size: 128 });

    const material = new StandardMaterial('SkyBox');

    // Show material in "hidden faces"
    material.backFaceCulling = false;

    material.reflectionTexture = new CubeTexture(
      'assets/textures/TropicalSunnyDay',
    );
    material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;

    material.disableLighting = true;

    this.skyBox.material = material;
  }
}
