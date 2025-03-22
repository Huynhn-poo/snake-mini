import { _decorator, Component, Node, Toggle, ToggleContainer } from "cc";
import { GameManager } from "./GameManager";
const { ccclass, property } = _decorator;

@ccclass("DifficutllyGame")
export class DifficutllyGame extends Component {
  toggleContainer: ToggleContainer = null;
  toggle: Toggle[] = [];

  protected onEnable(): void {
    this.toggleContainer = this.getComponent(ToggleContainer);
    if (this.toggleContainer) {
      this.toggle = this.toggleContainer.getComponentsInChildren(Toggle);
      this.registerToggleEvents();
    } else {
      console.error("Không tìm thấy ToggleContainer!");
    }
  }

  registerToggleEvents(): void {
    if (this.toggle) {
      this.toggle.forEach((toggle) => {
        toggle.node.on("toggle", this.onToggleChanged, this);
      });
    }
  }

  onToggleChanged(toggle: Toggle) {
    // if (toggle.isChecked) {
    //   //Thực hiện hành động khi Toggle được chọn.
    //   console.log("Toggle changed", toggle.isChecked, toggle.node.name);
    // }

    switch (toggle.node.name) {
      case "Toggle1":
        console.log("Easy");

        GameManager.getInstance().setSpeed(10);
        break;
      case "Toggle2":
        GameManager.getInstance().setSpeed(40);
        break;
      case "Toggle3":
        GameManager.getInstance().setSpeed(100);
        break;
      default:
        console.log("lỗi không xác định");
        break;
    }
  }

  start() {}

  update(deltaTime: number) {}
}
