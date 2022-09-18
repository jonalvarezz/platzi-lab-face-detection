import h from "hyperscript";

export class Option {
  name = "";
  label = "";
  element = null;

  /**
   *
   * @param {string} name
   * @param {string} label
   * @param {HTMLElement} container
   */
  constructor(name, label, container = null) {
    this.name = name;
    this.label = label;

    if (container) {
      this.render(container);
    }
  }

  /**
   * Render the filter options
   * @param {HTMLElement} container
   */
  render(container) {
    const label = h(
      "label.ml-3.text-sm.text-gray-600",
      { htmlFor: `js-option-${this.name}` },
      this.label
    );

    const input = h("input", {
      id: `js-option-${this.name}`,
      name: this.name,
      value: this.name,
      type: "checkbox",
      className:
        "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500",
    });

    this.element = input;

    container.appendChild(h("div.flex.items-center", input, label));
  }

  /**
   * Draw the filter on the canvas
   * @param {CanvasRenderingContext2D} canvasContext
   */
  draw(canvasContext, face) {
    throw new Error("Not implemented");
  }

  isEnabled() {
    return this.element.checked;
  }
}
