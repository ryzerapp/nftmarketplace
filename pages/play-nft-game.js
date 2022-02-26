import NavbarTwo from '../components/Layout/NavbarTwo';
import CreateCollectionAreaNew from '../components/CreateCollection/CreateCollectionAreaNew';
import Footer from '../components/Layout/Footer';
import Layout from '../components/Layout/Layout';
import Copyright from '../components/Common/Copyright';

const CreateCollection = () => {
  return (
    <Layout>
      <NavbarTwo />
      <CreateCollectionAreaNew />
      <Footer />
      <Copyright />
    </Layout>
  );
};

export default CreateCollection;
