import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from "./pages/NotFoundPage.jsx";
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Profile from  './pages/Profile.jsx'
import CharacterList from './components/CharacterList.jsx';
import CharacterDetails from './pages/CharacterDetails.jsx';
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/characters", element: <CharacterList /> },
      { path: "/characters/:id", element: <CharacterDetails /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/signup", element: <Signup />},
      { path: "/profile", element: <Profile />}
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
