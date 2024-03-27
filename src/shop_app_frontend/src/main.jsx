import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);



// function handleSubmit(event) {
//   event.preventDefault();
//   const name = event.target.elements.name.value;
//   shop_app_backend.greet(name).then((greeting) => {
//     setGreeting(greeting);
//   });
//   return false;
// }


// <main>
//   <img src="/logo2.svg" alt="DFINITY logo" />
//   <br />
//   <br />
//   <form action="#" onSubmit={handleSubmit}>
//     <label htmlFor="name">Enter your name: &nbsp;</label>
//     <input id="name" alt="Name" type="text" />
//     <button type="submit">Click Me!</button>
//   </form>
//   <section id="greeting">{greeting}</section>
// </main>