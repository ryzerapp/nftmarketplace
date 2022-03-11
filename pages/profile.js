import PageBanner from '../components/Common/PageBanner';
import UserProfile from '../components/Profile/UserProfile';
import InvolvedArea from '../components/Common/InvolvedArea';

const Profile = () => {
  return (
    <>
      {/* <PageBanner
        bannerHeading='Welcome Back'
        parentTitle='Pages'
        pageTitle='Profile'
        bg='inner-bg10'
      /> */}
      <UserProfile />
      <InvolvedArea />
    </>
  );
};

export default Profile;
