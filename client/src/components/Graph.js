import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AreaChart = ({graphData}) => {
    return (
        <div className = "above">
        <ResponsiveContainer width="95%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sentiment" stroke="#2196f3" activeDot={{ r: 8 }} />
            {/* <Line type="monotone" dataKey="popularity" stroke="#f44336" /> */}
          </LineChart>
        </ResponsiveContainer>
        </div>)
            }

export default AreaChart