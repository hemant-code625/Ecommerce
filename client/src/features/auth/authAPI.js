// import process from 'process';
// const VITE_REACT_APP_API_HOST = process.env.SERVER_HOST;
const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;
export const createUser = async (userData) => {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    if (respone.ok) {
        // ToDo: On server will pass only relevant data
        const data = await respone.json();
        return data;
    } else {
        throw new Error('Something went wrong')
    }
}
export const updateRole = async (userId, newRole) => {           // added role manually in the db for now
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Something went wrong');
    }
};

export const GoogleAuth = async (userData) => {
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/users`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    
    if (response.ok) {
         userData = { ...userData, addresses: [], role: "user" };
        return await userData;
    } else {
        throw new Error('Something went wrong');
    }
}

export const CheckGoogleUserExist = async (userData) => {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users`)
    const res = await respone.json();
    if (res && res.length > 0) {
        for (let i =0 ; i<res.length; i++){
            if (res[i].email === userData.email){
                let data = await res[i];
                return data;
            }
        }
    }
    else{
        throw new Error('Error in checking user');
    }
}

export const checkUser = async (userInfo) => {
    const email = userInfo.email;
    const password = userInfo.password;
    try {
      const response = await fetch(`${VITE_REACT_APP_API_HOST}/users?email=${email}`);
      const data = await response.json();
      if (data && data.length > 0 && data[0].password === password) {
        return data[0];
      }
      else if (data && data.length > 0 && data[0].password !== password){
        console.log("Wrong credentials");
        return { message: "Wrong credentials" };
      }
      else {
        return { message: "user Not Found" };
      }
    }
    catch (error) {
        return { message: "Ops! Server Error!" };
    }
  };
  export const fetchGoogleAddresses = async (id) => {
    const response = await fetch(`${VITE_REACT_APP_API_HOST}/users/${id}`, {
      method: 'GET',
      headers: {
        'content-Type':'application/json',
      },
    });
  
    const data = await response.json();
    // Extract and return the addresses from the API response
    return data.addresses || [];
  };
  export const UpdateUser = async (data) => {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users/${data.id}`,{
        method:'PATCH',
        headers:{
            'content-Type':'application/json',
        },
        body:JSON.stringify(data),
    })
    if (respone.ok){
        const data = await respone.json();
        return data;
    }
    else{
        throw new Error('Something went wrong');
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${VITE_REACT_APP_API_HOST}/users/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Response from deleteUser", data);
            return data;
        } else {
            const errorData = await response.json();
            console.error("Error from deleteUser", errorData);
            throw new Error('Something went wrong');
        }
    } catch (error) {
        console.error("Error in deleteUser function", error);
        throw error;
    }
};