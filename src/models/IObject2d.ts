export interface IObject2d {
  name: string;
  x: number[];
  y: number[];
  isPoligono: boolean;
  type: string;


  draw(): void;
  delete(): void;
  addPoint(x: number, y: number): void;
}
