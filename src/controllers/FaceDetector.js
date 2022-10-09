import "@mediapipe/face_detection";
import "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import * as faceDetection from "@tensorflow-models/face-detection";

import { Logger } from "../utils/log";

const logger = new Logger("detector");

export class FaceDetector {
  enabled = true;
  /**
   * @type {import("@tensorflow-models/face-detection").FaceDetector} detector
   */
  detector = null;
  /**
   * @type {HTMLVideoElement | HTMLImageElement}
   */
  media = null;

  /**
   * @param {HTMLVideoElement | HTMLImageElement} media
   */
  constructor(media) {
    this.media = media;
  }

  /**
   *
   * @param {Object} options
   * @param {number} options.maxFaces - Maximum number of faces to detect
   *
   * @returns {Promise<FaceDetector>}
   */
  async init({ maxFaces = 5 } = {}) {
    logger.log(`Initializing face detector with ${maxFaces} max faces`);
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      maxFaces,
      runtime: "mediapipe",
      solutionPath: "node_modules/@mediapipe/face_detection",
    };

    const detector = await faceDetection.createDetector(model, detectorConfig);
    this.detector = detector;

    return this;
  }

  async detect() {
    if (!this.detector) {
      throw new Error("Face detector not initialized");
    }

    logger.log("Detecting faces...");
    const estimationConfig = { flipHorizontal: false };

    const faces = await this.detector.estimateFaces(
      this.media,
      estimationConfig
    );
    logger.log(`Found ${faces.length} faces`);

    return faces;
  }

  subscribe(callback) {
    if (!this.detector) {
      throw new Error("Face detector not initialized");
    }

    this.detect(this.media).then(callback);

    if (this.enabled) {
      window.requestAnimationFrame(this.subscribe.bind(this, callback));
    }

    return this;
  }

  unsubscribe() {
    this.enabled = false;
  }
}
