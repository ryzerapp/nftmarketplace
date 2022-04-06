import { useForm } from "react-hook-form";
import http from '../utils/http'
import toast, { Toaster } from 'react-hot-toast';
import imageCompression from 'browser-image-compression';
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
  const [imageUrl, setimageUrl] = useState("#")
  const [imageData, setImageData] = useState()
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [chainId, setchainId] = useState("Ethereum")
  async function ImageResizeNew(file) {
    const imageFile = file;
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 150,
      useWebWorker: true,
      fileType: "WEBP",
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }

  }
  const handleImageChange = async (event) => {
    if (event.target.files) {
      const image = await ImageResizeNew(event.target.files[0]);
      setImageData(image)
      if (image) {
        setimageUrl(URL.createObjectURL(image));
      }
    }

  }
  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        image_url: imageData,
        cryptoType: chainId
      };
      delete payload?.collection_name;
      if (payload.image_url) {

        const formData = new FormData();
        formData.append("file", payload?.image_url);
        formData.append("fileName", payload?.image_url?.name);
        try {
          const res = await http.post("/attachments",
            formData
          );
          if (res?.status == 201) {
            payload.image_url = res?.data?.image;
          }
        } catch (ex) {
          reset()
          console.log(ex);
          return;
        }
      }
      await http.post('/nfts/save_nft', payload).then(async (res) => {
        if (res?.status == 201) {
          reset()
          toast.success("Successfully Created.")
        }
        else {
          toast.success(res?.data?.message)
        }

      })
        .catch((err) => {
          reset()
          toast.error(err?.response?.data?.message)
        });

    } catch (error) {
      reset()
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
                              type='number'
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
                              onChange={(event) => handleImageChange(event)}
                              className='profileButton-input'
                              type='file'
                              accept='image/*'
                            />
                            <img src={imageUrl} />
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
                                  backgroundColor: chainId == item?.value ? '#f6f6f6' : '#0c0d23',
                                  border: chainId == item?.value ? '1px solid white' : '1px solid white',
                                }}>
                                  <div
                                    style={{
                                      cursor: 'pointer'
                                    }}
                                    onClick={() => setchainId(item?.value)}
                                  >
                                    {item?.icon}
                                    <a
                                      className='ml-2'
                                      style={{
                                        color: chainId == item?.value ? '#0c0d23' : '#8d99ff',
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
                            type='number'
                            {...register("cryptoCost")}
                            className='form-control'
                            placeholder='e. g. “after purchasing you’ll able to get the real product”'

                          />
                        </div>
                      </div>
                      <div className='col-lg-12 col-md-12 text-center'>
                        <button
                          className='default-btn border-radius-5'
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
