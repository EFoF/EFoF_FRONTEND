import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#81BAC9', '#BAE053', '#FFD44F', '#bddaff', '#E0B379'];

const StatisticBar = ({optionData}) => {

  // alert(JSON.stringify(optionData));
  const transformedData = optionData.map((choiceAnswerDto) => ({
    "name": choiceAnswerDto.option_text,
    "응답자 수": choiceAnswerDto.participant_num_question_option
  }));
  
  
  return (
    <>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={transformedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="응답자 수">
          {transformedData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    </>
  );
}

export default StatisticBar;
