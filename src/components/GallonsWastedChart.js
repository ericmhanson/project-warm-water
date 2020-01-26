import Chart from "react-google-charts";
import React, { Component } from "react";
// import db from './firebase'

class GallonsWastedChart extends Component {
  // getCollection(db) {
  //   db.collection("users")
  //     .get()
  //     .then(snapshot => {
  //       snapshot.forEach(doc => {
  //         console.log(doc.id, "=>", doc.data());
  //       });
  //     })
  //     .catch(err => {
  //       console.log("Error getting documents", err);
  //     });
  // }

  render() {
    return (
      <Chart
        width={"550px"}
        height={"350px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Date", "Gal"],
          ['1/25/2020', 1.47385],
          ['1/25/2020', 1.3398],
          ['1/25/2020', 1.3153],
          ['1/25/2020', 1.28765],
          ['1/25/2020', 1.7696]
        ]}
        options={{
          title: "Average gallons used per shower",
          chartArea: { width: "50%" },
          colors: ['#09cac7'],
          hAxis: {
            title: "Day",
            minValue: 0
          },
          vAxis: {
            title: "Gallons"
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

export default GallonsWastedChart;
