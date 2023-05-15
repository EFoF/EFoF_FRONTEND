import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];

const COLORS = ['#8884d8', '#82ca9d', '#81BAC9', '#BAE053', '#FFD44F', '#bddaff', '#E0B379'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // =================변형=================

  // pie 안에 들어가는 퍼센트
  return (
    // =================원본=================
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>

    // =================변형=================
    // <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}>
    //   {`${(percent * 100).toFixed(2)}%`}
    // </text>

    // =================사본=================
    // <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
    //     {`(Rate ${(percent * 100).toFixed(2)}%)`}
    //   </text>
  );
};



export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            // activeShape={renderActiveShape}
            data={data01}
            cx="50%"
            cy="50%"
            outerRadius={100} // 원 크기 조정
            fill="#8884d8"
            // label
            label={renderCustomizedLabel}
          >
          {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
