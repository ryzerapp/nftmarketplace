import { useMutation, useQueryClient } from "react-query";
import http from "../../../utils/http";


const handleRequest = (data) => {
    return http.post(`/subscribe`, data);
};
export const useSubscribe = () => {
    const queryClient = useQueryClient();
    return useMutation(handleRequest, {
        onSuccess: () => { },
        onSettled: () => {
        },
    });
};
