import { ToastContainer } from 'react-toastify';
import {Routes,Route} from 'react-router-dom';
import {Home, AddEdit,Search} from './components/index'


function App() {
  return (
    <div className="App">  
      <ToastContainer/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/add" element = {<AddEdit/>}/>
        <Route path = "/edit/:id" element = {<AddEdit/>}/>
        <Route path = "/search" element = {<Search/>}/>
      </Routes>

    </div>
  );
}

export default App;
