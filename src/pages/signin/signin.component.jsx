import axios from "axios";
import React from "react";
import { useState } from "react";
import FormInput from "../../components/layouts/form-input-1/form-input.component";
import "./signin.styles.scss";

import { BASE_URL } from "../../api/api";
import { setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Signin(props) {
   const [FormValue, setFormValue] = useState({
      email: "",
      password: "",
   });
   const [FormError, setFormError] = useState("");
   const handleSubmit = (e) => {
      e.preventDefault();

      const url = BASE_URL + "login";
      axios
         .post(url, FormValue)
         .then((res) => {
            setFormError("");
            console.log(res.data);
            props.setCurrentUser(res.data);
            props.history.push("/");
         })
         .catch((err) => {
            if (err.response) {
               setFormError(err.response.data);
               console.log(err.response.data);
            } else {
               setFormError("something wrong !!");
            }
         });

      /*

      let xhr = new XMLHttpRequest();

      xhr.open("post", url);
      xhr.onload = () => {
         if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
               let data = xhr.response;
               console.log(data);
            }
         }
      };
      xhr.send(FormValue);
      const url = "http://localhost/programmers-community/api/login.php";
      const options = {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
         },
         body: JSON.stringify(FormValue),
      };

      fetch(url, options)
         .then((res) => res.json())
         .then((data) => console.log(data))
          .catch((err) => console.log(err));
   */
   };

   const handleChange = (e) => {
      setFormValue({
         ...FormValue,
         [e.target.name]: e.target.value,
      });
   };
   return (
      <div className="min-h-screen flex justify-center items-center">
         <div className="max-w-2xl ">
            <form onSubmit={handleSubmit} className="">
               {FormError && (
                  <div className="max-w-xl mx-auto border rounded-lg border-red-500 text-red-500 bg-red-100 text-center p-2 mb-8">
                     <p>{FormError}</p>
                  </div>
               )}

               <FormInput
                  name="email"
                  type="text"
                  handleChange={handleChange}
                  value={FormValue.email}
                  label="email"
                  required
               />
               <FormInput
                  name="password"
                  type="password"
                  value={FormValue.password}
                  handleChange={handleChange}
                  label="password"
                  required
               />
               <FormInput type="submit" value="login" />
            </form>

            <p className="my-8 text-2xl">
               Don't have an account?{" "}
               <Link className="link text-slate-600" to="signup">
                  Sign up
               </Link>
            </p>
         </div>
      </div>
   );
}

const mapDispatchToProps = (dispatch) => ({
   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(Signin);
