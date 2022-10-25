import { useState } from 'react';
import { IObject2d } from '../../models/IObject2d';
import { Input } from '../Input/Input';

interface IProps {
  updateObject: (objeto: IObject2d) => void;
  item: IObject2d;
}

function Transform({ updateObject, item }: IProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [translacaoDx, setTranslacaoDx] = useState(0);
  const [translacaoDy, setTranslacaoDy] = useState(0);

  const [typeRotacao, setTypeRotacao] = useState(0);
  const [rotacaoAngulo, setRotacaoAngulo] = useState(0);

  const [escalonamentoSx, setEscalonamentoSx] = useState(0);
  const [escalonamentoSy, setEscalonamentoSy] = useState(0);

  function translate(dx: number, dy: number) {
    item.x = item.x.map((x) => +x + +dx);
    item.y = item.y.map((y) => +y + +dy);
    updateObject(item);
  }
  function rotate(angulo: number) {
    const xOldValues = [...item.x];
    const yOldValues = [...item.y];

    function calculeX(x: number, y: number, angulo: number): number {
      const radians = +((Math.PI / 180) * angulo).toFixed(5);
      // const radians = angulo

      console.log(
        `X = (${x} * ${+Math.cos(radians).toFixed(4)}) - (${y} * ${Math.sin(radians).toFixed(4)})= ${+(x * +Math.cos(radians).toFixed(5) - y * +Math.sin(radians).toFixed(4)).toFixed(4)}`,
      );

      return +(x * +Math.cos(radians).toFixed(5) - y * +Math.sin(radians).toFixed(4)).toFixed(4);
    }

    function calculeY(x: number, y: number, angulo: number): number {
      const radians = +((Math.PI / 180) * angulo).toFixed(5);
      // const radians = angulo
      console.log(
        `Y = (${x} * ${+Math.sin(radians).toFixed(4)}) + (${y} * ${Math.cos(radians).toFixed(4)})= ${+(x * +Math.sin(radians).toFixed(4) + y * +Math.cos(radians).toFixed(4)).toFixed(4)}`,
      );
      return +(x * +Math.sin(radians).toFixed(4) + y * +Math.cos(radians).toFixed(4)).toFixed(4);
    }

    item.x = item.x.map((x, index) => calculeX(+xOldValues[index], +yOldValues[index], +angulo));
    item.y = item.y.map((y, index) => calculeY(+xOldValues[index], +yOldValues[index], +angulo));
    updateObject(item);
  }
  function escale(sx: number, sy: number) {
    item.x = item.x.map((x) => +x * +sx);
    item.y = item.y.map((y) => +y * +sy);
    updateObject(item);
  }

  return (
    <section className="bg-slate-200 p-2">
      {!isEnabled ? (
        <button
          className="w-full  px-4 py-2 bg-gray-400 shadow  text-gray-900 rounded-lg hover:bg-gray-500 hover:text-white hover:shadow-lg transition-colors"
          onClick={() => setIsEnabled(true)}>
          Transformar Objeto
        </button>
      ) : (
        <div>
          <div className="flex flex-row  justify-between">
            <button
              className={
                `${activeTab === 0 ? 'bg-gray-500 text-white' : 'bg-white'}` +
                ' border p-2 shadow-sm'
              }
              onClick={() => setActiveTab(0)}>
              Translação
            </button>
            <button
              className={
                `${activeTab === 1 ? 'bg-gray-500 text-white' : 'bg-white'}` +
                ' border p-2 shadow-sm'
              }
              onClick={() => setActiveTab(1)}>
              Rotação
            </button>
            <button
              className={
                `${activeTab === 2 ? 'bg-gray-500 text-white' : 'bg-white'}` +
                ' border p-2 shadow-sm w-full'
              }
              onClick={() => setActiveTab(2)}>
              Escalonamento
            </button>
          </div>
          <div>
            {activeTab === 0 && (
              <div>
                <h3 className="my-2 text-md font-bold">Valor de Translação</h3>
                <Input value={translacaoDx} setValue={setTranslacaoDx} type="number" id="nome">
                  Dx
                </Input>
                <Input value={translacaoDy} setValue={setTranslacaoDy} type="number" id="nome">
                  Dy
                </Input>
                <button
                  className="px-4 py-2 mt-2 bg-green-400 shadow  text-green-900 rounded-lg hover:bg-green-500 transition-colors"
                  onClick={() => translate(translacaoDx, translacaoDy)}>
                  Aplicar
                </button>
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <h3 className="my-2 text-md font-bold">Valor de Rotação</h3>
                <Input value={rotacaoAngulo} setValue={setRotacaoAngulo} type="number" id="nome">
                  Ângulo de Rotação
                </Input>
                <button
                  className="px-4 py-2 mt-2 bg-green-400 shadow  text-green-900 rounded-lg hover:bg-green-500 transition-colors"
                  onClick={() => rotate(rotacaoAngulo)}>
                  Aplicar
                </button>
              </div>
            )}
            {activeTab === 2 && (
              <div>
                <h3 className="my-2 text-md font-bold">Valor de Escalonamento</h3>
                <Input
                  value={escalonamentoSx}
                  setValue={setEscalonamentoSx}
                  type="number"
                  id="nome">
                  Sx
                </Input>
                <Input
                  value={escalonamentoSy}
                  setValue={setEscalonamentoSy}
                  type="number"
                  id="nome">
                  Sy
                </Input>
                <button
                  className="px-4 py-2 mt-2 bg-green-400 shadow  text-green-900 rounded-lg hover:bg-green-500 transition-colors"
                  onClick={() => escale(escalonamentoSx, escalonamentoSy)}>
                  Aplicar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
export { Transform };
