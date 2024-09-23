import "./style.css"
import { Application, Assets, Rectangle } from "pixi.js"
import gsap from "gsap"
import { assetsMap } from "./assetsMap.js"
import { Tank } from "./Tank.js"

const app = new Application()

await app.init({
  width: 800,
  height: 800,
  backgroundColor: 0xc2c2c2,
  canvas: document.getElementById("canvas"),
})

await Assets.load(assetsMap)

const tank = new Tank()
app.stage.addChild(tank.view)

app.stage.position.set(800 / 2, 800 / 2)

const moveTank = ({ data }) => {
  gsap.killTweensOf(tank)
  const distanceToCenter = data.getLocalPosition(app.stage)
  const distanceToTank = data.getLocalPosition(tank.view)
  const angle = Math.atan2(distanceToTank.y, distanceToTank.x)

  let callAmount = 2
  const move = () => {
    callAmount -= 1
    if (callAmount <= 0) {
      gsap.to(tank, {
        x: distanceToCenter.x,
        y: distanceToCenter.y,
        duration: 3,
        onStart: () => tank.startTracks(),
        onComplete: () => tank.stopTracks(),
      })
    }
  }

  gsap.to(tank, {
    towerDirection: angle,
    duration: 1,
    onComplete: () => move(),
  })

  gsap.to(tank, {
    bodyDirection: angle,
    duration: 2,
    onStart: () => tank.startTracks(),
    onComplete: () => {
      tank.stopTracks()
      move()
    },
  })
}

app.stage.on("pointerdown", moveTank, undefined)
app.stage.interactive = true
app.stage.interactiveChildren = false
app.stage.hitArea = new Rectangle(-400, -400, 800, 800)
