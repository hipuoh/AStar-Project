var myarry = new Array(10);
var copyer = new Array(10);
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        myarry[i] = new Array(10);
        copyer[i] = new Array(10);
        myarry[i][j] = 0;
        copyer[i][j] = 0;
    }
}
var astat = function () {
    var huri = function (a,b,c,d) { //휴리스틱 계산(유클리디안)
        var x = math.pow( (c - a), 2);
        var y = math.pow( (d - b), 2);
        var z = math.sqrt((x+y));
        return math.round(z);
    };
    var print_array = function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                document.write(myarry[i][j] + ' ');
            }
            document.write('<br>');
        }
    };
    var setposition = function () {
        myarry[0][0] = 1;
        myarry[9][9] = 2;
        return myarry;
    };
    var getposition = function () {
        for (var i = 0; i < myarry.length; i++) {
            for (var j = 0; j < myarry[i].length; j++) {
                if (myarry[i][j] == 1) {
                    return [i, j];
                }
            }
        }
    };
    var cal = function () {
        var copyer = [];

        var west = function (x, y) { //서쪽
            x = this.x;
            y = this.y;
            return (x - 1) + huri(x - 1, y, a, b);
        };
        var east = function (x, y) {
            x = this.x;
            y = this.y;
            return (x+1) + huri(x+1,y,a,b);
        };
        var north = function (x, y)
        {
            x = this.x;
            y = this.y;
            return (y+1) + huri(x,y+1,a,b);
        };
        var south = function (x, y) {
            x = this.x;
            y = this.y;
            return (y-1) + huri(x,y-1,a,b);
        };
        /************************** diagonal ************************************/
        var nw = function (x, y) {
            x = this.x;
            y = this.y;
            return ;
        }
    };
}


