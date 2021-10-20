import React, { useState } from "react";
import axios from "../../utils/axios";
import ErrorModal from "../modal/ErrorModal";
import WarningModal from "../modal/WarningModal";
import SuccessModal from "../modal/SuccessModal";

function FormUser({ setStatus, closeModalUser }) {
  const [saveImage, setSaveImage] = useState(null);
  const [modal, setModal] = useState("hidden");
  const [code, setCode] = useState("");

  const token = localStorage.getItem("token");

  const closeModal = () => {
    setModal("hidden");
  };

  const cekModal = (code) => {
    if (code === 200) {
      return (
        <SuccessModal message={"Success Update Info"} closeModal={closeModal} />
      );
    } else if (code === 400) {
      return (
        <WarningModal
          message={"Please Check Your Input again"}
          closeModal={closeModal}
        />
      );
    } else if (code === 404) {
      return <ErrorModal message={"User Not Found"} closeModal={closeModal} />;
    }
  };

  const [data, setData] = useState({
    fullName: "",
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
    console.log(e.target.files[0]);
    const uploaded = e.target.files[0];
    setSaveImage(uploaded);
  };

  async function SubmitData(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("picture", saveImage);
    formData.append("fullName", data.fullName);
    formData.append("age", data.age);
    formData.append("website", data.website);
    formData.append("intro", data.intro);

    try {
      const pictureUpload = async () => {
        await axios
          .post("/users/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          })
          .then((res) => {
            setCode(res.status);
            setModal("block");
            const hasil = res.data.data;
            localStorage.setItem("Userinfo", JSON.stringify(hasil));
            setSaveImage(null);
            return res.status;
          })
          .catch((err) => {
            setCode(err.response.status);
            setModal("block");
          });
      };
      pictureUpload();
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
                <form onSubmit={SubmitData}>
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="fullName"
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
                        <div className="relative md:flex md:flex-row md:justify-between">
                          <input
                            className="block w-full overflow-hidden cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm rounded-lg "
                            aria-describedby="user_avatar_help"
                            required
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
                            onClick={closeModalUser}
                            type="button"
                            className="mx-2 bg-gray-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            close
                          </button>
                        </div>
                        <div className="inline-flex items-end">
                          <button
                            onClick={SubmitData}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {code !== "" ? (
        <div
          className={`${modal} fixed inset-0 overflow-y-auto transition ease-in-out duration-300 my-auto md:my-28`}
        >
          {cekModal(code)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FormUser;
