import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navigation/Navbar";
import Subnavbar from "../../components/Navigation/Subnavbar";
import Link from "next/link";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import Spinner from "../../components/Animation/Spinner";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, message } from "antd";
import { auth, logInWithEmailAndPassword, signInWithFacebook, signInWithGoogle } from "../../services/firebase";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { signinSchema } from "../../helpers/Form/signinSchema";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Signin() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [formLoading, setFormLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPassResetModalOpen, setIsPassResetModalOpen] = useState(false);
  const [passResetEmail, setPassResetEmail] = useState('')

  useEffect(() => {
    if (loading) return;
    if (user) {
      message.success(`logged in as ${user.displayName}`)
      setTimeout(() => {
        router.push("/");
      }, 1000)
    }
  }, [user, loading]);

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const { email, password } = values
    setFormLoading(true)
    try {
      await logInWithEmailAndPassword(email, password)
        .then(res => setStatus({ error: res }))
    } catch (error) {
      console.error(error)
    } finally {
      setFormLoading(false)
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsPassResetModalOpen(false);
    setPassResetEmail("")
  };

  const handlePassReset = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, passResetEmail);
      setIsPassResetModalOpen(false);
      setPassResetEmail("")
      message.success("Password reset link sent check your email!");
    } catch (err) {
      setIsPassResetModalOpen(true);
      message.error(err.message);
    }
  };

  return (
    <div>
      <Navbar />
      <Subnavbar />
      <div className="bg-gray-100 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white w-full max-w-xl space-y-8 border border-gray-100 p-8 rounded-xl shadow-xl">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
          {error ? (
            <div className="border p-3 border-red-400 bg-red-100/50 text-center">
              <p className="text-red-500">{error} </p>
            </div>
          ) : (
            ""
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={signinSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, status }) => (
              <Form className="mt-8 space-y-6">
                <div className="mb-4">
                  <Field
                    type="email"
                    placeholder="Email"
                    name="email"
                    className={`placeholder:text-gray-400/50 w-full px-3 py-2 border rounded-md transition-colors duration-300 ease-in-out ${errors.email && touched.email ? 'border-red-500' : ''
                      }`}
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>
                <div className="mb-0 relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
                {status && status.error && <div className="text-red-500 text-sm text-center">{status.error}</div>}
                <div className="text-right">
                  <p className="text-blue-600 hover:text-blue-400 transition duration-300">
                    <span onClick={() => setIsPassResetModalOpen(true)} className="cursor-pointer">Forgot Password?</span>
                  </p>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full p-3 bg-slate-800 transition duration-300 rounded-md hover:bg-slate-700 text-white"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                    {formLoading ? <p className="flex justify-center items-center"><Spinner /> Processing...</p> : "Sign In"}
                  </button>
                  <div className="text-center mt-8">
                    <p>
                      <span className=" text-base font-medium text-center text-gray-900">
                        Don't have an account yet?
                      </span>

                      <Link href="/Signup">
                        <span className="ml-2 text-base font-semibold text-center text-blue-500 hover:text-blue-700">
                          Sign Up
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-slate-900">
                    or
                  </p>
                </div>
                <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 sm:gap-0 w-full ">
                  <div className="flex items-center justify-center h-[52px] w-full sm:w-1/2 ">
                    <button
                      type="button"
                      onClick={signInWithGoogle}
                      className="w-full flex items-center justify-center transition duration-300 h-[52px] bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <FcGoogle className="text-2xl" />
                      <span className="ml-2 text-sm">Sign in with Google</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-start h-[52px] w-full sm:w-1/2 ml-0 sm:ml-4">
                    <button
                      type="button"
                      onClick={signInWithFacebook}
                      className="flex w-full items-center justify-center transition duration-300 h-[52px] bg-white border border-gray-200 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      <BsFacebook className="text-2xl text-[#1778f2]" />
                      <span className="ml-2">Sign in with Facebook</span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>

          {/* password reset modal */}

          <Modal
            open={isPassResetModalOpen}
            onCancel={handleCancel}
            footer={null}
            title="Forgot Password?"
          >
            <div className="bg-white w-full max-w-xl space-y-4 py-4 rounded-xl ">
              <p>Enter your email address and we will send you a link to reset your password</p>
              <form onSubmit={handlePassReset}>
                <div className="mb-2">
                  <input
                    type="email"
                    placeholder="Email"
                    name="passResetEmail"
                    value={passResetEmail}
                    onChange={(e) => setPassResetEmail(e.target.value)}
                    className={`placeholder:text-gray-400/50 w-full px-3 py-2 border rounded-md transition-colors duration-300 ease-in-out `}
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-[100px] p-2 bg-red-500 font-semibold transition duration-300 rounded-md hover:bg-red-600 text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[120px] p-2 bg-slate-800 font-semibold transition duration-300 rounded-md hover:bg-slate-700 text-white"
                  >
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
      <Footer />
    </div>
  );
}
