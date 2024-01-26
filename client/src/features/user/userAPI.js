const VITE_REACT_APP_API_HOST = import.meta.env.VITE_REACT_APP_API_HOST;

export const fetchLoggedInUserOrders = async (id)=>{
    try {
        const res = await fetch(`${VITE_REACT_APP_API_HOST}/orders/?user.id=${id}`);
        const obj = await res.json();
        return obj;
    } catch (error) {
        console.log(error)
    }
}

export const UpdateUser = async (user)=>{
    try{
        const res = await fetch(`${VITE_REACT_APP_API_HOST}/users/${user.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const obj = await res.json();
        return obj;
    }catch(err){
        console.log(err)
    }
}