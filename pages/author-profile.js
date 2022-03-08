import PageBanner from '../components/Common/PageBanner';
import AuthorProfile from '../components/Profile/AuthorProfile';
import InvolvedArea from '../components/Common/InvolvedArea';

const Profile = () => {
  return (
    <>
      <PageBanner
        bannerHeading='Welcome Back'
        parentTitle='Pages'
        pageTitle='Profile'
        bg='inner-bg10'
      />
      <AuthorProfile />
      <InvolvedArea />
    </>
  );
};

export default Profile;
