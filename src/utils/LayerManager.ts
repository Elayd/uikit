export class LayerManager {
    private layers: { close: () => void }[] = [];

    constructor() {
        this.init();
    }

    private init() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    destroy() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    private handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            this.closeLayer();
        }
    };

    addLayer(close: () => void) {
        this.layers.push({ close });
        // return () => {
        //     this.closeLayer();
        // };
    }

    closeLayer() {
        const latestLayer = this.layers.pop();
        latestLayer?.close();
    }
}

export const layerManager = new LayerManager();
