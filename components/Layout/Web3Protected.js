import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

const Web3Protected = ({ children }) => {
      const { isAuthenticated } = useMoralis();
      const router = useRouter()

      if (!isAuthenticated) {
            router.push('/add-wallet')
      }
      return (
            <>
                  {children}
            </>
      )
}

export default Web3Protected
