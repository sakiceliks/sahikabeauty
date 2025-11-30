"use client"

// Nav.jsx zaten kendi logo ve menüsünü içeriyor, bu yüzden Header sadece Nav'i render ediyor
import Nav from "./Nav"

const Header = () => {
  return <Nav />
}

export default Header