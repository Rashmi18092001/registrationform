import "./components/app.css"
import Register from './components/register';
import Login from './components/login';
import User from './components/userDash';
import Admin from './components/admin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  
  return <>
  <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<User/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
    </Router>
  </>
}

export default App
