import { MeshOption } from "./components/MeshOption";
import { KeypointsOption } from "./components/KeypointsOption";
import { BoundingBoxOption } from "./components/BoundingBoxOption";

import { MyFilter } from "./components/MyFilter";

// Set up options
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
export const options = [mesh, keypoints, boundingBox];

// Set up filters
const filtersContainer = document.querySelector("#js-filters");

const myFilter = new MyFilter("my-filter", "My filter", filtersContainer);
export const filters = [myFilter];
