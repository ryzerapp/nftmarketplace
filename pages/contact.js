import InvolvedArea from '../components/Common/InvolvedArea';

const Contact = () => {
  return (
    <>
      {/* <PageBanner
        bannerHeading='Contact Us'
        parentTitle='Contact Us'
        pageTitle=''
        bg='inner-bg2'
      /> */}

      <div className='contact-info-area  pt-100 pb-70'>
        <div className='container'>
          <div className='section-title text-center'>
            <h2>Contact Info</h2>
            <p>
              Cryptonium Technologies
            </p>
          </div>

          <div className='row pt-45 justify-content-center'>
            <div className='col-lg-4 col-6'>
              <div className='contact-card'>
                <i className='ri-map-pin-line'></i>
                <h3>Location</h3>
                <p>Ahmedabad</p>
                <p>Gujarat India</p>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='contact-card'>
                <i className='ri-phone-line'></i>
                <h3>Phone</h3>
                <p>
                  <a href='tel:+44012345679782'>+919426016918</a>
                </p>
                <p>
                  <a href='tel:+44012345676608'>+919426016918</a>
                </p>
              </div>
            </div>

            <div className='col-lg-4 col-6'>
              <div className='contact-card'>
                <i className='ri-mail-send-line'></i>
                <h3>Email Address</h3>
                <p>
                  <a href='mailto:info@cryptonium.com'>info@cryptonium.com</a>
                </p>
                <p>
                  <a href='mailto:hello@cryptonium.com'>hello@cryptonium.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='contact-area pb-70'>
        <div className='container'>
          <div className='contact-form'>
            <h3>Contact Form</h3>
            <form id='contactForm'>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Your Name</label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='form-control'
                      required
                      data-error='Please Enter Your Name'
                    />
                    <div className='help-block with-errors'></div>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Your Email</label>
                    <input
                      type='email'
                      name='email'
                      id='email'
                      className='form-control'
                      required
                      data-error='Please Enter Your Email'
                    />
                    <div className='help-block with-errors'></div>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Phone Number</label>
                    <input
                      type='text'
                      name='phone_number'
                      id='phone_number'
                      required
                      data-error='Please Enter Your number'
                      className='form-control'
                    />
                    <div className='help-block with-errors'></div>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div className='form-group'>
                    <label>Your Subject</label>
                    <input
                      type='text'
                      name='msg_subject'
                      id='msg_subject'
                      className='form-control'
                      required
                      data-error='Please Enter Your Subject'
                    />
                    <div className='help-block with-errors'></div>
                  </div>
                </div>

                <div className='col-lg-12 col-md-12'>
                  <div className='form-group'>
                    <label>Your Message</label>
                    <textarea
                      name='message'
                      className='form-control'
                      id='message'
                      cols='30'
                      rows='5'
                      required
                      data-error='Write your message'
                    ></textarea>
                    <div className='help-block with-errors'></div>
                  </div>
                </div>

                <div className='col-lg-12 col-md-12'>
                  <div className='agree-label'>
                    <input type='checkbox' id='chb1' />
                    <label for='chb1'>
                      Accept{' '}
                      <a href='terms-condition.html'>Terms & Conditions</a> And{' '}
                      <a href='privacy-policy.html'>Privacy Policy.</a>
                    </label>
                  </div>
                </div>

                <div className='col-lg-12 col-md-12'>
                  <button type='submit' className='default-btn border-radius-5'>
                    Send Message <i className='ri-chat-4-line'></i>
                  </button>
                  <div id='msgSubmit' className='h3 text-center hidden'></div>
                  <div className='clearfix'></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <InvolvedArea />
    </>
  );
};

export default Contact;
