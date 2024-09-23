import { Container, AnimatedSprite, Texture, Sprite } from "pixi.js"

export const createAnimatedSprite = (textureNames, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
  const textures = textureNames.map((name) => Texture.from(name))

  const animatedSprite = new AnimatedSprite(textures)
  animatedSprite.position.copyFrom(position)
  animatedSprite.anchor.copyFrom(anchor)
  return animatedSprite
}

export const createSprite = (textureName, position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }) => {
  const sprite = new Sprite(Texture.from(textureName))
  sprite.position.copyFrom(position)
  sprite.anchor.copyFrom(anchor)
  return sprite
}

export class Tank {
  constructor() {
    this._view = new Container()

    this._bodyContainer = new Container()
    this._tracksLeft = createAnimatedSprite(["TrackFrame1", "TrackFrame2"], { x: 0, y: -80 })
    this._tracksRight = createAnimatedSprite(["TrackFrame1", "TrackFrame2"], { x: 0, y: 80 })
    this._tracksLeft.animationSpeed = 0.25
    this._tracksRight.animationSpeed = 0.25
    this._bodyContainer.addChild(this._tracksLeft, this._tracksRight, createSprite("HeavyHull"))
    this._view.addChild(this._bodyContainer)

    this._towerContainer = new Container()
    this._towerContainer.addChild(createSprite("HeavyGun", { x: 140, y: -27 }))
    this._towerContainer.addChild(createSprite("HeavyGun", { x: 160, y: 29 }))
    this._towerContainer.addChild(createSprite("GunConnector", { x: 80, y: 0 }))
    this._towerContainer.addChild(createSprite("HeavyTower"))
    this._view.addChild(this._towerContainer)
  }

  get view() {
    return this._view
  }

  set towerDirection(value) {
    this._towerContainer.rotation = value
  }

  get towerDirection() {
    return this._towerContainer.rotation
  }

  set bodyDirection(value) {
    this._bodyContainer.rotation = value
  }

  get bodyDirection() {
    return this._bodyContainer.rotation
  }

  get x() {
    return this._view.position.x
  }

  set x(value) {
    return (this._view.position.x = value)
  }

  get y() {
    return this._view.position.y
  }

  set y(value) {
    return (this._view.position.y = value)
  }

  startTracks() {
    this._tracksLeft.play()
    this._tracksRight.play()
  }

  stopTracks() {
    this._tracksLeft.stop()
    this._tracksRight.stop()
  }
}
