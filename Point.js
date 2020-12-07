var Point = function(x,y) {
	
	this.x = x;
	this.y = y;
	
	this.draw = function(color){
		var htmlPoint = document.getElementById(this.x+"_"+this.y);
		htmlPoint.style.backgroundColor = color;
	}
}