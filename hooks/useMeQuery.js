import { useQuery } from "react-query";
import http from "../utils/http";

const fetchUserdata = async ({ queryKey }) => {
  const { data } = await http.get('/auth/me');
  return { userD: data };
};

const useMeQuery = (options = {}) => {
  return useQuery([`USERS_${options.name}`, options], fetchUserdata, {
    keepPreviousData: true,
  });
};

export { useMeQuery, fetchUserdata };
