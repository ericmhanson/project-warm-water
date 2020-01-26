import React from "react";
import { FirebaseContext } from "./Firebase";
import { Container, Card, CardTitle, CardBody, CardFooter } from "shards-react";
import "shards-ui/dist/css/shards.min.css";
import TimeChart from "./TimeChart";
import TempChart from "./TempChart";

const Homepage = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return (
        <div
          className="background-homepage"
          style={{
            maxWidth: "100vw",
            maxHeight: "100vh",
            backgroundImage:
              "linear-gradient(to bottom right, #025377, #b2c0cb)",
            boxSizing: "border-box"
          }}
        >

          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "100vh",
              marginLeft: "20vw",
              marginRight: "20vw",
              backgroundColor: "#6da3c7",
              boxShadow: "10px 10px 5px",
              margin: 'none'
            }}
          >
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "25px"
              }}
            >
              Welcome to your Project Warm Water!
            </h1>
            <div
              style={{
                display: "flex"
              }}
            >
              <h3 style={{ margin: "25px" }}>
                Your current set temperature is{" "}
              </h3>
              <h3 style={{ textDecoration: "underline" }}>{}</h3>
            </div>
            <div
              style={{
                display: "flex",
                margin: "25px"
              }}
            >
              <TimeChart />
            </div>
            <div
              style={{
                display: "flex",
                margin: "25px",
                justifyContent: "flex-end"
              }}
            >
              <TempChart />
            </div>
          </Container>
          
          <div style={{
            position: 'absolute',
            left: '0',
            bottom: '0',
            width: '15vw',
            margin: '10px'
          }}>
            <Card
              style={{
                // display: "flex",
                // flexDirection: "column",
                maxWidth: "15vw",
                margin: "0"
              }}
              >
              <CardBody>
                <CardTitle>Did you know?!</CardTitle>
                Showering, bathing and using the toilet account for about
                two-thirds of the average family’s water usage.
              </CardBody>
              <CardFooter>
                Resource :
                <a href="http://savethewater.org/education-resources/water-facts/">
                  {" "}
                  Save the Water
                </a>
              </CardFooter>
            </Card>
              </div>
          

          <div style={{
            position: 'absolute',
            margin: '10px',
            right: '0',
            top: '0',
            width: '15vw',
          }}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                width: "15vw"
              }}
            >
              <CardBody>
                <CardTitle>Cold. Hard. FACTS!</CardTitle>
                The average single-family home uses 80 gallons of water per
                person each day in the winter and 120 gallons in the summer.
              </CardBody>
              <CardFooter>
                Resource :
                <a href="http://savethewater.org/education-resources/water-facts/">
                  {" "}
                  Save the Water
                </a>
              </CardFooter>
            </Card>
          </div>
          
        </div>
      );
    }}
  </FirebaseContext.Consumer>
);

export default Homepage;
