import "./src/plugins";

import { FaceDetector } from "./src/controllers/FaceDetector";
import { UserMedia } from "./src/controllers/UserMedia";
import { FaceFilters } from "./src/controllers/FaceFilters";

import { MeshOption } from "./src/components/MeshOption";
import { KeypointsOption } from "./src/components/KeypointsOption";
import { BoundingBoxOption } from "./src/components/BoundingBoxOption";

// Set up the user media
const userMedia = new UserMedia(document.querySelector(".js-media-container"), {
  type: "image",
  src: "platzi.jpg",
  width: 640,
  height: 480,
  onCanvasCreated: (canvas) => {
    canvas.className = "absolute top-0 left-0 w-full h-full";
    return canvas;
  },
});

const faceDetector = new FaceDetector();

// Set up options/ filters
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

const filters = [mesh, keypoints, boundingBox];
const faceFilters = new FaceFilters(userMedia.getCanvas(), filters);

// Start the app
async function app() {
  const [media, _] = await Promise.all([userMedia.init(), faceDetector.init()]);

  faceDetector.subscribe(media, faceFilters.render.bind(faceFilters));
}
app();
