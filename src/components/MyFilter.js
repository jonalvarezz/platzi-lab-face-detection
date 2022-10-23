import { Option } from "./Option";

export class MyFilter extends Option {
  draw(canvasContext, face) {
    if (!this.isEnabled()) {
      return this;
    }

    // @todo: implement your filter here
    console.log("Hey, hey, hey!");

    return this;
  }
}
