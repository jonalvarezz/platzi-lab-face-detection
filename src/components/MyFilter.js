import { Option } from "./Option";

export class MyFilter extends Option {
  /**
   * Draw the filter on the canvas
   * @param {CanvasRenderingContext2D} canvasContext
   * @param {import("@tensorflow-models/face-detection").Face} face
   * @param {number} index
   */
  draw(canvasContext, face, index) {
    if (!this.isEnabled()) {
      return this;
    }

    // @todo: implement your filter here
    console.log("Hey, hey, hey!");

    return this;
  }
}
