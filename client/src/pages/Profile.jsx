import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/action";

import axios from "axios";
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
    console.log(e.target.files[0]);
    const uploaded = e.target.files[0];
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  };

  async function storeImage() {
    if (!saveImage) {
      alert("upload gambar dulu");
    }

    let formData = new FormData();
    formData.append("picture", saveImage);

    try {
      const response = await axios.patch(
        "http://localhost:8888/users/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", token: token },
        }
      );

      const gambar = response.data.image;

      window.location.href = gambar;
      setImage(gambar);
      console.log(response);
    } catch (error) {
      console.log({ ...error });
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
    <div className="absolute w-full h-full bg-gradient-to-r from-green-400 to-blue-500 ">
      <div className="m-3 flex flex-col">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Full Name"
            onChange={(e) => setFullname(e.target.value)}
          />
          <br />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Website"
            onChange={(e) => setWebsite(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Intro"
            onChange={(e) => setIntro(e.target.value)}
          />
          <br />
          <button onClick={handleUpdate}>Update Data</button>
        </form>
      </div>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" src={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Thumbnail
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <input
            type="file"
            id="formFile"
            accept="image/*"
            onChange={handleUploadChange}
          />
          <Button onClick={storeImage} size="small" color="primary">
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Profile;
