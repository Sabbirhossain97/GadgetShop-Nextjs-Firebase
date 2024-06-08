import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/Navigation/Navbar'
import Subnavbar from '../../../components/Navigation/Subnavbar'
import Footer from '../../../components/Footer/Footer'
import { getAuth, onAuthStateChanged, updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { collection, updateDoc, getDocs, query, where, doc, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../services/firebase';
import { message } from 'antd';
import { useRouter } from 'next/router';
import Spinner from '../../../components/Animation/Spinner';
import { CgSpinner } from "react-icons/cg";
import useBreadCrumbNavigation from '../../../helpers/hooks/useBreadCrumbNavigation';
import { AiFillHome } from "react-icons/ai";
import Link from 'next/link';
import withAuth from '../../../helpers/ProtectedRoutes/withAuth';

function Edit() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { pathname } = router;
    const [loading, setLoading] = useState(false);
    const [infoLoading, setInfoLoading] = useState(true)
    const [profile, setProfile] = useState({ username: '', email: '', password: '', picURL: '' });
    const [hasPhoto, setHasPhoto] = useState(!!profile.picURL);
    const [currentPhotoURL, setCurrentPhotoURL] = useState(profile.picURL);
    const [file, setFile] = useState(null);
    const breadcrumbNav = useBreadCrumbNavigation(pathname)

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                loadProfile(user.uid);
            }
        });
        return () => unsubscribe();
    }, []);

    const loadProfile = async (uid) => {
        setInfoLoading(true)
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            onSnapshot(q, (snapshot) => {
                const userData = [];
                snapshot.forEach((doc) => {
                    userData.push({ id: doc.id, ...doc.data() });
                });
                if (userData.length > 0) {
                    const { email, photoUrl, username } = userData?.[0];
                    setProfile({ ...profile, username: username, email: email, picURL: photoUrl })
                    if (photoUrl) {
                        setCurrentPhotoURL(photoUrl);
                        setHasPhoto(true);
                    }
                } else {
                    return
                }
            });
        }
        setInfoLoading(false)
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            const imageURL = URL.createObjectURL(file);
            setCurrentPhotoURL(imageURL);
            setHasPhoto(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            let photoURL = profile.picURL;

            if (file) {
                const storageRef = ref(storage, `profile_pictures/${user.uid}/${file.name}`);
                await uploadBytes(storageRef, file);
                photoURL = await getDownloadURL(storageRef);
            }

            if (user.email !== profile.email) {
                const credential = EmailAuthProvider.credential(user.email, profile.password);
                await reauthenticateWithCredential(user, credential);
                await updateEmail(user, profile.email);
            }

            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('uid', '==', user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const userDocRef = doc(db, 'users', userDoc.id);

                await updateProfile(user, {
                    displayName: profile.username,
                    photoURL: photoURL
                });

                await updateDoc(userDocRef, {
                    username: profile.username,
                    email: profile.email,
                    photoUrl: photoURL
                });

                message.success('Profile updated successfully');
                router.push('/Profile')
            } else {
                message.error('No document found for this user');
            }
        } catch (err) {
            message.error(err.message);
        } finally {
            setLoading(false)
        }
    };

    const handleChangePhotoClick = () => {
        document.getElementById('dropzone-file').click();
    };

    return (
        <div>
            <Navbar />
            <Subnavbar />
            <div className='min-h-screen max-w-[1500px] flex flex-col items-center justify-center mx-auto py-10 xl:py-10 px-10 mt-10 xl:mt-24'>
                <div className='flex items-center justify-center pb-10'>
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
                <div className={`w-full border relative ${infoLoading ? 'opacity-50' : "opacity-100"} p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md border sm:p-8`}>
                    {infoLoading && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                        <div className='relative'>
                            <CgSpinner className="text-5xl animate-spin text-blue-500" />
                        </div>
                    </div>}
                    <h2 className="mb-1 text-xl font-bold text-center leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Edit Profile
                    </h2>
                    <form className="max-w-sm mx-auto py-6" onSubmit={handleSubmit}>
                        {hasPhoto ? (
                            <>
                                <div className='py-1'>
                                    <img src={currentPhotoURL} alt="avatar" className='w-full h-44 rounded-md object-cover' />
                                </div>
                                <button
                                    type='button'
                                    onClick={handleChangePhotoClick}
                                    className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
                                >
                                    Change Photo
                                </button>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </>
                        ) : (
                            <>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                                    Upload Photo
                                </label>
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-44 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                                </label>
                            </>
                        )}
                        <div className="mb-5 mt-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={profile.password}
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <button type="submit" className="text-white bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center">{loading ? <p className="flex justify-center items-center"><Spinner /> Processing...</p> : "Submit"}</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withAuth(Edit)