import { Component } from "react";
import { Switch , Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/Auth.service";
import IUser from './types/user.type';
import Login from "./components/Login.component";
import Register from "./components/Register.component";
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
  }
  componentDidMount() {
    EventBus.on("logout", this.logOut);
  }
  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }
  logOut() {
    AuthService.logout();
  }
  render() {
  
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            My Personal Dictionary
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
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
        </nav>
        <div className="container mt-3">
          <Switch >
            <Route exact path={["/", "/home"]} component={Dictionary} />
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