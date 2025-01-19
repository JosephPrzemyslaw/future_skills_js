import { Circle } from "./figures/circle.js";
import { Rect } from "./figures/rect.js";

export default {
    mountingPointId: "mountingPoint",
    canvas: {
        width: 800,
        height: 600,
    },
    figures: {
        circle: {
            elNo: 100,
            maxRadius: 50,
            createRandom: Circle.createRandom,
        },
        rect: {
            elNo: 80,
            maxWidth: 50,
            maxHeight: 50,
            createRandom: Rect.createRandom,
        },
    },
    colors: ["red", "green", "blue", "yellow", "black", "white", "pink", "purple"],
}