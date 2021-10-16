import React from "react";
import { useSelector } from "react-redux";
import NavigateHome from "../component/navbar/NavbarHome"

function HomePage() {
  const data = useSelector((state) => state);

  return (
    <div>
    <NavigateHome/>
    <div>
      <div className="">
          <div><h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Aliquid quibusdam dolor laboriosam laudantium praesentium accusantium a
            tque animi incidunt natus fugiat.</h1></div>

          <div><h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Aliquid quibusdam dolor laboriosam laudantium praesentium accusantium a
            tque animi incidunt natus fugiat.</h1></div>
      </div>
    </div>
    {console.log(data)}HomePage
    </div>
  )
}

export default HomePage;
