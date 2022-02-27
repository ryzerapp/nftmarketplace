import { Router, useRouter } from 'next/router';
import CreateCollectionAreaNew from '../components/CreateCollection/CreateCollectionAreaNew';
import Layout from '../components/Layout/Layout';
import Web3Protected from '../components/Layout/Web3Protected';
import { getAuthCredentials, isAuthenticated } from '../utils/auth-utils';

const CreateCollection = () => {
  const { token, permissions } = getAuthCredentials();
  const router = useRouter();
  if (!isAuthenticated({ token, permissions })) {
    router.push("/login")
  }
  else {
    return (
      <Layout>
        <Web3Protected>
          <CreateCollectionAreaNew />
        </Web3Protected>
      </Layout>
    );
  }
  return (<></>)
};

export default CreateCollection;
