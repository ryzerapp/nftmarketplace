import CreateCollectionAreaNew from '../components/CreateCollection/CreateCollectionAreaNew';
import Layout from '../components/Layout/Layout';
import PlayGame from "../components/Game/PlayGame"
const CreateCollection = () => {
  return (
    <Layout>
      <CreateCollectionAreaNew />
      <PlayGame />
    </Layout>
  );
};

export default CreateCollection;
