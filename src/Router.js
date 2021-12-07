export class Router {
  constructor(x, y, w, h, closestRouters = []) {
    this.x = x - w / 2;
    this.y = y;
    this.w = w;
    this.h = h;
    this.entrancePoint = { x: x, y: y + h / 2 };
    this.closestRouters = closestRouters;
  }
}
