import { useRouter } from "next/router";
import { useEffect } from "react";
import { useWeb3 } from "../../providers/Web3Context";

const Web2Protected = ({ children }) => {
      const router = useRouter();
      const { state: { user } } = useWeb3()
      useEffect(() => {
            if (user == undefined || Object.keys(user).length == 0)
                  router.replace('/login')
      }, [user])

      return (
            <>
                  {(user == undefined || Object.keys(user).length == 0) ? <></> : children}
            </>
      )
}

export default Web2Protected
