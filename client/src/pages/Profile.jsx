import React, { useState, useEffect } from "react";
import FormUser from "../component/form/FormUser";
import MobileNavbar from "../component/navbar/mobile/MobileNavbar";
import { Link } from "react-router-dom";
import { BsBackspaceFill } from "react-icons/bs";

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
    <div className="bg-gradient-to-r from-green-400 to-blue-500">
      <Link to="/dashboard">
        <BsBackspaceFill
          className="hidden md:block my-3 mx-5 text-black hover:cursor-pointer"
          size="1.8rem"
        />
      </Link>
      <section className="justify-center md:mt-32 bg-transparent dark:bg-gray-800">
        <div className="container px-6 py-6 mx-auto ">
          <div className="items-center lg:flex ">
            <div className="lg:w-1/2 relative px-4 py-5 shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                Who I am
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
                <span className="font-bold text-black">
                  {dataUser !== {} ? dataUser.fullName : "Human"} ~
                </span>
                <span className="font-semibold text-black">
                  {dataUser !== {} ? dataUser.age : "Age"}
                </span>
                .
                <p className="text-black">
                  {dataUser !== {}
                    ? dataUser.intro
                    : `Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Error a reprehenderit molestiae, debitis exercitationem ad
                  nulla consectetur minima deserunt est harum totam unde, quidem
                  facilis modi doloribus quas. Nostrum, dolorum porro tenetur,
                  molestias nisi similique deserunt neque eveniet sunt adipisci
                  mollitia dolore. Laborum esse amet natus id! Possimus, quasi
                  adipisci.`}
                </p>
              </p>
              <button
                onClick={openModal}
                className="font-bold transition ease-in duration-300 bg-gray-500 px-3 py-2 rounded-md hover:bg-black hover:text-white "
              >
                Update
              </button>
            </div>
            <div className="mt-8 lg:mt-0 lg:w-1/2">
              <div className="flex items-center justify-center lg:justify-end">
                <div className="max-w-lg">
                  <h3 className="text-2xl font-semibold">Profile Picture</h3>
                  <img
                    className="md:hover:transform md:hover:scale-125 transition ease-in-out duration-300 object-cover object-center w-full h-64 rounded-md shadow"
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
          </div>
        </div>
      </section>

      <div
        className={`${modal} fixed z-10 inset-0 overflow-y-auto transition ease-in-out duration-300 md:h-screen md:w-screen`}
      >
        <FormUser closeModalUser={closeModalUser} setStatus={setStatus} />
      </div>
      <div className="mobileNav">
        <MobileNavbar />
      </div>
    </div>
  );
}

export default Profile;
