import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppDefaultLayout from './pages/DefaultLayout/AppDefaultLayout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppDefaultLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
