import Copyright from "../Common/Copyright";
import Footer from "./Footer";
import NavbarTwo from './NavbarTwo'
const HeaderFooter = ({ children }) => {
      return (
            <>
                  <NavbarTwo />
                  {children}
                  <Footer></Footer>
                  <Copyright></Copyright>
            </>
      )
}

export default HeaderFooter
