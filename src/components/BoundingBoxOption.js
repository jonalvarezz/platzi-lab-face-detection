import { Option } from "./Option";

export class BoundingBoxOption extends Option {
  draw(canvasContext, face) {
    if (!this.isEnabled) {
      return this;
    }

    const { width, height, yMin: top, xMin: left } = face.box;

    canvasContext.strokeStyle = "#ffc600";
    canvasContext.lineWidth = 2;
    canvasContext.strokeRect(left, top, width, height);

    return this;
  }
}
