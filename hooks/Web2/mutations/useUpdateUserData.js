import { useMutation, useQueryClient } from "react-query";
import http from "../../../utils/http";

const handleRequest = (data) => {
    const user_id = data?.user_id;
    delete data?.user_id;
    return http.put(`/updateuserprofile/${user_id}`, data);
};
export const useUpdateUserData = () => {
    const queryClient = useQueryClient();
    return useMutation(handleRequest, {
        onSuccess: () => { },
        onSettled: () => {
            queryClient.invalidateQueries("USER");
        },
    });
};

const handleCollectionUpdate = (data) => {
    const collection_id = data?.collection_id;
    delete data?.collection_id;
    return http.put(`/collection/${collection_id}`, data);
};
export const useUpdateCollectionData = () => {
    return useMutation(handleCollectionUpdate, {
        onSuccess: () => { },
        onSettled: () => {
        },
    });
};


const handleNftsUpdate = (data) => {
    const nft_id = data?.nft_id;
    delete data?.nft_id;
    return http.put(`/nfts/update_nft/${nft_id}`, data);
};
export const useUpdatenftsData = () => {
    return useMutation(handleNftsUpdate, {
        onSuccess: () => { },
        onSettled: () => {
        },
    });
};