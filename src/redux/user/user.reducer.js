const INITIAL_STATE = {
   currentUser: null,
};

const aze = {
   id: 8665887,
   email: "user1@mail.com",
   fullname: "ali kali",
};

const UserReducer = (state = INITIAL_STATE, action) => {
   switch (action.type) {
      case "SET_CURRENT_USER":
         if (action) {
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
         } else {
            localStorage.removeItem("currentUser");
         }
         return {
            ...state,
            currentUser: action.payload,
         };

      default:
         return state;
   }
};

export default UserReducer;
