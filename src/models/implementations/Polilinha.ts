import { IObject2d } from '../IObject2d';

export class Polilinha implements IObject2d {
  name: string;
  x: number[] = [];
  y: number[] = [];
  isPoligono: boolean = false;
  type: string = 'polilinha';

  constructor({ name }: { name: string }) {
    this.name = name;
  }

  draw(): void {
    throw new Error('Method not implemented.');
  }
  delete(): void {
    throw new Error('Method not implemented.');
  }
  addPoint(x: number, y: number): void {
    this.x.push(x);
    this.y.push(y);
  }
}
