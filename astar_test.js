var arry = new Array(10); //맵 배열 
var openlist_v = [];  // 8방위 값 저장할 배열
var openlist_x = [];  // 8방위 값의 배열 인덱스 x 좌표
var openlist_y = [];  // 8방위 값의 배열 인덱스 y 좌표
var min = 100;
var pox, poy, pov;
var temp;
////////////// 맵을 2차원 배열로 만듬
for (var im = 0; im < arry.length; im++) {
    arry[im] = new Array(10);
}
function insert(result, x, y) {
    //if (openlist_v.indexOf(result, 0) != -1) {
    //    result += 0.5;    //해결 해야 할 부분 값을 더하는것 말고 다른 방법 모색.
    //}
    this.result = result;
    this.x = x;
    this.y = y;
    console.log(x + "x");
    console.log(y + "y");
    openlist_v.push(result);
    openlist_x.push(x);
    console.log(openlist_x);
    openlist_y.push(y);
    console.log(openlist_y);
    //console.log(openlist_x.shift()+","+openlist_y.shift()+"insert");
}
// 최소값을 찾아내기 위함
function mini() {
    console.log(openlist_v[0] + "최소값");
    for (var i = 0; i < openlist_v.length; i++) {
        if (openlist_v[i] < min) {
            min = openlist_v[i];
            console.log(min + " " + "min값")
            temp;
            ////////////////////// 값 변환 //////////////////////
            console.log(openlist_v[0] + "openlist_v[0]" + "1")
            temp = openlist_v[0];
            console.log(temp + "temp" + "1");
            openlist_v[0] = openlist_v[i];
            openlist_v[i] = temp;
            min = openlist_v[0];
            /////////////////////////////////////////////////
            console.log(openlist_v[1] + "openlist[1]" + " 1 ")
            temp = openlist_x[0];
            console.log(temp + "openlist_x temp"+ "2");
            openlist_x[0] = openlist_x[i];
            console.log(openlist_x[0] + "openlist_x[0]" + "2");
            openlist_x[i] = temp;
            console.log(openlist_x[1] + "openlist_x[1]" + "2");
            //////////////////////////////////////////////////////////////
            console.log(temp + " 2222");
            console.log(min + "2222");
            ///////////////////////////////////////////////////

            temp = openlist_y[0];
            openlist_y[0] = openlist_y[i];
            openlist_y[i] = temp;

            console.log(temp + "3");
            console.log(min + " 4");

            //console.log(openlist_x.shift() + "," + openlist_y.shift() +" "+ "mini 1");
        }
    }
    //console.log(openlist_x.shift() + "," + openlist_y.shift() +" "+ "mini 2");
}
function movement() {
    pov = openlist_v.shift();
    console.log(pov + " " + "pov");
    pox = openlist_x.shift();
    poy = openlist_y.shift();
    //console.log(openlist_x.shift() + "," + openlist_y.shift() + "movement");
    arry[pox][poy] = 1;
}

