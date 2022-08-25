import { useState } from 'react';
import { Button } from './components/Button/Button';
import { CheckBox } from './components/CheckBox/CheckBox';
import { Input } from './components/Input/Input';
import './index.css';
import { Line } from './models/implementations/Line';
import { IObject2d } from './models/IObject2d';

function App() {
  const [objetos, setObjetos] = useState<any>([]);
  const [valueofX, setValueofX] = useState<number>(0);
  const [isPoligono, setIsPoligono] = useState(true);
  
  function addNewObject(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const newObject = new Line({
      x: +valueofX,
      y: +valueofX,
      name: valueofX.toString(),
    });  
    setObjetos([...objetos, newObject]);
  }
  function foo(){
    console.log('objetos');
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-2">
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <canvas
            id="canvas"
            className="w-full border border-gray-400 rounded-lg shadow-lg"></canvas>
          <div className="w-full flex justify-between">
            <Button>Desenhar</Button>
            <Button>Limpar</Button>
          </div>
        </div>
        <div className="col-span-1 h-full">
          <form className="flex flex-col gap-y-2">
            <Input value={valueofX} setValue={setValueofX} type="number" id="x">
              Valor de X
            </Input>
            <CheckBox id="poligono" value={isPoligono} setValue={setIsPoligono}>
              Poligono 
            </CheckBox>
            <div>{
              objetos.map((objeto: IObject2d) => {
                return <div>{objeto.name}</div>
              })
              }</div>
            <div className="w-full flex justify-between">
              <Button onClick={() => foo()}>Adicionar</Button>
              <Button>Remover</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
