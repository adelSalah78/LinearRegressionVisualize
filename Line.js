var Line = function(start,end,intersect,slope,color) {
	this.startPoint = start;
	this.endPoint = end;
	this.intersect = intersect;
	this.slope = slope;
	this.color = color;
	this.points = [];
	
	this.draw = function(){
		console.log(this.points);
		for(let i =0;i<this.points.length;i++){
			var point = this.points[i];
			point.draw(this.color);
		}
	}
	
	this.formLinePoints = function() {
	}
	
	
	this.formXLinePoints = function() {
		for(let i=0;i<maxNumber+1;i++){
			var point = new Point(i,0);
			this.points.push(point);
		}
		console.log(this.points);
	}
	
	this.formYLinePoints = function() {
		for(let i=0;i<maxNumber+1;i++){
			var point = new Point(0,i);
			this.points.push(point);
		}
		console.log(this.points);
	}
	
}