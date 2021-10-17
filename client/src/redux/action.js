import Axios from "../utils/axios";

export const register = (data) => {
  return (async) => {
    return Axios.post(`/users/register`, data)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    try {
      return Axios.post("/users/login", data)
        .then((res) => {
          dispatch(setToken(res.data));
          console.log(res);
          JSON.parse(
            localStorage.setItem(
              "subject",
              JSON.stringify(res.data.activity.subject)
            )
          );
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
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

//notes
export const addNote = (data) => {
  return (async) => {
    return Axios.post("/notes", data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => {
      console.log(res);
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
      console.log(res);
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
      console.log(res);
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

//stuck
export const updateUser = (data) => {
  return (async) => {
    return Axios.post("http://localhost:8888/users/update", data)
      .then(() => {
        console.log("updating sucess");
      })
      .then((err) => {
        console.log(err);
      });
  };
};
