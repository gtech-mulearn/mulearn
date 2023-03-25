import { Outlet } from "react-router-dom"
import TermsAndConditionsModal from "./Components/TermsAndConditionsModel/TermsAndConditionsModal"

const Layout = () => {
  return (
    <>
      <TermsAndConditionsModal />
      <Outlet />
    </>
  )
}

export default Layout
