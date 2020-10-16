import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

/*------INITIALIZING FIREBASE-----*/

class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      firebase.initializeApp(firebaseConfig);
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user));
        } else {
          localStorage.removeItem("authUser");
        }
      });
    }
  }

  /*------REGISTERING USER-----*/

  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          resolve(firebase.auth().currentUser);
        }),
        (error) => {
          reject(this._handleError(error));
        };
    });
  };

  /*------LOGGING IN USER-----*/

  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          (user) => {
            resolve(firebase.auth().currentUser);
          },
          (error) => {
            reject(this._handleError(error));
          }
        );
    });
  };

  /*-----FORGET PASSWORD-----*/

  forgetPassword = (email) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  /*------LOGOUT USER-----*/

  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(this._handleError(error));
        });
    });
  };

  /*------USER SNAP-----*/

  setLoggeedInUser = (user) => {
    localStorage.setItem("authUser", JSON.stringify(user));
  };

  getAuthenticatedUser = () => {
    if (!localStorage.getItem("authUser")) return null;
    return JSON.parse(localStorage.getItem("authUser"));
  };

  /*------HANDLE AUTH ERRORS -----*/

  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message;
    return errorMessage;
  }
}
