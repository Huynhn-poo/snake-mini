import { _decorator, Component, director, find, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
  private static instance: GameManager = null;

  public static getInstance(): GameManager {
    return GameManager.instance;
  }

  private speed: number = 20;
  public getSpeed(): number {
    return this.speed;
  }

  public setSpeed(speed: number): void {
    this.speed= speed;  
  }

  private scoreTotal: number = 0;

  @property(Label)
  private scoreUI: Label = null;

  onLoad() {
    if (GameManager.instance != null && GameManager.instance != this) {
      this.node.destroy();
      return;
    } else {
      GameManager.instance = this;

      if (this.scoreUI == null) this.scoreUI = find("Canvas/UI_Score/Score/Label-Score").getComponent(Label);
      director.addPersistRootNode(this.node);
    }
  }
  start() {}

  update(deltaTime: number) {}

  public gameOver(): void {
    console.log("Game Over");

    director.loadScene("main", () => {
      console.log("Load main scene");

      this.scoreTotal = 0;
      if ((this.scoreUI != null)) this.scoreUI = find("Canvas/UI_Score/Score/Label-Score").getComponent(Label);
    });
  }

  public addScore(score: number): void {
    this.scoreTotal += score;

    console.log("Score: " + this.scoreTotal);
    this.scoreUI.string = this.scoreTotal.toString();
  }
}
