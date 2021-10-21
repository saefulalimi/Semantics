import React from "react";
import NavBar from "../component/navbar/navbarhome/navbarhome";
import "../style/homepage.css";
import Bck1 from "../assets/bck1.png";
import { Link } from "react-router-dom";
import chat from "../assets/chat.png"
import skilvul from "../assets/skilvul.png";
import impact from "../assets/impactbyte.png";
import activty from "../assets/activity.png";
import general from "../assets/general.png";
import general1 from "../assets/general1.png";

function HomePage() {

  return (
    <div>
      <NavBar />
      <div className="bodyHome">
        <div className="wraperHome">
          <div className="childbody1">
            <h1>Semantics here to help your work in talking notes</h1>
            <span>
              in semantics you can write, take notes manage your time at works.
              let's explore more about us
            </span>
            <Link to="/register">
              <button className="btnHome">Login</button>
            </Link>
          </div>

          <div className="childbody2">
            <img src={Bck1} alt=".." />
          </div>
        </div>

        <div className="childbody3">
          <h3>What do we get in semantics?</h3>
        </div>

        <div>
          <div className="badan1">
            <div className="badan1img">
              <img src={activty} alt="img-intro" />
            </div>
            <div className="badan1main">
              <h3>Activty here For You!</h3>
              <p>
                you can save important short notes such as phone numbers, home
                addresses or if you are a student you can keep notes in the form
                of homework, daily activities or others you can do it using
                semantics
              </p>
            </div>
          </div>

          <div className="badan2">
            <div className="badan2main">
              <h3>General notes available</h3>
              <p>
                we present general notes for those of you who want to copy a
                text and want to take the essence of your text, general notes
                will make your work easier.
              </p>
            </div>
            <div className="badan2img">
              <img src={general} alt="img-intro" />
              <img src={general1} alt="img-intro" />
            </div>
          </div>

          <div className="badan3">
            <div className="badan3img">
              <img src={chat} alt="img-intro" />
            </div>
            <div className="badan3main">
              <h3>you can communicate with live chat</h3>
              <span>
                you can use the live chat feature with your friends by 
               entering the same id, and you can communicate when there 
               is a lesson schedule, homework or you can also ask about 
               the situation
              </span>
            </div>
          </div>
        </div>

        <div className="collab">
          <div className="maincolab">
            <h6>collaboration with :</h6>
          </div>
          <div className="colabImg">
            <img src={skilvul} className="skilvul" alt="img-skilvul" />
            <img src={impact} alt="img-impact" />
          </div>
        </div>

        <div className="footerhom">
          <p className="fonthome">
            Copyright © 2021 Semantics. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
