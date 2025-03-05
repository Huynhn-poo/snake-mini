import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClashObject')
export class ClashObject extends Component {
    
    
    protected onEnable(): void {
        
    }
    
    start() {
        const collider = this.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    }
    
    private  onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D,  contact: IPhysics2DContact | null) {
        console.log('onCollisionEnter', selfCollider.node.name, otherCollider.node.name,otherCollider.group);

        if(otherCollider.group==2)
        {
            otherCollider.node.destroy();
        }
    }
   
    update(deltaTime: number) {
        
    }
}


