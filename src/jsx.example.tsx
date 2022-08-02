import React, { createElement as e, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);
  // return (<h1>Typescript App here!</h1>);
  // Can use without syntaxis
  // return React.createElement('h1', {}, 'Hello from JS')
  return e('div', { className: 'container' }, [
    e('h1', { className: 'font-bold', key: 1 }, `Test JSX! ${count}`),
    e(
      'button',
      {
        className: 'py-2 px-4 border',
        key: 2,
        onClick: () => setCount(count + 1),
      },
      'Click Me!'
    ),
  ]);
}

export default App;
