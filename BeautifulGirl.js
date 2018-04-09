(function(window){
    function BeautifulGirl() {
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.width = 600;
        this.height = 600;
     
        // this.textarea = textarea;
        // 绘画角色模块
        var girl = document.createElement('div');
        girl.style.position='absolute';
        girl.style.fontSize='0';
        girl.style.left=0;
        girl.style.top =0;
        var img = new Image();
        img.src = './BeautifulGirl.gif';
        img.height = 100;
        img.width = 100;
        img.style.transform=`rotate(0deg)`;
        girl.appendChild(img);
        this.girl = girl;
        this.img = img ;
        //绘画背景图
        var div = document.createElement('div');
        div.appendChild(girl);
        div.style='float:left;display:inline-block;border:1px solid #000;position: relative;width:600px;height:600px;'
        document.body.appendChild(div);
        //绘制命令板和按钮
        this.textarea = document.createElement('textarea');
        this.textarea.style='display: block;';
        this.textarea.rows = 25;
        this.textarea.cols=  30;
        document.body.appendChild( this.textarea);
        //绘制按钮
        var startBtn = document.createElement('button');
        startBtn.innerHTML='开始指令';
        var resetBtn = document.createElement('button');
        resetBtn.innerHTML='恢复原状';
        startBtn.onclick = function(){
            _this.start.call(_this);
        };
        resetBtn.onclick = function(){
            _this.reset.call(_this);
        };
        document.body.appendChild(startBtn);
        document.body.appendChild(resetBtn);
        var p1 = document.createElement('p');
        p1.innerText='指令提示: 前进 向右';
        var p2 = document.createElement('p');
        p2.innerText='指令之间使用 ; 分割';
        document.body.appendChild(p1);
        document.body.appendChild(p2);
    }
    BeautifulGirl.prototype.前进 = function () {
        var deg =  parseInt(this.img.style.transform.substring(7));
        if(deg / 90==0){
            var left = parseInt( this.girl.style.left);
            left +=100;
            if(left==this.width){
                left = this.width-this.girl.width;
            }
            this.girl.style.left=`${left}px`;
        }
        if(deg / 90 ==1){
            var top = parseInt( this.girl.style.top);
            top+=100;
            if(top==this.height)
            {
                top = this.height-this.girl.height;
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
    BeautifulGirl.prototype.向右 = function () {
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
            try{
                _this[mingling]();
                clearInterval(timer);
            }
            catch (e){
                alert('错误的指令');
                clearInterval(timer);
            }
        
        },i*1000+1000);
    }
        
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
               var str = arr[i].replace(/[\r\n]/g,"").replace(/\s+/g,'');
               temp.push(str);
           }
        }
        return temp;
    }
    var beautifulGirl = new BeautifulGirl();
    beautifulGirl.fn = BeautifulGirl.prototype;
    window.girl = beautifulGirl.fn;

})(window)