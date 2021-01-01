function CreateLine(isAxis) {
	if(isAxis) {
		return new AxisLine();
	}
	else {
		return new AlgorithmLine(new Point(0,0),new Point(50,50),0,0);
	}
}