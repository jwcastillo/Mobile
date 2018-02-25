class Path {
  constructor() {
    this.clear();
  }

  clear() {
    this.path = '';
  }

  moveTo(x, y) {
    this.path = `${this.path} M ${x} ${y}`;
    return this;
  }

  lineTo(x, y) {
    this.path = `${this.path} L ${x} ${y}`;
    return this;
  }

  curveTo(x1, y1, x2, y2, x, y) {
    this.path = `${this.path} C ${x1} ${y1} ${x2} ${y2} ${x} ${y}`;
    return this;
  }

  append(path) {
    this.path = `${this.path} ${path.result ? path.result() : ''}`;
    return this; 
  }

  result() {
    return `${this.path} Z`;
  }
}

export { Path }; 

