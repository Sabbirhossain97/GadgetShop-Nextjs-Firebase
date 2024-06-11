import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import Navbar from "../../components/Navigation/Navbar";
import Subnavbar from "../../components/Navigation/Subnavbar";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { registerWithEmailAndPassword, signInWithGoogle, signInWithFacebook } from "../../services/firebase";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupSchema } from "../../helpers/Form/signupSchema";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { message } from "antd";
import Spinner from "../../components/Animation/Spinner";
import withPublic from "../../helpers/ProtectedRoutes/withPublic";

function Signup() {
  const getData = useContext(Context)
  const [user] = getData?.isAuth;
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false)
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    if (user) {
      message.success(`Registered Successfully!`)
      setTimeout(() => {
        router.push("/");
      }, 1000)
    }
  }, [user]);

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { username, email, password } = values;
    setFormLoading(true)
    try {
      await registerWithEmailAndPassword(username, email, password);
    } catch (err) {
      console.error(err)
    } finally {
      setFormLoading(false)
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Subnavbar />
      <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4 py-12 mt-8 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-xl space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl ">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h2>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="mt-8 space-y-6">
                <div className="mb-4">
                  <Field
                    type="text"
                    placeholder="username"
                    name="username"
                    className={`placeholder:text-gray-400/50 w-full px-3 py-2 border rounded-md transition-colors duration-300 ease-in-out ${errors.username && touched.username ? 'border-red-500' : ''
                      }`}
                  />
                  <ErrorMessage name="username" component="div" className="text-red-500" />
                </div>

                <div className="mb-4">
                  <Field
                    type="email"
                    placeholder="email"
                    name="email"
                    className={`placeholder:text-gray-400/50 w-full px-3 py-2 border rounded-md transition-colors duration-300 ease-in-out ${errors.email && touched.email ? 'border-red-500' : ''
                      }`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div className="mb-4 relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className={`placeholder:text-gray-400/50 w-full px-3 py-2 border rounded-md transition-colors duration-300 ease-in-out ${errors.password && touched.password ? 'border-red-500' : ''
                      }`}
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                  {showPassword ?
                    <IoEye onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute top-3 right-4 h-5 w-5 text-gray-400 " /> :
                    <IoMdEyeOff onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute top-3 right-4 h-5 w-5 text-gray-400 " />
                  }
                </div>

                <div className="mb-4 relative">
                  <Field
                    type={showConfirmPass ? "text" : "password"}
                    placeholder="confirm password"
                    name="confirmPassword"
                    className={`placeholder:text-gray-400/50 w-full px-3 py-2 border rounded-md transition-colors duration-300 ease-in-out ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''
                      }`}
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                  {showConfirmPass ?
                    <IoEye onClick={() => setShowConfirmPass(!showConfirmPass)} className="cursor-pointer absolute top-3 right-4 h-5 w-5 text-gray-400 " /> :
                    <IoMdEyeOff onClick={() => setShowConfirmPass(!showConfirmPass)} className="cursor-pointer absolute top-3 right-4 h-5 w-5 text-gray-400 " />
                  }
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full p-3 bg-slate-800 rounded-md hover:bg-slate-700 text-white transition duration-300"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    {formLoading ? <p className="flex justify-center items-center"><Spinner /> Processing...</p> : "Sign In"}
                  </button>
                  <div className="text-center mt-8">
                    <p>
                      <span className=" text-base font-semibold text-center text-gray-900">
                        Already have an account ?
                      </span>

                      <Link href="/Signin">
                        <span className="ml-2 text-base font-semibold text-center text-blue-500 hover:text-blue-700">
                          Sign In
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p class="mx-4 mb-0 text-center font-semibold dark:text-slate-900">
                    or
                  </p>
                </div>
                <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 sm:gap-0 w-full ">
                  <div className="flex items-center justify-center h-[52px] w-full sm:w-1/2 ">
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      className="w-full flex items-center justify-center h-[52px] transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <FcGoogle className="text-2xl" />
                      <span className="ml-2 text-sm whitespace-nowrap">Sign in with Google</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-start h-[52px] w-full sm:w-1/2 ml-0 sm:ml-4">
                    <button
                      type="button"
                      onClick={signInWithFacebook}
                      className="flex w-full items-center justify-center h-[52px] transition duration-300 bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <BsFacebook className="text-2xl text-[#1778f2]" />
                      <span className="ml-2" whitespace-nowrap>Sign in with Facebook</span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div >
      <Footer />
    </div >
  );
}

export default withPublic(Signup)
