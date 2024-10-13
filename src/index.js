import React from 'react';
import ReactDOM from 'react-dom/client';
import Test from './test/test';
import './index.css';
import DrawingCanvas from './Drawing/DrawingCanvas';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <DrawingCanvas></DrawingCanvas>
  </>
);

