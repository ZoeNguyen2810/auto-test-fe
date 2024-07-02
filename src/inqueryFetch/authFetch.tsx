import axios from "axios";
import { SignUp , forGotPassword} from "../Type/Auth";




export const createUser = async ( data : SignUp) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/user/create' , data
    )

    return res
}
export const changePassword = async ( data : forGotPassword) => {
    const res = await axios.post('https://www.mica.edu.vn/act/api/user/update-password' , data
    )

    return res.data
}
export const getListUsers = async () => {
    const res = await axios.get('https://www.mica.edu.vn/act/api/user/list' , {
        params : {
            enabled : true,
            paging_page : 50
        }
    })
}
