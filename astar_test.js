var openlist_v = [];  // 8방위 값 저장할 배열
var openlist_x = [];  // 8방위 값의 배열 인덱스 x 좌표
var openlist_y = [];  // 8방위 값의 배열 인덱스 y 좌표
var pathlist_x = [];
var pathlist_y = [];
var min; //"max";
var pox, poy, pov;
var temp;
var Path;
var icount = 0;
var mcount = 0;

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
var point_x;
var point_y;
////////////////////////////// html 이벤트 처리 ///////////////////////
//$('MapButton').click(function () {
//    map_x = $('#Map_X');
//    map_y = $('#Map_Y');

//    end_x = $('#End_X');
//    end_y = $('#End_Y');

//    start_x = $('#Start_X');
//    start_y = $('#Start_Y');
//    wall_complex = $('#wall_complexity');

//    arry = [];
//    create_array();
//    Path = new search();
//    Path.init();

//},false);
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
    arry = [];
    create_array();
    Path = new search();
    Path.init();
    Path.move();


    //Path.print();
}, false);
//var create_map = document.getElementById('MapCreate');

$('#MapCreate').click(function () {
    //for (var i = 0; i < $('#Table_body').length; i++) {
    //    $('#Table_body').deleteRow(1);
    //}
    var contents = '';
    var temp;
    for (var i = 0; i < map_y; i++) {
        contents += '<tr>';
        for (var j = 0; j < map_x; j++) {
            temp = arry[j][i];
            switch (temp) {
                case 'path':
                    contents += "<td class='td_path'>" + "</td>";
                    break;
                case "wall":
                    contents += "<td class='td_wall'>" + "</td>";
                    break;
                case 0:
                    contents += "<td class='td_0'>" + "</td>";
                    break;
                case "End":
                    contents += "<td class='td_end'>" + "</td>";
                    break;
                case "search":
                    contents += "<td class='td_search'>" + "</td>";
                    break;
                default:
                    contents += "<td class='td_de'>" + "</td>";
                    break;
            }
            //contents += "<td>" + arry[i][j] + "</td>";
        }
        contents += '</tr>'

    }

    $('#Table_body').append(contents);
});
/////////////////////////////////////////////////////////////////////////
function create_array() {

    for (var i = 0; i < map_x; i++) {
        arry[i] = [];
    }
}
//맵 배열
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
        var Complexity = (map_x * map_y) * (wall_complex / 100);
        for (var ia = 0; ia < Complexity; ia++) {
            var ax = Math.floor(Math.random() * map_x);
            var bx = Math.floor(Math.random() * map_y);
            if (ax == end_x && bx == end_y) {
                return;
            }
            else {
                arry[ax][bx] = 'wall';
            }

        }
        /////////////// 시작점 설정 /////////////////////////////
        arry[start_x][start_y] = 'start';
        arry[end_x][end_y] = 'End';
        openlist_x.push(start_x);
        openlist_y.push(start_y);
    };

    function insert(result, x, y) {
        // console.log(openlist_x.length);
        if (x == end_x) {
            if (y == end_y) {
                arry[x][y] = 'End';
            }
        }
        for (var is = 0; is < openlist_x.length; is++) {
            if (openlist_x[is] == x) {
                if (openlist_y[is] == y) {
                    //if(openlist_v[is] )
                    openlist_v.splice(is, 0);
                    openlist_x.splice(is, 0);
                    openlist_y.splice(is, 0);

                    openlist_v.unshift(result);
                    openlist_x.unshift(x);
                    openlist_y.unshift(y);
                    
                    break;
                }
            }
            else {
                openlist_v.unshift(result);
                openlist_x.unshift(x);
                openlist_y.unshift(y);
                
                break;
            }
        }
        icount++;
        //cnt += 1;
        //console.log('저장된 값 : ' +openlist_x);
        if (x == end_x) {
            if (y == end_y) {
                arry[x][y] = "End";
            }
        }
        else {
            arry[x][y] = 'search';
        }
    }

    // 최소값을 찾아내기 위함
    function sort() {
        // console.log(" 미니 접속 openlist_v 길이 : " + openlist_v.length);
        //console.log("미니 오픈리스트 : " + openlist_v);
        //min = openlist_v[0];
        for (var ix = 0; ix < openlist_v.length; ix++) {
            for (var j = 0; j < openlist_v.length - 1; j++) {
                if (openlist_v[j] > openlist_v[j + 1]) {

                    temp = openlist_v[j];
                    openlist_v[j] = openlist_v[j + 1];
                    openlist_v[j + 1] = temp;
                    /////////////////////////////////////////////////  x좌표
                    temp = openlist_x[j];
                    openlist_x[j] = openlist_x[j + 1];
                    openlist_x[j + 1] = temp;
                    //////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////  y 좌표
                    temp = openlist_y[j];
                    openlist_y[j] = openlist_y[j + 1];
                    openlist_y[j + 1] = temp;

                }
            }
        }
        //min = openlist_v[1];
        pathlist_x.unshift(openlist_x[0]);
        pathlist_y.unshift(openlist_y[0]);
       // arry[openlist_x[0]][openlist_y[0]] = 'path';
    }
    function movement() {
        console.log("이동 좌표 : " + openlist_x[0] + " , " + openlist_y[0]);
        sort();
        pov = openlist_v.shift();
        pox = openlist_x.shift();
        poy = openlist_y.shift();
        arry[pox][poy] = "path";
        //arry[pox][poy] = 'path';
        //if (arry[pox][poy] === 'End') {
        //    return false;
        //    //return;

        //}
        //else if (arry[pox][poy] === 'path') {
        //    arry[pox][poy] = 0;
        //}
        //else {
        //    arry[pox][poy] = 'start';
        //}
        mcount++;

    }
    /////////////////////// 이동함수 ///////////////////////
    search.prototype.move = function () {
        var result;
        var idx = +start_x;
        var jdx = +start_y;
        var count = 1;
        while (true) {
            point_x = idx;
            point_y = jdx;
            //arry[point_x][point_y] = 'path';
            if (arry[point_x][point_y] !== 'End') {
                if ((point_x + 1) <= (map_x - 1)) {
                    if (arry[point_x + 1][point_y] != 'wall' && arry[point_x + 1][point_y] != 'path') {
                        result = Math.abs(point_x + 1 - start_x) + Math.abs(point_y - start_y) + Math.abs(end_x - (point_x + 1)) + Math.abs(end_y - (point_y)); //동
                        arry[point_x + 1][point_y] = result;
                        insert(result, (point_x + 1), point_y);
                    }
                    idx = point_x++;
                }
                if ((point_y + 1) <= (map_y - 1)) {
                    if (arry[point_x][point_y + 1] !== 'wall' && arry[point_x][point_y + 1] !== 'path') {
                        result = Math.abs(point_x - start_x) + Math.abs(point_y + 1 - start_y) + Math.abs(end_x - point_x) + Math.abs(end_y - (point_y + 1)); //남
                        arry[point_x][point_y + 1] = result;
                        insert(result, point_x, (point_y + 1));
                    }
                    jdx = point_y++;
                }
                if ((point_x - 1) >= 0) {
                    if (arry[point_x - 1][point_y] !== 'wall' && arry[point_x - 1][point_y] !== 'path') {
                        result = Math.abs(point_x - 1 + start_x) + Math.abs(point_y - start_y) + Math.abs((end_x - point_x) - 1) + Math.abs(end_y - point_y); //서
                        arry[point_x - 1][point_y] = result;
                        insert(result, (point_x - 1), point_y);
                    }
                    idx = point_x--;
                }

                if ((point_y - 1) >= 0) {
                    if (arry[point_x][point_y - 1] !== 'wall' && arry[point_x][point_y - 1] !== 'path') {
                        result = Math.abs(point_x - start_x) + Math.abs(point_y - 1 - start_y) + Math.abs(end_x - point_x) + Math.abs(end_y - (point_y - 1)); //북
                        arry[point_x][point_y - 1] = result;
                        insert(result, point_x, (point_y - 1));
                    }
                    jdx = point_y--;
                }
                
            }
            
            if (idx == end_x) {
                if (jdx == end_y) {
                    break;
                }
            }
            movement();  // openlist의 0번째 값을 꺼내서 그곳으로 이동할 준비를 함.
            count++;
            //if (count == 10) {
            //    console.log(count);
            //    console.log(icount);
            //    console.log(mcount);
            //    break;
            //}


        }
        //for (var idx = 0; idx < arry.length; idx++) {
        //    for (var jdx = 0; jdx < arry[idx].length; jdx++) {
        //        if (arry[idx][jdx] === 'start') { //arry[i][jdx] 가 1이면 8방위에 대해서 값 계산
        //            console.log("현재 좌표 : " + idx + " , " + jdx);
        //            // 값이 start이였던 곳을 path로 바꿈 (지나온 길을 의미)
        //            arry[idx][jdx] = 'path';
        //            //console.log(end_x + "," + end_y + "end");
        //            if (idx == end_x) {
        //                if (jdx == end_y) {
        //                    arry[idx][jdx] = 'End';
        //                    break;
        //                }

        //            }

        //            // 만약 2이면 넘어감 (2는 벽)
        //            if ((idx + 1) <= (map_x - 1)) {
        //                if (arry[idx + 1][jdx] !== 'wall' && arry[idx + 1][jdx] !== 'path') {
        //                    result = Math.abs(idx +1 - start_x) + Math.abs(jdx-start_y) + Math.abs(end_x - (idx + 1)) + Math.abs(end_y - jdx); //동
        //                    arry[idx + 1][jdx] = result;
        //                    insert(result, (idx + 1), jdx);
        //                }
        //            }
        //            if ((jdx + 1) <= (map_y - 1)) {
        //                if (arry[idx][jdx + 1] !== 'wall' && arry[idx][jdx + 1] !== 'path') {
        //                    result = Math.abs(idx - start_x) + Math.abs(jdx + 1 - start_y) + Math.abs(end_x - idx) + Math.abs(end_y - (jdx + 1)); //남
        //                    arry[idx][jdx + 1] = result;
        //                    insert(result, idx, (jdx + 1));
        //                }
        //            }
        //            if ((idx - 1) >= 0) {
        //                if (arry[idx - 1][jdx] !== 'wall' && arry[idx - 1][jdx] !== 'path') {
        //                    result = Math.abs(idx - 1 + start_x) + Math.abs(jdx - start_y) +Math.abs((end_x - idx) - 1) + Math.abs(end_y - jdx); //서
        //                    arry[idx - 1][jdx] = result;
        //                    insert(result, (idx - 1), jdx);
        //                }
        //            }

        //            if ((jdx - 1) >= 0) {
        //                if (arry[idx][jdx - 1] !== 'wall' && arry[idx][jdx - 1] !== 'path') {
        //                    result = Math.abs(idx-start_x) + Math.abs(jdx -1 - start_y) + Math.abs(end_x - idx) + Math.abs(end_y - (jdx - 1)); //북
        //                    arry[idx][jdx - 1] = result;
        //                    insert(result, idx, (jdx - 1));
        //                }
        //            }
        ////////////////////////////////// 대 각 선 //////////////////////////////////////////
        //////서남
        //if ((idx - 1) >= 0 && (jdx + 1) <= (map_y - 1)) {
        //    if (arry[idx - 1][jdx + 1] !== 'wall' && arry[idx - 1][jdx + 1] !== 'path') {
        //        result = (Math.sqrt(Math.pow(((idx - 1) - start_x), 2) + Math.pow(((jdx + 1) - start_y), 2))) + Math.abs(end_x - (idx - 1)) + Math.abs(end_y - (jdx + 1));
        //        arry[idx - 1][jdx + 1] = result;
        //        insert(result, (idx - 1), (jdx + 1));
        //    }
        //}
        ////서북
        //if ((idx - 1) >= 0 && (jdx - 1) >= 0) {
        //    if (arry[idx - 1][jdx - 1] !== 'wall' && arry[idx - 1][jdx - 1] !== 'path') {
        //        result = (Math.sqrt(Math.pow(((idx - 1) - start_x), 2) + Math.pow(((jdx - 1) - start_y), 2))) + Math.abs(end_x - (idx - 1)) + Math.abs(end_y - (jdx - 1));
        //        arry[idx - 1][jdx - 1] = result;
        //        insert(result, (idx - 1), (jdx - 1));
        //    }
        //}
        ////동북
        //if ((idx + 1) <= (map_x - 1) && (jdx - 1) >= 0) {
        //    if (arry[idx + 1][jdx - 1] !== 'wall' && arry[idx + 1][jdx - 1] !== 'path') {
        //        result = (Math.sqrt(Math.pow(((idx + 1) - start_x), 2) + Math.pow(((jdx - 1) - start_y), 2))) + Math.abs(end_x - (idx + 1)) + Math.abs(end_y - (jdx - 1));
        //        arry[idx + 1][jdx - 1] = result;
        //        insert(result, (idx + 1), (jdx - 1));
        //    }
        //}
        //// 동남
        //if ((idx + 1) <= (map_x - 1) && (jdx + 1) <= (map_y - 1)) {
        //    if (arry[idx + 1][jdx + 1] !== 'wall' && arry[idx + 1][jdx + 1] !== 'path') {
        //        result = (Math.sqrt(Math.pow(((idx + 1) - start_x), 2) + Math.pow(((jdx + 1) - start_y), 2))) + Math.abs(end_x - (idx + 1)) + Math.abs(end_y - (jdx + 1));
        //        arry[idx + 1][jdx + 1] = result;
        //        insert(result, (idx + 1), (jdx + 1));
        //   }
        //}
        //console.log(arry[idx][jdx]);
        //            minimum();   ///최소값 을 openlist들의 0번째 인덱스로 넣음
        //            movement();  // openlist의 0번째 값을 꺼내서 그곳으로 이동할 준비를 함.
        //        }//if문 종료 ( 1인 값 찾기)

        //    } //for문 종료
        //} //for문 종료

    }
};
