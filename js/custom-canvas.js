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
				{ y: trackingSites["instagram"],indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Instagram" },
				{ y: trackingSites["youtube"],indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Youtube" },
				{ y: trackingSites["yahoo"], indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Yahoo (all)" },
				{ y: trackingSites["tumblr"],indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Tumblr" },
				{ y: trackingSites["dailymotion"],indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Dailymotion" },
				{ y: trackingSites["vine"], indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Vine" },
				{ y: trackingSites["twitter"], indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Twitter"  },
				{ y: trackingSites["pinterest"], indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Pinterest"  },
				{ y: trackingSites["facebook"], indexLabelFontColor: "white", indexLabelOrientation: "vertical", indexLabelPlacement: "inside", label: "Facebook" }
			]
		}
		]
	};

	$("#chartContainer").CanvasJSChart(options);

}