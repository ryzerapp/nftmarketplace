import React from 'react';

const ActivitySidebar = () => {
  return (
    <>
      <div className='side-bar-area pl-20'>
        <div className='side-bar-widget'>
          <h3 className='title'>
            Filter <a href='activity.html'>Clear All</a>
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

export default ActivitySidebar;
