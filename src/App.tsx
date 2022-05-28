import { Component } from "react";
import { Switch , Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/Auth.service";
import IUser from './types/user.type';
import Login from "./components/Login.component";
import Register from "./components/Register.component";
import Home from "./components/Home.component";
import EventBus from "./common/EventBus";
import AddExpression from "./components/Add-Expression.component";
import Dictionary from "./components/Dictionary.component";
import ExpressionDetail from "./components/Expression.component";
type Props = {};
type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  currentUser: IUser | undefined
}
class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    EventBus.on("logout", this.logOut);
  }
  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }
  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            My Personal Dictionary
          </Link>
          <div className="navbar-nav mr-auto">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
          <Switch >
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dictionary" component={Dictionary} />
            <Route exact path="/add" component={AddExpression} />
            <Route path="/expressions/:id" component={ExpressionDetail} />
        </Switch >
        </div>
        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}
export default App;