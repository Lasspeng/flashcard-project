import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import App from './App';
import Header from './Header';
import './index.css';
import Deck from './Deck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/decks/:deckId',
    element: <Deck />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
)
