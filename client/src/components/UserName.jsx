import { Link, useNavigate } from "react-router-dom";
import avater from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import { userNameValidator } from "../helper/validate.js";
import { useAuthStore } from "../store/store.js";
import { useEffect } from "react";

const UserName = () => {
  const navigate = useNavigate();
  //* Zustand Store
  const setUsername = useAuthStore(state => state.setUsername);

  //* Formik
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: userNameValidator,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore more here by clciking below
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avater} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="Username"
                className={styles.textbox}
                {...formik.getFieldProps("username")}
              />
              <button className={styles.btn} type="submit">
                Let&apos;s Go
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                Not a Member?{" "}
                <Link className="text-gray-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserName;
