import Link from 'next/link';
import { useGetTopAuthor } from '../../hooks/Web2/useMeQuery';

const TopSeller = ({ pt100 }) => {
  const { data } = useGetTopAuthor();
  return (
    <>
      <div className={`top-sellers-area pb-70 ${pt100}`}>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-8 col-md-7'>
              <div className='section-title'>
                <h2>Top Sellers</h2>
              </div>
            </div>

            <div className='col-lg-4 col-md-5'>
              <div className='trending-btn text-end'>
                <Link href='/author'>
                  <a className='default-btn border-radius-5'>Explore More</a>
                </Link>
              </div>
            </div>
          </div>

          <div className='row justify-content-center pt-45'>

            {data && data?.length > 0 && data?.slice(0, 4)?.map((author, index) => (
              (
                <div className='col-lg-3 col-6 col-md-4'>
                  <div className='top-sellers-item'>
                    <div className='number'>{index + 1}.</div>
                    <div className='top-sellers-img'>
                      <Link href={`author-profile?author_name=${author?.username}`} >
                        <a>
                          <img
                            src={author?.profile_photo ? author?.profile_photo : "../images/author/author-user13.png"}
                            alt='Images'
                            width={100}
                            style={{ objectFit: 'contain' }}
                            height={100}
                          />
                        </a>
                      </Link>
                      <i className='ri-check-line'></i>
                    </div>
                    <div className='content'>
                      <h3>
                        <Link href={`author-profile?author_name=${author?.username}`}>
                          <a>@{author.username}</a>
                        </Link>
                      </h3>
                      <span>{author?.total_value_of_sell} ETH</span>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSeller;
