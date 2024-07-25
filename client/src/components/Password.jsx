import { Link, useNavigate } from "react-router-dom";
import avater from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import { passwordValidator } from "../helper/validate.js";
import useFetch from "../Hooks/fetch.hook.js";
import { useAuthStore } from "../store/store.js";
import { loginUser } from "../helper/axios.js"; 

const Password = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isLoading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidator,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const loadingToast = toast.loading("Checking password...");
      try {
        const response = await loginUser({ username, password: values.password });
        let { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/profile");
        toast.success("Login Successful...");
      } catch (error) {
        toast.error(error.message ); // Show error message from server
      } finally {
        toast.dismiss(loadingToast);
        
      }
    },
  });

  if (isLoading) {return <h1 className="text-2xl font-bold">Loading...</h1>;}
  if (serverError) {return (<h1 className="text-2xl font-bold text-red-500">Error: </h1>);}

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              Hello {apiData?.firstName || username}
            </h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter password to continue....
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avater}
                alt="avatar"
                className={styles.profile_img}
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                placeholder="Password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
              />
              <button className={styles.btn} type="submit">
                Login
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                Forgot Password?{" "}
                <Link className="text-gray-500" to="/recovery">
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
