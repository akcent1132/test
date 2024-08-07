import { Route, Routes } from 'react-router-dom';
import { PersonalData } from './pages/personal-data/PersonalData';
import { Job } from './pages/job/Job';
import { Param } from './pages/param/Param';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


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
