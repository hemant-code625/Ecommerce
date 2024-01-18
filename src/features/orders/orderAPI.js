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
        const response = await fetch(`${VITE_REACT_APP_API_HOST}/orders?=${id}`);  // design this api
        const obj = await response.json();
        console.log(obj);
        return obj;
    } catch (error) {
        console.log(error)
    }
}