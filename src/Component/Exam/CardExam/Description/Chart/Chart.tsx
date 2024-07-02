import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const Chart = () => {
  return (
    <div style={{ height: 600, width: 300 }}>
      <BarChart
        series={[
          { data: [44, 24, 35] }, // Adjusted data length
          // Adjusted data length
        ]}
        height={400}
        xAxis={[{ data: ['DIFF(LINUX)', 'ChatGPT', 'Dolos-lib'], scaleType: 'band' }]}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        title='Biểu đồ kiểm tra sự trùng lặp của các bài nộp !'
      />
    </div>
  );
}

export default Chart;
