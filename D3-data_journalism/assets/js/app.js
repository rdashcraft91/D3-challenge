    const url = 'https://rdashcraft91.github.io/D3-challenge/D3-data_journalism/assets/data/data.csv'
    
    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = window.innerWidth - (window.innerWidth/3);
    var svgHeight = window.innerHeight - (window.innerHeight/2);

    var margin = {
    top: 20,
    right: 75,
    bottom: 75,
    left: 75
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Import Data
    d3.csv(url).then(function(stateData) {

        // Step 1: Parse Data/Cast as numbers
        // ==============================
        stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        });

        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d.poverty)-1, d3.max(stateData, d => d.poverty)])
        .range([0, width]);

        var yLinearScale = d3.scaleLinear()
        .domain([d3.min(stateData, d => d.obesity)-1, d3.max(stateData, d => d.obesity)])
        .range([height, 0]);

        // Step 3: Create axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);
      
        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
    
        chartGroup.append("g")
        // .attr("transform", `translate(${width}, 0)`)
        .call(leftAxis);      

        console.log()

        // Step 5: Create Circles and Text for the Circles
        // ================================================
        var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.obesity))
        .attr("r", "15")
        .attr("opacity", "0.75")
        .attr("class", "stateCircle");
        
        var textGroup = chartGroup.selectAll("circle").select('text')
        .data(stateData)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty)-8)
        .attr("y", d => yLinearScale(d.obesity)+5)
        .attr("dx", 8)
        .attr("class", "stateText")
        .text(function(d) {
            return (`${d.abbr}`);
            });
    
           // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>Poverty Rate: ${d.poverty}<br>Obesity Rate: ${d.obesity}`);
        });

        // Step 7: Create tooltip in the chart
        // ==============================
        chartGroup.call(toolTip);

        // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
        textGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
            })
        // onmouseout event
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });

        // Create axes labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("class", "axisText")
        .attr("value", "obesity")
        .text("Obesity Rate");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
        .attr("class", "axisText")
        .attr("text-anchor", "middle")
        .attr("value", "poverty")
        .text("Poverty Rate");
    }).catch(function(error) {
        console.log(error);
    });

    
        

        
        