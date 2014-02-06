var chart;

$(document).ready(function () {
    var options = {
        chart: {
            renderTo: 'statusChart',
            marginRight: 130,
            marginBottom: 50,
            zoomType: 'x'
        },
		tooltip: {
			enabled: true,
			formatter: function() {
				return '<b>'+ this.series.name +'</b><br/>'+
				Highcharts.dateFormat('%a %d %b %Y %H:%M:%S', this.x*1000) +'<br/>'+ 
				this.y;
			}
		},
        plotOptions: {
            series: {
                lineWidth: 1,
                marker: {
                    enabled: false
                }
            }
        },
		rangeSelector: {
			
		},
        title: {
            text: 'MinePeon Status',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime',
			tickPixelInterval: 300,
            // tickInterval: 24 * 3600 * 1000,
            tickWidth: 0,
            gridLineWidth: 1,
            labels: {
                align: 'center',
                x: -3,
                y: 20,
			},
			dateTimeLabelFormats: {
				second: '%a %d %b %Y<br/>%H:%M:%S',
				minute: '%a %d %b %Y<br/>%H:%M:%S',
				hour: '%a %d %b %Y<br/>%H:%M:%S',
				day: '%a %d %b %Y<br/>%H:%M:%S',
				week: '%a %d %b %Y<br/>%H:%M:%S',
				month: '%a %d %b %Y<br/>%H:%M:%S',
				year: '%a %d %b %Y<br/>%H:%M:%S'
			}
        },
        yAxis: [{
			min: 0,
            title: {
                text: 'HashRate'
            },
        }, {
			min: 0,
            title: {
                text: 'Degrees Celsius'
            },
            opposite: true
        }, ],
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            y: 10,
            borderWidth: 0
        },
        series: [{
            name: 'GH/s Average',
			color: '#FF0000',
			type: 'spline',
			lineWidth: 2,
			zIndex: 10,
            yAxis: 0
        }, {
            name: 'GH/s Acutal',
			color: '#E8ADAA',
			type: 'spline',
			lineWidth: 1,
			zIndex: 0,
            yAxis: 0
        }, {
            name: 'MinePeon Temperature',
			type: 'spline',
            yAxis: 1
        }, ]
    }
    // Load data asynchronously using jQuery. On success, add the data
    // to the options and initiate the chart.
    // This data is obtained by exporting a GA custom report to TSV.
    // http://api.jquery.com/jQuery.get/
	//
	// http://stackoverflow.com/questions/3075577/convert-mysql-datetime-stamp-into-javascripts-date-format
	// Split timestamp into [ Y, M, D, h, m, s ]
	// var t = "2010-06-09 13:12:01".split(/[- :]/);
	//
	// Apply each element to the Date function
	// var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
	//
	// alert(d);
	// -> Wed Jun 09 2010 13:12:01 GMT+0100 (GMT Daylight Time)
    jQuery.get('summary.php', null, function (tsv) {
        var lines = [];
        GHAvg = [];
        GHActual = [];
        DeviceTemp = [];
        try {
            // split the data return into lines and parse them
            tsv = tsv.split(/\n/g);
            jQuery.each(tsv, function (i, line) {
                line = line.split(/\t/);
                // date = Date.parse(line[0] + ' UTC');
				date = Date.parse(line[0]);
				var t = line[0].split(/[- :]/);
				// var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
                GHAvg.push([
                //date,
				line[0],
                parseFloat(line[1].replace(',', ''), 10) * 1000, ]);
                GHActual.push([
                //date,
				line[0],
                parseFloat(line[2].replace(',', ''), 10) * 1000, ]);
                DeviceTemp.push([
                //date,
				line[0],
                parseFloat(line[3].replace(',', ''), 10), ]);
            });
        } catch (e) {}
        options.series[0].data = GHAvg;
        options.series[1].data = GHActual;
        options.series[2].data = DeviceTemp;
        chart = new Highcharts.Chart(options);
		var d = new Date();
		//chart.xAxis[0].setExtremes(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() - 1, d.getHours(), d.getMinutes()), Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes()));
		// javascript is stupid (or I am) why cant the above line be between Now() - 1 day and Now() ?????
		//chart.showResetZoom();
    });
});
