import React, { useEffect, useState } from "react";
import './clock.css'

function Clock() {
  const date = new Date();
  const hour = date.getHours();

  const [clockState, setClockState] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 500);
  }, []);

  return (
  <div className="bodyclock">
    <div className="bodyclock2" >{clockState}</div>;
    <div className="bodyclock1">
       {hour>=12 ? hour>=16 ? <h2>Good Evening</h2> : <h2>Good Afternoon</h2> : <h2>Good Morning</h2>}
    </div>
    </div>
  )
}

export default Clock;