var AlgorithmLine = function (start,end,intersect,slope) {
	this.startPoint = start;
	this.endPoint = end;
	this.intersect = intersect;
	this.slope = slope;
	
	this.draw = function() {
		this.points = this.formLinePoints();
		console.log(this.points);
		for(let i=0;i<this.points.length;i++) {
			this.points[i].drawAlgoPoint(this.color);
		}
	}
	
	this.formLinePoints = function() {
		var points = [];
		var x = this.startPoint.x;
		while(x <= this.endPoint.x) {
			var point = new Point(x,(this.slope*x)+this.intersect);
			points.push(point);
			x++;
		}
		return points;
	}
}