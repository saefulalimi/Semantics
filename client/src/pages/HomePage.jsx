import React from "react";
import { useSelector } from "react-redux";
import NavigateHome from "../component/navbar/NavbarHome"

function HomePage() {
  const data = useSelector((state) => state);

  return <div>
    <NavigateHome/>
    {console.log(data)}HomePage
    

    </div>;
}

export default HomePage;
