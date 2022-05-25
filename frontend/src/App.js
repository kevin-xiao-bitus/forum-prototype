import logo from './logo.svg';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import PostBrowser from './postBrowser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostBrowser />}/>
    </Routes>
  );
}

export default App;
