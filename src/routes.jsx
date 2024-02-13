import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppForm from './components/Table/AppRegisterGame';
import AppTable from './components/Table/AppTable'
import AppHeader from './components/Header/AppHeader';
import AppFooter from './components/Footer/AppFooter';


const Router = () => {
  return (
    <>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppTable />}>
          </Route>
          <Route path="/register" element={<AppForm />}>
          </Route>
        </Routes>
      </BrowserRouter>
      <AppFooter/>
    </>
  );
};

export default Router;
