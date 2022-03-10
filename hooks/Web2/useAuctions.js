import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchAuctionData = async ({ }) => {
  const { data } = await http.get('/auctions');
  return data
};
const fetchAuctionDataById = async ({ queryKey }) => {
  if (queryKey[1].auction_id) {
    const { data } = await http.get(`/auctions/${queryKey[1].auction_id}`);
    return data
  }
  else
    return []
};

const usegetAuctions = (options = {}) => {
  return useQuery([`auctions`, options], fetchAuctionData, {
    keepPreviousData: true,
  });
};
const usegetAuctionsById = (options = {}) => {
  return useQuery([`auctions${options.auction_id}`, options], fetchAuctionDataById, {
    keepPreviousData: true,
  });
};


const fetchBidsData = async ({ queryKey }) => {
  if (queryKey[1].nft_id) {
    const { data } = await http.get(`/bids/findOneByNftId/${queryKey[1].nft_id}`);
    return data
  }
  else
    return []
};

const useBids = (options = {}) => {
  return useQuery([`bids_${options.nft_id}`, options], fetchBidsData, {
    keepPreviousData: true,
  });
};

export { usegetAuctions, useBids, usegetAuctionsById };
