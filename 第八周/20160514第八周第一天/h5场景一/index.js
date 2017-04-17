/*
 * h5������������:
 * 1.�������������(����background-size:coverԭ��)
 * 2.��ÿ��li��touchstart,touchmove,touchend�¼�
 * 3.�������»�����Ч��
 * 4.����Ч����ɺ�����css3����Ч��
 * */
/*
 background-size:cover��ԭ��
 ������(�豸��)/������(�豸��)<����ͼ��(��Ƹ��)/����ͼ��(��Ƹ��)ʱ ���ո�������
 ����ֵ = �����ĸ�/����ͼ�ĸ�
 ������(�豸��)/������(�豸��)>����ͼ��(��Ƹ��)/����ͼ��(��Ƹ��)ʱ ���տ�������
 ����ֵ = �����Ŀ�/����ͼ�Ŀ�*/
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#main>ul>li");
var winW = document.documentElement.clientWidth;
/*�豸�Ŀ�*/
var winH = document.documentElement.clientHeight;
/*�豸�ĸ�*/
var desW = 640;
/*��Ƹ�Ŀ�*/
var desH = 960;
/*��Ƹ�ĸ�*/
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
//1.��¼����ʱ����,�ƶ�ʱ����,�ó��ƶ��ľ���,�����ƶ��ľ����жϳ������ķ���
//2.�����һ��������һ��������,�����������ж�
//3.�������»����ľ���
function start(e) {
    this.startY = e.changedTouches[0].pageY;

}
function move(e){
    console.log(this);
    this.flag = true;//����ǵ�����ǻ���,���ᴥ��touchmove�¼�
    e.preventDefault();
    var moveY = e.changedTouches[0].pageY;
    var movePos = moveY - this.startY;
    var index = this.index;
    [].forEach.call(oLis, function (){
        if (arguments[1] != index) {//��������,���е�li������
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";//������li���������
        arguments[0].firstElementChild.id = "";//����ʱ��li�µĵ�һ����Ԫ�ص�id�����
    })//�����Լ�������liȫ������
    if (movePos > 0) {/*�»�*/
        this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
        var duration = -winH + movePos;//winH���Լ�������õ�,����д480����
    } else if (movePos < 0) {/*�ϻ�*/
        this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
        var duration = winH + movePos;
    }
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
    //����ǰ��һ��
    //���ŵı��� = 1- �ƶ��ľ���/�豸�ĸ߶�
    oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(movePos) / winH * 1 / 2) + ") translate(0," + movePos + "px)";

}
function end(e) {
    if (this.flag) {
        //�ص�ԭʼ���λ��
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";//�൱����������Ļ���
            this.firstElementChild.id = "a" + this.index;
        });
        this.flag = false;
    }

}








