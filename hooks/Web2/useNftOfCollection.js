import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchNftDataOfCollection = async ({ queryKey }) => {
  const { data } = await http.get(`/collection/${queryKey[1].collection_name}`);
  return { nfts: data?.nfts };
};

const useNftOfCollection = (options = {}) => {
  return useQuery([`collection_${options.collection_name}`, options], fetchNftDataOfCollection, {
    keepPreviousData: true,
  });
};

export { useNftOfCollection, fetchNftDataOfCollection };
