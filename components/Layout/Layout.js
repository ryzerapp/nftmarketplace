import { useEffect } from "react";
import { useMoralis } from "react-moralis";

const Layout = ({ children }) => {
      const { web3, isWeb3Enabled, web3EnableError, enableWeb3 } = useMoralis();

      const handleCloseErrorModal = () => {
            console.log('errr')
      }

      useEffect(() => {
            if (isWeb3Enabled) {
                  console.log('Enable')
            } else {
                  enableWeb3();
            }
      }, [isWeb3Enabled, web3])

      return (
            <>
                  {children}
            </>
      )
}

export default Layout
