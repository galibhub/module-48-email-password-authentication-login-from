import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword,setShowPassword]=useState(false)

  const handleResister = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;
    console.log("Resister Clicked", email, password,terms);

    //validation
    // const length6Pattern=/^.{6,}$/;
    // const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    // const specialCharacterPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/;

    // if(!length6Pattern.test(password)){
    //     console.log('Password did not match');
    //     setError('password must be 6 caracter or longer');
    //     return;
    // }
    // else if(!casePattern.test(password))
    // {
    //     setError('password must have atleast one uppercase and one lowercase');
    //     setSuccess(false);
    //     return;
    // }

    // else if (!specialCharacterPattern.test(password)){
    //     setError("Password must contain at least one special character!");
    //     setSuccess(false)
    //     return;
    // }

    //reset ststus: success or error
    setError("");
    setSuccess(false);
   if(!terms)
   {
    setError("Please accept our terms and condition")
    return;
   }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordPattern.test(password)) {
      setError(
        "Password must be at least 6 characters long ,and at least one Uppercase and one lowercase and one speciakl character"
      );
      setSuccess(false);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("After Creation of a new user", result.user);
        setSuccess(true);
        event.target.reset();
        //send verfication mail
        sendEmailVerification(result.user)
        .then(()=>{
            alert("Please login to your email and verify")
        })
      })
      .catch((error) => {
        console.log("Error Happend", error.message);
        setError(error.message);
        setSuccess(false);
      });
  };

  const handleTogglePasswordShow=(event)=>{
   event.preventDefault();
   setShowPassword(!showPassword)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleResister}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    // type="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <button
                    onClick={(event) => handleTogglePasswordShow(event)}
                    className="btn btn-xs bg-black-500 text-while font-bold absolute top-2 right-5"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div>
                  <label class="label">
                    <input type="checkbox" class="checkbox" name="terms" />
                    Accept our terms and condition
                  </label>
                </div>

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account Created Successfully</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p>Already have an account? <Link className="text-blue-400 underline" to="/login">login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
