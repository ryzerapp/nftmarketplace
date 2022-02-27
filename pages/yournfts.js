import CollectionArea from '../components/Collection/CollectionArea';
import InvolvedArea from '../components/Common/InvolvedArea';
import Layout from '../components/Layout/Layout';
import Web3Protected from '../components/Layout/Web3Protected';

const Collection = () => {
  return (
    <Layout>
      <Web3Protected>
      <CollectionArea />
        <InvolvedArea />
      </Web3Protected>
    </Layout>
  );
};

export default Collection;
