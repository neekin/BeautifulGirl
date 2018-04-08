function BeautifulGirl() {
    var _this = this;
    this.direction = direction.左;
    this.x = 0;
    this.y = 0;
    this.width = 600;
    this.height = 600;
 
    // this.textarea = textarea;
    // 绘画角色模块
    var girl = document.createElement('div');
    girl.style.position='absolute';
    girl.style.left=0;
    girl.style.top =0;
    var img = new Image('./run.gif');
    img.src = './run.gif';
    img.height = 100;
    img.width = 100;
    img.style.transform=`rotate(0deg)`;
    girl.appendChild(img);
    this.girl = girl;
    this.img = img ;
    //绘画背景图
    var div = document.createElement('div');
    div.appendChild(girl);
    div.style.width = '600px';
    div.style.height = '600px';
    div.style='float:left;width:600px;height:600px;display:inline-block;border:1px solid #000;position: relative;'
    document.body.appendChild(div);
    //绘制命令板和按钮
    this.textarea = document.createElement('textarea');
    this.textarea.style='float:left';
    this.textarea.rows = 30;
    this.textarea.cols=  40;
    document.body.appendChild( this.textarea);
    //绘制按钮
    var startBtn = document.createElement('button');
    startBtn.innerHTML='开始指令';
    var resetBtn = document.createElement('button');
    resetBtn.innerHTML='恢复原状';
    // this.startBtn = startBtn;
    // this.resetBtn = resetBtn;
    startBtn.onclick = function(){
        _this.start.call(_this);
    };
    resetBtn.onclick = function(){
        _this.reset.call(_this);
    };
    startBtn.style='float:left';
    document.body.appendChild(startBtn);
    document.body.appendChild(resetBtn);
}
BeautifulGirl.prototype.行走 = function () {
    var deg =  parseInt(this.img.style.transform.substring(7));
    console.log(deg);
    if(deg / 90==0){
        var left = parseInt( this.girl.style.left);
        left +=100;
        if(left==this.width){
            left = 500;
        }
        this.girl.style.left=`${left}px`;
    }
    if(deg / 90 ==1){
        var top = parseInt( this.girl.style.top);
        top+=100;
        if(top==this.height)
        {
            top = 500;
        }
        this.girl.style.top =`${top}px`
    } 
    if(deg / 90==2)
    {
        var left = parseInt( this.girl.style.left);
        left-=100;
        if(left<0)
        {
            left = 0;
        }
        this.girl.style.left =`${left}px`
    }
    if(deg / 90 ==3){
        var top = parseInt( this.girl.style.top);
        top-=100;
        if(top<0)
        {
            top = 0;
        }
        this.girl.style.top =`${top}px`
    } 
}
BeautifulGirl.prototype.转右 = function () {
    var deg =  parseInt(this.img.style.transform.substring(7));
    deg+=90;
    if(deg==360)
    {
        deg = 0;
    }
    this.img.style.transform=`rotate(${deg}deg)`;
  
}
BeautifulGirl.prototype.start = function(){
   var instructions = this.textarea.value.split(';').removeEmptyEle();
   var arr = [];
   for(var i=0;i<instructions.length;i++)
   {
      var instruct = instructions[i].split('*');
      if(instruct.length==1)
      {
       arr =   arr.concat(instruct)
      }else{
          var count = parseInt(instruct[1]);
          var temp = [];
          for(var j = 0;j<count;j++)
          {
              temp.push(instruct[0])
          }
          arr = arr.concat(temp);
      }
   
   }
   for(var i=0;i<arr.length;i++)
   {
       this.run(arr[i],i);
   }

}
BeautifulGirl.prototype.run = function(mingling,i){
    var _this = this;
    var timer = setInterval(function(){
      _this[mingling]();
      clearInterval(timer);
    },i*1000+1000);
}

BeautifulGirl.prototype

BeautifulGirl.prototype.reset = function(){
    window.location.reload();
}

Array.prototype.removeEmptyEle = function(){
    var arr = this;
    var temp = [];
    for(var i=0;i<arr.length;i++)
    {
       if(arr[i]!=='' && arr[i]!==undefined)
       {
           var str = arr[i].replace(/[\r\n]/g,"")
           temp.push(str);
       }
    }
    return temp;
}