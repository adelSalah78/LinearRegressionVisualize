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
	
	this.drawAlgoPoint = function(color) {
		var htmlPoint;
		htmlPoint = document.getElementById(this.x+"_"+this.y+"_copy");
		htmlPoint.style.backgroundColor = color;
		if(!(this.y == 0 && this.x == 0)) {
			var spacePoint = document.getElementById(this.y+"_"+this.x+"_space");
			spacePoint.style.backgroundColor = color;
		}
	}
}