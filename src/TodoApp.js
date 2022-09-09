import {useState, useEffect, useMemo} from 'react';
import {AgGridReact} from '@ag-grid-community/react';
import {ModuleRegistry} from '@ag-grid-community/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const TodoApp = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  console.log('Inside of todo app');
  // the callback function that gets passed into
  // useEffect becomes what componentDidMount

  // the 2nd parameter to useEffect is the
  // "shouldComponentUpdate" life cycle method
  // for class based component

  //
  const colDefs = useMemo(() => [
    {
      headerName: 'id',
      field: 'id',
      flex: 1,
    },
    {
      headerName: 'Todo',
      field: 'title',
      flex: 1,
    },
    {
      headerName: 'User Id',
      field: 'userId',
      flex: 1,
    },
    {
      headerName: 'Completed',
      field: 'completed',
      flex: 1,
    }
  ], []);


  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todos = await res.json();
        setIsLoading(false);
        console.log(todos);
        setTodos(todos);
      } catch (error) {
        console.log(error);
      }
    })();

    //  inside of the function to useEffect
    //  if we return a function inside of the callback function
    //  for useEffect, it will do a
    //  "componentWillUnmount" life cycle method
    //  when this component leaves the page, componentWillMount will get fired
    //  componentWillUnmount is normally used for resetting state when the user leaves the page
    return () => console.log('i am leaving the page');
  }, []);

  console.log('i am rendering');

  return isLoading ?
    <h1>Loading</h1>
    :
    <div>
      <label htmlFor="#todoInput">Todo input</label>
      <input
        id='todoInput'
        value={todoInput}
        onChange={event => setTodoInput(event.target.value)}
      />
      <button
        onClick={() => {
          if (todoInput.trim().length === 0) {
            alert('You must enter a valid todo');
            return;
          }
          // to trigger a state change in react,
          //you cannot modify the state directly
          // you must make a copy of the state make an update to the copy
          // and then use the copy as the new state
          const newTodos = [...todos, todoInput];
          setTodos(newTodos);
          setTodoInput('');
        }}
      >
        Add Todo
      </button>


      <div style={{display: 'block'}}>
        <h1>Todos</h1>
        <ul>
          {
            todos.length === 0 ?
              <h1>You have no todos yet</h1>
              :
              <div style={{height: '700px', width: '100%'}} className="ag-theme-alpine">
                <AgGridReact rowData={todos} columnDefs={colDefs}/>
              </div>
          }
        </ul>
      </div>

    </div>
};

export default TodoApp;