const url = 'https://rdashcraft91.github.io/D3-challenge/D3-data_journalism/assets/data/data.csv'

// // if the SVG area isn't empty when the browser loads,
// // remove it and replace it with a resized version of the chart
// var svgArea = d3.select("#scatter").select("svg");

// // clear svg is not empty
// if (!svgArea.empty()) {
//     svgArea.remove();
// }

// var svgWidth = window.innerWidth - (window.innerWidth/4);
// var svgHeight = window.innerHeight - (window.innerHeight/2);

// var margin = {
// top: 20,
// right: 75,
// bottom: 75,
// left: 75
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
// var svg = d3.select("#scatter")
// .append("svg")
// .attr("width", svgWidth)
// .attr("height", svgHeight);

// var chartGroup = svg.append("g")
// .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Initial Params
// var chosenXAxis = "poverty";
// var chosenYaxis = "obesity";

// // function used for updating x-scale var upon click on axis label
// function xScale(stateData, chosenXAxis) {
//   // create scales
//   var xLinearScale = d3.scaleLinear()
//     .domain([d3.min(stateData, d => d[chosenXAxis]) * 0.8,
//       d3.max(stateData, d => d[chosenXAxis]) * 1.2
//     ])
//     .range([0, width]);

//   return xLinearScale;
// }

// // function used for updating x-scale var upon click on axis label
// function yScale(stateData, chosenYaxis) {
//     // create scales
//     var yLinearScale = d3.scaleLinear()
//       .domain([d3.min(stateData, d => d[chosenYaxis]) * 0.8,
//         d3.max(stateData, d => d[chosenYaxis]) * 1.2
//       ])
//       .range([height, 0]);
  
//     return yLinearScale;
//   }

// // function used for updating xAxis and var upon click on axis label
// function renderXAxis(newXScale, xAxis) {
//   var bottomAxis = d3.axisBottom(newXScale);

//   xAxis.transition()
//     .duration(1000)
//     .call(bottomAxis);

//   return xAxis;
// }

// // function used for updating yAxis and var upon click on axis label
// function renderYAxis(newYScale, yAxis) {
//     var leftAxis = d3.axisLeft(newYScale);
  
//     yAxis.transition()
//       .duration(1000)
//       .call(leftAxis);
  
//     return yAxis;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCirclesX(circlesGroup, textGroup, newXScale, chosenXAxis) {

//   circlesGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));
    
//   textGroup.transition()
//     .duration(1000)
//     .attr("cx", d => newXScale(d[chosenXAxis]));
  
//   return circlesGroup, textGroup;
// }

// // function used for updating circles group with a transition to
// // new circles
// function renderCirclesY(circlesGroup, textGroup, newYScale, chosenYaxis) {

//     circlesGroup.transition()
//       .duration(1000)
//       .attr("cy", d => newYScale(d[chosenYaxis]));
    
//     textGroup.transition()
//       .duration(1000)
//       .attr("cx", d => newXScale(d[chosenXAxis]));
  
//     return circlesGroup, textGroup;
// }

// // function used for updating circles group with new tooltip
// function updateToolTip(chosenXAxis, chosenYaxis, circlesGroup) {

//   var label1;
//   var label2;

//   console.log(chosenXAxis);
//   console.log(chosenYaxis);

