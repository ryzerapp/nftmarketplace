import PageBanner from '../components/Common/PageBanner';
import AuthorProfileArea from '../components/AuthorProfile/AuthorProfileArea';
import InvolvedArea from '../components/Common/InvolvedArea';

const AuthorProfile = () => {
  return (
    <>
      <PageBanner
        bannerHeading='Welcome Back'
        parentTitle='Pages'
        pageTitle='Profile'
        bg='inner-bg10'
      />
      <AuthorProfileArea />
      <InvolvedArea />
    </>
  );
};

export default AuthorProfile;
