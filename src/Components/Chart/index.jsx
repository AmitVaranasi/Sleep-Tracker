import _ from "lodash";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const BarChart = (
) => {
  const state = {
    series: [
      {
        name: "yes-1",
        data: [20,18,16,14,16,18],
      },
    //   {
    //     name: "yes-2",
    //     data: [40,36,32,28,32,36],
    //   },
    ],
    options: {
      colors: ["#EF6B64" 
            // "#664890"
        ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ['Mon','tue','wed','thu','fri','sat'],
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 8,
        forceNiceScale: true,
      },
      fill: {
        opacity: 1,
      },
    },
  };


  return (
    <div>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          width="60%"
          height={400}
        />
    </div>
  );
};

export default BarChart;
