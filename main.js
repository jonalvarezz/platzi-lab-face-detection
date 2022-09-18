import "./src/plugins";

import { MeshOption } from "./src/components/MeshOption";
import { BoundingBoxOption } from "./src/components/BoundingBoxOption";

const optionsContainer = document.querySelector("#js-options");

const mesh = new MeshOption("mesh", "Mesh", optionsContainer);
const boundingBox = new BoundingBoxOption(
  "box",
  "Bounding box",
  optionsContainer
);
