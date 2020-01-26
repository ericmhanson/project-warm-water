import Chart from "react-google-charts";
import React from "react";
import { FirebaseContext } from "./Firebase";

const TempChart = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return (
        <Chart
          width={"550px"}
          height={"350px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["x", "temp"],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
            [11, 35]
          ]}
          options={{
            title: 'Temperature per day',
            hAxis: {
              title: "Day"
            },
            vAxis: {
              title: "Temperature (Celsius)"
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

export default TempChart;