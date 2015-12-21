window.gol = new Object();
speed = 750;
initpause = 2000;
mukto = true;
var starttimeout;
var deadcolor = "#ffffff";
var alivecolor = "#000000";
imgnum = getRandomInt(0, pngarr.length);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

gol.cell = function() {
    "use strict";
    var tmpobj;
    tmpobj = {
        alive: false,
        alivenext: false,
        neighbors: [],
        neighborsalive: function() {
            var sum = 0;
            tmpobj.neighbors.forEach(function(neighbor) {
                sum += (neighbor.alive ? 1 : 0);
            });
            return sum;
        },
        getfuture: function() {
            var nalive = tmpobj.neighborsalive();
            if (tmpobj.alive) {
                if (nalive >= 2 && nalive <= 3) {
                    tmpobj.alivenext = true;
                } else {
                    tmpobj.alivenext = false;
                }
            } else {
                if (nalive == 3) {
                    tmpobj.alivenext = true;
                } else {
                    tmpobj.alivenext = false;
                }
            }

        },
        update: function() {
            tmpobj.alive = tmpobj.alivenext;
        }
    };
    return tmpobj;
};
gol.game = function() {
    var tmpobj;
    tmpobj = {
        cells: [],
        //w : img.width,
        w: wcellnum,
        //h : img.height,
        h: hcellnum,
    };
    for (i = 0; i < tmpobj.w; i++) {
        tmpobj.cells[i] = [];
        for (j = 0; j < tmpobj.h; j++) {
            tmpobj.cells[i][j] = new gol.cell();
        }
    }
    function neighborange(j, max) {
        if (j <= 0) {
            return [j, j + 1];
        } else if (j >= max - 1) {
            return [j - 1, j];
        }
        return [j - 1, j + 1, j];
    }
    tmpobj.cells.forEach(function(row, i) {
        row.forEach(function(cell, j) {
            neighborange(i, tmpobj.w).forEach(function(x) {
                neighborange(j, tmpobj.h).forEach(function(y) {
                    if (!(x == i && y == j)) {
                        tmpobj.cells[i][j].neighbors.push(tmpobj.cells[x][y]);
                    }
                })
            })
        })
    });
    return tmpobj;
};
gol.grid = function() {
    "use strict";
    var currgame, htmlelem;
    var tmpobj;
    tmpobj = {
        currgame: null,
        htmlelem: null,
        setup: function(game, elemid) {
            var i, j, dot, n;
            tmpobj.currgame = game;
            tmpobj.htmlelem = document.getElementById(elemid === undefined ? 'yangboard' : elemid);
            console.log("setup the grid");
            for (i = 0; i < tmpobj.currgame.h; i++) {
                for (j = 0; j < tmpobj.currgame.w; j++) {
                    dot = document.createElement('a');
                    //n = tmpobj.currgame.cells[j][i].neighbors.length.toString();
                    //dot.appendChild(document.createTextNode(n));

                    dot.className = "cell";
                    dot.className += (tmpobj.currgame.cells[j][i].alive ? " alive" : " dead");
                    //dot.href = "mygol.html";
                    tmpobj.htmlelem.appendChild(dot);
                    dot = null;
                }
                tmpobj.htmlelem.appendChild(document.createElement('br'));
            }
        },
        remove: function() {
            tmpobj.currgame = null;
            tmpobj.htmlelem = null;
        },
        progress: function() {
            var i, j, currcell;
            for (i = 0; i < tmpobj.currgame.h; i++) {
                for (j = 0; j < tmpobj.currgame.w; j++) {
                    tmpobj.currgame.cells[j][i].getfuture();
                }
            }

            for (i = 0; i < tmpobj.currgame.h; i++) {
                for (j = 0; j < tmpobj.currgame.w; j++) {
                    tmpobj.currgame.cells[j][i].update();
                }
            }


        },
        refresh: function() {
            var i, j, currcells, currcell;
            currcells = document.getElementsByClassName("cell");
            for (i = 0; i < tmpobj.currgame.h; i++) {
                for (j = 0; j < tmpobj.currgame.w; j++) {
                    currcell = currcells[i * tmpobj.currgame.w + j];
                    currcell.className = (tmpobj.currgame.cells[j][i].alive ? "cell alive" : "cell dead");
                    //console.log(currcell);
                    //computationally too intensive. 
                    //$(currcell).animate({backgroundColor: "#000000"});
                }
            }
        }
    };
    console.log(myplayer.currimgnum);
    return tmpobj;
};
function player() {
    "use strict";
    var currgrid, playing, currimgnum;
    var currimgnum = 0;
    var tmpobj = {
        playing: false,
        currgrid: null,
        currimgnum: null,
        setup: function(mygrid) {
            tmpobj.currgrid = mygrid;
        },
        play: function() {
            tmpobj.playing = window.setInterval(function() {
                tmpobj.currgrid.progress();
                tmpobj.currgrid.refresh();
            }, speed);
        },
        stop: function() {
            console.log(tmpobj.currgrid);
            if (tmpobj.playing) {
                window.clearInterval(tmpobj.playing);
            }
        },
        next: function() {
            if (tmpobj.playing) {
                window.clearInterval(tmpobj.playing);
            }
            if (starttimeout != undefined) {
                clearTimeout(starttimeout);
            }
            /*
            console.log("start of next");
            console.log("priginal myplayer.currimgnum: " + tmpobj.currimgnum);
            tmpobj.currimgnum = (tmpobj.currimgnum + 1) % (pngarr.length);
            imgnum = tmpobj.currimgnum;
            console.log(pngarr[tmpobj.currimgnum]);
            document.getElementById("mukto").value = tmpobj.currimgnum;
            console.log(tmpobj.currimgnum + " out of " + pngarr.length);
            
            starttimeout = undefined;
            setupimg(tmpobj.currimgnum);
            console.log("end of next");
            */
           location.reload();
            
        }
    };
    return tmpobj;
}
;
function setupimg(num) {
    console.log("setup img: " + num + " " + myplayer.currimgnum);
    imgarr = getimgarr(img, num);
    console.log("gotimage");
    //muktogame.init();
    transferimg(muktogame, imgarr);
    //golgrid.init();
    golgrid.setup(muktogame);
    myplayer.setup(golgrid);
    positiongrid();
    starttimeout = setTimeout(function() {
        myplayer.play();
    }, initpause);
    console.log("end of setup img");
}
;
function initrun() {
   // if (!sessionStorage['done']) {
     //   console.log("first load");
        sessionStorage['done'] = 'yes';
        myplayer = new player();
        myplayer.currimgnum = imgnum;
        console.log("init run: " + imgnum);
        imgarr = getimgarr(img, myplayer.currimgnum);
        golgrid = new gol.grid();
        muktogame = new gol.game();
        transferimg(muktogame, imgarr);
        golgrid.setup(muktogame);
        myplayer.setup(golgrid);
        positiongrid();
        starttimeout = setTimeout(function() {
            myplayer.play();
        }, initpause);
  //  }
    
//["a", "b", "c"].forEach(function(alphabet, ind){console.log(ind + ":" + alphabet);});

//document.getElementById("debug").innerHTML += "<br>debug begins. <br>";

//positiongrid();
}
;
function positiongrid() {
    g = document.getElementById("centerboard");
    cellh = document.getElementsByClassName("cell")[0].offsetHeight;
    //totalw = cellh * (img.width + 2);
    totalw = cellh * (wcellnum);
    //totalh = cellh*img.height ;
    g.style.width = totalw + "px";
    //g.style.height = totalh + "px";
    g.style.marginLeft = "auto";
    g.style.marginRight = "auto";
}
;
