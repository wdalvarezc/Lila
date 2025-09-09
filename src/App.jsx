import Nav from './components/nav'
import './index.css'
import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

