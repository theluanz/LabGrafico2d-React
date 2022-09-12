import { useEffect, useRef, useState } from 'react';
import { DisplayItem } from './components/DisplayItem/DisplayItem';
import { Input } from './components/Input/Input';
import './index.css';
import { Linha } from './models/implementations/Linha';
import { Polilinha } from './models/implementations/Polilinha';
import { Ponto } from './models/implementations/Ponto';
import { IObject2d } from './models/IObject2d';

function App() {
  const [nomeObjeto, setNomeObjeto] = useState('');
  const [typeObjeto, setTypeObjeto] = useState('linha');
  const [objetos, setObjetos] = useState<IObject2d[]>([]);
  useEffect(() => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let ctx = canvas.getContext('2d');
    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    ctx!.beginPath();
    ctx!.lineWidth = 1;
    ctx!.moveTo(0, 0);
    objetos.map((objeto) => {
      if (objeto.type === 'linha' || objeto.type === 'polilinha') {
        for (let i = 0; i < objeto.x.length; i++) {
          ctx!.moveTo(objeto.x[i], objeto.y[i]);
          ctx!.lineTo(objeto.x[i + 1], objeto.y[i + 1]);
        }
        if (objeto.isPoligono) {
          ctx!.moveTo(objeto.x[-1], objeto.y[-1]);
          ctx!.lineTo(objeto.x[0], objeto.y[0]);
          
        }
      } else {
        for (let i = 0; i < objeto.x.length; i++) {
          ctx!.fillRect(objeto.x[i], objeto.y[i],1,1);
        }
      }
    });
    // ctx!.beginPath();
    // ctx!.fill();

    ctx!.stroke();
  }, [objetos]);

  function addNewObject() {
    if (typeObjeto === 'linha') {
      const newObject = new Linha({ name: nomeObjeto });
      setObjetos([...objetos, newObject]);
    } else if (typeObjeto === 'polilinha') {
      const newObject = new Polilinha({ name: nomeObjeto });
      setObjetos([...objetos, newObject]);
    } else {
      const newObject = new Ponto({ name: nomeObjeto });
      setObjetos([...objetos, newObject]);
    }
  }
  function addNewPoint(Object2d: IObject2d, x: number, y: number) {
    Object2d.addPoint(+x, +y);
    setObjetos([...objetos]);
  }
  function updateIsPoligono(Object2d: IObject2d) {
    Object2d.isPoligono = !Object2d.isPoligono;
    setObjetos([...objetos]);
  }

  function removeItem(objeto: IObject2d) {
    setObjetos(objetos.filter((item: IObject2d) => item !== objeto));
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-2">
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <canvas
            id="canvas"
            className="w-full border border-gray-400 rounded-lg shadow-lg"></canvas>
          
        </div>
        <div className="col-span-1 h-full">
          <div className="flex gap-2">
            <Input value={nomeObjeto} setValue={setNomeObjeto} type="text" id="nome">
              Adicionar Objeto
            </Input>
            <select
              className="h-fit  self-end p-2 rounded-md"
              value={typeObjeto}
              onChange={(e) => setTypeObjeto(e.target.value)}>
              <option value="linha">Linha</option>
              <option value="polilinha">Polilinha</option>
              <option value="ponto">Ponto</option>
            </select>
          </div>

          <div className="w-full flex justify-between">
            <button
              className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors"
              onClick={addNewObject}>
              Adicionar
            </button>
          </div>

          <div className="bg-slate-50 border p-4 mt-4">
            {objetos.map((objeto: IObject2d) => {
              return (
                <DisplayItem
                  item={objeto}
                  removeItem={() => removeItem(objeto)}
                  addPoint={addNewPoint}
                  updateIsPoligono={updateIsPoligono}
                  key={objeto.name}
                />
              );
            })}
          </div>

          <div>
            <div className="flex gap-1">
              <button className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors">
                Up
              </button>
              <button className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors">
                Right
              </button>
              <button className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors">
                Left
              </button>
              <button className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors">
                Down
              </button>
            </div>
            <div className="flex gap-1">
              <button className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors">
                Zoom In
              </button>
              <button className="px-4 py-2 mt-2 bg-blue-400 shadow  text-blue-900 rounded-lg hover:bg-blue-500hover:text-white hover:shadow-lg transition-colors">
                Zoom Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
