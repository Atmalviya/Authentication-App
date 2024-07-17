import { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";

const Recovery = () => {


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recover password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password....
            </span>
          </div>
          <form className="pt-20" onSubmit="">
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit otp sent to your email
                </span>
              </div>
              <input
                type="number"
                placeholder="Enter OTP"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Lets Go
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                did not get OTP?{" "}
                <button className="text-gray-500">
                  Resend
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
