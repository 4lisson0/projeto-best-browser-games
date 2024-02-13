import AppHeader from '../../components/Header/AppHeader';
import AppFooter from '../../components/Footer/AppFooter';
import AppTable from '../../components/Table/AppTable';


const AppDefaultLayout = () => {
  return (
    <>
      <AppHeader />
      <AppTable />
      <AppFooter />
    </>
  );
};

export default AppDefaultLayout;
