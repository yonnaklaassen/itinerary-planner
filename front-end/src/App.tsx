import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Register from './register';
import { useTheme } from './contexts/theme-context';
import CustomNavbar from './navbar';
import { UserProvider } from './contexts/user-context';

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
        <UserProvider>
        <CustomNavbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
