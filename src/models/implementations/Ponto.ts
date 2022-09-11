import { IObject2d } from '../IObject2d';

export class Ponto implements IObject2d {
  name: string;
  x: number[] = [];
  y: number[] = [];
  isPoligono: boolean = false;
  type: string = 'ponto';

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
    this.x = [x];
    this.y = [y];
  }
}
