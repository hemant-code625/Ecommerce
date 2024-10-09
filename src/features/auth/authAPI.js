const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const createUser = async (userData) => {
  try {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/auth/signup`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ userData }),
    });
    if (respone.ok) {
      // ToDo: On server will pass only relevant data
      const data = await respone.json();
      return data;
    }
  } catch (error) {
    console.error("Error in createUser function", error);
  }
};
export const updateRole = async (userId, newRole) => {
  // added role manually in the db for now
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ role: newRole }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Something went wrong");
  }
};

export const GoogleAuth = async (googleId) => {
  const response = await fetch(`${VITE_REACT_APP_API_HOST}/auth/google`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ googleId }),
  });

  if (!response.ok) {
    throw new Error("Google auth failed");
  }

  const { token, user } = await response.json();
  window.localStorage.setItem("token", token);
  return user;
};

export const loginUser = async (userInfo) => {
  const email = userInfo.email;
  const password = userInfo.password;
  try {
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const res = await response.json();
      window.localStorage.setItem("token", res.data.accessToken);
      return res;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    return { message: "Ops! Server Error while Loggin in!", error };
  }
};

export const UpdateUser = async (data) => {
  try {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users/${data.id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        addresses: [
          {
            street: data.street,
            city: data.city,
            state: data.state,
            pinCode: data.pinCode,
          },
        ],
      }),
    });
    if (respone.ok) {
      const data = await respone.json();
      return data;
    }
  } catch (error) {
    console.error("Error in UpdateUser function", error);
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/users/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response from deleteUser", data);
      return data;
    } else {
      const errorData = await response.json();
      console.error("Error from deleteUser", errorData);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error("Error in deleteUser function", error);
    throw error;
  }
};
