import React from "react";
import { FirebaseContext } from "./Firebase";
import { Form, FormGroup, FormInput, Button } from "shards-react";
import "shards-ui/dist/css/shards.min.css";

const LoginRegister = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Form
            style={{
              width: "50vw",
              height: "100vh",
              backgroundColor: "#6da3c7",
              display: "flex"
            }}
          >
            <FormGroup
              style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                margin: 'auto'
              }}
            >
              <h1>Login</h1>
              <label htmlFor="#email">Email</label>

              <FormInput
                name="loginEmail"
                type="text"
                // value={this.state.loginEmail}
                // onChange={this.handleChange}
                id="#email"
                placeholder="Email"
              />

              <label htmlFor="#password">Password</label>

              <FormInput
                name="loginPassword"
                type="password"
                // value={this.state.loginPassword}
                // onChange={this.handleChange}
                id="#password"
                placeholder="Password"
              />

              <Button
                type="submit"
                style={{ backgroundColor: "#025377", borderColor: "#09cac7" }}
              >
                {" "}
                Log In{" "}
              </Button>
              <Button onClick={handleSwitchToRegister}>Need to register?</Button>
            </FormGroup>
          </Form>
          <Form
          style={{
              width: "50vw",
              height: "100vh",
              backgroundColor: "#b2c0cb",
              display: "flex"
            }}
            >
          </Form>
        </div>
      );
    }}
  </FirebaseContext.Consumer>
);

const handleSwitchToRegister = () => {
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
            <Form
          style={{
              width: "50vw",
              height: "100vh",
              backgroundColor: "#b2c0cb",
              display: "flex"
            }}
            >
          </Form>
          <Form
            style={{
              width: "50vw",
              height: "100vh",
              backgroundColor: "#6da3c7",
              display: "flex"
            }}
          >
            <FormGroup
              style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: "center",
                margin: 'auto'
              }}
            >
              <h1>Login</h1>
              <label htmlFor="#email">Email</label>

              <FormInput
                name="loginEmail"
                type="text"
                // value={this.state.loginEmail}
                // onChange={this.handleChange}
                id="#email"
                placeholder="Email"
              />

              <label htmlFor="#password">Password</label>

              <FormInput
                name="loginPassword"
                type="password"
                // value={this.state.loginPassword}
                // onChange={this.handleChange}
                id="#password"
                placeholder="Password"
              />

              <Button
                type="submit"
                style={{ backgroundColor: "#025377", borderColor: "#09cac7" }}
              >
                {" "}
                Log In{" "}
              </Button>
            </FormGroup>
          </Form>
        </div>
    )
}

export default LoginRegister;
