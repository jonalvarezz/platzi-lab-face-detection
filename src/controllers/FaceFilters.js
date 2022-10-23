import { Filter } from "./Filter";

export class FaceFilters {
  /**
   * @type {Array<Filter>} Collection of filters
   */
  filters = [];

  /**
   * @type {HTMLCanvasElement} canvas
   */
  canvas = null;
  /**
   * @type {CanvasRenderingContext2D} canvas' context
   */
  canvasContext = null;

  /**
   * @param {HTMLCanvasElement} canvas
   * @param {Array<Filter>} filters
   */
  constructor(canvas, filters) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext("2d");
    this.filters = filters.map(this.validateFilter);
  }

  /**
   * @param {Array<import("@tensorflow-models/face-detection").Face>} faces
   */
  render(faces) {
    this.clear();
    faces.forEach((face, index) => {
      this.filters.forEach((filter) =>
        filter.draw(this.canvasContext, face, index)
      );
    });
  }

  /**
   *
   * @param {Filter} filter
   * @returns Filter
   */
  validateFilter = (filter) => {
    if (!(filter instanceof Filter)) {
      throw new Error("Invalid filter", filter);
    }

    return filter;
  };

  /**
   * Clear the canvas from any drew filters
   */
  clear() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
