import cfg from "./cfg.js";

class CanvasFigures {
    #mountingPointId;
    #canvas;

    constructor() {
        this.#mountingPointId = cfg.mountingPointId;
        this.#addCanvas(this.#createCanvas())
        this.#drawShapes();
    }

    #getCtx() {
        return this.#canvas.getContext('2d');
    }

    #createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.width = cfg.canvas.width;
        canvas.height = cfg.canvas.height;
        this.#canvas = canvas;

        return canvas;
    }

    #addCanvas(canvas) {
        const moutningPoint = document.getElementById(this.#mountingPointId);
        moutningPoint.appendChild(canvas);
    }

    #drawShapes() {
        const shapeNames = Object.keys(cfg.figures);
        for(let shapeName of shapeNames) {
            const shapeDef = cfg.figures[shapeName];
            for(let i = 0; i < shapeDef.elNo; i++) {
                const shape = shapeDef.createRandom();
                shape.draw(this.#getCtx());
            }
        }
    }
}

new CanvasFigures;
