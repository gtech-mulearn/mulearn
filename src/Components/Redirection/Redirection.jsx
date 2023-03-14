import React, { useEffect } from "react"

const Redirection = ({ link }) => {
  useEffect(() => {
    window.location.href = link
  }, [link])
  return <div>Redirecting....</div>
}

export default Redirection
