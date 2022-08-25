export interface IObject2d {
  name: string;
  x: number;
  y: number;

  draw(): void;
  delete(): void;
}
