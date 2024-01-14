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
export const GoogleAuth = async (userData) => {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users`, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    if (respone.ok) {
        console.log("response ok", userData);
        userData = { ...userData, address:[]};
        return await userData;
    }else{
        throw new Error('Something went wrong');
    }
}
export const CheckGoogleUserExist = async (userData) => {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users`)
    const res = await respone.json();
    if (res && res.length > 0) {
        for (let i =0 ; i<res.length; i++){
            if (res[i].email === userData.email){
                return true;
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

  export const UpdateUser = async (data) => {
    const respone = await fetch(`${VITE_REACT_APP_API_HOST}/users`, {
        method: 'PATCH',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (respone.ok) {
        const data = await respone.json();
        return data;
    } else {
        throw new Error('Something went wrong')
    }
}