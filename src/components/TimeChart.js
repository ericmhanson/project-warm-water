import Chart from "react-google-charts";
import React from "react";
import { FirebaseContext } from "./Firebase";

const TimeChart = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return (
        <Chart
          width={"550px"}
          height={"350px"}
          chartType="BarChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["City", "2010 Population", "2000 Population"],
            ["New York City, NY", 8175000, 8008000],
            ["Los Angeles, CA", 3792000, 3694000],
            ["Chicago, IL", 2695000, 2896000],
            ["Houston, TX", 2099000, 1953000],
            ["Philadelphia, PA", 1526000, 1517000]
          ]}
          options={{
            title: "How long do you take in the shower?",
            chartArea: { width: "50%" },
            hAxis: {
              title: "Time (mins)",
              minValue: 0
            },
            vAxis: {
              title: "Date"
            },
            animation: {
                startup: true,
                easing: 'linear',
                duration: 1500,
            },
          }}
        />
      );
    }}
  </FirebaseContext.Consumer>
);

export default TimeChart;