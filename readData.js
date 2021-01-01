var textAreaValue;
var textAreaValueRows;
var dataSet=[];
let currentLSE = "";
let minLSE = "";
const maxNumber = 50;
const learning_rate = 0.01;
const maxSteps = 100;
const intervalSpeed = 2000;
function readDataSet() {
	textAreaValue = document.getElementById("data_set").value;
	if(!textAreaValue || textAreaValue=="") {
		alert("please enter data set values!");
		return;
	}
	textAreaValueRows = textAreaValue.split("\n");
	
	if(textAreaValueRows.length <= 2) {
		alert("You must have a data set with 3 samples at least");
		return;
	}
	
	/*if(textAreaValueRows.length > 40) {
		alert("You must have data set with 40 samples at most");
		return;
	}*/
	
	for(let i=0;i<textAreaValueRows.length;i++){
		var dataSetRow = textAreaValueRows[i].split(",");
		if(dataSetRow.length!=2){
			alert("line: "+i+" this is a 2-D linear regression algorithm. Only 2 values are allowed!")
			return;
		}
		try{
			var x = dataSetRow[0];
			var y = dataSetRow[1];
			
			/*if(x < 0 || y < 0) {
				alert("line: "+i+" X & Y values must be positive!");
				return;
			}*/
			
			/*if(x > maxNumber || y > maxNumber) {
				alert("line: "+i+" X & Y values must be positive and not greater than "+ maxNumber+"!");
				return;
			}*/
			
			var sample = {x:x,y:y};
			dataSet.push(sample);
		}
		catch(e){
			alert("line: "+i+" error parsing a sample number: "+i);
			return;
		}
	}
	
	document.getElementById("dataSetEntry").style.display = "none";
	//initGraph();
	document.getElementById("graph").style.display = "block";
	//drawDataSet();
	
	startLearning();

}

function drawDataSet(){
	for(let i=0;i<dataSet.length;i++) {
		var row = dataSet[i];
		var x = row.x;
		var y = row.y;
		var id = x + "_" + y + "_copy";
		document.getElementById(id).innerHTML = "<img style='width:8px;height:8px' src='xImage.png'></img>";
	}
}

function initGraph() {
	var table = document.getElementById("graphTable");
	var innerHtml = '';
	for(let i=maxNumber;i>=0;i--) {
		innerHtml+="<tr>";
		if(i!=0) {
			if(i>=10)
				innerHtml+="<td id='number_"+i+"' style='width:5px;height:5px;font-size:10px'>"+i+"</td>";
			else
				innerHtml+="<td id='number_"+i+"' style='width:5px;height:5px;font-size:10px'>0"+i+"</td>";
		}
		else {
			innerHtml+="<td id='number_"+i+"' ></td>";
		}
		for(let j=0;j<=maxNumber;j++) {
			var id = j + "_" + i;			
			innerHtml+="<td id='"+id+"_copy' style='width:5px;height:5px;'></td>";
			innerHtml+="<td id='"+id+"' style='width:5px;height:5px;'></td>";
		}
		innerHtml+="</tr>";
		innerHtml+="<tr>";
		innerHtml+="<td style='width:5px;height:5px;'>";
		if(i!=0) {
			innerHtml+="<td style='width:5px;height:5px;background-color:black'>";
			for(let x=0;x<=maxNumber;x++) {
				innerHtml+="<td style='width:11px;height:12px' id='"+i+"_"+(x+1)+"_space'></td>";
				innerHtml+="<td style='width:11px;height:12px' id='"+i+"_"+(x+1)+"_space_copy'></td>";
			}
		}
		else {
			innerHtml+="<td style='width:5px;height:5px;'>";
		}
		innerHtml+="</td>";
		innerHtml+="</tr>";
	}
	innerHtml+=numberingXAxis();
	table.innerHTML = innerHtml;
	drawGraphLines();
}

function numberingXAxis() {
	let innerHtml = '';
	innerHtml+="<tr>";
	innerHtml+="<td style='width:5px;height:5px;'></td>";
	innerHtml+="<td style='width:5px;height:5px;'></td>";
	innerHtml+="<td style='width:5px;height:5px;'></td>";
	for(let j=0;j<maxNumber;j++) {
		var id = j + "_XAxis";
		if(j>=9)
			innerHtml+="<td id='"+id+"_copy' style='width:5px;height:5px;font-size:10px'>"+(j+1)+"</td>";
		else
			innerHtml+="<td id='"+id+"_copy' style='width:5px;height:5px;font-size:10px'>0"+(j+1)+"</td>";
		innerHtml+="<td id='"+id+"' style='width:5px;height:5px;'>&nbsp;</td>";
		
	}
	innerHtml+="</tr>";
	return innerHtml;
}

function drawGraphLines() {
	//var x-axisStartPoint = new Point(0,0);
	//var x-axisEndPoint = new Point(0,100);
	
	//var y-axisStartPoint = new Point(0,0);
	//var y-axisEndPoint = new Point(100,0);
	
	var xAxis = new Line('black',CreateLine(true));
	console.log(xAxis);
	xAxis.formXLinePoints();
	xAxis.draw(false);
	var yAxis = new Line('black',CreateLine(true));
	yAxis.formYLinePoints();
	yAxis.draw(true);
}

