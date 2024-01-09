import process from 'process';
const VITE_REACT_APP_API_HOST = process.env.SERVER_HOST;

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
  
  