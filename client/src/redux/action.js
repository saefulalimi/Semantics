import Axios from "axios";

const baseUrl = "http://localhost:8888";

export const register = (data) => {
  return (async) => {
    return Axios.post(`http://localhost:8888/users/register`, data)
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
      return Axios.post("http://localhost:8888/users/login", data)
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
    return Axios.post(`${baseUrl}/notes`, data.data, {
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
    return Axios.get(`${baseUrl}/notes`, data.data, {
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
    return Axios.patch(`${baseUrl}/notes`, data.data, {
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
    console.log(data);
    return Axios.patch(`${baseUrl}/notes/update`, data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => {
      console.log(res);
      localStorage.setItem("subject", JSON.stringify(res.data.data));
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

export const uploadImage = (picture) => {
  return (async) => {
    return Axios.patch(`http://localhost:8888/users/upload`, picture)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.href = data.image;
        }
      });
  };
};

//chat
export const process = (encrypt, text, cypher) => {
  return {
    type: "PROCESS",
    payload: {
      encrypt,
      text,
      cypher,
    },
  };
};

//subject
export const subjectAdd = (send) => {
  return (async) => {
    console.log("masuk aksi sub add");
    return Axios.post("http://localhost:8888/subject", send.data, {
      headers: {
        token: send.token,
      },
    }).catch((err) => console.log(err));
  };
};

export const subjectGet = (token) => {
  return (async) => {
    return Axios.get("http://localhost:8888/subject", {
      headers: {
        token: token,
      },
    }).then((res) => {
      console.log(res);
      localStorage.setItem("subject", JSON.stringify(res.data.data));
    });
  };
};

export const subjectChange = (data) => {
  return (async) => {
    return Axios.patch("http://localhost:8888/subject", data.data, {
      headers: {
        token: data.token,
      },
    }).then((res) => console.log(res));
  };
};

export const upcomingexamUpdate = (data) => {
  return (async) => {
    return Axios.post("http://localhost:8888/upcomingexam", data.exams, {
      headers: {
        token: data.token,
      },
    }).catch((err) => console.log(err));
  };
};

export const seminarUpdate = (data) => {
  return (async) => {
    return Axios.post("http://localhost:8888/seminar", data.seminars, {
      headers: {
        token: data.token,
      },
    }).catch((err) => console.log(err));
  };
};

export const workshopUpdate = (data) => {
  return (async) => {
    return Axios.post("http://localhost:8888/workshop", data.workshops, {
      headers: {
        token: data.token,
      },
    }).catch((err) => console.log(err));
  };
};

export const competitionUpdate = (data) => {
  return (async) => {
    return Axios.post("http://localhost:8888/competition", data.competitions, {
      headers: {
        token: data.token,
      },
    }).catch((err) => console.log(err));
  };
};
