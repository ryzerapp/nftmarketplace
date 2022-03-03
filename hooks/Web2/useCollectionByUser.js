import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchCollectionData = async ({ }) => {
  const { data } = await http.get('/collection/findById');
  return { collections: data };
};

const useCollectionByUser = (options = {}) => {
  return useQuery([`collection`, options], fetchCollectionData, {
    keepPreviousData: true,
  });
};

export { useCollectionByUser, fetchCollectionData };
