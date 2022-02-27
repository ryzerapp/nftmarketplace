import React from 'react';

const CreateCollectionArea = () => {
  return (
    <>
      <div className='user-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='collection-form-area'>
                <div className='section-title'>
                  <h2>Create Collectible Item</h2>
                </div>

                <div className='collection-form'>
                  <div className='profile-outer'>
                    <h3>Upload File</h3>
                    <div className='profileButton'>
                      <input
                        className='profileButton-input'
                        type='file'
                        name='attachments[]'
                        accept='image/*, application/pdf'
                        id='upload'
                        multiple
                      />
                      <label
                        className='profileButton-button ripple-effect'
                        htmlFor='upload'
                      >
                        e. g. Image, Audio, Video
                      </label>
                      <span className='profileButton-file-name'></span>
                    </div>
                  </div>

                  <div className='preview-box'>
                    <h3>Preview</h3>

                    <div className='previewButton'>
                      <input
                        className='previewButton-input'
                        type='file'
                        name='attachments[]'
                        accept='image/*, application/pdf'
                        id='upload'
                        multiple
                      />
                      <label
                        className='previewButton-button ripple-effect'
                        htmlFor='upload'
                      >
                        Upload file to preview your brand new NFT
                      </label>
                      <span className='previewButton-file-name'></span>
                    </div>
                  </div>

                  <div className='collection-category'>
                    <h3>Choose Item Category</h3>
                    <ul>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Art
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Virtual Worlds
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Trending Cards
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Collectibles
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Music
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Games
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Domains
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          Memes
                        </a>
                      </li>
                      <li>
                        <a href='create-collection.html' target='_blank'>
                          NFT Gifts
                        </a>
                      </li>
                    </ul>
                  </div>

                  <form>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label>Item Name</label>
                          <input
                            type='text'
                            name='name'
                            id='name'
                            className='form-control'
                            placeholder='e. g. “walking in the air”'
                          />
                        </div>
                      </div>

                      <div className='col-lg-12 col-md-12'>
                        <div className='form-group'>
                          <label>Description</label>
                          <textarea
                            name='description'
                            className='form-control'
                            id='description'
                            cols='30'
                            rows='5'
                            placeholder='e. g. “after purchasing you’ll able to get the real product”'
                          ></textarea>
                        </div>
                      </div>

                      <div className='col-lg-4'>
                        <div className='form-group'>
                          <label>Royalties</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='5%'
                          />
                        </div>
                      </div>

                      <div className='col-lg-4'>
                        <div className='form-group'>
                          <label>Size</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='e. g. “size” '
                          />
                        </div>
                      </div>

                      <div className='col-lg-4'>
                        <div className='form-group'>
                          <label>Property</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='subject'
                          />
                        </div>
                      </div>

                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <label>Number Of Copies</label>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='e. g. “1”'
                          />
                        </div>
                      </div>
                      <div className='col-lg-12'>
                        <div className='checkbox-method-area'>
                          <div className='col-lg-12 col-md-12'>
                            <div className='checkbox-method'>
                              <p>
                                <input
                                  type='radio'
                                  id='fixed-price'
                                  name='radio-group'
                                />
                                <label htmlFor='fixed-price'>Fixed Price</label>
                              </p>
                            </div>
                          </div>

                          <div className='col-lg-12 col-md-12'>
                            <div className='checkbox-method'>
                              <p>
                                <input
                                  type='radio'
                                  id='timed-auction'
                                  name='radio-group'
                                />
                                <label htmlFor='timed-auction'>Timed Auction</label>
                              </p>
                            </div>
                          </div>

                          <div className='col-lg-12 col-md-12'>
                            <div className='checkbox-method'>
                              <p>
                                <input
                                  type='radio'
                                  id='open-bid'
                                  name='radio-group'
                                />
                                <label htmlFor='open-bid'>Open For Bid</label>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='col-lg-12 col-md-12'>
                        <button
                          type='submit'
                          className='default-btn border-radius-5'
                        >
                          Create Item
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCollectionArea;
