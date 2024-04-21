import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const MoistureGraph = ({ data }) => {
    const d3Container = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight * 0.5  // Adjusted to 50% of the viewport height
    });

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight * 0.5  // Keep the height at 50% of the viewport height
            });
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (data && data.length > 0 && d3Container.current) {
            const margin = { top: 20, right: 30, bottom: 60, left: 100 },
                  width = dimensions.width - margin.left - margin.right,
                  height = dimensions.height - margin.top - margin.bottom;

            d3.select(d3Container.current).selectAll("*").remove();

            const svg = d3.select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleTime()
                .domain(d3.extent(data, d => new Date(d.time)))
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([height, 0]);

            // Grid lines
            const makeXGridLines = () => d3.axisBottom(x).ticks(5);
            const makeYGridLines = () => d3.axisLeft(y).ticks(5);

            svg.append("g")
                .attr("class", "grid")
                .attr("transform", `translate(0,${height})`)
                .call(makeXGridLines()
                    .tickSize(-height)
                    .tickFormat("")
                )
                .selectAll("line").style("stroke", "#ccc");

            svg.append("g")
                .attr("class", "grid")
                .call(makeYGridLines()
                    .tickSize(-width)
                    .tickFormat("")
                )
                .selectAll("line").style("stroke", "#ccc");

            // Axes
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat("%Y-%m-%d %H:%M")))
                .append("text")
                .attr("fill", "#000")
                .attr("x", width)
                .attr("y", 35)
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("Time");

            svg.append("g")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", -70)
                .attr("x", -height/2)
                .attr("text-anchor", "end")
                .attr("font-weight", "bold")
                .text("Moisture");

            // Data line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "purple")
                .attr("stroke-width", 1.5)
                .attr("stroke-dasharray", "5,5")  // Dashed line
                .attr("d", d3.line()
                    .x(d => x(new Date(d.time)))
                    .y(d => y(d.value))
                );

            // Constant line at y = 13.5
            svg.append("line")
                .attr("x1", 0)
                .attr("x2", width)
                .attr("y1", y(13.5))
                .attr("y2", y(13.5))
                .attr("stroke", "red")
                .attr("stroke-dasharray", "5,5")
                .attr("stroke-width", 2);

            // Markers as circles
            svg.selectAll(".marker")
                .data(data)
                .enter()
                .append("circle")
                .attr("class", "marker")
                .attr("cx", d => x(new Date(d.time)))
                .attr("cy", d => y(d.value))
                .attr("r", 5)
                .attr("fill", "purple");

            // Labels for each data point
            svg.selectAll(".text")
                .data(data)
                .enter().append("text")
                .attr("x", d => x(new Date(d.time)))
                .attr("y", d => y(d.value))
                .attr("dy", "-10")
                .attr("text-anchor", "middle")
                .text(d => d.value.toFixed(1))
                .attr("font-size", "12px")
                .attr("fill", "black");

        }
    }, [data, dimensions]);  // Redraw graph when data or window size changes

    return (
        <svg ref={d3Container} style={{ width: "100%", height: "50vh" }}></svg>
    );
};

export default MoistureGraph;
