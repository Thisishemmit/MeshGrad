interface MeshGradContexts {
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
    private init(): void {
        if (this.contexts.conatainer.querySelector('canvas')) {
            return
        }

        this.contexts.gl = this.contexts.canvas.getContext('2d')
        this.contexts.conatainer.appendChild(this.contexts.canvas)
        this.setupStyles()
    }

    private setupStyles(): void {
        this.contexts.conatainer.style.position = 'relative'
        this.contexts.canvas.style.position = 'absolute'
        this.contexts.canvas.style.top = '0'
        this.contexts.canvas.style.left = '0'
        this.contexts.canvas.style.width = '100%'
        this.contexts.canvas.style.height = '100%'
        this.contexts.canvas.style.zIndex = '-1'
    }

    public getCanvas(): HTMLCanvasElement {
        return this.contexts.canvas
    }
}