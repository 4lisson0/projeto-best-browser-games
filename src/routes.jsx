import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppDefaultLayout from './pages/DefaultLayout/AppDefaultLayout';
import AppHome from './pages/Home/AppHome';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppDefaultLayout />}>
          <Route path="" element={<AppHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
