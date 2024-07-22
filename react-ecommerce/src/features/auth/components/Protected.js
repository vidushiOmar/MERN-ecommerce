import { useSelector } from "react-redux";
import { selectloggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function Protected({children}){
    const user=useSelector(selectloggedInUser);
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}
export default Protected;