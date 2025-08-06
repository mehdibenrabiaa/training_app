import { ConfigProvider } from 'antd';
import RDTheory from './screens/RDTheory';
import MainMenu from './screens/MainMenu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#0958d9' } }}>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/rd_theory" element={<RDTheory />} />
            <Route path="/contact" element={''} />
          </Routes>
        </Router>
      </div>
    </ConfigProvider>
  );
}

export default App;
