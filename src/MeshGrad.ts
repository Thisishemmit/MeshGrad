export interface MeshGradContexts {
    conatainer: HTMLDivElement;
    canvas: HTMLCanvasElement;
    gl: CanvasRenderingContext2D | WebGLRenderingContext | WebGL2RenderingContext | null;
}
class MeshGrad {
    private contexts: MeshGradContexts;
    constructor(container: HTMLDivElement) {
        this.contexts = {
            conatainer: container,
            canvas: document.createElement('canvas'),
            gl: null
        }
        this.init();
    }
    public getContexts(): MeshGradContexts {
        return this.contexts
    }
    private init(): void {
        if (this.contexts.conatainer.querySelector('canvas')) {
            return
        }
        this.contexts.gl = this.contexts.canvas.getContext('2d')
        console.log("hello from MeshGrad");

        this.contexts.conatainer.appendChild(this.contexts.canvas)
        this.setupStyles()
    }

    private setupStyles(): void {
        this.contexts.conatainer.style.position = 'relative'
        this.contexts.canvas.style.position = 'absolute'
        this.contexts.canvas.style.top = '0'
        this.contexts.canvas.style.left = '0'
        this.contexts.canvas.width = this.contexts.conatainer.clientWidth
        this.contexts.canvas.height = this.contexts.conatainer.clientHeight
       // this.contexts.canvas.style.zIndex = '-1'
    }

    public getCanvas(): HTMLCanvasElement {
        return this.contexts.canvas
    }
}

export default MeshGrad;
