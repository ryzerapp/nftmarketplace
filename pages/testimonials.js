import NavbarTwo from '../components/Layout/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import Testimonial from '../components/Common/Testimonial';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';

const Testimonials = () => {
  return (
    <>
      <PageBanner
        bannerHeading='All Testimonials'
        parentTitle='Pages'
        pageTitle='Testimonials'
        bg='inner-bg5'
      />

      <Testimonial />

      <div className='team-area pt-100 pb-70'>
        <div className='container'>
          <div className='section-title'>
            <h2>Our Team</h2>
          </div>

          <div className='row pt-45'>
            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team1.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Olivia Jenar</a>
                </h3>
                <span>Head Of Operations</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team2.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>James Parker</a>
                </h3>
                <span>Manage</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team3.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Lucas Adison</a>
                </h3>
                <span>Director</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team4.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Amelia Rosia</a>
                </h3>
                <span>Founder</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team5.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Elpizo Choi</a>
                </h3>
                <span>CEO and Director</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team6.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Jesa Alverza</a>
                </h3>
                <span>Ex Director</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team7.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Thomas Jenar</a>
                </h3>
                <span>Director</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>

            <div className='col-lg-3 col-6'>
              <div className='team-card'>
                <a href='team.html'>
                  <img src='../images/team/team8.jpg' alt='Images' />
                </a>
                <h3>
                  <a href='team.html'>Jesse Anvila</a>
                </h3>
                <span>Ex Manager</span>
                <p>Lorem ipsum dolor sit amet, elit Velit egestas mattis.</p>
              </div>
            </div>
          </div>
        </div>

        <div className='team-shape'>
          <img src='../images/team/team-shape.png' alt='Images' />
        </div>

        <InvolvedArea />
      </div>
    </>
  );
};

export default Testimonials;
