export class Filter {
  /**
   * Draw the filter on the canvas
   * @abstract
   * @param {CanvasRenderingContext2D} canvasContext
   */
  draw(canvasContext, face) {
    throw new Error("Not implemented");
  }
}
