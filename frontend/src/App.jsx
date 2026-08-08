import {useState} from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Login from './views/auth/Login';
import Register from './views/auth/Register';

import PrivateRoute from "./layout/PrivateRoute";
function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<h1>Home Page</h1>} />
        
    </Routes>
</BrowserRouter>
  )
}
export default App



