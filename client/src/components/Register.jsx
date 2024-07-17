import { useState } from "react";
import { Link } from "react-router-dom";
import avater from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import { registerValidator } from "../helper/validate.js";
import { convertToBase64 } from "../helper/convert.js";

const Register = () => {
  const [file , setFile] = useState();
  const formik = useFormik({
    initialValues: {
      email:'',
      userName: '',
      Password: '',
    },
    validate: registerValidator,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass} style={{ width: "450px", height: "max-content"}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
              <img src={file || avater} alt="avatar" className={styles.profile_img} />
              </label>
              <input type="file" id="profile" name="profile" onChange={onUpload}/>
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="text"
                placeholder="Enter your email*"
                className={styles.textbox}
                {...formik.getFieldProps("email")}
              />
              <input
                type="text"
                placeholder="Enter user name*"
                className={styles.textbox}
                {...formik.getFieldProps("userName")}
              />
              <input
                type="password"
                placeholder="Enter Password*"
                className={styles.textbox}
                {...formik.getFieldProps("Password")}
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>
            <div className="text-center py-4">
              <span>
              Already Registered?{" "}
                <Link className="text-gray-500" to="/login">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
