import { RouterProvider } from 'react-router-dom';
import { roteador } from './rotas'; 

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <RouterProvider router={roteador} />
      
    </div>
  );
}

export default App;