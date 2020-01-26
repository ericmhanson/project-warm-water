import React, { Component } from "react";
import { Container, Card, CardTitle, CardBody, CardFooter } from "shards-react";
import "shards-ui/dist/css/shards.min.css";
import TimeChart from "./TimeChart";
import GallonsWastedChart from "./GallonsWastedChart";

class Homepage extends Component {
  render() {
    return (
      <>
        <div
          className="background-homepage"
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage:
              "linear-gradient(to bottom right, #010e1f, #98dab4)",
            boxSizing: "border-box"
          }}
        >
          <Container
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              marginLeft: "20vw",
              marginRight: "20vw",
              backgroundColor: "#cfc1af",
              boxShadow: "10px 10px 5px",
              margin: "none"
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
            {/* <div
              style={{
                display: "flex"
              }}
            >
              <h3 style={{ margin: "25px" }}>
                Your current set temperature is{" "}
              </h3>
              <h3 style={{ textDecoration: "underline" }}>{}</h3>
            </div> */}
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
              <GallonsWastedChart />
            </div>
          </Container>

          <div
            style={{
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "15vw",
              margin: "10px"
            }}
          >
            <Card
              style={{
                maxWidth: "15vw",
                margin: "0",
                backgroundColor: "#f4f1ea"
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

          <div
            style={{
              position: "absolute",
              margin: "10px",
              right: "0",
              top: "0",
              width: "15vw"
            }}
          >
            <Card
              style={{
                width: "15vw",
                backgroundColor: "#f4f1ea"
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
      </>
    );
  }
}

export default Homepage;
