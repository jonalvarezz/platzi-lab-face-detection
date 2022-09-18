import { Option } from "./Option";

export class MeshOption extends Option {
  draw(canvasContext, face) {
    if (!this.isEnabled) {
      return this;
    }

    const [rightEye, leftEye, noseTip, mouthCenter, rightEar, leftEar] =
      face.keypoints;

    ctx.beginPath();
    ctx.moveTo(leftEye.x, leftEye.y);
    ctx.lineTo(rightEye.x, rightEye.y);
    ctx.lineTo(rightEar.x, rightEar.y);
    ctx.lineTo(mouthCenter.x, mouthCenter.y);
    ctx.lineTo(leftEar.x, leftEar.y);
    ctx.lineTo(leftEye.x, leftEye.y);

    ctx.moveTo(noseTip.x, noseTip.y);
    ctx.lineTo(leftEye.x, leftEye.y);
    ctx.moveTo(noseTip.x, noseTip.y);
    ctx.lineTo(rightEye.x, rightEye.y);

    ctx.strokeStyle = "#ffc600";
    ctx.lineWidth = 2;
    ctx.stroke();

    return this;
  }
}
