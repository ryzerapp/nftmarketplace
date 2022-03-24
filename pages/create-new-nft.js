const category = ['Art', 'Virtual Worlds', 'Trending Cards', 'Collectibles', 'Music', 'Games', 'Memes', 'NFT Gifts', 'Domains']
import { useForm } from "react-hook-form";
import http from '../utils/http'
import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./../components/Common/Logos";
const menuItems = [
  {
    key: "eth",
    value: "Ethereum",
    icon: <ETHLogo />,
  },
  {
    key: "bsc",
    value: "Binance",
    icon: <BSCLogo />,
  },
  {
    key: "polygon",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa86a",
    value: "Avalanche",
    icon: <AvaxLogo />,
  },
];
const CreateCollection = () => {
  const [selectedCategory, setselectedCategory] = useState('Art');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [chainId, setchainId] = useState("eth")

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
              toast.success(res?.data?.message)
            }
          } catch (ex) {
            console.log(ex);
          }
        }
        else {
          toast.success(res?.data?.message)
        }

      })
        .catch((err) => {
          toast.error(err?.response?.data?.message)
        });

    } catch (error) {
      const { data } = error.response.data;
      if (data) {
        toast.error(data[0].messages[0].message);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className='user-area pt-100 pb-70'>
          <div className='container'
          >
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
                          <div className='form-group'>
                            <label>Choose NFT Image</label>
                            <input
                              {...register("image_url")}
                              className='profileButton-input'
                              type='file'
                              accept='image/*'
                            />
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row justify-content-start align-items-center" >
                        <div
                          style={{
                            height: 50,
                            lineHeight: 50
                          }}
                        >
                          <h5 style={{ color: 'white' }}> Select Crypto Type:</h5>
                        </div>
                        <div
                          style={{
                            height: 50
                          }}
                          className='collection-category text-center pb-3 pl-3'>
                          <ul>
                            {menuItems?.map((item, index) => {
                              return (
                                <li key={index} style={{
                                  backgroundColor: chainId == item?.key ? '#f6f6f6' : '#0c0d23',
                                  border: chainId == item?.key ? '1px solid white' : '1px solid white',
                                }}>
                                  <div
                                    style={{
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => setchainId(item?.key)}
                                  >
                                    {item?.icon}
                                    <a
                                      className='ml-2'
                                      style={{
                                        color: chainId == item?.key ? '#0c0d23' : '#8d99ff',
                                      }}
                                    >
                                      {item?.value}
                                    </a>
                                  </div>

                                </li>
                              )
                            })}

                          </ul>
                        </div>
                      </div>
                      <div className='col-lg-12 col-md-12'>
                        <div className='form-group'>
                          <label>Crypto Cost</label>
                          <input
                            type='text'
                            {...register("crypto_cost")}
                            className='form-control'
                            placeholder='e. g. “after purchasing you’ll able to get the real product”'

                          />
                        </div>
                      </div>
                      <div className='col-lg-12 col-md-12 text-center'>
                        <button
                          className='default-btn border-radius-5'
                        >
                          Cook New Nft
                        </button>
                        <button
                          className='default-btn border-radius-5 ml-5'
                        >
                          Create NFT(Mint Later)
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
    </>
  );
};

export default CreateCollection;
