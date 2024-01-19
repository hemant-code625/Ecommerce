import { VITE_REACT_APP_API_HOST } from "../../env.js";
export const fetchLoggedInUserOrders = async (id)=>{
    try {
        const res = await fetch(`${VITE_REACT_APP_API_HOST}/orders/?user.id=${id}`);
        const obj = await res.json();
        return obj;
    } catch (error) {
        console.log(error)
    }
}