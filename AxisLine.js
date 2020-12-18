var AxisLine = function() {
	this.draw = function(isY){
		//console.log(this.points);
		for(let i =0;i<this.points.length;i++){
			var point = this.points[i];
			point.draw(this.color,isY);
		}
	}
	
	this.formXLinePoints = function() {
		for(let i=0;i<maxNumber+1;i++){
			var point = new Point(i,0);
			this.points.push(point);
		}
		//console.log(this.points);
	}
	
	this.formYLinePoints = function() {
		for(let i=0;i<maxNumber+1;i++){
			var point = new Point(0,i);
			this.points.push(point);
		}
		//console.log(this.points);
	}
}