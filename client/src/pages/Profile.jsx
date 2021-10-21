import React, { useState, useEffect } from "react";
import FormUser from "../component/form/FormUser";
import '../style/profile.css'

function Profile() {
  // const [saveImage, setSaveImage] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState("hidden");
  // const token = localStorage.getItem("token");

  const openModal = () => {
    setModal("block");
  };

  const closeModalUser = () => {
    setModal("hidden");
  };

  useEffect(() => {
    if (status) {
      setDataUser(JSON.parse(localStorage.getItem("Userinfo")));

      console.log("ini adalah useEffect update profile", dataUser);
      setStatus(false);
    }
  }, [status, dataUser]);

  useEffect(() => {
    setDataUser(JSON.parse(localStorage.getItem("Userinfo")));
  }, []);

  // https://source.unsplash.com/random/350x350
  return (
    <div className="">
      <section className="body-main">
        <div className="main-prof">
          <div className="main-child">

          <div className="form1">
              <div className="child-form1">
                <div className="image-intro">
                  <img
                    className="img-form"
                    src={
                      dataUser !== {}
                        ? dataUser.avatar
                        : "https://source.unsplash.com/random/350x350"
                    }
                    alt="..."
                  />
                </div>
              </div>
            </div>

          <div className="form2">
            <h3> Profile!  </h3>
              <p className="child-form2">
                <div className="inputprof">
                  <div className="userprof">
                    <span>*username</span>
                    <h5>{dataUser !== {} ? dataUser.fullName : "Human"}</h5>
                  </div>
                  <div className="userprof">
                    <span>*age</span>
                    <h5>{dataUser !== {} ? dataUser.age : "Age"}</h5>
                  </div>
                  <div className="userprof">
                  <span>*bio</span>
                    <span>
                      {dataUser !== {}
                        ? dataUser.intro
                        : `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Error a reprehenderit molestiae, debitis exercitationem ad
                      nulla consectetur minima deserunt est harum totam unde, quidem
                      facilis modi doloribus quas. Nostrum, dolorum porro tenetur,
                      molestias nisi similique deserunt neque eveniet sunt adipisci
                      mollitia dolore. Laborum esse amet natus id! Possimus, quasi
                      adipisci.`}
                    </span>
                  </div>
                  {/* <div className="userprof"></div> */}
                </div>
              </p>
              <button
                onClick={openModal}
                className="font-bold transition ease-in duration-300 bg-gray-500 px-3 py-2 rounded-md hover:bg-black hover:text-white "
              >
                Update
              </button>
            </div>
           
          </div>
        </div>
      </section>

      <div
        className={`${modal} fixed z-10 inset-0 overflow-y-auto transition ease-in-out duration-300 md:h-screen md:w-screen`}
      >
        <FormUser closeModalUser={closeModalUser} setStatus={setStatus} />
      </div>
    </div>
  );
}

export default Profile;
