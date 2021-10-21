import Axios from "../utils/axios";

export const register = (data) => {
  return (async) => {
    return Axios.post(`/users/register`, data)
      .then((res) => {
        return res.status;
      })
      .catch((err) => {
        return err.response.status;
      });
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      return Axios.post("/users/login", data)
        .then((res) => {
          dispatch(setToken(res.data));

          localStorage.setItem(
            "subject",
            JSON.stringify(res.data.dataUser.activity.subject)
          );
          const userinfo = {
            avatar: res.data.dataUser.avatar,
            fullName: res.data.dataUser.fullName,
            age: res.data.dataUser.age,
            website: res.data.dataUser.website,
            intro: res.data.dataUser.intro,
          };
          localStorage.setItem("Userinfo", JSON.stringify(userinfo));
          return res.status;
        })
        .catch((err) => {
          return err.response.status;
        });
    } catch (error) {
      // console.log(error);
    }
  };
};

export const setToken = (data) => {
  return {
    type: "SET_TOKEN",
    payload: data,
  };
};

export const logoutUser = () => {
  return {
    type: "USER_LOGOUT",
  };
};

export const getUpdate = (token) => {
  return (async) => {
    return Axios.get("/users", {
      headers: {
        token: token,
      },
    }).then((res) => {
      return res;
    });
  };
};

//notes
export const addNote = (data) => {
  return (async) => {
    return Axios.post("/notes", data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => {
      localStorage.setItem("subject", JSON.stringify(res.data.data));
      return res.data.data;
    });
  };
};

export const getNotes = (data) => {
  return (async) => {
    return Axios.get("/notes", data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => {
      return res.data;
    });
  };
};

export const deleteNote = (data) => {
  return (async) => {
    return Axios.patch("/notes", data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => {
      localStorage.setItem("subject", JSON.stringify(res.data.data));
    });
  };
};

export const updateNote = (data) => {
  return (async) => {
    return Axios.patch("/notes/update", data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => {
      localStorage.setItem("subject", JSON.stringify(res.data.data));
    });
  };
};

//upload picture
export const uploadImage = (picture) => {
  return (async) => {
    return Axios.patch("/users/upload", picture)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.href = data.image;
        }
      });
  };
};
