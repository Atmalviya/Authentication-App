import { Link } from "react-router-dom";
import avater from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import { passwordValidator } from "../helper/validate.js";

const Password = () => {
  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
    },
    validate: passwordValidator,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
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
              Enter password to continue....
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avater} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                type="password"
                placeholder="Password"
                className={styles.textbox}
                {...formik.getFieldProps("Password")}
              />
              <button className={styles.btn} type="submit">
                Lets Go
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
