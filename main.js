import "./src/plugins";

import { FaceDetector } from "./src/controllers/FaceDetector";

import { MeshOption } from "./src/components/MeshOption";
import { KeypointsOption } from "./src/components/KeypointsOption";
import { BoundingBoxOption } from "./src/components/BoundingBoxOption";

const optionsContainer = document.querySelector("#js-options");

const mesh = new MeshOption("mesh", "Mesh", optionsContainer);
const keypoints = new KeypointsOption(
  "keypoints",
  "Keypoints",
  optionsContainer
);
const boundingBox = new BoundingBoxOption(
  "box",
  "Bounding box",
  optionsContainer
);
