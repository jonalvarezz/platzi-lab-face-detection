import { Option } from "./Option";

export class BoundingBoxOption extends Option {
  draw(canvasContext, face) {
    if (!this.isEnabled) {
      return this;
    }

    const { width, height, yMin: top, xMin: left } = face.box;

    ctx.strokeStyle = "#ffc600";
    ctx.lineWidth = 2;
    ctx.strokeRect(left, top, width, height);

    return this;
  }
}
