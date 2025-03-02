// import Container from '@/components/Layout';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import { Auth, UserCredential, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase, getAuth, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase } from 'firebase/auth';
// import { Database, ref as databaseRef, set as databaseSet, get, getDatabase } from 'firebase/database';
// import { app } from '../../firebase';
// import { useAuth } from '@/context/authContext';


// // Initialize auth and database with the correct types
// const auth = getAuth(app);
// const database = getDatabase(app);



// export default function Login() {
//     type UserType = {
//         id: string;
//         name: string;
//         // Add other properties as needed
//     };
//     const { user } = useAuth();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [isSignUp, setIsSignUp] = useState(false);
//     const [loginData, setLoginData] = useState<{ user: UserType } | null>(null);
//     const [loginError, setLoginError] = useState(null);
//     const [signUpLoading, setSignUpLoading] = useState(false);
//     const [loginLoading, setLoginLoading] = useState(false);

//     const [signUpError, setSignUpError] = useState(null);
//     const router = useRouter();

//     const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//     const validatePhoneNumber = (value: string): boolean => /^\d{10}$/.test(value);
//     const validatePassword = (value: string): boolean => /^(?=.*[A-Za-z])(?=.*\d).{6,}$/.test(value);
//     const handleFirebaseError = (error: any) => {
//         let errorMessage = "An error occurred. Please try again.";

//         switch (error.code) {
//             case "auth/wrong-password":
//                 errorMessage = "Incorrect password. Please try again.";
//                 break;
//             case "auth/user-not-found":
//                 errorMessage = "User not found. Please check your credentials.";
//                 break;
//             case "auth/email-already-in-use":
//                 errorMessage = "Email is already in use. Please use a different email.";
//                 break;
//             // Add more cases for other Firebase authentication errors as needed
//             default:
//                 errorMessage = error.code === "auth/invalid-login-credentials"
//                     ? "Invalid login credentials. Please check your email and password."
//                     : error.message;
//                 break;
//         }

//         // Display the error message to the user (you can use a modal, alert, etc.)
//         alert(errorMessage);
//     };

//     const handleFirebaseLogin = async () => {
//         try {
//             setLoginLoading(true);
//             const response: UserCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
//             console.log('Logged in successfully', response);

//             // Check if the user has the "isAdmin" key in the database
//             const userRef = databaseRef(database, `users/${response.user.uid}`);
//             const userSnapshot = await get(userRef);
//             const isAdmin = userSnapshot.val()?.isAdmin;

//             // Redirect based on the isAdmin key
//             if (isAdmin) {
//                 router.replace('/adminDashboard');
//             } else {
//                 router.replace('/dashboard');
//             }
//         } catch (error: any) {
//             handleFirebaseError(error);
//             // Set login error
//             setLoginError(error.message); // Or handle it in a way that suits your application
//         } finally {
//             setLoginLoading(false);
//         }
//     };

//     const handleFirebaseSignUp = async () => {
//         try {
//             setSignUpLoading(true);
//             const response: UserCredential = await createUserWithEmailAndPasswordFirebase(auth, email, password);

//             // Extract user information from the UserCredential
//             const user: UserType = {
//                 id: response.user.uid,
//                 name,
//                 // Add other properties as needed
//             };

//             // Save additional user data to Firebase Realtime Database
//             await databaseSet(databaseRef(database, `users/${response.user.uid}`), {
//                 name,
//                 email,
//                 phone,
//             });

//             // Handle successful sign-up, e.g., redirect to the dashboard
//             console.log('Signed up successfully', response);
//             router.replace('/dashboard');
//             setLoginData({ user });
//         } catch (error: any) {
//             handleFirebaseError(error);
//             setSignUpError(error.message);
//         }
//     };

