import { FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DownloadConfirmation from './pages/DownloadConfirmation';
import Navigation from './components/Navigation';
import { UploadProvider } from './context/UploadContext'; // Adjust the import path as needed

const App: FC = () => {

  return (
    <UploadProvider>
      <Navigation/>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/confirmation" element={<DownloadConfirmation />} />
          </Routes>
        </main>
      </Router>
    </UploadProvider>
  )
}

export default App
