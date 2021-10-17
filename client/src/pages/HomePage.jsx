import React from "react";
import { useSelector } from "react-redux";
import NavigateHome from "../component/navbar/NavbarHome"
import "../style/homepage.css"
import Bck1 from '../assets/bck1.png'
import { Link } from "react-router-dom";
import skilvul from '../assets/skilvul.png'
import impact from '../assets/impactbyte.png'


function HomePage() {
  const data = useSelector((state) => state);

  return (
    <div>
    <NavigateHome/>
    <div className="bodyHome">
      <div className="wraperHome">
          <div className="childbody1">
            <h1>Semantics here to help your work in talking notes</h1>
            <span>in semantics you can write, take notes manage your time at works. 
              let's explore more about us</span>
              <Link to="/register"><button className="btnHome" >Login</button></Link>
            </div>

          <div className="childbody2">
            <img src={Bck1}/>
          </div>
      </div>

      <div className="childbody3">
            <h2>What do we get in semantics?</h2>
          </div>

          <div clasName="childbody4">
                <div className="badan1">
                  <div className="badan1img">
                    <img src={impact}/>
                  </div>
                  <div className="badan1main">
                    <h3>TITLE</h3>
                    <p>you can save important short notes such as phone numbers, 
                      home addresses or if you are a student you can keep notes 
                      in the form of homework, daily activities or others you can 
                      do it using semantics</p>
                  </div>
                </div>

                {/* <div className="btnMid">
                <Link to="/register"><button className="btnHome" >Click Here</button></Link>
                </div> */}
                
                <div className="badan2">
                  <div className="badan2main">
                    <h3>TITLE</h3>
                    <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum impedit ipsum rerum molestiae architecto sequi ipsam aliquam voluptatum, deleniti a.</span>
                  </div>
                  <div className="badan2img">
                    <img src={impact}/>
                  </div>
                </div>

                <div className="badan3">
                  <div className="badan3img">
                    <img src={impact} alt="" srcset="" />
                  </div>
                  <div className="badan3main">
                    <h3>TITLE</h3>
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea natus deleniti exercitationem voluptatibus quia omnis. Praesentium amet hic exercitationem earum.</span>
                  </div>
                </div>
          </div>

        <div className="collab">
          <div className="maincolab">
            <h6>collaboration with :</h6>
            </div>
            <div className="colabImg">
              <img src={skilvul} className="skilvul" alt="" srcset="" />
              <img src={impact} alt="" srcset="" />
            </div>
        </div>

        <div className="footer">
          <h6>Copyright © 2021 Semantics. All Rights Reserved.</h6>
        </div>
    </div>
    {console.log(data)}
    </div>
  )
}

export default HomePage;