//     const toggleSection = () => {
//         setIsSignUp(!isSignUp);
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         if (isSignUp) {
//             // Validation for signup
//             if (!validateEmail(email) || !validatePhoneNumber(phone) || !validatePassword(password) || password !== confirmPassword) {
//                 // Validation failed
//                 return;
//             }

//             // Call Firebase sign-up function
//             await handleFirebaseSignUp();
//         } else {
//             // Call Firebase login function
//             await handleFirebaseLogin();
//         }
//     };

//     useEffect(() => {
//         // Handle successful sign up
//         if (loginData?.user) {
//             // Example: Redirect to the dashboard or show a success message
//             //('/Dashboard');
//             console.log('Successfully signed up:', loginData);
//         }
//     }, [loginData, router]);

//     return (
//         <Container>
//             <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
//                 <div className="mx-auto max-w-lg text-center">
//                     <h1 className="text-2xl text-white font-bold sm:text-3xl">
//                         {isSignUp ? 'Sign Up' : 'Login'} to book your ticket
//                     </h1>
//                     <p className="mt-4 text-gray-500">
//                         Please use your GKV Email if available
//                     </p>
//                 </div>
//                 <div className="mx-auto mb-0 mt-8 max-w-md space-y-4">
//                     {isSignUp && (
//                         <>
//                             <div>
//                                 <label className="sr-only">Name</label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
//                                         placeholder="Enter your name"
//                                         value={name}
//                                         onChange={(e) => setName(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label className="sr-only">Phone</label>
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${validatePhoneNumber(phone) ? 'border-green-500' : 'border-red-500'}`}
//                                         placeholder="Enter your phone number"
//                                         value={phone}
//                                         onChange={(e) => setPhone(e.target.value)}
//                                     />
//                                     {!validatePhoneNumber(phone) && phone && (
//                                         <p className="text-red-500 mt-2">Please enter a valid 10-digit phone number</p>
//                                     )}
//                                 </div>
//                             </div>
//                         </>
//                     )}
//                     <div>
//                         <label className="sr-only">Email</label>
//                         <div className="relative">
//                             <input
//                                 type="email"
//                                 className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${validateEmail(email) ? 'border-green-500' : 'border-red-500'}`}
//                                 placeholder="Enter email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                             />
//                             {isSignUp && !validateEmail(email) && email && (
//                                 <p className="text-red-500 mt-2">Please enter a valid email address</p>
//                             )}
//                         </div>
//                     </div>
//                     <div>
//                         <label className="sr-only">Password</label>
//                         <div className="relative">
//                             <input
//                                 type="password"
//                                 className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${validatePassword(password) ? 'border-green-500' : 'border-red-500'}`}
//                                 placeholder="Enter password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                             />
//                             {isSignUp && !validatePassword(password) && password && (
//                                 <p className="text-red-500 mt-2">Password must be at least 6 characters long and include a number</p>
//                             )}
//                             {loginError && <p className="text-red-500 mt-2">{(loginError as any)?.data?.message}</p>}
//                             {signUpError && <p className="text-red-500 mt-2">{(signUpError as any)?.data?.message}</p>}

//                         </div>
//                     </div>
//                     {isSignUp && (
//                         <div>
//                             <label className="sr-only">Confirm Password</label>
//                             <div className="relative">
//                                 <input
//                                     type="password"
//                                     className={`w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm ${confirmPassword === password ? 'border-green-500' : 'border-red-500'}`}
//                                     placeholder="Confirm password"
//                                     value={confirmPassword}
//                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                 />
//                                 {confirmPassword !== password && confirmPassword && (
//                                     <p className="text-red-500 mt-2">Passwords do not match</p>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                     <div className="flex items-center">
//                         <button
//                             onClick={handleSubmit}
//                             className="inline-block mt-5 w-full rounded-lg bg-[#EACD69] px-5 py-3 text-sm font-bold text-black"
//                         >
//                             {isSignUp ? (signUpLoading ? 'Signing Up...' : 'Sign Up') : (loginLoading ? 'Logging In...' : 'Login')}
//                         </button>
//                     </div>
//                     <div className="flex items-center justify-center">
//                         <button
//                             onClick={toggleSection}
//                             className="text-gray-500 hover:underline focus:outline-none"
//                         >
//                             {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </Container>
//     );
// }



import { useState } from 'react';
import Image from "next/image";
import Container from '@/components/Layout';

export default function Register() {
    const [selectedType, setSelectedType] = useState<'gkv' | 'outside'>('gkv');

    const handleSelect = (type: 'gkv' | 'outside') => {
        setSelectedType(type);
    };

    return (
        <Container>
            <div className="mx-auto max-w-screen-md px-4 py-16 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl font-bold mb-6 text-white">Register for Jnanagni2k25</h2>
                <div className="flex justify-center gap-6">
                    <button className={`px-6 py-2 text-white rounded-md ${selectedType === 'gkv' ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' : ' bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800'}`} onClick={() => handleSelect('gkv')}>
                        GKV Student
                    </button>
                    <button className={`px-6 py-2 text-white rounded-md ${selectedType === 'outside' ? 'bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800' : ' bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800'}`}
                        onClick={() => handleSelect('outside')}>
                        Outside Student
                    </button>
                </div>
                <div className="mt-6">
                    <p className="text-lg font-semibold text-white">
                        Scan the QR Code for {selectedType === 'gkv' ? 'GKV Students' : 'Outside Students'}
                    </p>
                    <div className="flex justify-center mt-6">
                        {/* <Image src={ selectedType === "gkv"
                                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNya06yTLGfcQ67ddn9UsdRcXmlfKxe--AkQ&s"
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAaUCiVWViJFI0MRjRLIdtaUTC26cRWdGsw&s" }
                            alt="QR Code for Registration"
                            width={200}
                            height={200}
                            className="border rounded-lg bg-red-800"
                            priority /> */}
                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="" />
                    </div>
                    <div className="mt-6">
                        <a href={selectedType === 'gkv' ? 'https://gkv-register.com' : 'https://outside-register.com'} target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-2  text-white rounded-md  bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                            Register Now
                        </a>
                    </div>
                </div>
            </div>
        </Container>
    );
}
