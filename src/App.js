import TodoList from './Component/TodoList';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Component/Home';
// import Navbar from './Component/Navbar';

function App() 
{
  return (
    <Router>
      <Routes>
        {/* Redirect from root path to home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Tasklist Route */}
        <Route path="/tasklist" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
