var Point = function(x,y) {
	
	this.x = x;
	this.y = y;
	
	this.draw = function(color,isY){
		var htmlPoint;
		if(!isY) {
			htmlPoint = document.getElementById(this.x+"_"+this.y);
			htmlPoint.style.backgroundColor = color;
		}
		htmlPoint = document.getElementById(this.x+"_"+this.y+"_copy");
		htmlPoint.style.backgroundColor = color;
	}
}