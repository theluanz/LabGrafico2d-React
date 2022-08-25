import { IObject2d } from '../IObject2d';

export class Line implements IObject2d {
  name: string;
  x: number;
  y: number;

  constructor({ x, y, name }: { x: number; y: number; name: string }) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  draw(): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
}
