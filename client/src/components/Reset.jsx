import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import { resetPasswordValidator } from "../helper/validate.js";

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      Password: 'asda',
      confirmPassword: 'dasad',
    },
    validate: resetPasswordValidator,
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
        <div className={styles.glass} style={{width: "30%"}}>
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
                {...formik.getFieldProps("Password")}
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
