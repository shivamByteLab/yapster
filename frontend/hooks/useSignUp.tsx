import { useAuthContext } from "@/context/useAuthContext"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
// import toast from "react-hot-toast"
// import { useAuthContext } from "../context/AuthContext"

const useSignUp =()=>{
    const [Loading, setLoading] = useState(false)
    // const signUpURL ="api/auth/signup"
    const router = useRouter()

    const {setAuthUser} = useAuthContext()

    const signup = async(signupData:{name:string,username:string,password:string,confirmPassword:string,avatar:string})=>{
        const {name,username,password,confirmPassword,avatar} = signupData;
        const success = handleSignUpError({name,username,password,confirmPassword})

        if(!success) return false
        setLoading(true)

        try {
                // const formData = new FormData

            
                const data = await axios.post(`http://localhost:5050/api/auth/signup`,{
                  name,
                  username,
                  avatar,
                  password,
                  confirmPassword
                },{withCredentials:true})
            
                if(!data){
                  console.log("unable to signup")
                }
                console.log(data)
              
              
            
            if(data.status==400){
                console.error("Error while signing Up");
                // throw data.error;
                // throw new Error(data)
            }

            //set localstorage
            localStorage.setItem("user-info",JSON.stringify(data.data))

            setAuthUser(data.data)

        } catch (error) {
            // toast.error(error.message)
        }finally{
            setLoading(false)
            router.push("/")
        }
    }

    return {Loading, signup}
}

export default useSignUp

function handleSignUpError({name,username,password,confirmPassword}:{name:string,username:string,password:string,confirmPassword:string}){

    if(!name && !username && !password && !confirmPassword){
        // toast.error("Please fill all the fields")
        return false
    }

    if(!name){
        // toast.error("Please fill name")
        return false
    }
    if(!username){
        // toast.error("Please fill username")
        return false
    }
    if(!password){
        // toast.error("Please fill password")
        return false
    }
    if(!confirmPassword){
        // toast.error("Please fill Confirm Password")
        return false
    }

    if(password !== confirmPassword){
        // toast.error("Password does not matched")
        return false
    }

    if(password.length < 6){
        // toast.error("Password should be atleast 6 characters")
        return false
    }

    return true

}