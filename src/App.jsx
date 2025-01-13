import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import { login, logOut } from './store/authSlice';
import {Header, Footer} from './components/index';
import { Outlet } from 'react-router-dom';
import "./App.css";



function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL/**Not a good practice */);// This is used to create enviroment variables in create-react-app.[REACT_APP is required must in name] in viite we use VITE_VARAIABLE_NAME
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(()=>{
    authService.getCurrentUser().
    then(userData=>{
      if(userData){
        dispatch(login(userData));
      }else{
        dispatch(logOut());
      }
    })
    .finally(()=>{
      setLoading(false);
    }) 
  }, []);

  return !loading?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
