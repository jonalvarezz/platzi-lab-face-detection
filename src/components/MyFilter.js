import h from "hyperscript";
import { Option } from "./Option";

const offset = 80;

const imageUrls = [
  "filters/Vaporeon.webp",
  "filters/Sylveon.webp",
  "filters/squirtle.png",
  "filters/Slowpoke.webp",
  "filters/Pichu.webp",
  "filters/Misdreavus.webp",
  "filters/Meowth.webp",
  "filters/Glaceon.webp",
  "filters/Emolga.webp",
];

export class MyFilter extends Option {
  /**
   * @type {HTMLDivElement}
   */
  imagesContainer = null;
  /**
   * @type {HTMLCanvasElement}
   */
  faceToImageMap = {};

  /**
   *
   * @param {string} name
   * @param {string} label
   * @param {HTMLDivElement} container
   */
  constructor(name, label, container) {
    super(name, label, container);

    const images = imageUrls.map((url) =>
      h("img", {
        src: url,
      })
    );

    this.imagesContainer = h("div", { className: "hidden" }, ...images);
    document.body.appendChild(this.imagesContainer);
  }

  /**
   * Get a random image from our image container
   * @returns {HTMLImageElement}
   */
  getRandomImage() {
    const index = Math.floor(Math.random() * imageUrls.length);

    return this.imagesContainer.children[index];
  }

  /**
   * Get the image for the given face index.
   * If the face index is not found, we create a new image and store it in the map.
   *
   * heads-up: this is a naive implementation, more advanced solutions require face recognition capabilities
   * @param {number} index
   */
  getImageForFace(index) {
    if (!this.faceToImageMap[index]) {
      this.faceToImageMap[index] = this.getRandomImage();
    }

    return this.faceToImageMap[index];
  }

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

    const { width, height, yMin: top, xMin: left } = face.box;
    const [rightEye, leftEye, noseTip, mouthCenter, rightEar, leftEar] =
      face.keypoints;

    const image = this.getImageForFace(index);

    canvasContext.drawImage(
      image,
      left - offset * 0.5,
      top - offset * 0.6,
      width + offset,
      height + offset
    );

    return this;
  }
}
