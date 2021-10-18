import React, { useState, useEffect } from "react";
import FormUpdate from "../component/form/FormUpdate";

function Profile() {
  const [image, setImage] = useState("https://fakeimg.pl/350x300/");
  // const [saveImage, setSaveImage] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [img, setImg] = useState("");
  const [currentPicture, setCurrentPicture] = useState("");
  const [status, setStatus] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
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
      <div>
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
      </div>
      <FormUpdate className="absolute" setStatus={setStatus} />
    </div>
  );
}

export default Profile;
