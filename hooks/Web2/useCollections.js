import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchCollectionData = async ({ }) => {
  const { data } = await http.get('/collection');
  return data;
};

const useCollections = (options = {}) => {
  return useQuery([`collection`, options], fetchCollectionData, {
    keepPreviousData: true,
  });
};

export { useCollections };
