import NFTListComponentBlockChain from '../components/NFTS/NFTListComponentBlockChain';
import Layout from '../components/Layout/Layout';

const Collection = () => {
  return (
    <Layout>
      <div className='collection-widget-area pt-100 pb-70'>
        <div className='container'>
          <div className='row'>
            <NFTListComponentBlockChain />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Collection;
