import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/action";
import { Link } from "react-router-dom";

import axios from "../utils/axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

function Profile() {
  const [fullname, setFullname] = useState("");
  const [age, setAge] = useState(null);
  const [website, setWebsite] = useState("");
  const [intro, setIntro] = useState("");
  const [image, setImage] = useState("https://fakeimg.pl/350x300/");
  const [saveImage, setSaveImage] = useState(null);
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleUploadChange = async (e) => {
    if (image === "https://fakeimg.pl/350x300/") {
      console.log("handlle change jalan");
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
      await axios
        .post("/users/upload", formData, {
          headers: { "Content-Type": "multipart/form-data", token: token },
        })
        .then((res) => {
          console.log("ini Response", res);
          const gambar = res.data.image;

          setImage(gambar);
          setSaveImage(null);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      token: token,
      fullName: fullname,
      age: age,
      website: website,
      intro: intro,
    };
    console.log(data);
    const response = await dispatch(updateUser(data));
    console.log(response);
  };

  return (
    <div>
      <div>
        <div className="overflow-y-auto grid grid-cols-1 md:grid-cols-2 h-screen">
          <div className="md:max-h-96 md:h-screen">
            <img
              className="bg-auto bg-no-repeat bg-center h-full md:w-screen md:h-screen object-cover object-top"
              src="https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt
            />
          </div>
          <div className="flex bg-gray-100 md:p-10">
            <div className="p-3 bg-white shadow-lg rounded-lg my-20">
              <div className="flex justify-center md:justify-end -mt-16">
                <img
                  className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500"
                  src={image}
                  alt="profile"
                />
              </div>
              <div className="md:flex md:flex-col md:justify-between">
                <h2 className="text-xl pt-3 text-gray-800 md:text-3xl font-semibold">
                  Human
                </h2>
                <p className="my-5 overflow-auto md:my-8 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                  dolores deserunt ea doloremque natus error, rerum quas odio
                  quaerat nam ex commodi hic, suscipit in a veritatis pariatur
                  minus consequuntur!
                </p>
              </div>
              <div className="text-sm font-medium text-indigo-500 my-5">
                <input
                  type="file"
                  id="formFile"
                  accept="image/*"
                  onChange={handleUploadChange}
                />
                <button
                  className="md:hover:text-blue-500 md:text-black"
                  onClick={storeImage}
                  size="small"
                  color="primary"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
