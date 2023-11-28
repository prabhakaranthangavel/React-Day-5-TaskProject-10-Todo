import React, { useState } from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';

import Button from 'react-bootstrap/Button';

const initialTodos = [
  { 
    id: 1, 
    name: 'Office Task-1', 
    description: 'this is the description for My first Task', 
    status: 'not completed' 
  },

  { 
    id: 2, 
    name: 'Office Task-2', 
    description: 'this is the description for My second Task', 
    status: 'completed' 
  },

  { 
    id: 3, 
    name: 'Office Task-3', 
    description: 'this is the description for My third Task', 
    status: 'not completed' 
  },
]

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = (name, description) => {
    const newTodo = {
      id: todos.length + 1,
      name,
      description,
      status: 'not completed',
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodoStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, status: newStatus } : todo));
    setTodos(updatedTodos);
  };

  const startEditing = (id) => {
    setEditingTodo(id);
  };

  const saveEdit = (id, newName, newDescription) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, name: newName, description: newDescription } : todo
    );
    setTodos(updatedTodos);
    setEditingTodo(null);
  };

  const filterTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter((todo) => todo.status === 'completed');
      case 'not completed':
        return todos.filter((todo) => todo.status === 'not completed');
      default:
        return todos;
    }
  };

  return (
    <div className="app">
      <h1>My todo</h1>
<div><br />
  <form
    className="todo-form"
    onSubmit={(e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const description = e.target.description.value;
      addTodo(name, description);
      e.target.reset();
    }}
  >
    <div className="input-row">
      <label htmlFor="name"></label>
      <input type="text" id="name" name="name" placeholder="Todo Name" required />
      <label htmlFor="description"></label>
      <input type="text" id="description" name="description" placeholder="Todo Description" required />
      <Button variant="success" type="submit">Add Todo</Button>
    </div>
  </form>
</div><br /><br />
      <div className="todos">
  <h2>My Todos</h2>
  <div className="filter">
    <label htmlFor="filter"><b>Status Filter :</b></label>
    <select id="filter" onChange={(e) => setFilter(e.target.value)} style={{
    backgroundColor: filter === 'all' ? 'black' : 'initial', // Set to red if 'all' is selected
    color: 'white', // Set text color to white
  }}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="not completed">Not Completed</option>
    </select>
  </div>  
</div><br /><br />
<div className="todo-cards">
        {filterTodos().map((todo) => (
          <div className="todo-card" key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <label htmlFor={`editName${todo.id}`}>Edit Name:</label>
                <input type="text" id={`editName${todo.id}`} defaultValue={todo.name} />
                <label htmlFor={`editDescription${todo.id}`}>Edit Description:</label>
                <input type="text" id={`editDescription${todo.id}`} defaultValue={todo.description} />
                <Button variant="success" onClick={() => saveEdit(todo.id, document.getElementById(`editName${todo.id}`).value, document.getElementById(`editDescription${todo.id}`).value)}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <h3>{todo.name}</h3>
                <p>{todo.description}</p>
                <label htmlFor={`status${todo.id}`}>Status:</label>
                <select
                id={`status${todo.id}`}
                value={todo.status}
                onChange={(e) => updateTodoStatus(todo.id, e.target.value)}
                style={{ backgroundColor: todo.status === 'completed' ? 'green' : 'black', color: 'white', }}
                >
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
                </select><br /><br />
                <div className="button-group">
                <Button variant="success" onClick={() => startEditing(todo.id)}>Edit</Button>
                <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
      {/* <Button variant="success">Success</Button> */}
    </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
);
};

export default App;