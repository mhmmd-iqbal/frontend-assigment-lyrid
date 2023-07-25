import './App.css';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications';


function App() {
  return (
    <Router>
      <div className='container-fluid p-0'>
        {/* <h1>Welcome</h1> */}
        <Routes>
          <Route path='/auth' element={<Signin/>} />
          <Route path='/' element={<Dashboard/>} />
        </Routes>
      </div>
      <NotificationContainer />
    </Router>
  );
}

export default App;
