import { useMutation, useQueryClient } from "react-query";
import http from "../../../utils/http";


const handleRequest = (data) => {
    return http.post(`/follows`, data);
};
export const useUpdateFollow = () => {
    const queryClient = useQueryClient();
    return useMutation(handleRequest, {
        onSuccess: () => { },
        onSettled: () => {
        },
    });
};
