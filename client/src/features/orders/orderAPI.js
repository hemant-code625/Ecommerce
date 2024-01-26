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

export const fetchAllOrder =async()=>{
//     let queryString = '';

//     for (let key in sort) {
//      queryString += `${key}=${sort[key]}&`;
//    }
//      for (let key in pagination) {
//        queryString += `${key}=${pagination[key]}&`;
//      }
   
    try {
        const response = await fetch(`${VITE_REACT_APP_API_HOST}/orders`);
        const obj = await response.json();
        console.log("Fetching all orders from api",obj);
        return obj;
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder = async(update)=>{
    try{
        const response = await fetch(`${VITE_REACT_APP_API_HOST}/orders/${update.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(update)
        })  
        return response;
    }catch (error) {
        console.log(error)
    }
}