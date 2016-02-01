var openlist_v = [];  // 8방위 값 저장할 배열
var openlist_x = [];  // 8방위 값의 배열 인덱스 x 좌표
var openlist_y = [];  // 8방위 값의 배열 인덱스 y 좌표
var min = 999999999999999;
var pox, poy, pov;
var temp;
///////////////////////////// html 값 가져오기 //////////////////////////
var map_x;// = document.getElementById('Map_X').value;
var map_y;// = document.getElementById('Map_Y').value;

var end_x;// = document.getElementById('End_X').value;
var end_y;// = document.getElementById('End_Y').value;

var start_x;// = document.getElementById('Start_X').value;
var start_y;// = document.getElementById('Start_Y').value;

var wall_complex;
/////////////////////////////////////////////////////////////////////////
var arry;
////////////////////////////// html 이벤트 처리 ///////////////////////
var button_map = document.getElementById('MapButton');
button_map.addEventListener('click', function () {
    //alert("test");
    map_x = document.getElementById('Map_X').value;
    map_y = document.getElementById('Map_Y').value;

    end_x = document.getElementById('End_X').value;
    end_y = document.getElementById('End_Y').value;

    start_x = document.getElementById('Start_X').value;
    start_y = document.getElementById('Start_Y').value;

    wall_complex = document.getElementById('wall_complexity').value;
    if (map_x === 0 || map_y === 0) {
        alert("map의 크기가 너무 작습니다");
        return;
    }
    //if (end_x <= map_x || end_y <= map_y)
    //{
    //    alert("찾는지점이 맵의 크기를 벗어 났습니다.");
    //    return;
    //}
    //if(start_x >= map_x || start_y >= map_y){
    //    alert("시작지점이 맵의 크기를 벗어 났습니다.");
    //    return;
    //}
    arry = [];
    create_array();
    Path = new search();
    Path.init();
    //Path.print();
    Path.move();
    Path.print();
   

}, false);
/////////////////////////////////////////////////////////////////////////
function create_array() {
    for (var i = 0; i < map_x; i++) {
        arry[i] = [];
    }
} //맵 배열
////////////// 맵을 2차원 배열로 만듬 ////////////



