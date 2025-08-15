import { useAuthContext } from "@/context/useAuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast"

const useLogout = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  // const signUpURL ="api/auth/signup"

  const { setAuthUser } = useAuthContext();

  const logout = async () => {

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
        {
          
        },
        { withCredentials: true }
      );


      //remove localstorage
      localStorage.removeItem("user-info");

      setAuthUser(null);
    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setLoading(false);
      router.push("/signin");
    }
  };

  return { Loading, logout };
};

export default useLogout;