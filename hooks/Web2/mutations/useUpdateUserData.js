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
