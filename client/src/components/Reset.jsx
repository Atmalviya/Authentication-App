import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import { resetPasswordValidator } from "../helper/validate.js";
import { resetPassword } from "../helper/axios.js";
import { useAuthStore } from "../store/store.js";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../Hooks/fetch.hook.js";

const Reset = () => {
  const navigate = useNavigate();
  const [{isLoading, apiData, status, serverError}] = useFetch('createResetSession');
  console.log(status)

  useEffect(() => {
    console.log(apiData)
  })

  const { username } = useAuthStore((state) => state.auth);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "dasad",
    },
    validate: resetPasswordValidator,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });
      toast.promise(resetPromise, {
        loading: "Resetting password...",
        success: "Password reset successfully",
        error: "Password reset failed",
      });
      resetPromise.then(() => {
        navigate("/password");
      });
    },
  });

  if (isLoading) {return <h1 className="text-2xl font-bold">Loading...</h1>;}
  if (serverError) {return (<h1 className="text-2xl font-bold text-red-500">Error: {serverError} </h1>);}
  if (status && status !== 201) {
    <Navigate to={"/password"} replace={true}></Navigate> }
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass} style={{ width: "30%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Reset</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter new password
            </span>
          </div>
          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                placeholder="New Password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.textbox}
                {...formik.getFieldProps("confirmPassword")}
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
