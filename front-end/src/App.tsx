import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { useTheme } from './themes/theme-context';
import CustomNavbar from './components/navbar';
import { UserProvider } from './hooks/user-context';

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
