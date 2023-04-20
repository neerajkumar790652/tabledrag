import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialData = [
  { id: 1, name: 'iPhone', mobile: '0123456789', location: 'USA' },
  { id: 2, name: 'Samsung', mobile: '0987654321', location: 'Korea' },
  { id: 3, name: 'Nokia', mobile: '1234567890', location: 'Finland' },
  { id: 4, name: 'Xiaomi', mobile: '9876543210', location: 'China' },
];

const App = () => {
  const [data, setData] = useState(initialData);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
  };

  const handleDelete = (id) => {
    const items = data.filter((item) => item.id !== id);
    setData(items);
  };

  const handleReset = () => {
    setData(initialData);
  };

  return (
    // <div className='container'>
    <DragDropContext  onDragEnd={handleDragEnd}>
      <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Location</th>
            <th></th>
          </tr>
        </thead>
        <Droppable droppableId="data">
          {(provided) => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <tr
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <td>{item.name}</td>
                      <td>{item.mobile}</td>
                      <td>{item.location}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                      </td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
      <button onClick={handleReset}>Reset Order</button>
    </DragDropContext>
    // </div>
  );
};

export default App;
