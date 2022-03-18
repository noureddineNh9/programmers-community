import axios from "axios";
import React from "react";
import { useState } from "react";
import FormInput from "../../components/layouts/form-input-1/form-input.component";
import "./signup.styles.scss";

import defaultImageProfile from "../../assets/images/default-img-profile.jpg";

import { BASE_URL } from "../../api/api";
import { Link } from "react-router-dom";

function Signup() {
   const [FormValue, setFormValue] = useState({
      prenom: "",
      nom: "",
      email: "",
      password: "",
      image_profile: null,
   });
   const [FormError, setFormError] = useState("");
   const [previewImage, setPreviewImage] = useState(defaultImageProfile);

   const handleSubmit = (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append("nom", FormValue.nom);
      formData.append("prenom", FormValue.prenom);
      formData.append("email", FormValue.email);
      formData.append("password", FormValue.password);
      formData.append("image_profile", FormValue.image_profile);

      const url = BASE_URL + "register";
      axios
         .post(url, formData)
         .then((res) => {
            setFormError("");
            console.log(res.data);
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

   const showPreview = (e) => {
      if (e.target.files && e.target.files[0]) {
         setPreviewImage(URL.createObjectURL(e.target.files[0]));
         setFormValue({
            ...FormValue,
            image_profile: e.target.files[0],
         });
      }
   };

   return (
      <div className="sign-in">
         <div className="max-w-2xl mx-auto mt-32">
            <form onSubmit={handleSubmit}>
               {FormError && (
                  <div className="max-w-xl mx-auto border-b border-red-500 text-red-500 text-center p-2 mb-8">
                     <p>{FormError}</p>
                  </div>
               )}

               <div className="flex justify-center">
                  <div className="w-48 h-48 mb-8 relative">
                     <img
                        className="w-full h-full rounded-full object-cover border border-black"
                        src={previewImage}
                        alt=""
                     />{" "}
                     <label
                        htmlFor="image-uploader"
                        className="absolute -right-2 -bottom-2 cursor-pointer"
                     >
                        <i className="far fa-edit"></i>
                     </label>
                  </div>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={showPreview}
                     id="image-uploader"
                     name="image_profile"
                     hidden
                  />
               </div>

               <div className="flex gap-8">
                  <FormInput
                     name="nom"
                     type="text"
                     handleChange={handleChange}
                     value={FormValue.nom}
                     label="nom"
                  />
                  <FormInput
                     name="prenom"
                     type="text"
                     handleChange={handleChange}
                     value={FormValue.prenom}
                     label="prenom"
                  />
               </div>

               <FormInput
                  name="email"
                  type="text"
                  handleChange={handleChange}
                  value={FormValue.email}
                  label="email"
               />
               <FormInput
                  name="password"
                  type="password"
                  value={FormValue.password}
                  handleChange={handleChange}
                  label="password"
               />
               <FormInput type="submit" value="register" />
            </form>
            <p className="my-8 text-2xl">
               Have an account already?{" "}
               <Link className="link text-slate-600" to="signin">
                  Log in
               </Link>
            </p>
         </div>
      </div>
   );
}

export default Signup;
