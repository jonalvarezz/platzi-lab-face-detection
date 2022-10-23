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

  /**
   *
   * @param {HTMLVideoElement | HTMLImageElement} media
   * @returns {Promise<Array<import("@tensorflow-models/face-detection").Face>>}
   */
  async detect(media) {
    if (!this.detector) {
      throw new Error("Face detector not initialized");
    }

    logger.log("Detecting faces...");
    const estimationConfig = { flipHorizontal: false };

    const faces = await this.detector.estimateFaces(media, estimationConfig);
    logger.log(`Found ${faces.length} faces`);

    return faces;
  }

  /**
   * @param {HTMLVideoElement | HTMLImageElement} media
   * @param {(faces: Array<import("@tensorflow-models/face-detection").Face>) => void} callback
   */
  subscribe(media, callback) {
    if (!this.detector) {
      throw new Error("Face detector not initialized");
    }

    this.detect(media).then(callback);

    if (this.enabled) {
      window.requestAnimationFrame(this.subscribe.bind(this, media, callback));
    }

    return this;
  }

  /**
   * Stops the face detector
   */
  unsubscribe() {
    this.enabled = false;
  }
}
