const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const createOrder = async (data)=>{
    try {
        const response = await fetch(`${VITE_REACT_APP_API_HOST}/orders`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        });
        const obj = await response.json();
        console.log(obj);
        return obj;
    } catch (error) {
        console.log(error)
    }
}
export const getOrder = async (id)=>{
    try {
        const response = await fetch(`${VITE_REACT_APP_API_HOST}/orders?user.id=${id}`); // here user is an object not a value in the json and thus has a having an id.
        const obj = await response.json();
        console.log(obj);
        return obj;
    } catch (error) {
        console.log(error)
    }
}