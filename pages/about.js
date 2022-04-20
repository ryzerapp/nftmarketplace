const About = () => {
  return (
    <>
      {/* <section class="about-page-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex align-self-center">
              <div class="about-video">
                <img src="../images/about-video-bg.jpg" alt="" />
                <a href="https://www.youtube.com/watch?v=YnnsPLV01BQ&list=PLXTTUDC-OQq3_PFB2m2H1519QRXJWZ6RN&index=13"
                  class="play-video mfp-iframe">
                  <img src="../images/play-icon-red.png" alt="" />
                </a>
              </div>
            </div>
            <div class="col-lg-6 align-items-center">
              <div class="section-heading">
                <h5
                  class="subtitle">
                  Our Journey in a Nutshell
                </h5>
                <h2 class="title">
                  About CRYPTONIUM
                </h2>
                <p class="text">
                  At Cryptonium, we are building a marketplace where you can launch, buy and sell your NFTs or NFT
                  collections!
                  <br></br>
                  If you are new in this world then just play our game to grab your first NFT.
                </p>
                <a href="https://docs.cryptonium.in/" class="btnnew">Read More </a>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <section className="pt-100">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex align-self-center">
              <div >
                <img
                  style={{
                    width: "90%",
                    height: "90%",
                    objectFit: "contain"
                  }}
                  src="../images/NFT_5.png" alt="" />
              </div>
            </div>
            <div class="col-lg-6 align-self-center">
              <div className="section-heading">
                <h5 className="subtitle">
                  Our Journey in a Nutshell
                </h5>
                <h2 className="title">
                  About CRYPTONIUM
                </h2>
                <p class="text">
                  At Cryptonium, we are building a marketplace where you can launch, buy and sell your NFTs or NFT
                  collections!
                  <br></br>
                  If you are new in this world then just play our game to grab your first NFT.
                </p>
                <a href="https://docs.cryptonium.in/" className="btnnew">{`${("Read More!").toUpperCase()}`} </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-70">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 align-self-center">
              <div className="section-heading">
                <h5 className="subtitle">
                  We Support
                </h5>
                <h2 className="title">
                  Multichain Marketplace
                </h2>
                <p className="text">
                  We are proud to be the multichain marketplace with 4 chains (Ethereum, Binance, Polygon, Avalanche). You can trade NFTs on your choice of blockchain with us! We are building tools that allow consumers to launch and trade NFTs with the minimum possible technical understanding!
                </p>
                <a href="https://docs.cryptonium.in/" className="btnnew">{`${("Read More!").toUpperCase()}`} </a>
              </div>
            </div>
            <div class="col-lg-6 d-flex align-self-center">
              <div >
                <img src="../images/chain2500.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-70">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 d-flex align-self-center">
              <div >
                <img
                  style={{
                    width: "90%",
                    height: "90%",
                    objectFit: "contain"
                  }}
                  src="../images/NFT_4.png" alt="" />
              </div>
            </div>
            <div class="col-lg-6 align-self-center">
              <div className="section-heading">
                <h5 className="subtitle">
                  We provide
                </h5>
                <h2 className="title">
                  Community for Creators
                </h2>
                <p className="text">
                  We are building tools with which creators can estimate the value of their art via virtual auctions! We have developed tools to educate creators about NFTs and to help them to make the first move toward this revolutionary Idea!
                </p>
                <a href="https://docs.cryptonium.in/" className="btnnew">{`${("Read More!").toUpperCase()}`} </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="our-vision">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8 col-md-10">
              <div class="section-heading">
                <h5 class="subtitle">
                  Take a look
                </h5>
                <h2 class="title">
                  Our vision
                </h2>
                <p class="text">
                  We create long term value for our creators by putting innovations, data and sustainability at the very heart of our platform.
                </p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="single-vision">
                <div class="icon one">
                  <img src="../images/vision/icon1.png" alt="" />
                </div>
                <div class="content">
                  <h4 class="title">
                    CREATIVE
                  </h4>
                  <p class="text">
                    Every art in Cryptonium is Unique
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-vision">
                <div class="icon two">
                  <img src="../images/vision/icon2.png" alt="" />
                </div>
                <div class="content">
                  <h4 class="title">
                    Digital Economy
                  </h4>
                  <p class="text">
                    We want to revolutionize digital economy using NFT and Artwork.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-vision">
                <div class="icon three">
                  <img src="../images/vision/icon3.png" alt="" />
                </div>
                <div class="content">
                  <h4 class="title">
                    Supporting
                  </h4>
                  <p class="text">
                    We want to create ecosystem for
                    <br></br> Content Creator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section class="team-wrap ptb-100">
        <div class="container">
          <div class="section-title text-center mb-40">
            <span>Professional Team</span>
            <h2>Meet Our Team Member</h2>
          </div>
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="team-card">
                <div class="team-member-img">
                  <img src="../images/team/member-1.jpg" alt="Image" />
                  <div class="member-social">
                    <i class="flaticon-share-1"></i>
                    <ul class="social-profile list-style style1">
                      <li>
                        <a target="_blank" href="https://facebook.com/">
                          <i class="flaticon-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://twitter.com/">
                          <i class="flaticon-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://linkedin.com/">
                          <i class="flaticon-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="team-member-imfo">
                  <h3>Gail Forcewind</h3>
                  <span>Head Of Operation</span>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="team-card">
                <div class="team-member-img">
                  <img src="../images/team/member-2.jpg" alt="Image" />
                  <div class="member-social">
                    <i class="flaticon-share-1"></i>
                    <ul class="social-profile list-style style1">
                      <li>
                        <a target="_blank" href="https://facebook.com/">
                          <i class="flaticon-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://twitter.com/">
                          <i class="flaticon-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://linkedin.com/">
                          <i class="flaticon-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="team-member-imfo">
                  <h3>Will Mumduya</h3>
                  <span>Senior Manager</span>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="team-card">
                <div class="team-member-img">
                  <img src="../images/team/member-3.jpg" alt="Image" />
                  <div class="member-social">
                    <i class="flaticon-share-1"></i>
                    <ul class="social-profile list-style style1">
                      <li>
                        <a target="_blank" href="https://facebook.com/">
                          <i class="flaticon-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://twitter.com/">
                          <i class="flaticon-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://linkedin.com/">
                          <i class="flaticon-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="team-member-imfo">
                  <h3>Poppa Cherry</h3>
                  <span>Director</span>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4 col-md-6">
              <div class="team-card">
                <div class="team-member-img">
                  <img src="../images/team/member-4.jpg" alt="Image" />
                  <div class="member-social">
                    <i class="flaticon-share-1"></i>
                    <ul class="social-profile list-style style1">
                      <li>
                        <a target="_blank" href="https://facebook.com/">
                          <i class="flaticon-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://twitter.com/">
                          <i class="flaticon-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a target="_blank" href="https://linkedin.com/">
                          <i class="flaticon-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="team-member-imfo">
                  <h3>Graham Bell</h3>
                  <span>Account Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
};

export default About;
