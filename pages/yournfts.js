import NavbarTwo from '../components/Layout/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import CollectionArea from '../components/Collection/CollectionArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';
import Layout from '../components/Layout/Layout';

const Collection = () => {
  return (
    <Layout>
      <CollectionArea />
      <InvolvedArea />
    </Layout>
  );
};

export default Collection;
