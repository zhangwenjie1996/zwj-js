function down(e){
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx= e.pageX;
	this.my= e.pageY;
	if(this.setCapture()){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		this.MOVE=move.bind(this);
		this.UP=up.bind(this);
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
}

function move(e){

}