search = function () {
    /////////////////// 맵 초기화 /////////////////////////////
    search.prototype.init = function () {
        for (var i = 0; i < map_x; i++) {
            for (var j = 0; j < map_y; j++) {
                arry[i][j] = 0;
            }
        }
        //////////////////// 벽 난수 생성///////////////////////
        var Complexity = (map_x * map_y) / wall_complex;
        for (var i = 0; i < Complexity; i++) {
            a = Math.floor(Math.random() * map_x);
            b = Math.floor(Math.random() * map_y);
            if (a !== end_x && b !== end_y) {
                arry[a][b] = 'wall';
            }

        }
        /////////////// 시작점 설정 /////////////////////////////
        arry[start_x][start_y] = 'start';

    };
    function insert(result, x, y) {
        openlist_v.push(result);
        openlist_x.push(x);
        openlist_y.push(y);
    }

    // 최소값을 찾아내기 위함
    function minimum() {
        for (var i = 0; i < openlist_v.length; i++) {
            if (openlist_v[i] < min) {
                min = openlist_v[i];
                temp;
                ////////////////////// 값 변환 //////////////////////
                temp = openlist_v[0];
                openlist_v[0] = openlist_v[i];
                openlist_v[i] = temp;
                min = openlist_v[0];
                /////////////////////////////////////////////////  x좌표 
                temp = openlist_x[0];
                openlist_x[0] = openlist_x[i];
                openlist_x[i] = temp;
                //////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////  y 좌표
                temp = openlist_y[0];
                openlist_y[0] = openlist_y[i];
                openlist_y[i] = temp;
            }
        }
    }
    function movement() {
        pov = openlist_v.shift();
        pox = openlist_x.shift();
        poy = openlist_y.shift();
        if (pox === end_x && poy === end_y) {
            arry[pox][poy] = 'End';
            return;

        }
        else if (arry[pox][poy] === 'path') {
            arry[pox][poy] = 0;
        }
        else {
            arry[pox][poy] = 'start';
        }

        console.log("실제 이동" + pox + " , " + poy + "pox , poy 값");
    }

    ///////////////     초기화   //////////////////////////
    
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
                if (arry[i][j] === 'start') { //arry[i][j] 가 1이면 8방위에 대해서 값 계산
                    arry[i][j] = 'path'; // 값이 start이였던 곳을 path로 바꿈 (지나온 길을 의미)
                    // 만약 2이면 넘어감 (2는 벽)
                    if ((i + 1) <= arry.length - 1) {
                        if (arry[i + 1][j] !== 'wall' && arry[i + 1][j] !== 'path') {
                            result = Math.abs(i + 1 - i) + Math.abs(end_x - (i + 1)) + Math.abs(end_y - j); //동
                            arry[i + 1][j] = result;
                            insert(result, (i + 1), j);
                        }
                    }
                    if ((j + 1) <= arry[i].length - 1) {
                        if (arry[i][j + 1] !== 'wall' && arry[i][j + 1] !== 'path') {
                            result = Math.abs((j + 1) - j) + Math.abs(end_x - i) + Math.abs(end_y - (j + 1)); //남
                            arry[i][j + 1] = result;
                            insert(result, i, (j + 1));
                        }
                    }
                    if ((i - 1) >= 0) {
                        if (arry[i - 1][j] !== 'wall' && arry[i - 1][j] !== 'path') {
                            result = Math.abs((i - 1) - i) + Math.abs((end_x - i) - 1) + Math.abs(end_y - j); //서
                            arry[i - 1][j] = result;
                            insert(result, (i - 1), j);
                        }
                    }

                    if ((j - 1) >= 0) {
                        if (arry[i][j - 1] !== 'wall' && arry[i][j - 1] !== 'path') {
                            result = Math.abs((j - 1) - j) + Math.abs(end_x - i) + Math.abs(end_y - (j - 1)); //북
                            arry[i][j - 1] = result;
                            insert(result, i, (j - 1));
                        }
                    }
                    //////////////////////////////// 대 각 선 //////////////////////////////////////////
                    //서남
                    if ((i - 1) >= 0 && (j + 1) <= arry[i].length - 1) {
                        if (arry[i - 1][j + 1] !== 'wall' && arry[i - 1][j + 1] !== 'path') {
                            result = (Math.sqrt(Math.pow(((i - 1) - i), 2) + Math.pow(((j + 1) - j), 2))) + Math.abs(end_x - (i - 1)) + Math.abs(end_y - (j + 1));
                            arry[i - 1][j + 1] = result;
                            insert(result, (i - 1), (j + 1));
                        }
                    }
                    //서북
                    if ((i - 1) >= 0 && (j - 1) >= 0) {
                        if (arry[i - 1][j - 1] !== 'wall' && arry[i - 1][j - 1] !== 'path') {
                            result = (Math.sqrt(Math.pow(((i - 1) - i), 2) + Math.pow(((j - 1) - j), 2))) + Math.abs(end_x - (i - 1)) + Math.abs(end_y - (j - 1));
                            arry[i - 1][j - 1] = result;
                            insert(result, (i - 1), (j - 1));
                        }
                    }
                    //동북
                    if ((i + 1) <= arry.length - 1 && (j - 1) >= 0) {
                        if (arry[i + 1][j - 1] !== 'wall' && arry[i + 1][j - 1] !== 'path') {
                            result = (Math.sqrt(Math.pow(((i + 1) - i), 2) + Math.pow(((j - 1) - j), 2))) + Math.abs(end_x - (i + 1)) + Math.abs(end_y - (j - 1));
                            arry[i + 1][j - 1] = result;
                            insert(result, (i + 1), (j - 1));
                        }
                    }
                    // 동남
                    if ((i + 1) <= arry.length - 1 && (j + 1) <= arry[i].length - 1) {
                        if (arry[i + 1][j + 1] !== 'wall' && arry[i + 1][j + 1] !== 'path') {
                            result = (Math.sqrt(Math.pow(((i + 1) - i), 2) + Math.pow(((j + 1) - j), 2))) + Math.abs(end_x - (i + 1)) + Math.abs(end_y - (j + 1));
                            arry[i + 1][j + 1] = result;
                            insert(result, (i + 1), (j + 1));
                        }
                    }
                    
                    minimum();   ///최소값 을 openlist들의 0번째 인덱스로 넣음
                    movement();  // openlist의 0번째 값을 꺼내서 그곳으로 이동할 준비를 함.
                }//if문 종료 ( 1인 값 찾기)
            } //for문 종료
        } //for문 종료
       
    }
};

//Path.print();
document.write("<br>");
document.write("<br>");


//while (true) {
//    if (arry[end_x][end_y] === 'End') {
//        break;
//    }
//    Path.move();
//}
//Path.print();