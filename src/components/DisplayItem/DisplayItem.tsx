import { useEffect, useState } from 'react';
import { IObject2d } from '../../models/IObject2d';
import { CheckBox } from '../CheckBox/CheckBox';
import { Input } from '../Input/Input';
import { Transform } from '../Transform/Transform';

interface IProps {
  item: IObject2d;
  removeItem: (objeto: IObject2d) => void;
  addPoint: (objeto: IObject2d, x: number, y: number) => void;
  updateIsPoligono: (objeto: IObject2d) => void;
  updateObject: (objeto: IObject2d) => void;
}
function DisplayItem({ item, removeItem, addPoint, updateIsPoligono, updateObject }: IProps) {
  const [editMode, setEditMode] = useState(false);
  const [isPoligono, setIsPoligono] = useState(item.isPoligono);
  const [newX, setNewX] = useState(0);
  const [newY, setNewY] = useState(0);

  

  useEffect(() => {
    updateIsPoligono(item);
  }, [isPoligono]);

  return (
    <div>
      <div className="flex justify-between self-center snap-center pb-2 border-b mt-2">
        <p>
          {item.type} - {item.name}
          {item.isPoligono && ' (Polígono)'}
        </p>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-red-400 shadow  text-red-900 rounded-lg hover:bg-red-500 hover:text-white hover:shadow-lg transition-colors"
            onClick={() => removeItem(item)}>
            Delete
          </button>
          {!editMode && (
            <button
              className="px-4 py-2 bg-green-400 shadow  text-green-900 rounded-lg hover:bg-green-500 hover:text-white hover:shadow-lg transition-colors"
              onClick={() => setEditMode(true)}>
              Editar
            </button>
          )}
          {editMode && (
            <button
              className="px-4 py-2 bg-purple-400 shadow  text-purple-900 rounded-lg hover:bg-purple-500 hover:text-white hover:shadow-lg transition-colors"
              onClick={() => setEditMode(false)}>
              Fechar
            </button>
          )}
        </div>
      </div>
      {editMode && (
        <div className="flex gap-2 flex-col">
          {item.type === 'polilinha' && (
            <CheckBox setValue={setIsPoligono} value={isPoligono} id={item.name}>
              Poligono
            </CheckBox>
          )}
          {(item.type === 'polilinha' ||
            (item.type === 'linha' && item.x.length < 2) ||
            (item.type === 'ponto' && item.x.length < 1)) && (
            <div>
              <Input type="number" value={newX} setValue={setNewX} id="x">
                Valor de X
              </Input>
              <Input type="number" value={newY} setValue={setNewY} id="y">
                Valor de Y
              </Input>
              <button
                onClick={() => addPoint(item, newX, newY)}
                className="mt-2 px-4 py-2 bg-purple-400 shadow  text-purple-900 rounded-lg hover:bg-purple-500 hover:text-white hover:shadow-lg transition-colors">
                Adicionar Ponto
              </button>
            </div>
          )}
          <div>
            <p>Pontos cadastrados</p>
            <ul>
              {item.x.map((point, index) => (
                <li key={index}>
                  X {item.x[index]} - Y{item.y[index]}
                </li>
              ))}
            </ul>
          </div>
          <Transform updateObject={updateObject} item={item}/>
        </div>
      )}
    </div>
  );
}

export { DisplayItem };
