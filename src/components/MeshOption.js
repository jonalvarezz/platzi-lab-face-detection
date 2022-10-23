import { Option } from "./Option";

export class MeshOption extends Option {
  /**
   * @param {CanvasRenderingContext2D} canvasContext
   * @param {Face} face
   */
  draw(canvasContext, face) {
    if (!this.isEnabled()) {
      return this;
    }

    const [rightEye, leftEye, noseTip, mouthCenter, rightEar, leftEar] =
      face.keypoints;

    canvasContext.beginPath();
    canvasContext.moveTo(leftEye.x, leftEye.y);
    canvasContext.lineTo(rightEye.x, rightEye.y);
    canvasContext.lineTo(rightEar.x, rightEar.y);
    canvasContext.lineTo(mouthCenter.x, mouthCenter.y);
    canvasContext.lineTo(leftEar.x, leftEar.y);
    canvasContext.lineTo(leftEye.x, leftEye.y);

    canvasContext.moveTo(noseTip.x, noseTip.y);
    canvasContext.lineTo(leftEye.x, leftEye.y);
    canvasContext.moveTo(noseTip.x, noseTip.y);
    canvasContext.lineTo(rightEye.x, rightEye.y);

    canvasContext.strokeStyle = "#ffc600";
    canvasContext.lineWidth = 2;
    canvasContext.stroke();

    return this;
  }
}
