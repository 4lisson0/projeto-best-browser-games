import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppForm from './components/Table/AppRegisterGame';
import AppTable from './components/Table/AppTable';
import AppHeader from './components/Header/AppHeader';
import AppFooter from './components/Footer/AppFooter';
import AppLogin from './components/Login/AppLogin';
import AppRegister from './components/Register/AppRegister';

const Router = () => {
  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppTable />}></Route>
          <Route path="/register" element={<AppForm />}></Route>
          <Route path="/login" element={<AppLogin />}></Route>
          <Route path="/cadastro" element={<AppRegister />}></Route>
        </Routes>
      </BrowserRouter>
      <AppFooter />
    </>
  );
};

export default Router;
