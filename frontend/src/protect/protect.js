import {jwtDecode} from 'jwt-decode';
function getUsername(){
    const token=localStorage.getItem("token");
    if(token){
    const decoded = jwtDecode(token);
    console.log("Token",decoded);
    const email=decoded.email;
    return email;
    }
}
export default getUsername;