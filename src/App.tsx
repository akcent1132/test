import react from 'react';
import { Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PersonalData } from './pages/personal-data/PersonalData';
import { Job } from './pages/job/Job';
import { Param } from './pages/param/Param';

function App() {

  return (
    <>
        <Routes>
        <Route path="/" element={<PersonalData />} />
        <Route path="/job" element={<Job />} />
        <Route path="/param" element={<Param />} />
        </Routes>
    </>
  );
}

export default App;