//   if (chosenXAxis === "poverty" && chosenYaxis === "obesity") {
//     label1 = "Poverty Rate";
//     label2 = "Obesity Rate";
//   }
//   else if (chosenXAxis === "poverty" && chosenYaxis === "healthcare") {
//     label1 = "Poverty Rate";
//     label2 = "Healthcare";
//   }
//   else if (chosenXAxis === "poverty" && chosenYaxis === "age") {
//     label1 = "Poverty Rate";
//     label2 = "Age";
//   }
//   else if (chosenXAxis === "smokes" && chosenYaxis === "obesity") {
//     label1 = "Smokes";
//     label2 = "Obesity Rate";
//   }
//   else if (chosenXAxis === "smokes" && chosenYaxis === "healthcare") {
//     label1 = "Smokes";
//     label2 = "Healthcare";
//   }
//   else if (chosenXAxis === "smokes" && chosenYaxis === "age") {
//     label1 = "Smokes";
//     label2 = "Age";
//   }
//   else if (chosenXAxis === "income" && chosenYaxis === "obesity") {
//     label1 = "Poverty Rate";
//     label2 = "Obesity Rate";
//   }
//   else if (chosenXAxis === "income" && chosenYaxis === "healthcare") {
//     label1 = "Poverty Rate";
//     label2 = "Healthcare";
//   }
//   else {
//     label1 = "Income";
//     label2 = "Age";
//   }

//   console.log(label1);
//   console.log(label2);

//   var toolTip = d3.tip()
//     .attr("class", "tooltip")
//     .offset([80, -60])
//     .html(function(d) {
//       return (`${d.state}<br>${label1}: ${d[chosenXAxis]}<br>${label2}: ${d[chosenYaxis]}`);
//     });

//   circlesGroup.call(toolTip);

//   circlesGroup.on("mouseover", function(data) {
//     toolTip.show(data);
//   })
//     // onmouseout event
//     .on("mouseout", function(data, index) {
//       toolTip.hide(data);
//     });

//   return circlesGroup;
// }

// // Retrieve data from the CSV file and execute everything below
// d3.csv(url).then(function(stateData, err) {
//   if (err) throw err;

//   // parse data
//   stateData.forEach(function(data) {
//     data.poverty = +data.poverty;
//     data.obesity = +data.obesity;
//     data.healthcare = +data.healthcare;
//     data.age = +data.age;
//     data.income = +data.income;
//     data.smokes = +data.smokes;
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(stateData, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = yScale(stateData, chosenYaxis);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   var yAxis = chartGroup.append("g")
//     .classed("y-axis", true)
//     .attr("transform", `translate(${width}, 0)`)
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(stateData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d[chosenYaxis]))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");
  
//   var textGroup = chartGroup.selectAll('text')
//       .data(stateData)
//       .enter()
//       .append("text")
//       .attr("dx", 8)
//       .text(function(d) {
//           return (`${d.abbr}`);
//           })
//       .attr("class", "stateText")
//       .attr("cx", d => xLinearScale(d[chosenXAxis]))
//       .attr("cy", d => yLinearScale(d[chosenYaxis]));

//   // Create group for  3 x- axis labels
//   var xlabelsGroup = chartGroup.append("g");

//   var incomeLabel = xlabelsGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
//   .attr("class", "axisText")
//   .attr("text-anchor", "middle")
//   .attr("value", "income")
//   .classed("active", false)
//   .text("Income");

//   var povertyLabel = xlabelsGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
//   .attr("class", "axisText")
//   .attr("text-anchor", "middle")
//   .attr("value", "poverty")
//   .classed("active", true)
//   .text("Poverty Rate");

//   var smokingLabel = xlabelsGroup.append("text")
//   .attr("transform", `translate(${width / 2}, ${height + margin.top + 40})`)
//   .attr("class", "axisText")
//   .attr("text-anchor", "middle")
//   .attr("value", "smokes")
//   .classed("active", false)
//   .text("Smoking");

//   // append y axis
//   var ylabelsGroup = chartGroup.append("g");

//   var obesityLabel = ylabelsGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .attr("text-anchor", "middle")
//         .attr("class", "axisText")
//         .attr("value", "obesity")
//         .classed("active", true)
//         .text("Obesity Rate");

//   var healthLabel = ylabelsGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left + 15)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .attr("text-anchor", "middle")
//         .attr("class", "axisText")
//         .attr("value", "healthcare")
//         .classed("active", false)
//         .text("Healthcare");
  
