import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from "./pages/NotFoundPage.jsx";
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Home from "./pages/Home.jsx";
import CharacterDetails from "./pages/CharacterDetails.jsx";
import CharacterList from './pages/CharacterList.jsx';
import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/characters", element: <CharacterList /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/characters/:id", element: <CharacterDetails /> }
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
