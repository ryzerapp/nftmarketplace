import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchCollectionData = async ({ }) => {
  const { data } = await http.get('/collection');
  return data;
};
const fetchMoralisCollection = async ({ queryKey }) => {
  const { data } = await http.post('/moralis/getCollection', queryKey[1]);

  return data;
};
const fetchMoralisNFTS = async ({ queryKey }) => {
  const { data } = await http.post('/moralis/getNft', queryKey[1]);
  return data;
};
const useCollections = (options = {}) => {
  return useQuery([`collection`, options], fetchCollectionData, {
    keepPreviousData: true,
  });
};
const useMoralisCollections = (options = {}) => {
  return useQuery([`collectionmoralis`, options], fetchMoralisCollection, {
    keepPreviousData: true,
    staleTime: 50000
  });
};
const useMoralisNFTS = (options = {}) => {
  return useQuery([`nftsmoralis`, options], fetchMoralisNFTS, {
    keepPreviousData: true,
  });
};
export { useCollections, useMoralisCollections, useMoralisNFTS };
