import CreateCollectionArea from '../components/CreateCollection/CreateCollectionArea';
const category = ['Art', 'Virtual Worlds', 'Trending Cards', 'Collectibles', 'Music', 'Games', 'Memes', 'NFT Gifts', 'Domains']
import { useForm } from "react-hook-form";
import http from '../utils/http'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
const notify = (message) => toast(message);

const CreateCollection = () => {
  const [selectedCategory, setselectedCategory] = useState('Art');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
      };
      return;
      await http.post('/save_nft', payload).then(async (res) => {
        if (res?.status == 201) {
          let collection_id = res?.data?.collection?.id;
          let finalObj = {}
          if (data?.collection_cover?.length > 0) {
            const formData = new FormData();
            formData.append("file", data?.collection_cover[0]);
            formData.append("fileName", data?.collection_cover[0]?.name);
            try {
              const res = await http.post("/attachments",
                formData
              );
              if (res?.status == 201) {
                finalObj.collection_cover_image = res?.data?.image;
              }


            } catch (ex) {
              console.log(ex);
            }
          }
          if (data?.collection_logo?.length > 0) {
            const formData = new FormData();
            formData.append("file", data?.collection_logo[0]);
            formData.append("fileName", data?.collection_logo[0]?.name);
            try {
              const res = await http.post("/attachments",
                formData
              );
              if (res?.status == 201) {
                finalObj.collection_logo_image = res?.data?.image;
              }
            } catch (ex) {
              console.log(ex);
            }
          }
          try {
            const res = await http.put(`/collection/${collection_id}`,
              finalObj
            );
            if (res?.status == 200) {
              notify(res?.data?.message)
            }
          } catch (ex) {
            console.log(ex);
          }
        }
        else {
          notify(res?.data?.message)
        }

      })
        .catch((err) => {
          notify(err?.response?.data?.message)
        });

    } catch (error) {
      const { data } = error.response.data;
      if (data) {
        notify(data[0].messages[0].message);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className='user-area pt-100 pb-70'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='collection-form-area'>
                  <div className='section-title text-center'>
                    <h2>Create NFT</h2>
                  </div>

                  <div className='collection-form'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className='row'>
                        <div className='col-lg-12'>
                          <div className='form-group'>
                            <label>NFT Of Name</label>
                            <input
                              type='text'
                              {...register("name")}
                              className='form-control'
                              placeholder='e. g. “walking in the air”'
                            />
                          </div>
                        </div>

                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Description</label>
                            <input
                              type='text'
                              {...register("description")}
                              className='form-control'
                              placeholder='e. g. “after purchasing you’ll able to get the real product”'

                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Supply</label>
                            <input
                              type='text'
                              {...register("supply")}
                              className='form-control'
                              placeholder='e. g. “after purchasing you’ll able to get the real product”'

                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>
                            <label>Choose Collection</label>
                            <input
                              type='text'
                              {...register("collection_name")}
                              className='form-control'
                              placeholder='e. g. “after purchasing you’ll able to get the real product”'

                            />
                          </div>
                        </div>
                        <div className='col-lg-12 col-md-12'>
                          <div className='form-group'>image_url
                            <label>Choose NFT Image</label>
                            <input
                              {...register("image_url")}
                              className='profileButton-input'
                              type='file'
                              accept='image/*'
                            />
                          </div>
                        </div>

                        <div className='collection-category'>
                          <h3>Choose NFT Category</h3>
                          <ul>
                            {category?.map((item, index) => {
                              return (
                                <li key={index} style={{ backgroundColor: selectedCategory == item ? '#f14d5d' : '#f6f6f6' }}>
                                  <a
                                    style={{ color: selectedCategory == item ? 'white' : '#8d99ff' }}
                                    onClick={() => setselectedCategory(item)}>
                                    {item}
                                  </a>
                                </li>
                              )
                            })}

                          </ul>
                        </div>
                      </div>
                      <div className='col-lg-12 col-md-12 text-center'>
                        <button
                          className='default-btn border-radius-5'
                        >
                          Cook New Nft
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Toaster></Toaster>
      <CreateCollectionArea />
    </>
  );
};

export default CreateCollection;
