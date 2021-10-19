import React, { useState, useEffect } from "react";
import FormUpdate from "../component/form/FormUpdate";
import FormUser from "../component/form/FormUser";

function Profile() {
  // const [saveImage, setSaveImage] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [img, setImg] = useState("");
  const [currentPicture, setCurrentPicture] = useState("");
  const [status, setStatus] = useState(false);
  // const token = localStorage.getItem("token");

  useEffect(() => {
    if (status) {
      setDataUser(JSON.parse(localStorage.getItem("userinfo")));
      setCurrentPicture(JSON.parse(localStorage.getItem("img")));

      setImg(JSON.parse(localStorage.getItem("img")));
      setStatus(false);
    }
  }, [status]);

  useEffect(() => {
    setDataUser(JSON.parse(localStorage.getItem("userinfo")));
    setImg(JSON.parse(localStorage.getItem("img")));
  }, []);

  return (
    <div className="md:w-screen md:h-screen">
      <div className="wrapper bg-gray-400 antialiased text-gray-900">
        <div>
          <img
            src="https://source.unsplash.com/random/350x350"
            alt=" random imgee"
            className="w-full object-cover object-center rounded-lg shadow-md"
          />
          <div className="relative px-4 -mt-16  ">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-baseline">
                <span className="bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  New
                </span>
                <div className="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
                  2 baths • 3 rooms
                </div>
              </div>
              <h4 className="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                A random Title
              </h4>
              <div className="mt-1">
                $1800
                <span className="text-gray-600 text-sm"> /wk</span>
              </div>
              <div className="mt-4">
                <span className="text-teal-600 text-md font-semibold">
                  4/5 ratings{" "}
                </span>
                <span className="text-sm text-gray-600">
                  (based on 234 ratings)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 h-screen">
          <div className="md:max-h-96 md:h-screen">
            <img
              className="bg-auto bg-no-repeat bg-center h-full md:w-screen md:h-screen object-cover object-top"
              src="https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt="gambar"
            />
          </div>
          <div className="flex bg-gray-100 md:p-10 md:w-full lg:w-full md:flex-1 lg:flex-1 ">
            <div className="p-3 bg-white shadow-lg rounded-lg my-20">
              <div className="flex justify-center md:justify-end -mt-16">
                <img
                  className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500"
                  src={img !== currentPicture ? img : currentPicture || image}
                  alt="profile"
                />
              </div>
              <div className="md:flex md:flex-col md:justify-between">
                <h2 className="text-xl pt-3 text-gray-800 md:text-3xl font-semibold">
                  {dataUser ? dataUser.fullName : "User"}
                </h2>
                <p className="my-5 overflow-auto md:my-8 text-gray-600">
                  {dataUser
                    ? dataUser.intro
                    : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  dolores deserunt ea doloremque natus error, rerum quas odio
                  quaerat nam ex commodi hic, suscipit in a veritatis pariatur
                  minus consequuntur!`}
                </p>
              </div>
              <button>Update</button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <FormUpdate className="absolute" setStatus={setStatus} /> */}
      <FormUser setStatus={setStatus} />
    </div>
  );
}

export default Profile;
