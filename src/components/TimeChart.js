import Chart from "react-google-charts";
import React, { Component } from "react";
// import db from "./firebase";

class TimeChart extends Component {
  render() {
    return (
      <Chart
        width={"550px"}
        height={"350px"}
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Date", "Time (mins)"],
          ["1/25/2020", 42.11],
          ["1/25/2020", 38.28],
          ["1/25/2020", 37.58],
          ["1/25/2020", 36.79],
          ["1/25/2020", 50.56]
        ]}
        options={{
          title: "How long do you take in the shower?",
          chartArea: { width: "50%" },
          colors: ['#09cac7'],
          hAxis: {
            title: "Time (mins)",
            minValue: 0
          },
          vAxis: {
            title: "Date"
          },
          animation: {
            startup: true,
            easing: "linear",
            duration: 1500
          }
        }}
      />
    );
  }
}

export default TimeChart;
