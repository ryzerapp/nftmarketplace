import { useMutation, useQueryClient } from "react-query";
import http from "../../../utils/http";

const loginData = (data) => {
    return http.post('/auth/login', data);
};
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation(loginData, {
        onSuccess: () => { },
        onSettled: () => {
            // queryClient.invalidateQueries("USERTICKETSDETAILS");
        },
    });
};
