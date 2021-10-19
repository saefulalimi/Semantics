import React, { useState, useEffect } from "react";
import FormUser from "../component/form/FormUser";
function Profile() {
  // const [saveImage, setSaveImage] = useState(null);
  const [dataUser, setDataUser] = useState({});
  const [img, setImg] = useState("");
  const [currentPicture, setCurrentPicture] = useState("");
  const [status, setStatus] = useState(false);
  const [modal, setModal] = useState('hidden')
  // const token = localStorage.getItem("token");

  const openModal = () => {
    setModal('block')
  }

  const closeModal = () => {
    setModal('hidden')
  }

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


  // https://source.unsplash.com/random/350x350
  return (

    <div className="">
      <section className="justify-center md:mt-32 bg-white dark:bg-gray-800">
  <div className="container px-6 py-8 mx-auto">
    <div className="items-center lg:flex">
      <div className="lg:w-1/2">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Who I am</h2>
        <p className="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
          <span className="font-bold">{dataUser.fullName} ~ {dataUser.age}</span>.
          <p>{dataUser.intro}</p>  
        </p>
        <button onClick={openModal} className="font-bold transition ease-in duration-300 bg-gray-500 px-3 py-2 rounded-md hover:bg-black hover:text-white ">Update</button>
      </div>
      <div className="mt-8 lg:mt-0 lg:w-1/2">
        <div className="flex items-center justify-center lg:justify-end">
          <div className="max-w-lg">
            <h3 className="text-2xl font-semibold">Profile Picture</h3>
            <img className="md:hover:transform md:hover:scale-125 transition ease-in-out duration-300 object-cover object-center w-full h-64 rounded-md shadow" src={img} alt='...' />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <div className={`${modal} fixed z-10 inset-0 overflow-y-auto transition ease-in-out duration-300 md:h-screen md:w-screen`}>
        <FormUser closeModal={closeModal} setStatus={setStatus} />
      </div>
    </div>
  );
}

export default Profile;
