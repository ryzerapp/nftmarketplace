import CreateCollectionArea from '../components/CreateCollection/CreateCollectionArea';
import Web3Protected from '../components/Layout/Web3Protected';

const CreateCollection = () => {
  return (
    <Web3Protected>
      <CreateCollectionArea />
    </Web3Protected>
  );
};

export default CreateCollection;
