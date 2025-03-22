import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, randomRange } from "cc";
import { CharacterState } from "./CharacterState";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("ClashObject")
export class ClashObject extends Component {
  distance: number = 500;

  @property(Node)
  appleSpawn: Node = null;

  @property(CharacterState)
  character: CharacterState = null;
  protected onEnable() {
    this.character = this.getComponent(CharacterState);
  }

  start() {
    const collider = this.getComponent(Collider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    collider.on(Contact2DType.END_CONTACT, this.onCollisionExit, this);

    // this.spawnFood();
  }

  private onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    //console.log("onCollisionEnter", selfCollider.node.name, otherCollider.node.name, otherCollider.group);

    if (otherCollider.group === 1) {
      this.character.spawnSegments();

      GameManager.getInstance().addScore(1);

      this.spawnFood();
      console.log("onCollisionEnter", otherCollider.node.name);
    }
  }

  private onCollisionExit(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    if (otherCollider.group === 4) {
      GameManager.getInstance().gameOver();
    }
  }

  spawnFood() {
    let posX = Math.floor(randomRange(-this.distance, this.distance));
    let posY = Math.floor(randomRange(-this.distance, this.distance));

    if (this.appleSpawn != null) this.appleSpawn.setPosition(posX, posY);
  }
}
