import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";

function FormUpdate({ setStatus }) {
  const [image, setImage] = useState("https://fakeimg.pl/350x300/");
  const [saveImage, setSaveImage] = useState(null);
  const token = localStorage.getItem("token");

  let [data, setData] = useState({
    fName: "",
    age: "",
    website: "",
    intro: "",
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadChange = async (e) => {
    if (image === "https://fakeimg.pl/350x300/") {
      console.log(e.target.files[0]);
      const uploaded = e.target.files[0];
      setImage(URL.createObjectURL(uploaded));
      setSaveImage(uploaded);
    } else {
      return Error("You Can't Upload More Than 1 Picture");
    }
  };

  async function storeImage() {
    if (!saveImage) {
      alert("upload gambar dulu");
    }
    let formData = new FormData();
    formData.append("picture", saveImage);

    try {
      const pictureUpload = async () => {
        console.log("data image", formData);
        await axios
          .post("/users/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
              data: data,
            },
          })
          .then((res) => {
            console.log("ini Response", res);
            const gambar = res.data.image;
            localStorage.setItem("img", JSON.stringify(gambar));
            setSaveImage(null);

            setImage(gambar);
          });
      };
      pictureUpload();

      const bioUpdate = async () => {
        console.log(data);
        await axios
          .post("/users/update", data, {
            headers: { token: token },
          })
          .then((res) => {
            console.log("ini response input", res);
            const dataUser = {
              fullName: res.data.data.fullName,
              age: res.data.data.age,
              website: res.data.data.website,
              intro: res.data.data.intro,
            };

            localStorage.setItem("userinfo", JSON.stringify(dataUser));
            setData({
              fName: "",
              age: "",
              website: "",
              intro: "",
            });
          });
      };
      bioUpdate();
      setStatus(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="">
      <div className="md:flex md:justify-center md:items-center h-screen bg-gray-200">
        <div className="md:flex md:flex-row grid bg-white rounded-lg shadow-xl md:w-11/12 md:h-10/12 lg:w-11/12 lg:h-10/12">
          <div className="md:flex lg:flex flex">
            <div className="flex bg-purple-200 md:w-72 lg:w-72 border-2 border-purple-300">
              <img
                className="bg-contain md:w-full lg:w-full"
                src={image}
                alt="gambar"
              />
            </div>
          </div>
          <div className="md:hidden lg:hidden flex justify-center overflow-hidden">
            <div className="flex">
              <h1 className="text-gray-600 font-bold md:text-2xl text-xl">
                Update User Data
              </h1>
            </div>
          </div>
          {/* inputan */}
          <div className="md:flex md:flex-col lg:flex ls:flex-col grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="md:flex md:flex-col lg:flex ls:flex-col grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 my-5 mx-7">
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Full Name
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="fName"
                  onChange={(e) => onChange(e)}
                  placeholder="Full Name..."
                />
              </div>
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Age
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="number"
                  name="age"
                  onChange={(e) => onChange(e)}
                  placeholder="Age"
                />
              </div>
              <div className="grid grid-cols-1">
                <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                  Website
                </label>
                <input
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  type="text"
                  name="website"
                  onChange={(e) => onChange(e)}
                  placeholder="http://..."
                />
              </div>
            </div>
          </div>
          {/* intro */}
          <div className="md:flex md:flex-col lg:flex ls:flex-col grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 my-5 mx-7">
            <label className="md: lg: uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Intro
            </label>
            <textarea
              className="md:h-full lg:h-full py-2 px-3 bg-purple-400 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="textar"
              name="intro"
              onChange={(e) => onChange(e)}
              placeholder="Another Input"
            />
          </div>
          {/* upload */}
          <div className="md:flex md:flex-col md:flex-1 lg:flex lg:flex-col grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 my-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
              Upload Photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col border-4 border-dashed w-full h-32 hover:bg-gray-100 hover:border-purple-300 group">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="lowercase text-sm text-gray-400 group-hover:text-purple-600 pt-1 tracking-wider">
                    Select a photo
                  </p>
                </div>
                <input
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={handleUploadChange}
                  className="hidden"
                />
              </label>
            </div>
            <button className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
              Cancel
            </button>
            <button
              onClick={storeImage}
              className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUpdate;