//   var ageLabel = ylabelsGroup.append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 0 - margin.left + 30)
//         .attr("x", 0 - (height / 2))
//         .attr("dy", "1em")
//         .attr("text-anchor", "middle")
//         .attr("class", "axisText")
//         .attr("value", "age")
//         .classed("active", false)
//         .text("Age");
//   console.log(ylabelsGroup);

//   // updateToolTip function above csv import
//   circlesGroup = updateToolTip(chosenXAxis, chosenYaxis, circlesGroup);

//     // x axis labels event listener
//   xlabelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var xvalue = d3.select(this).attr("value");
//       console.log(xvalue);
//       console.log(chosenXAxis);
//       if (xvalue !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = xvalue;

//         console.log(chosenXAxis);

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(stateData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderXAxis(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCirclesX(circlesGroup, textGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "income") {
//           incomeLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           smokingLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else if (chosenXAxis === "poverty") {
//             incomeLabel
//               .classed("active", false)
//               .classed("inactive", true);
//             povertyLabel
//               .classed("active", true)
//               .classed("inactive", false);
//             smokingLabel
//               .classed("active", false)
//               .classed("inactive", true);
//           }
//         else {
//           incomeLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           povertyLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           smokingLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });

//   // y axis labels event listener
//   ylabelsGroup.selectAll("text")
//     .on("click", function() {
//     // get value of selection
//     var yvalue = d3.select(this).attr("value");
//     console.log(yvalue);
//     console.log(chosenXAxis);
//     if (yvalue !== chosenYaxis) {
      
//       // replaces chosenYaxis with value
//       chosenYaxis = yvalue;

//       console.log(chosenYaxis);

//       // functions here found above csv import
//       // updates y scale for new data
//       yLinearScale = yScale(stateData, chosenYaxis);

//       // updates y axis with transition
//       yAxis = renderYAxis(yLinearScale, yAxis);

//       // updates circles with new y values
//       circlesGroup = renderCirclesY(circlesGroup, yLinearScale, chosenYaxis);

//       // updates tooltips with new info
//       updateToolTip(chosenYaxis, circlesGroup);

//       // changes classes to change bold text
//       if (chosenYaxis === "obesity") {
//         obesityLabel
//           .classed("active", true)
//           .classed("inactive", false);
//         healthLabel
//           .classed("active", false)
//           .classed("inactive", true);
//         ageLabel
//           .classed("active", false)
//           .classed("inactive", true);
//       }
//       else if (chosenYaxis === "healthcare") {
//         obesityLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         healthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         ageLabel    
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//       else {
//         obesityLabel
//           .classed("active", false)
//           .classed("inactive", true);
//         healthLabel
//           .classed("active", false)
//           .classed("inactive", true);
//         ageLabel
//           .classed("active", true)
//           .classed("inactive", false);
//       }
//     }
//   });
// }).catch(function(error) {
//   console.log(error);
// });    
    
    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = window.innerWidth - (window.innerWidth/4);
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
    d3.csv("/assets/data/data.csv").then(function(stateData) {

        // Step 1: Parse Data/Cast as numbers
        // ==============================
        stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.income = +data.income;
        data.smokes = +data.smokes;
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
        .attr('id', 'xAxis')
        .call(bottomAxis);
    
        chartGroup.append("g")
        // .attr("transform", `translate(${width}, 0)`)
        .call(leftAxis);      

        // Step 5: Create Circles
        // ==============================
        var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => xLinearScale(d.poverty))
        .attr("r", "15")
        .attr("opacity", "0.75")
        .attr("class", "stateCircle");
        
        var textGroup = chartGroup.selectAll("circle").select('text')
        .data(stateData)
        .enter()
        .append("text")
        .attr("dx", 8)
        .text(function(d) {
            return (`${d.abbr}`);
            })
        .attr("class", "stateText")
        .attr("cx", d => xLinearScale(d.poverty) + 8)
        .attr("cy", d => xLinearScale(d.poverty) - 5);
    
           // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>${xissue} Rate: ${d.xissue}<br>$${yissue} Rate: ${d.yissue}`);
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

    
        

        
        