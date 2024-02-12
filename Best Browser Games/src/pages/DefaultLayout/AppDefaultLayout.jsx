import AppHeader from '../../components/Header/AppHeader';
import AppFooter from '../../components/Footer/AppFooter';
import { Outlet } from 'react-router-dom';

const AppDefaultLayout = () => {
  return (
    <>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </>
  );
};

export default AppDefaultLayout;
