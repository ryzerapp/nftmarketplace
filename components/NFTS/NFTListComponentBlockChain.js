import { useMoralisNFTS } from '../../hooks/Web2/useCollections';
import { useWeb3 } from '../../providers/Web3Context';
import Loader from '../Common/Loader';
import NFTHeadlessDesign from './NFTHeadlessDesign';

const NFTListComponentBlockChain = ({ }) => {
  const { state: { walletAddress, networkId } } = useWeb3();
  const { data: nftBalance, isLoading, } = useMoralisNFTS({
    "chain": networkId,
    "address": walletAddress
  });
  if (isLoading) {
    return (
      <Loader />
    )
  }
  return (
    <>
      <div className='row justify-content-center'>
        <div className="row mt-2 mt-md-5">
          {
            nftBalance?.map((nft) => (
              <NFTHeadlessDesign
                key={nft?.token_url}
                  title={"Open NFT"}
                nft={nft} />
            ))}
        </div>
        {/* 
         */}
      </div>
    </>
  );
};

export default NFTListComponentBlockChain;
