// HTMLElement兼容
window.HTMLElement = window.HTMLElement || Element;
//封装$方法
window.$=HTMLElement.prototype.$=function(selector){
	return (this==window?document:this).querySelectorAll(selector);
}

window.onload = carousel();

function carousel() {
	var box = {
		detailed:null,//商品详细图片
		btnL:null,//左按钮
		btnR:null,//右按钮
		itemsParent:null,//items子项目父元素
		items:null,//items子项目HTMLCollection
		moved:0,//当前视口中第一个items是列表中的序号
		count:10,
		init:function(){
			this.detailed = $('.detailed')[0];
			this.btnL = $('.prev')[0];
			this.btnR = $('.next')[0];
			this.itemsParent = $('.list')[0].$('div')[0];
			this.items = this.itemsParent.$('div');
			this.count = this.itemsParent.$('div').length;
			//遍历items列表为其添加颜色及hover事件
			for(var i=0;i<this.items.length;i++){
				//添加随机颜色
				this.items[i].style.backgroundColor = 'rgb(' + this.rgbRandom() + ',' + this.rgbRandom() + ',' + this.rgbRandom() + ')';
				//添加hover事件
				this.items[i].onmouseover = function(){
					box.detailedColor(this.style.backgroundColor);
					box.itemsBorder(this);
				}
				this.items[i].onmouseout = function(){
				}
			}
			//为详细区域添加默认样式，以moved为准
			this.detailedColor(this.items[this.moved].style.backgroundColor);
			this.itemsBorder(this.items[this.moved]);
			// 为左右按钮添加事件
			this.btnL.onclick = this.btnR.onclick = function(){
				box.move(this);
			}
		},
		//返回一个0~255的随机数的方法
		rgbRandom:function(){
			return Math.floor(Math.random()*256);
		},
		//左右按钮函数
		move:function(btn){
			if(btn==this.btnR){
				if(this.moved < this.count-6){
					++this.moved;
					this.itemsParent.style.left = -66 * (this.moved) + 'px';
					this.itemsBorder(this.items[this.moved]);
					this.detailedColor(this.items[this.moved].style.backgroundColor);
				}
			}
			else{
				if (this.moved > 0) {
					--this.moved
					this.itemsParent.style.left = -66 * (this.moved) + 'px';
					this.itemsBorder(this.items[this.moved]);
					this.detailedColor(this.items[this.moved].style.backgroundColor);
				}
			}
		},
		//给大图区域添加样式的方法,参数为一个rgb颜色值
		detailedColor:function(colorString){
			this.detailed.style.backgroundColor = colorString;
		},
		//给小项目添加外边框，参数为一个元素
		itemsBorder:function(itemsFocus){
			for(var j=0;j<box.items.length;j++){
				box.items[j].style.borderColor = '';
			};
			itemsFocus.style.borderColor = 'brown';
		}
	}
	//运行初始化函数
	box.init();	
}
