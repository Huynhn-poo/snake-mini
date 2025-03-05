import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Node, Vec2, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CharacterState")
export class CharacterState extends Component {
  snakePos = new Vec3(0, 0);
  speed: number = 10;
  moveDirection: Vec2 = new Vec2(0, 0);

  isMoving: boolean = false;
  protected onEnable(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  start() {
    this.snakePos = new Vec3(10, 10, 0);
    this.node.setPosition(this.snakePos);

    this.moveDirection = new Vec2(0, 1);
  }

  update(deltaTime: number) {
   // console.log(this.moveDirection);

    let moveX = this.moveDirection.x * deltaTime * this.speed;
    let moveY = this.moveDirection.y * deltaTime * this.speed;
    let moveSnake = new Vec3(moveX, moveY, 0);

    this.snakePos.add(moveSnake);
    this.node.position = this.snakePos;
  }

  protected onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        if (this.moveDirection.x != 1) {
          //this.moveDirection = new Vec2(-1, 0);
          this.changeDirection(-1, 0);
        }
        break;

      case KeyCode.KEY_W:
        if (this.moveDirection.y != -1) {
         // this.moveDirection = new Vec2(0, 1);
          this.changeDirection(0, 1);
        }
        break;
      case KeyCode.KEY_D:
        if (this.moveDirection.x != -1) {
         // this.moveDirection = new Vec2(1, 0);
          this.changeDirection(1, 0);
        }
        break;
      case KeyCode.KEY_S:
        if (this.moveDirection.y != 1) {
         // this.moveDirection = new Vec2(0, -1);
          this.changeDirection(0, -1);
        }
        break;
    }
  }
   changeDirection(posX:number, posY:number):Vec2 {
    this.moveDirection = new Vec2(posX, posY);
    return this.moveDirection;
  }
  
}
