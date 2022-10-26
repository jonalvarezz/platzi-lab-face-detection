import "./src/plugins";

import { FaceDetector } from "./src/controllers/FaceDetector";
import { UserMedia } from "./src/controllers/UserMedia";
import { FaceFilters } from "./src/controllers/FaceFilters";

import { options, filters } from "./src/filters";

// Set up the user media
const userMedia = new UserMedia(document.querySelector(".js-media-container"), {
  type: "video",
  src: "platzi.jpg",
  onCanvasCreated: (canvas) => {
    canvas.className = "absolute top-0 left-0 w-full h-full";
    return canvas;
  },
});

const faceDetector = new FaceDetector();

// Set up options/ filters
const faceFilters = new FaceFilters(userMedia.getCanvas(), [
  ...options,
  ...filters,
]);

// Start the app
async function app() {
  const [media, _] = await Promise.all([userMedia.init(), faceDetector.init()]);

  faceDetector.subscribe(media, faceFilters.render.bind(faceFilters));
}
app();
