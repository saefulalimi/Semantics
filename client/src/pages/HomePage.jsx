import React from "react";
import { useSelector } from "react-redux";

function HomePage() {
  const data = useSelector((state) => state);

  return <div>{console.log(data)}HomePage</div>;
}

export default HomePage;
