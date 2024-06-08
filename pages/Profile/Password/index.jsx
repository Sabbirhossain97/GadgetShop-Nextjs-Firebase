import React, { useState } from 'react'
import Navbar from '../../../components/Navigation/Navbar'
import Subnavbar from '../../../components/Navigation/Subnavbar'
import Footer from '../../../components/Footer/Footer'
import { auth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '../../../services/firebase'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { message } from 'antd'
import { useRouter } from 'next/router'
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link'
import useBreadCrumbNavigation from '../../../helpers/hooks/useBreadCrumbNavigation'
import withAuth from '../../../helpers/ProtectedRoutes/withAuth'

function Password() {
    const router = useRouter();
    const { pathname } = router;
    const breadcrumbNav = useBreadCrumbNavigation(pathname)
    const [showCurrPassword, setShowCurrPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required('Current password is required'),
        newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const handlePasswordChange = async (values, { setSubmitting, setFieldError }) => {
        const user = auth.currentUser;
        const credentials = EmailAuthProvider.credential(user.email, values.currentPassword);
        try {
            await reauthenticateWithCredential(user, credentials);
            await updatePassword(user, values.newPassword);
            message.success('Password updated successfully');
            router.push("/Profile");
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                message.error(error.message)
                setFieldError('currentPassword', 'Current password is incorrect.');
            } else if (error.code === 'auth/weak-password') {
                message.error(error.message)
                setFieldError('newPassword', 'Password is too weak.');
            } else {
                message.error(error.message)
                setFieldError('currentPassword', 'An unknown error occurred.');
            }
        }

        setSubmitting(false);
    };

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] mx-auto flex flex-col gap-12 items-center py-10 xl:py-10 px-10 mt-24'>
                <div className='flex items-center justify-center py-4'>
                    <Link href="/">
                        <AiFillHome className='hover:text-blue-500 cursor-pointer' />
                    </Link>
                    <span>&nbsp;/&nbsp;</span>
                    <div className='flex space-x-1'>
                        {breadcrumbNav.slice(0, 3).map((route, index) => (
                            <React.Fragment key={route.href}>
                                <Link href={route.href}>
                                    <p className="hover:text-blue-500">{route.name}
                                        {index < breadcrumbNav.length - 1 && (
                                            <span>&nbsp;/</span>
                                        )}
                                    </p>
                                </Link>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md border sm:p-8">
                    <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Change Password
                    </h2>
                    <Formik
                        initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handlePasswordChange}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                <div className='relative'>
                                    <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900">Current Password</label>
                                    <Field
                                        type={showCurrPassword ? "text" : "password"}
                                        name="currentPassword"
                                        id="currentPassword"
                                        className={`bg-gray-50 border ${errors.currentPassword && touched.currentPassword ? 'border-red-500' : ''} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                    />
                                    <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm" />
                                    {showCurrPassword ?
                                        <IoEye onClick={() => setShowCurrPassword(!showCurrPassword)} className="cursor-pointer absolute top-10 right-2 h-5 w-5 text-gray-400 " /> :
                                        <IoMdEyeOff onClick={() => setShowCurrPassword(!showCurrPassword)} className="cursor-pointer absolute top-10 right-2 h-5 w-5 text-gray-400 " />
                                    }
                                </div>
                                <div className='relative'>
                                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                                    <Field
                                        type={showNewPassword ? "text" : "password"}
                                        name="newPassword"
                                        id="newPassword"
                                        className={`bg-gray-50 border ${errors.newPassword && touched.newPassword ? 'border-red-500' : ''} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                    />
                                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
                                    {showNewPassword ?
                                        <IoEye onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer absolute top-10 right-2 h-5 w-5 text-gray-400 " /> :
                                        <IoMdEyeOff onClick={() => setShowNewPassword(!showNewPassword)} className="cursor-pointer absolute top-10 right-2 h-5 w-5 text-gray-400 " />
                                    }
                                </div>
                                <div className='relative'>
                                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                                    <Field
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        className={`bg-gray-50 border ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                                        required
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                    {showConfirmPassword ?
                                        <IoEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer absolute top-10 right-2 h-5 w-5 text-gray-400 " /> :
                                        <IoMdEyeOff onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer absolute top-10 right-2 h-5 w-5 text-gray-400 " />
                                    }
                                </div>
                                <button type="submit" className="bg-slate-800 p-2 w-full font-semibold transition duration-300 rounded-md hover:bg-slate-700 text-white" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(Password)