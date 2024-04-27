import React, { useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Barchart({orderdatas}) {
    const dataArray =orderdatas;

// Generate X-axis labels for the months
const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
const xScaleData = [{ scaleType: 'band', data: months }];
const seriesData = [{ data: dataArray }];
const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

      <BarChart
    xAxis={xScaleData}
    series={seriesData}
    width={600}
  height={350}
  />
    </div>
  )
}