function calcLSESum(forSlope,startLine) {
	let LSESum = 0;
	//console.log("start line:",JSON.stringify(startLine));
	for(let i=0;i<dataSet.length;i++) {
		let model;
		let iterationSum = 0;
		/*if(forSlope)
			alert("slope: "+LSESum)
		else
			alert("intersect: "+LSESum)*/
		model = (startLine.slope * dataSet[i].x + startLine.intersect);
		iterationSum = (dataSet[i].y - model);
		
		if(forSlope) {
			iterationSum*= -1 * dataSet[i].x;
			alert("slope: "+ iterationSum);
		}
		else {
			iterationSum*= -1;
			alert("intersect: "+ iterationSum);
		}
		
		LSESum+=iterationSum;
	}
	//alert(parseInt(LSESum))
	return LSESum;
}

function getMaxYDataSet() {
	let max = dataSet[0].y;
	for(let i=1;i<dataSet.length;i++) {
		if(parseFloat(dataSet[i].y) > parseFloat(max))
			max = parseFloat(dataSet[i].y);
	}
	return max;
}

function getMinYDataSet() {
	let min = dataSet[0].y;
	for(let i=0;i<dataSet.length;i++) {
		if(parseFloat(dataSet[i].y)< parseFloat(min))
			min = parseFloat(dataSet[i].y);
	}
	return min;
}

function sumYValues() {
	let sum = parseFloat(dataSet[0].y);
	for(let i=1;i<dataSet.length;i++) {
		sum+=parseFloat(dataSet[i].y);
	}
	return sum;
}
function startLearning() {
	var startLine = new Line('green',CreateLine(false));
	//startLine.draw();
	let x = 0;
	let n = dataSet.length;
	
	let max = getMaxYDataSet();
	let min = getMinYDataSet();
	//let sum = sumYValues();
	
	let average = (max+min) / 2;
	startLine.intersect = average;
	
	
	
	//startLine.draw();
	//console.log(JSON.stringify(startLine));
	let intervalStopper = 0;
	//while(x<maxSteps) {
		var interval = setInterval(() => {
			
			currentLSE = calcStepLSE(startLine);
			if(minLSE == "") {
				minLSE = currentLSE;
				document.getElementById('minLSE').innerHTML = minLSE + " with slope = "+startLine.slope+" & intersect = "+startLine.intersect;
			}
			else {
				//alert(parseFloat(currentLSE.toFixed(2)) + " " + parseFloat(minLSE.toFixed(2)))
				if(parseFloat(currentLSE.toFixed(2)) < parseFloat(minLSE.toFixed(2))) {
					minLSE = currentLSE;
					document.getElementById('minLSE').innerHTML = minLSE + " with slope = "+startLine.slope+" & intersect = "+startLine.intersect;
				}
			}
			document.getElementById('LSE').innerHTML = currentLSE;
			
			
			//let slopeDerv = (2/n) * calcLSESum(true,startLine);
			//let intersectDerv = (2/n) * calcLSESum(false,startLine);
			let slopeDerv =  calcLSESum(true,startLine);
			let intersectDerv =  calcLSESum(false,startLine);
			
			let newSlope;
			let newIntersect;
			
			/*if(startLine.slope < 0)
				startLine.slope*= -1;
			if(slopeDerv < 0)
				slopeDerv*= -1;
				
			if(startLine.intersect < 0)
				startLine.intersect*= -1;
			if(intersectDerv < 0)
				intersectDerv*= -1;*/
			
			newSlope = startLine.slope - learning_rate * slopeDerv;
			newIntersect = startLine.intersect - learning_rate * intersectDerv;
			//newSlope = parseInt(Math.ceil(newSlope));
			//newIntersect = parseInt(Math.ceil(newIntersect));
			
			//newSlope = parseInt(newSlope);
			//newIntersect = parseInt(newIntersect);
			//console.log("start line:",JSON.stringify(startLine))
			//console.log(newSlope,newIntersect)
			
			startLine.startPoint = new Point(0,newIntersect);
			startLine.slope = newSlope;
			startLine.intersect = newIntersect;
			document.getElementById('currentSlope').innerHTML = newSlope;
			document.getElementById('currentIntersect').innerHTML = newIntersect;
			
			
			intervalStopper++;
			if(intervalStopper>=maxSteps) {
				console.log("exiting...");
				clearInterval(interval);
			}
		},intervalSpeed);
		//x++;
	//}
}

function calcStepLSE(startLine) {
	let LSESquareSum = 0;
	//let startLinePoint = startLine.points[0].x;
	//alert(JSON.stringify(startLine))
	for(let i=0;i<dataSet.length;i++) {
		let model;
		model = (startLine.slope * dataSet[i].x + startLine.intersect);
		LSESquareSum += (dataSet[i].y - model) * (dataSet[i].y - model) * 0.5;
		//startLinePoint ++;
	}
	return LSESquareSum;
}