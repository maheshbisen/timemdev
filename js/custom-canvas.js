// JavaScript Document
window.onload = function () {
//Better to construct options first and then pass it as a parameter
	var options = {
		title: {
			text: "Your most frequently visited sites during study circle",
			fontFamily: "'Raleway', sans-serif",
			fontSize: 25,
			
		},
	  
                animationEnabled: true,
		data: [
		{
			indexLabelFontSize: 20,
			type: "column", //change it to line, area, bar, pie, etc
			dataPoints: [
				{ x: 10, y: trackingSites["instagram"],indexLabel: "Instagram", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside"},
				{ x: 20, y: trackingSites["youtube"],indexLabel: "Youtube", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside" },
				{ x: 30, y: trackingSites["yahoo"],indexLabel: "Yahoo (all)", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside" },
				{ x: 40, y: trackingSites["tumblr"],indexLabel: "Tumblr", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside" },
				{ x: 50, y: trackingSites["dailymotion"],indexLabel: "Dailymotion", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside"},
				{ x: 60, y: trackingSites["vine"],indexLabel: "Vine", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside" },
				{ x: 70, y: trackingSites["twitter"],indexLabel: "Twitter", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside" },
				{ x: 80, y: trackingSites["pinterest"],indexLabel: "Pinterest", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside"  },
				{ x: 90, y: trackingSites["facebook"],indexLabel: "Facebook", indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside" }
			]
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}