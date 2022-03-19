import AuthorProfile from '../components/Profile/AuthorProfile';
import InvolvedArea from '../components/Common/InvolvedArea';
import Layout from '../components/Layout/Layout';

const Profile = () => {
  return (
    <Layout>
      <AuthorProfile />
      <InvolvedArea />
    </Layout>
  );
};

export default Profile;
