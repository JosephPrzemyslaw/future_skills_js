import cfg from "../cfg.js";
import { Shape } from "./shape.js";

export class Rect extends Shape {
    #width;
    #height;

    static createRandom() {
        const x = Math.round(Math.random() * cfg.canvas.width);
        const y = Math.round(Math.random() * cfg.canvas.height);
        const w = Math.round(Math.random() * cfg.figures.rect.maxWidth);
        const h = Math.round(Math.random() * cfg.figures.rect.maxHeight);
        const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];

        return new Rect(x, y, color, w, h);
    }

    constructor(x, y, color, width, height) {
        super(x, y, color);
        this.#width = width;
        this.#height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.rect(this.x, this.y, this.#width, this.#height);
        ctx.stroke();
        ctx.closePath();
    }
};
