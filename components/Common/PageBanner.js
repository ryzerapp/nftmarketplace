import React from 'react';

const PageBanner = ({ bannerHeading, parentTitle, pageTitle,bg }) => {
  return (
    <>
      <div className={`inner-banner ${bg}`}>
        <div className='container'>
          <div className='inner-title'>
            <h3>{bannerHeading}</h3>
            <ul>
              <li>
                <a href='index.html'>Home</a>
              </li>
              <li>{parentTitle}</li>
              { pageTitle && <li>{pageTitle}</li> }
              
            </ul>

            <div className='inner-shape'>
              <img src='../images/inner-banner/inner-shape1.png' alt='Images' />
              <img src='../images/inner-banner/inner-shape2.png' alt='Images' />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;
