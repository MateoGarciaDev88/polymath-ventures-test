import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharacterBiography from './Pages/CharacterBiography';
import Characters from './Pages/Characters';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Characters /> } />
          <Route path="/character/:id" element={ <CharacterBiography /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
