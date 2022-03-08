import { useQuery } from "react-query";
import http from "../../utils/http";

const fetchAuctionData = async ({ }) => {
  const { data } = await http.get('/auctions');
  return data
};

const usegetAuctions = (options = {}) => {
  return useQuery([`collection`, options], fetchAuctionData, {
    keepPreviousData: true,
  });
};

export { usegetAuctions };
