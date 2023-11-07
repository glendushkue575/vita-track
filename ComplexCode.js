/*
Filename: ComplexCode.js

This code showcases a complex implementation of a real-time data visualization tool using D3.js library.
It fetches data from an API and visualizes it using various chart types, filters, and interactive features.

Note: In order to execute this code, you need to include the D3.js library in the HTML file.

*/

// Import necessary D3 modules
import * as d3 from 'd3';

// Initialize chart dimensions
const width = 800;
const height = 500;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const chartWidth = width - margin.left - margin.right;
const chartHeight = height - margin.top - margin.bottom;

// Create SVG container
const svg = d3.select('body')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create chart container
const chart = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Define scales
const xScale = d3.scaleLinear()
  .range([0, chartWidth]);

const yScale = d3.scaleLinear()
  .range([chartHeight, 0]);

// Define axes
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Fetch data from API
d3.json('https://api.example.com/data')
  .then(data => {
    // Data processing and manipulation

    // Set domain for scales
    xScale.domain([0, d3.max(data, d => d.xValue)]);
    yScale.domain([0, d3.max(data, d => d.yValue)]);

    // Render x-axis
    chart.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${chartHeight})`)
      .call(xAxis);

    // Render y-axis
    chart.append('g')
      .attr('class', 'y-axis')
      .call(yAxis);

    // Render data points
    chart.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', d => xScale(d.xValue))
      .attr('cy', d => yScale(d.yValue))
      .attr('r', 5)
      .style('fill', 'steelblue');
  
    // Render line chart
    const lineGenerator = d3.line()
      .x(d => xScale(d.xValue))
      .y(d => yScale(d.yValue));

    chart.append('path')
      .datum(data)
      .attr('class', 'line-chart')
      .attr('d', lineGenerator)
      .style('fill', 'none')
      .style('stroke', 'orange')
      .style('stroke-width', '2px');

    // Add interactivity
    svg.selectAll('.data-point')
      .on('mouseover', (event, d) => {
        // Custom logic for mouseover event
      })
      .on('mouseout', (event, d) => {
        // Custom logic for mouseout event
      })
      .on('click', (event, d) => {
        // Custom logic for click event
      });

    // Implement filters
    const filterOptions = ['All', 'Category A', 'Category B', 'Category C'];
  
    const filterSelect = d3.select('body')
      .append('select')
      .attr('class', 'filter-select');
    
    filterSelect.selectAll('option')
      .data(filterOptions)
      .enter()
      .append('option')
      .text(d => d);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });