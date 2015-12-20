img = new Image();

muktosrc = "img/mukto_teachingmobile.png";
conwaysrc = "img/conway_mobile.png";
img.src = muktosrc;


//console.log(img.height);
//console.log(img.width);


function getimgarr(img){
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	// Copy the image contents to the canvas
	var ctx = canvas.getContext("2d");
	console.log("image origin: " + img.src);
	ctx.drawImage(img, 0, 0);
	var imgData = ctx.getImageData(0, 0, img.width, img.height).data;
	
	
	var bwarr = [];
	for (i=0; i<img.width;i++){
		bwarr[i] = [];
		for (j=0; j<img.height; j++){
			
			bwarr[i][j] = (imgData[4*(j*img.width + i)]<200? true:false);
		}
	}
	imgData = null;
	ctx = null;
	img = null;
	canvas = null;
	return bwarr;
	
}

function transferimg(game, imgarr){
	for (i=0; i<imgarr.length; i++){
		for (j=0; j<imgarr[0].length; j++){
			game.cells[i][j].alive = imgarr[i][j];
			game.cells[i][j].alivenext = imgarr[i][j];
		}
	}
}

//imgarr = getimgarr(img);

