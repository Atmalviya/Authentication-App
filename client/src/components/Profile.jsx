import { useState } from "react";
import avater from "../assets/profile.png";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import styles from "../styles/Username.module.css";
import extend from "../styles/profile.module.css";
import { profileValidator } from "../helper/validate.js";
import { convertToBase64 } from "../helper/convert.js";
import useFetch from "../Hooks/fetch.hook.js";
import { updateUser } from "../helper/axios.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [{ isLoading, apiData, serverError }] = useFetch();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      contact: apiData?.contact || "",
      email: apiData?.email || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidator,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const loadingToast = toast.loading("Updating profile...");
      values = await Object.assign(values, { profile: apiData?.profile || file || "" });
      try {
        const response = await updateUser(values);
        toast.dismiss(loadingToast.id);
        toast.success(response.data.data.msg);

      } catch (error) {
        toast.error(error.message);
        toast.dismiss(loadingToast.id);
        return;
      }
    },
  });

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  if (isLoading) {
    return <h1 className="text-2xl font-bold">Loading...</h1>;
  }
  if (serverError) {
    return (
      <h1 className="text-2xl font-bold text-red-500">Error: {serverError}</h1>
    );
  }

  //* User Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  }


  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="flex items-center justify-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "450px", height: "max-content" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Update your details
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avater}
                  alt="avatar"
                  className={`${styles.profile_img}  ${extend.profile_img}`}
                />
              </label>
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={onUpload}
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
            <input
                  type="email"
                  placeholder="email"
                  className={`${styles.textbox}  ${extend.textbox}`}
                  {...formik.getFieldProps("email")}
                  disabled
                />
              {/* //* first name and last name */}
              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  placeholder="First Name"
                  className={`${styles.textbox}  ${extend.textbox}`}
                  {...formik.getFieldProps("firstName")}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={`${styles.textbox}  ${extend.textbox}`}
                  {...formik.getFieldProps("lastName")}
                />
              </div>

              {/* //* contact and email */}
              <div className="name flex w-3/4 gap-10">
                <input
                  type="text"
                  placeholder="Enter contact No"
                  className={`${styles.textbox}  ${extend.textbox}`}
                  {...formik.getFieldProps("contact")}
                />
              </div>
                

              <input
                type="text"
                placeholder="Enter Address"
                className={`${styles.textbox}  ${extend.textbox}`}
                {...formik.getFieldProps("address")}
              />

              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>
            <div className="text-center py-4">
              <span>
                Come back later?{" "}
                <button className="text-gray-500" onClick={logout}>
                  Logout
                </button>
              </span> 
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
