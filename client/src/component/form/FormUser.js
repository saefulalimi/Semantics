import React, { useState } from "react";
import axios from "../../utils/axios";

function FormUser({ setStatus, closeModal }) {
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
              fullName: "",
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
    <div>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Personal Details</p>
                  <p>Please fill out all the fields.</p>
                </div>
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="fName"
                        placeholder="Your Full Name..."
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => onChange(e)}
                        placeholder="Your Age"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Website</label>
                      <input
                        type="text"
                        name="website"
                        placeholder="http://..."
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    {/* bermasalah */}
                    <div className="md:col-span-5 md:row-span-5">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-900 block mb-2"
                      >
                        Your Intro
                      </label>
                      <textarea
                        rows="5"
                        cols="40"
                        className="md:h-full h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Leave a intro..."
                        name="intro"
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div className="md:mt-3 md:col-span-5">
                      <label
                        className="text-sm font-medium text-gray-900 block mb-2"
                        htmlFor="user_avatar"
                      >
                        Upload Picture
                      </label>
                      <div className="relative">
                        <input
                          className="block w-full overflow-hidden cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-lg "
                          aria-describedby="user_avatar_help"
                          id="user_avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleUploadChange}
                        />
                      </div>
                      <div
                        className="mt-1 text-sm text-gray-500"
                        id="user_avatar_help"
                      >
                        A profile picture is useful to confirm your are logged
                        into your account
                      </div>
                    </div>

                    <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                        <button
                          onClick={closeModal}
                          className="mx-2 bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          close
                        </button>
                      </div>
                      <div className="inline-flex items-end">
                        <button
                          onClick={storeImage}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormUser;
