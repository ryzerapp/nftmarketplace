import Pagination from '../components/Common/Pagination';

const BlogTwo = () => {
  return (
    <>
      {/* <PageBanner
        bannerHeading='Latest News And Blog'
        parentTitle='Community'
        pageTitle='Blog Grid'
        bg='inner-bg1'
      /> */}

      <div className='blog-widget-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='side-bar-area pr-20'>
                <div className='side-bar-widget'>
                  <h3 className='title'>Search</h3>
                  <form className='search-form'>
                    <input
                      type='search'
                      className='form-control'
                      placeholder='Search keyword'
                    />
                    <button type='submit'>
                      <i className='ri-search-line'></i>
                    </button>
                  </form>
                </div>

                <div className='widget-popular-post'>
                  <h3 className='title'>Top Blog</h3>
                  <article className='item'>
                    <a href='blog-details.html' className='thumb'>
                      <span className='full-image cover bg1' role='img'></span>
                    </a>
                    <div className='info'>
                      <h4 className='title-text'>
                        <a href='blog-details.html'>
                          Artist interview: Arran Schonberg
                        </a>
                      </h4>

                      <p>July 14, 2021 </p>
                    </div>
                  </article>

                  <article className='item'>
                    <a href='blog-details.html' className='thumb'>
                      <span className='full-image cover bg2' role='img'></span>
                    </a>
                    <div className='info'>
                      <h4 className='title-text'>
                        <a href='blog-details.html'>
                          Edition365: A Portrait Of The Year That
                        </a>
                      </h4>

                      <p>July 17, 2021 </p>
                    </div>
                  </article>

                  <article className='item'>
                    <a href='blog-details.html' className='thumb'>
                      <span className='full-image cover bg3' role='img'></span>
                    </a>
                    <div className='info'>
                      <h4 className='title-text'>
                        <a href='blog-details.html'>
                          Announcing Our $100m Raise
                        </a>
                      </h4>

                      <p>July 19, 2021 </p>
                    </div>
                  </article>
                </div>

                <div className='side-bar-widget'>
                  <h3 className='title'>Sort By</h3>
                  <div className='form-group select-group'>
                    <select className='form-select form-control'>
                      <option data-display='Sort By (Default)'>
                        Sort By (Default)
                      </option>
                      <option value='1'> Top Rate</option>
                      <option value='2'>Mid Rate</option>
                      <option value='3'>Low Rated</option>
                    </select>
                  </div>
                </div>

                <div className='side-bar-widget-categories'>
                  <h3 className='title'>Categories</h3>
                  <ul>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Art
                      </a>
                    </li>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Virtual Worlds
                      </a>
                    </li>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Collectibles
                      </a>
                    </li>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Music
                      </a>
                    </li>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Games
                      </a>
                    </li>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Domains
                      </a>
                    </li>
                    <li>
                      <a href='categories.html' target='_blank'>
                        Memes
                      </a>
                    </li>
                  </ul>
                </div>

                <div className='side-bar-widget'>
                  <h3 className='title'>Cloud Tag</h3>
                  <ul className='side-bar-widget-tag'>
                    <li>
                      <a href='tags.html' target='_blank'>
                        Virtual World
                      </a>
                    </li>
                    <li>
                      <a href='tags.html' target='_blank'>
                        Art
                      </a>
                    </li>
                    <li>
                      <a href='tags.html' target='_blank'>
                        Vision
                      </a>
                    </li>
                    <li>
                      <a href='tags.html' target='_blank'>
                        Music
                      </a>
                    </li>
                    <li>
                      <a href='tags.html' target='_blank'>
                        Domains
                      </a>
                    </li>
                    <li>
                      <a href='tags.html' target='_blank'>
                        Music
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='col-lg-8'>
              <div className='row justify-content-center'>
                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img1.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user1.jpg'
                            alt='Images'
                          />
                          <span>Created by @Adison</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Artwork
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          Announcing Our $100m Raise, Led By A16z
                        </a>
                      </h3>
                      <ul>
                        <li>June 5, 2021</li>
                        <li>No Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img2.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user2.jpg'
                            alt='Images'
                          />
                          <span>Created by @Evelyn</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Digital
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          Edition365: A Portrait Of The Year That Changed
                          Everything
                        </a>
                      </h3>
                      <ul>
                        <li>June 7, 2021</li>
                        <li>02 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img3.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user3.jpg'
                            alt='Images'
                          />
                          <span>Created by @Julian</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Creative
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          Christie’s Ended Up Selling For $69 Million In Nft
                          Marketplace
                        </a>
                      </h3>
                      <ul>
                        <li>June 9, 2021</li>
                        <li>03 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img4.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user4.jpg'
                            alt='Images'
                          />
                          <span>Created by @Evelyn</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Artist
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          Artist Interview: Arran Schonberg (Divergence_art)
                        </a>
                      </h3>
                      <ul>
                        <li>June 11, 2021</li>
                        <li>01 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img5.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user5.jpg'
                            alt='Images'
                          />
                          <span>Created by @Emilia</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Online
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          12 Curated Works For Cadaf On Online
                        </a>
                      </h3>
                      <ul>
                        <li>June 13, 2021</li>
                        <li>03 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img6.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user6.jpg'
                            alt='Images'
                          />
                          <span>Created by @Emilia</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Artist
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          The Biggest Drop In Times Square Since New Years Eve
                        </a>
                      </h3>
                      <ul>
                        <li>June 15, 2021</li>
                        <li>0 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img7.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user7.jpg'
                            alt='Images'
                          />
                          <span>Created by @Emilia</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        {' '}
                        Digitals
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          Daz 3d, The Digitals And A Groundbreaking NFT
                        </a>
                      </h3>
                      <ul>
                        <li>June 19, 2021</li>
                        <li>0 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className='col-lg-6 col-md-6'>
                  <div className='blog-card box-shadow'>
                    <div className='blog-img'>
                      <a href='blog-details.html'>
                        <img src='../images/blog/blog-img8.jpg' alt='Images' />
                      </a>

                      <div className='blog-user'>
                        <a href='author-profile' className='blog-user-option'>
                          <img
                            src='../images/blog/blog-user8.jpg'
                            alt='Images'
                          />
                          <span>Created by @Daniel</span>
                        </a>
                      </div>
                      <a href='tags.html' className='blog-tag-btn'>
                        Photograph
                      </a>
                    </div>

                    <div className='content'>
                      <h3>
                        <a href='blog-details.html'>
                          The Journey Of A Never Seen Before Photograph
                        </a>
                      </h3>
                      <ul>
                        <li>June 21, 2021</li>
                        <li>05 Comments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogTwo;
