import {
  _decorator,
  Component,
  EventKeyboard,
  Input,
  input,
  instantiate,
  KeyCode,
  Node,
  Prefab,
  Vec2,
  Vec3,
} from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("CharacterState")
export class CharacterState extends Component {
  snakePos = new Vec3(0, 0);

  moveDirection: Vec2 = new Vec2(0, 0);

  isMoving: boolean = false;

   speed: number =0;
  @property(Node)
  private segments: Node[] = [];

  @property(Prefab)
  private segmentsPrefabs: Prefab = null;
  private positions: Vec3[] = [];
  protected onEnable(): void {
    this.segments.push(this.node);

    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  start() {
    this.init();
  }

  init(): void {
   
    this.snakePos = new Vec3(10, 10, 0);
    this.node.setPosition(this.snakePos);

    this.moveDirection = new Vec2(0, 1);
    this.positions.push(this.snakePos.clone());
  }

  update(deltaTime: number) {
    // console.log(this.moveDirection);

    let moveX = this.moveDirection.x * deltaTime * GameManager.getInstance().getSpeed();   ;
    let moveY = this.moveDirection.y * deltaTime * GameManager.getInstance().getSpeed();   ;
    let moveSnake = new Vec3(moveX, moveY, 0);

    this.snakePos.add(moveSnake);
    this.node.position = this.snakePos;

    this.positions.push(this.snakePos.clone());

    const lastPos = this.segments.length * 50;

    if (this.positions.length > lastPos) {
      this.positions.shift();
    }

    for (let i = 0; i < this.segments.length; i++) {
      const segment = this.positions.length - 1 - i * 50;
      if (segment >= 0) {
        this.segments[i].position = this.positions[segment];
      }
    }
  }

  protected onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        if (this.moveDirection.x != 1) {
          //this.moveDirection = new Vec2(-1, 0);
          this.changeDirection(-1, 0);
          this.node.angle = 90;
        }
        break;

      case KeyCode.KEY_W:
        if (this.moveDirection.y != -1) {
          // this.moveDirection = new Vec2(0, 1);
          this.changeDirection(0, 1);

          this.node.angle = 0;
        }
        break;
      case KeyCode.KEY_D:
        if (this.moveDirection.x != -1) {
          // this.moveDirection = new Vec2(1, 0);
          this.changeDirection(1, 0);
          this.node.angle = -90;
        }
        break;
      case KeyCode.KEY_S:
        if (this.moveDirection.y != 1) {
          // this.moveDirection = new Vec2(0, -1);
          this.changeDirection(0, -1);
          this.node.angle = 180;
        }
        break;
    }
  }

  changeDirection(posX: number, posY: number): Vec2 {
    this.moveDirection = new Vec2(posX, posY);
    return this.moveDirection;
  }

  spawnSegments() {
    let newSegment = instantiate(this.segmentsPrefabs);
    let pos = this.segments[this.segments.length - 1].position;

    newSegment.position = pos;
    this.node.parent.addChild(newSegment);
    this.segments.push(newSegment);
  }
}
