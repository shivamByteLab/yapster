import { useAuthContext } from "@/context/useAuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
// import toast from "react-hot-toast"

const useLogin = () => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  // const signUpURL ="api/auth/signup"

  const { setAuthUser } = useAuthContext();

  const login = async (loginData: { username: string; password: string }) => {
    const { username, password } = loginData;
    const success = handleSignUpError({ username, password });

    if (!success) return false;
    setLoading(true);

    try {
      const data = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (!data.data) {
        toast.error("unable to login");
      }

      if (data.status == 400) {
        toast.error("Error while signing Up");
      }

      //set localstorage
      localStorage.setItem("user-info", JSON.stringify(data.data));

      setAuthUser(data.data);
    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return { Loading, login };
};

export default useLogin;

function handleSignUpError({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (!username && !password) {
    // toast.error("Please fill all the fields")
    return false;
  }

  if (!username) {
    // toast.error("Please fill username")
    return false;
  }
  if (!password) {
    // toast.error("Please fill password")
    return false;
  }

  if (password.length < 6) {
    // toast.error("Password should be atleast 6 characters")
    return false;
  }

  return true;
}
