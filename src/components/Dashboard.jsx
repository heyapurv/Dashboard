// src/Dashboard.js
import React from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// Import the data
import { data } from '../data/data';

const Dashboard = () => {
  // Parse and prepare data
  const parsedData = data.map((d) => ({
    timestamp: new Date(d.timestamp).toLocaleString(),
    src_ip: d.src_ip,
    dest_ip: d.dest_ip,
    category: d.alert ? d.alert.category : 'Unknown',
    proto: d.proto,
    severity: d.alert ? d.alert.severity : 0
  }));

  // Group data by category for bar chart
  const categoryData = parsedData.reduce((acc, cur) => {
    const category = cur.category;
    if (!acc[category]) {
      acc[category] = 1;
    } else {
      acc[category]++;
    }
    return acc;
  }, {});

  // Prepare data for category bar chart
  const categoryChartData = Object.keys(categoryData).map(category => ({
    category,
    value: categoryData[category]
  }));

  // Group data by protocol for bar chart
  const protocolData = parsedData.reduce((acc, cur) => {
    const proto = cur.proto;
    if (!acc[proto]) {
      acc[proto] = 1;
    } else {
      acc[proto]++;
    }
    return acc;
  }, {});

  // Prepare data for protocol bar chart
  const protocolChartData = Object.keys(protocolData).map(proto => ({
    proto,
    value: protocolData[proto]
  }));

  // Group data by source IP for bar chart
  const srcIpData = parsedData.reduce((acc, cur) => {
    const srcIp = cur.src_ip;
    if (!acc[srcIp]) {
      acc[srcIp] = 1;
    } else {
      acc[srcIp]++;
    }
    return acc;
  }, {});

  // Prepare data for source IP bar chart and sort by count
  const srcIpChartData = Object.keys(srcIpData).map(srcIp => ({
    srcIp,
    value: srcIpData[srcIp]
  })).sort((a, b) => b.value - a.value);

  // Group data by destination IP for bar chart
  const destIpData = parsedData.reduce((acc, cur) => {
    const destIp = cur.dest_ip;
    if (!acc[destIp]) {
      acc[destIp] = 1;
    } else {
      acc[destIp]++;
    }
    return acc;
  }, {});

  // Prepare data for destination IP bar chart and sort by count
  const destIpChartData = Object.keys(destIpData).map(destIp => ({
    destIp,
    value: destIpData[destIp]
  })).sort((a, b) => b.value - a.value);

  // Prepare data for time series chart
  const timeSeriesData = parsedData.reduce((acc, cur) => {
    const timestamp = cur.timestamp;
    if (!acc[timestamp]) {
      acc[timestamp] = 1;
    } else {
      acc[timestamp]++;
    }
    return acc;
  }, {});

  // Convert time series data to array format
  const timeSeriesChartData = Object.keys(timeSeriesData).map(timestamp => ({
    timestamp,
    value: timeSeriesData[timestamp]
  }));

  // Group data by severity for bar chart
  const severityData = parsedData.reduce((acc, cur) => {
    const severity = cur.severity;
    if (!acc[severity]) {
      acc[severity] = 1;
    } else {
      acc[severity]++;
    }
    return acc;
  }, {});

  // Prepare data for severity bar chart
  const severityChartData = Object.keys(severityData).map(severity => ({
    severity,
    value: severityData[severity]
  }));

  

  return (
    <div className="dashboard bg-gray-900 text-white min-h-screen ">
      <h1 className="text-3xl font-bold mb-8">Network Alerts Dashboard</h1>
{/* 
      <div className="chart-container mb-12 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Time Series of Alerts</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={timeSeriesChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp"   className='text-[10px]'/>
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div> */}

      <div className="chart-container mb-12 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Alert Categories</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Protocol Distribution</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={protocolChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="proto" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* <div className="chart-container mb-12 overflow-x-auto ">
        <h2 className="text-xl font-semibold mb-4">Source IPs</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={srcIpChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="srcIp"   className='text-[10px]' />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}

      <div className="chart-container mb-12 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Destination IPs</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={destIpChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="destIp"    />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-container mb-12 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Severity Distribution</h2>
        <div className="w-full min-w-0" style={{ minWidth: '600px' }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={severityChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
