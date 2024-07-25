import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/Username.module.css";
import { useAuthStore } from "../store/store";
import { generateOTP, verifyOTP } from "../helper/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Recovery = () => {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();

  useEffect(() => {
    if (username) {
      generateOTP(username).then((generatedOTP) => {
        
        if (generatedOTP) {
          toast.success("OTP sent to your registered Email");
        } else {
          toast.error("Something went wrong during OTP generation");
        }
      });
    }
  }, [username]); // Only run when username changes

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { status } = await verifyOTP({ username, otp: OTP });
      if (status === 201) {
        toast.success("Password recovered successfully");
        navigate("/reset");
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  const resendOTP = () => {
    if (username) {
      toast.promise(generateOTP(username), {
        loading: "Sending OTP...",
        success: "OTP sent successfully",
        error: () => "Failed to send OTP",
      });
    }
  };

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
          <form className="pt-20" onSubmit={onSubmitHandler}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit otp sent to your email
                </span>
              </div>
              <input
                onChange={(e) => setOTP(e.target.value)}
                type="number"
                placeholder="Enter OTP"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Submit OTP
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span>
              Did not get OTP?{" "}
              <button className="text-gray-500" onClick={resendOTP}>
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
