import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Car from './models/Car';
import Product from './models/Product';
import Pagination from './models/Pagination';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  // <Car />
  <>
    <Product />
    {/* <Pagination /> */}
  </>
);

// root.render(<Car />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
