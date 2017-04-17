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
var winW = document.documentElement.clientWidth;/*�豸�Ŀ�*/
var winH = document.documentElement.clientHeight;/*�豸�ĸ�*/
var desW = 640;/*��Ƹ�Ŀ�*/
var desH = 960;/*��Ƹ�ĸ�*/
if(winW/winH <= desW/desH){
    main.style.webkitTransform = "scale("+winH/desH+")";
}else{
    main.style.webkitTransform = "scale("+winW/desW+")";
}

[].forEach.call(oLis,function(){
  var oLi = arguments[0];
 oLi.index = arguments[1];
 oLi.addEventListener("touchstart",start,false);
 oLi.addEventListener("touchmove",move,false);
 oLi.addEventListener("touchend",end,false);
});
//1.��¼����ʱ����,�ƶ�ʱ����,�ó��ƶ��ľ���,�����ƶ��ľ����жϳ������ķ���
//2.�����һ��������һ��������,�����������ж�
//3.�������»����ľ���
function start(e){
   this.startY = e.changedTouches[0].pageY;
}
function move(e){
  var moveY = e.changedTouches[0].pageY;
  var movePos = moveY - this.startY;
  var index = this.index;
  if(movePos>0){/*�»�*/
   this.prevsIndex = index == oLis.length - 1 ? 0 : index + 1;
   oLis[this.prevsIndex].className = "zIndex";
   //Ϊ��ʵ�����������ŵ�Ч��,������»�ʱ��һ���������ƶ�һ��ľ���,Ȼ���������»���,��һ�������ƶ�
   //���»�ʱ,һֱ����һ�Ŷ��˾����豸���˵ľ���,�����������С,�ῴ����һ�������ƶ���Ч��
   var duration = -480+movePos;
   oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)"
  }else if(movePos<0){/*�ϻ�*/
   this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
   //��һ���������ƶ�һ��,Ȼ���������ϻ���,��һ�������ƶ�
   //���ϻ�ʱ,һֱ������һ�ŵĶ��˾����豸���˵ľ���,�������С,�ῴ����һ�������ƶ���Ч��
   oLis[this.prevsIndex].className = "zIndex";
   var duration = 480+movePos;
   oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";

  }

}
function end(e){

}








