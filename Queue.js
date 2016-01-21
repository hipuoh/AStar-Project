var Queue = function () {
    function Que(QArray){
        this.respository = QArray || [];
    }
    Que.prototype.EnQueue = function (EnData) {
        this.respository.push(EnData);
    };
    Que.prototype.DeQueue = function () {
        if(this.respository.length == 0){
            return ;
        }
        return this.respository.slice(1);

    };
};
/**
 * Created by okm on 2016-01-21.
 */
