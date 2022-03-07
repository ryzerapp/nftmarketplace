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
export { useNftOfCollection, useNftTreandingArtwork };
