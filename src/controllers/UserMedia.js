const defaultOptions = {
  /**
   * @type {"video" | "image"}
   */
  type: "video",
  /**
   * The image source when type is "image"
   */
  src: "",
  /**
   * Hook to customize the canvas element.
   * @param {HTMLCanvasElement} canvas
   * @returns HTMLCanvasElement
   */
  onCanvasCreated: (canvas) => canvas,
};

export class UserMedia {
  /**
   * @type {HTMLVideoElement | HTMLImageElement} media
   */
  media = null;
  /**
   * @type {HTMLCanvasElement} canvas
   */
  canvas = null;

  getCanvas = () => this.canvas;
  getMedia = () => this.media;

  /**
   * @param {HTMLElement} container - Container element to append the media to
   */
  constructor(container, options = defaultOptions) {
    this.container = container;
    this.options = { ...defaultOptions, ...options };

    if (!options || !options.type) {
      throw new Error("Media type not specified");
    }

    if (options.type === "image" && !options.src) {
      throw new Error("Image source not specified");
    }

    // if (options.type === "video") {
    //   throw new Error("Video media not supported yet");
    // }

    // create canvas and video element on the given container
    this.media = document.createElement(
      options.type === "video" ? "video" : "img"
    );
    this.canvas = this.options.onCanvasCreated(
      document.createElement("canvas")
    );

    this.container.append(this.media, this.canvas);
  }

  /**
   * @returns {Promise<HTMLVideoElement | HTMLImageElement>}
   */
  async init() {
    if (this.options.type === "image") {
      this.media.src = this.options.src;
      this.media.onload = () => {
        this.canvas.width = this.media.width;
        this.canvas.height = this.media.height;

        if (
          this.media.width !== this.media.naturalWidth ||
          this.media.height !== this.media.naturalHeight
        ) {
          console.warn(
            "Heads up: image is scaled. This may affect the face detecting results"
          );
        }
      };

      return this.media;
    }

    // TODO: Complete this for video support
    if (this.options.type === "video") {
      throw new Error("Video media not supported yet");

      return this.media;
    }

    throw new Error("Media type not supported");
  }
}
