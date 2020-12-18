var textAreaValue;
var textAreaValueRows;
var dataSet=[];
const maxNumber = 50;
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
	
	if(textAreaValueRows.length > 40) {
		alert("You must have data set with 40 samples at most");
		return;
	}
	
	for(let i=0;i<textAreaValueRows.length;i++){
		var dataSetRow = textAreaValueRows[i].split(",");
		if(dataSetRow.length!=2){
			alert("line: "+i+" this is a 2-D linear regression algorithm. Only 2 values are allowed!")
			return;
		}
		try{
			var x = parseInt(dataSetRow[0]);
			var y = parseInt(dataSetRow[1]);
			
			if(x < 0 || y < 0) {
				alert("line: "+i+" X & Y values must be positive!");
				return;
			}
			
			if(x > maxNumber || y > maxNumber) {
				alert("line: "+i+" X & Y values must be positive and not greater than "+ maxNumber+"!");
				return;
			}
			
			var sample = {x:x,y:y};
			dataSet.push(sample);
		}
		catch(e){
			alert("line: "+i+" error parsing a sample number: "+i);
			return;
		}
	}
	
	document.getElementById("dataSetEntry").style.display = "none";
	initGraph();
	document.getElementById("graph").style.display = "block";
	drawDataSet();

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
	startLearning();
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

function startLearning() {
	var startLine = new Line('green',CreateLine(false));
	startLine.draw();
}