search = function () {

    ///////////////초기화///////////////////////
    search.prototype.init = function () {
        for (var i = 0; i < arry.length; i++) {
            for (var j = 0; j < arry[i].length; j++) {
                arry[i][j] = 0;
            }
        }
        //////////////////// 벽 난수 생성///////////////////////
        for (var i = 0; i < arry.length; i++) {
            a = Math.round(Math.random() * 9);
            b = Math.round(Math.random() * 9);
            arry[a][b] = 2;
        }
        arry[0][0] = 1;

    };
    ////////////////////////출력//////////////////////////////
    search.prototype.print = function () {

        for (var i = 0; i < arry.length; i++) {
            for (var j = 0; j < arry[i].length; j++) {
                document.write(arry[i][j] + ' ');
            }
            document.write('<br >');
        }

    };
    /////////////////////// 이동함수 ///////////////////////
    search.prototype.move = function () {
        var result;

        for (var i = 0; i < arry.length; i++) {
            for (var j = 0; j < arry[i].length; j++) {
                /*
                *arry를 검색해서 i,j값 찾기
                 */
                if (arry[i][j] == 1) { //arry[i][j] 가 1이면 8방위에 대해서 값 계산
                    arry[i][j] = 'a'; // 값이 1이였던 곳을 a로 바꿈 (지나온 길을 의미)
                                      // 만약 2이면 넘어감 (2는 벽)
                    if ((i + 1) <= arry.length-1) {
                        if (arry[i + 1][j] != 2 && arry[i + 1][j] !== 'a') {
                            result = Math.abs(i + 1 - i) + Math.abs(9 - (i + 1)) + Math.abs(9 - j); //동
                            arry[i + 1][j] = result;
                            console.log((i + 1) + " i값");
                            console.log((j) + "j+1값");
                            insert(result, (i + 1), j);
                        }
                    }
                    if ((j + 1) <= arry[i].length-1) {
                        if (arry[i][j + 1] != 2 && arry[i][j + 1] !== 'a') {
                            result = Math.abs((j + 1) - j) + Math.abs(9 - i) + Math.abs(9 - (j + 1)); //남
                            arry[i][j + 1] = result;
                            console.log(i + " i값");
                            console.log((j + 1) + "j+1값");
                            insert(result, i, (j + 1));
                        }
                    }
                    if ((i - 1) >= 0) {
                        if (arry[i - 1][j] != 2 && arry[i - 1][j] !== 'a') {
                            result = Math.abs((i - 1) - i) + Math.abs((9 - i) - 1) + Math.abs(9 - j); //서
                            arry[i - 1][j] = result;
                            console.log((i - 1) + " i값");
                            console.log((j) + "j+1값");
                            insert(result, (i - 1), j);
                        }
                    }
                   
                    if ((j - 1) >= 0) {
                        if (arry[i][j - 1] != 2 && arry[i][j - 1] !== 'a') {
                            result = Math.abs((j - 1) - j) + Math.abs(9 - i) + Math.abs(9 - (j - 1)); //북
                            arry[i][j - 1] = result;
                            console.log(i + " i값");
                            console.log((j - 1) + "j+1값");
                            insert(result, i, (j - 1));
                        }
                    }
                    
                    
                    
                    //////////////////////////////// 대 각 선 //////////////////////////////////////////
                    // 서남
                    if ((i - 1) >= 0 && (j + 1) <= arry[i].length -1) {
                        if (arry[i - 1][j + 1] != 2 && arry[i - 1][j + 1] !== 'a') {
                            result = (Math.sqrt(Math.pow(((i - 1) - i), 2) + Math.pow(((j + 1) - j), 2))) + Math.abs(9 - (i - 1)) + Math.abs(9 - (j + 1));
                            arry[i - 1][j + 1] = result;
                            insert(result, (i - 1), (j + 1));
                        }
                    }
                    // 서북
                    if ((i - 1) >= 0 && (j - 1) >= 0) {
                        if (arry[i - 1][j - 1] != 2 && arry[i - 1][j - 1] !== 'a') {
                            result = (Math.sqrt(Math.pow(((i - 1) - i), 2) + Math.pow(((j - 1) - j), 2))) + Math.abs(9 - (i - 1)) + Math.abs(9 - (j - 1));
                            arry[i - 1][j - 1] = result;
                            insert(result, (i - 1), (j - 1));
                        }
                    }
                    // 동북
                    if ((i + 1) <= arry.length-1 && (j - 1) >= 0) {
                        if (arry[i + 1][j - 1] != 2 && arry[i + 1][j - 1] !== 'a') {
                            result = (Math.sqrt(Math.pow(((i + 1) - i), 2) + Math.pow(((j - 1) - j), 2))) + Math.abs(9 - (i + 1)) + Math.abs(9 - (j - 1));
                            arry[i + 1][j - 1] = result;
                            insert(result, (i + 1), (j - 1));
                        }
                    }
                    // 동남
                    if ((i + 1) <= arry.length-1 && (j + 1) <= arry[i].length-1) {
                        if (arry[i + 1][j + 1] != 2 && arry[i + 1][j + 1] !== 'a') {
                            result = (Math.sqrt(Math.pow(((i + 1) - i), 2) + Math.pow(((j + 1) - j), 2))) + Math.abs(9 - (i + 1)) + Math.abs(9 - (j + 1));
                            arry[i + 1][j + 1] = result;
                            insert(result, (i + 1), (j + 1));
                        }
                    }
                    mini();   ///최소값 을 openlist들의 0번째 인덱스로 넣음
                    console.log(openlist_v[0] + " " + "mini 종료");
                   
                }//if문 종료 ( 1인 값 찾기)
                
               
            } //for문 종료
        } //for문 종료
        console.log(openlist_x[0] + " " + "openlist_x move");
        console.log(openlist_y[0] + " " + "openlist_x move");
        movement();  // openlist의 0번째 값을 꺼내서 그곳으로 이동할 준비를 함.
        
    }
};

Path = new search();
Path.init();
Path.print();
document.write("<br>");
document.write("<br>");


for (var i = 0; i < 100; i++) {
    Path.move();
    console.log(i + 1 + " " + "반복횟수");
    if (arry[9][9] === 'a') {
        break;
    }
   
}
Path.print();