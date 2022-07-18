import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ currentUser, component: Component, ...othersProps }) {
   console.log(currentUser);

   return (
      <Route
         {...othersProps}
         render={(props) =>
            currentUser ? <Component {...props} /> : <Redirect to="/signin" />
         }
      />
   );
}

const mapStateToProps = ({ user }) => ({
   currentUser: user.currentUser,
});

export default connect(mapStateToProps)(ProtectedRoute);
