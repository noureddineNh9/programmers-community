import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
   useEffect(() => {}, []);

   const onSubmit = () => {
      var formData = new FormData();
      formData.append("email", "azezae");

      let xhr = new XMLHttpRequest();

      xhr.open("post", "http://localhost/espace-programmeurs/test.php");
      xhr.onload = () => {
         if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
               let data = xhr.response;
               console.log(data);
            }
         }
      };
      xhr.send(formData);
   };

   const submitForm = (e) => {
      e.preventDefault();
      var formData = new FormData(e.target);

      console.log(Object.fromEntries(formData.entries()));

      fetch("http://localhost/espace-programmeurs/test.php", {
         method: "POST",
         body: formData,
      })
         .then((res) => {
            if (res.status !== 200) {
               throw Error;
            }
            return res.json();
         })
         .then((data) => {
            console.log(data);
         })
         .catch((err) => {
            console.log("erroooooor " + err);
         });

      // let xhr = new XMLHttpRequest();

      // xhr.open("post", "http://localhost/espace-programmeurs/test.php");
      // xhr.onload = () => {
      //    if (xhr.readyState === XMLHttpRequest.DONE) {
      //       if (xhr.status === 200) {
      //          let data = xhr.response;
      //          console.log(data);
      //       }
      //    }
      // };
      // xhr.send(formData);
   };

   return (
      <div>
         <h3>home page</h3>
         <Link to="/signin">Sign In</Link>

         <button className="block" onClick={onSubmit}>
            send
         </button>
         <form onSubmit={submitForm}>
            <input type="text" name="email" placeholder="email" />
            <input type="file" name="image" />
            <input type="submit" value="submit" />
         </form>
      </div>
   );
}

export default Home;
