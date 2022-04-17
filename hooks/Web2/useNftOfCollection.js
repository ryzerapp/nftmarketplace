import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchNftDataOfCollection = async ({ queryKey }) => {
  if (queryKey[1].collection_name) {
    const { data } = await http.get(`/collection/${queryKey[1].collection_name}`);
    return { nfts: data?.nfts };
  }
  else
    return { nfts: [] }
};

const fetchNftTreandingArtwork = async ({ }) => {
  const { data } = await http.get(`/nfts/getTrendingArtwork`);
  return data
};
const fetchGameNFt = async ({ queryKey }) => {
  const { data } = await http.get(`/nfts?limit=${queryKey[1].limit}`);
  return data
};
const useNftOfCollection = (options = {}) => {
  return useQuery([`collection_${options.collection_name}`, options], fetchNftDataOfCollection, {
    keepPreviousData: true,
  });
};

const useNftTreandingArtwork = (options = {}) => {
  return useQuery([`getTrendingArtwork`, options], fetchNftTreandingArtwork, {
    keepPreviousData: true,
  });
};
const useGameNft = (options = {}) => {
  return useQuery([`useGameNft`, options], fetchGameNFt, {
    keepPreviousData: true,
  });
};
export { useNftOfCollection, useNftTreandingArtwork, useGameNft };
