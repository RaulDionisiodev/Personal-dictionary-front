import { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthService from "../services/Auth.service";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<[]>;

type State = {
  username: string,
  name: string,
  password: string,
  successful: boolean,
  message: string
};

export default class Register extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      username: "",
      name: "",
      password: "",
      successful: false,
      message: ""
    };
  }
  validationSchema() {
    return Yup.object().shape({
      username: Yup.string()
        .test(
          "len",
          "The username must be between 3 and 20 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 3 &&
            val.toString().length <= 20
        )
        .required("This field is required!"),
      email: Yup.string()
        .email("This is not a valid email.")
        .required("This field is required!"),
      password: Yup.string()
        .test(
          "len",
          "The password must be between 6 and 40 characters.",
          (val: any) =>
            val &&
            val.toString().length >= 6 &&
            val.toString().length <= 40
        )
        .required("This field is required!"),
    });
  }
  register = (e : React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    let username = (document.getElementById("username") as HTMLInputElement).value
    let name = (document.getElementById("name") as HTMLInputElement).value
    let password = (document.getElementById("password") as HTMLInputElement).value
    this.handleRegister(username, name, password)
  }
  formiksubmit(formValues: {username: string; name: string; password: string}){

  }
  handleRegister( username: string, name: string, password: string ) {
    this.setState({
      message: "",
      successful: false
    });
    AuthService.register(
      username,
      name,
      password
    ).then(
      response => {
        this.setState({
          message: response.data.message,
          successful: true
        });
        this.props.history.push("/login");
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        this.setState({
          successful: false,
          message: resMessage
        });
      }
    );
  }
  render() {
    const { successful, message } = this.state;
    const initialValues = {
      username: "",
      name: "",
      password: "",
    };
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.formiksubmit}
          >
            <Form onSubmit={this.register.bind(this)}>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <Field id="username" name="username" type="text" className="form-control" />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="name"> Name </label>
                    <Field id="name" name="name" type="text" className="form-control" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}