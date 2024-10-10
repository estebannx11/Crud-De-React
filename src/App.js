import './App.css';
import Links from './components/Links';

//importtar notificacions
import { ToastContainer } from 'react-toastify';
//estilos componente
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos


function App() {
  return (
    <div className='container p-4'>
     <div className='row'>
      <Links/>
     </div>
     <ToastContainer/>
    </div>
  );
}

export default App;
