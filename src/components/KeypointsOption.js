import { Option } from "./Option";

const RADIUS = 4;
const COLOR = "#E2FFC6";

export class KeypointsOption extends Option {
  /**
   * Draw the filter on the canvas
   * @param {CanvasRenderingContext2D} canvasContext
   * @param {import("@tensorflow-models/face-detection").Face} face
   */
  draw(canvasContext, face) {
    if (!this.isEnabled()) {
      return this;
    }

    const { keypoints } = face;

    keypoints.forEach(({ x, y }) => {
      canvasContext.beginPath();
      canvasContext.arc(x, y, RADIUS, 0, 2 * Math.PI);
      canvasContext.fillStyle = COLOR;
      canvasContext.fill();
    });

    return this;
  }
}
