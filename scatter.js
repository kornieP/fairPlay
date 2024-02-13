
    // set the dimensions and margins of the graph
    const margin = {top: 10, right: 30, bottom: 30, left: 60},
            width = 1400 - margin.left - margin.right,
            height = 900 - margin.top - margin.bottom;
    
    // append the svg object to the body of the page
    const svg = d3.select("#frame1")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
    var color = d3.scaleOrdinal()
    .domain(["y", "n"])
    .range([ "#800000", "#A9A9A9"])
    //Read the data
    d3.csv("https://gist.githubusercontent.com/puripant/857f1981667e8b42da2c72328ba94ead/raw/3950015ce671792bc9756d55f140b71079315279/medals.csv").then( function(data) {

        // Add X axis
        var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(data.map(function(d) { return d.year; }))
  .padding(1);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
    
        // Add Y axis
        const y = d3.scaleLinear()
        .domain([0, 200])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));
    
        // Add dots
        svg.append('g')
        .selectAll("dot")
        .data(data)
        .join("circle")
            .attr("cx", function (d) { return x(d.year); } )
            .attr("cy", function (d) { return y(d.gold); } )
            .attr("r", 3)
            .style("fill", function (d) { return color(d.host)})

        svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 8)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("dx", 7)
      .attr("dy", "0.35em")
      .attr("x", function (d) { return x(d.year); })
      .attr("y", function (d) { return y(d.gold);})
      .text(function (d) { return d.name.substring(0, 3); })
      .style("fill", function (d) { return color(d.host)})

    })