export class Filter {
  /**
   * Draw the filter on the canvas
   * @abstract
   * @param {CanvasRenderingContext2D} canvasContext
   * @param {import("@tensorflow-models/face-detection").Face} face
   * @param {number} index
   */
  draw(canvasContext, face, index) {
    throw new Error("Not implemented");
  }
}
