import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchUserdata = async ({ queryKey }) => {
  const { data } = await http.get('/auth/me');
  return { user: data };
};
const fetchSavedCollectionData = async ({ }) => {
  const { data } = await http.get('/getSavedCollection');
  return data
};
const fetchsavednft = async ({ }) => {
  const { data } = await http.get('/getSavedNfts');
  return data
};
const useMeQuery = (options = {}) => {
  return useQuery([`USER`, options], fetchUserdata, {
    keepPreviousData: true,
  });
};

const fetchAuthorData = async ({ queryKey }) => {
  const { data } = await http.get(`/getauthor/${queryKey[1].author_name}`);
  return { user: data }
};
const fetchUserAuctionData = async ({ }) => {
  const { data } = await http.get(`/auctions/getUserAuctions`);
  return data
};
const fetchtopAuthor = async ({ }) => {
  const { data } = await http.get(`/getAllUser`);
  return data
};
const useAuthorQuery = (options = {}) => {
  if (options?.author_name) {
    return useQuery([`user_${options.author_name}`, options], fetchAuthorData, {
      keepPreviousData: true,
    });
  }
  else
    return { user: [] }

};

const useSavednftsQuery = (options = {}) => {
  return useQuery([`useSavednftsQuery`, options], fetchsavednft, {
    keepPreviousData: true,
  });
};
const useCollectionSavedByUser = (options = {}) => {
  return useQuery([`savedcollection`, options], fetchSavedCollectionData, {
    keepPreviousData: true,
  });
};
const useAuctionByUser = (options = {}) => {
  return useQuery([`getUserAuctions`, options], fetchUserAuctionData, {
    keepPreviousData: true,
  });
};
const useGetTopAuthor = (options = {}) => {
  return useQuery([`useGetTopAuthor`, options], fetchtopAuthor, {
    keepPreviousData: true,
  });
};
export {
  useMeQuery,
  useSavednftsQuery,
  useCollectionSavedByUser,
  useAuthorQuery,
  useAuctionByUser,
  useGetTopAuthor
};
