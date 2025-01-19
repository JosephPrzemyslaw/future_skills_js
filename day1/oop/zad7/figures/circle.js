import cfg from "../cfg.js";
import { Shape } from "./shape.js";

export class Circle extends Shape {
    constructor(x, y, color, radious) {
        super(x, y, color);
        this.radious = radious;
    }

    static createRandom() {
        const x = Math.round(Math.random() * cfg.canvas.width);
        const y = Math.round(Math.random() * cfg.canvas.height);
        const r = Math.round(Math.random() * cfg.figures.circle.maxRadius);
        const color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];

        return new Circle(x, y, color, r);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.radious, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }
};
