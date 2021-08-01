import { Fragment, useState } from "react";
import { login } from "../action";
import { connect } from "react-redux";

const Login = (props) => {
  const { login, user, loading } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      {loading === true ? (
        <p>Please wait while we process ur request...</p>
      ) : (
        <>
          {user && user.authSuccess === true ? (
            <p>Hi {username}</p>
          ) : (
            <Fragment>
              <input
                type="text"
                placeholder="Enter Username"
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Enter Password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
              <button
                type="submit"
                onClick={() => {
                  let payload = {
                    username: username,
                    password: password,
                  };
                  login(payload);
                }}
              >
                Login
              </button>
            </Fragment>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: login(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
