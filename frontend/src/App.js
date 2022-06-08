import logo from './logo.svg';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import PostBrowser from './components/postBrowser';
import PostViewer from './components/postViewer';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostBrowser />}/>
      <Route path="/view/:postId" element={<PostViewer />} />
    </Routes>
  );
}

export default App;
