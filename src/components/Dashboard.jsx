import React from 'react';
import {
  LineChart, Line, PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  ScatterChart, Scatter, AreaChart, Area
} from 'recharts';
import { data } from '../data/data';

const Dashboard = () => {
  const parsedData = data.map((d) => ({
    timestamp: new Date(d.timestamp).toLocaleString(),
    src_ip: d.src_ip,
    dest_ip: d.dest_ip,
    category: d.alert ? d.alert.category : 'Unknown',
    severity: d.alert ? d.alert.severity : 0,
    proto: d.proto
  }));

  const groupedData = parsedData.reduce((acc, cur) => {
    const category = cur.category;
    if (!acc[category]) {
      acc[category] = 1;
    } else {
      acc[category]++;
    }
    return acc;
  }, {});

  const pieChartData = Object.keys(groupedData).map(category => ({
    category,
    value: groupedData[category]
  }));

  const protocolData = parsedData.reduce((acc, cur) => {
    const proto = cur.proto;
    if (!acc[proto]) {
      acc[proto] = 1;
    } else {
      acc[proto]++;
    }
    return acc;
  }, {});

  const protocolChartData = Object.keys(protocolData).map(proto => ({
    proto,
    value: protocolData[proto]
  }));

  return (
    <div className="dashboard bg-gray-900 text-white min-h-screen ">
      <h1 className="text-3xl font-bold mb-8">Network Alerts Dashboard</h1>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-4">Time Series of Alerts</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" angle={-10} textAnchor="end" className='text-[10px]' />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="severity" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-10">Alert Categories</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={pieChartData} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" label>
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#82ca9d" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-10">Protocol Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie data={protocolChartData} dataKey="value" nameKey="proto" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" label>
              {protocolChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#82ca9d" />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-4">Severity Distribution by Category</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-10} textAnchor="end" className='text-[10px]' />
            <YAxis />
            <Tooltip />
            <Bar dataKey="severity" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-4">Trend of Alerts Over Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" angle={-10} textAnchor="end" className='text-[10px]' />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="severity" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-4">Source IPs</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="src_ip" angle={-10} textAnchor="end" className='text-[10px]' />
            <YAxis />
            <Tooltip />
            <Bar dataKey="severity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12">
        <h2 className="text-xl font-semibold mb-4">Destination IPs</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={parsedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dest_ip" angle={-10} textAnchor="end" className='text-[10px]' />
            <YAxis />
            <Tooltip />
            <Bar dataKey="severity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      

      
    </div>
  );
};

export default Dashboard;
