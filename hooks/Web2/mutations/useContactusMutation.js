import { useMutation, useQueryClient } from "react-query";
import http from "../../../utils/http";


const handleRequest = (data) => {
    return http.post(`/contactus/create`, data);
};
export const useContactus = () => {
    const queryClient = useQueryClient();
    return useMutation(handleRequest, {
        onSuccess: () => { },
        onSettled: () => {
        },
    });
};
