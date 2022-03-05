import { useQuery } from "react-query";
import http from "../../utils/http";
import { API_ENDPOINTS } from "../../utils/endpoints";

const fetchUsers = async ({ queryKey }) => {
  const url = `${API_ENDPOINTS.USERS}/${queryKey[1].id}`;
  const { data } = await http.get(url);
  return { user: data };
};

const useMeQuery = (options = {}) => {
  return useQuery([`USERS_${options.id}`, options], fetchUsers, {
    keepPreviousData: true,
  });
};

export { useMeQuery, fetchUsers };
