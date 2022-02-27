import PageBanner from '../components/Common/PageBanner';
import AboutArea from '../components/About/AboutArea';
import AboutWidget from '../components/About/AboutWidget';
import AboutInvolved from '../components/About/AboutInvolved';
import AboutTestimonial from '../components/About/AboutTestimonial';
import TeamArea from '../components/Common/TeamArea';

const About = () => {
  return (
    <>
      {/* <PageBanner
        bannerHeading='About Us'
        parentTitle='Community'
        pageTitle='About Us'
        bg='inner-bg1'
      /> */}

      <AboutTestimonial />
      <AboutArea />
      <AboutWidget />
      <AboutInvolved />
      <TeamArea />
    </>
  );
};

export default About;
