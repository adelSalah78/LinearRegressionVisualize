var Line = function(color,line) {
	this.color = color;
	this.points=[];
	
	this.draw = line.draw;
	
	this.formLinePoints = line.formLinePoints;
	this.startPoint = line.startPoint;
	this.endPoint = line.endPoint;
	this.intersect = line.intersect;
	this.slope = line.slope;
	
	
	this.formXLinePoints = line.formXLinePoints;
	
	this.formYLinePoints = line.formYLinePoints;
	
}