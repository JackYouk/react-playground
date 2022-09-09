import './App.css';
import HelloWorld from './HelloWorld';
import Counter from './Counter';
import TodoApp from './TodoApp';
import { useState } from 'react';

function App() {
  const [isShow, setIsShow] = useState(false);
  const [showTodoApp, setShowTodoApp] = useState(true);
  return (
    <>
      {
        isShow ?
        <h1 className='red'>Hello World</h1>
        :
        null
      }
      <button
        onClick={() => {
          setIsShow(!isShow);
        }}
      >
        Show meh or dont idc
      </button>
      
      <h1
        style={{
          color: 'green'
        }}
      >
        Hello World
      </h1>

      <HelloWorld name='zaza'/>


      <Counter />
      
      <button
        onClick={() => setShowTodoApp(!showTodoApp)}
      >
        Show/Hide Todo app
      </button>
      {
        showTodoApp ?
          <TodoApp />
        :
        null
      }
      
    </>
  );
}

export default App;
