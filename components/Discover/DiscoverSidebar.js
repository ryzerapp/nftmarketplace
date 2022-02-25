import React from 'react';

const DiscoverSidebar = () => {
  return (
    <>
      <div className='side-bar-area pl-20'>
        <div className='side-bar-widget'>
          <h3 className='title'>
            Filter <a href='discover-2.html'>Clear All</a>
          </h3>
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
      </div>
    </>
  );
};

export default DiscoverSidebar;
