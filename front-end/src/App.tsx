import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import { useTheme } from './themes';
import CustomNavbar from './navbar';

function App() {
  const { theme } = useTheme();
  return (
    <>
      <div className='app-body'
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textColor,             
          minHeight: '100vh',                    
        }}
      >
        <CustomNavbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
