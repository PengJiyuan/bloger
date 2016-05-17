## JQuery插件 ##
### jquery.nicelabel.js version1.0###


----------

### 功能简介###

> 引入插件,简单配置，即可将checkbox、radio美化~


----------
### 截图###
![demo][1]


----------
###在线DEMO###
[DEMO][2]


  [1]: http://www.cat666.com/mydemo/nicelabel/demo.jpg
  [2]: http://www.cat666.com/mydemo/nicelabel/nicelabel.html


----------

##使用方法##

> 有三种类型的样式，分别为:

>		1.矩形滑块,需在要初始化的input中添加class="rect-nicelabel"

>		2.圆形滑块,需在要初始化的input中添加class="circle-nicelabel"

>		3.文字图标按钮,需在要初始化的input中添加class="text-nicelabel"

> 通过data-nicelabel='{}'来配置基本属性(JSON形式)

>可配置：

>        1.position_class:'someClass'，该属性可配置按钮的位置的类（可不配置，默认值为nicelabel-default-position）

>        2.checked_text:'someValue',该属性制定文字图标按钮被选定时显示的文本（可不配置，默认为Checked）

>        3.unchecked_text:'someValue',该属性制定文字图标未选定时显示的文本（可不配置，默认为Unchecked）

```html
<div id="rect-checkbox">
		<h2 style="margin-left:20px;">矩形滑块checkbox</h2>
		<br>
		<input class="rect-nicelabel" data-nicelabel='{"position_class": "rect-checkbox"}' checked type="checkbox" />
		<input class="rect-nicelabel" data-nicelabel='{"position_class": "rect-checkbox"}' type="checkbox" />
		<input class="rect-nicelabel" data-nicelabel='{"position_class": "rect-checkbox"}' disabled type="checkbox" />
		<input class="rect-nicelabel" data-nicelabel='{"position_class": "rect-checkbox"}' type="checkbox" />
	</div>	
	
	<div id="text-checkbox">
		<h2 style="margin-left:20px;">文字按钮checkbox</h2>
		<br>
		<input class="text-nicelabel" data-nicelabel='{"position_class": "text_checkbox", "checked_text": "已选定", "unchecked_text": "前端工程师"}' checked type="checkbox" />	
		<input class="text-nicelabel" data-nicelabel='{"position_class": "text_checkbox", "checked_text": "已选定", "unchecked_text": "PHP工程师"}' type="checkbox" />	
		<input class="text-nicelabel" data-nicelabel='{"position_class": "text_checkbox", "checked_text": "已选定", "unchecked_text": "IOS工程师"}' type="checkbox" />	
		<input class="text-nicelabel" data-nicelabel='{"position_class": "text_checkbox"}' type="checkbox" />	
	</div>		
```

> js初始化配置信息

> $('selector').nicelabel();
 
> 如果是文本按钮,可配置
 
> $('selector').nicelabel({
> uselabel: true or false,//是否显示图标,默认true

>	checked_ico: 'imgurl',//选定时显示的图标(不配置的话显示默认图标)

>	unchecked_ico: 'imgurl',//未选定时显示的图标(不配置的话显示默认图标)

>checked_text: 'Text',	//选定时默认显示的文本(默认值为Checked)

>unchecked_text: 'Text',	//未选定时默认显示的文本(默认值为Unchecked)

> });



```js
//引入jquery文件以及nicelabel的css以及js文件
<link href="./nicelabel/css/jquery-nicelabel.css" rel="stylesheet" type="text/css" />
<script src="./nicelabel/js/jquery.min.js"></script>
<script src="./nicelabel/js/jquery.nicelabel.js"></script>
	<script>
	$(function(){
	    //初始化
		$('#rect-checkbox > input').nicelabel();
        //带参数的初始化
		$('#text-checkbox-ico > input').nicelabel({
			checked_ico: './checked.png',
			unchecked_ico: './unchecked.png'
		});
		
	});
	</script>

```


----------
**感谢Francisco Neves，部分创意来自Francisco Neves**


----------
### 后记 ###

>该版本为1.0，将不定期更新，更多样式，更多自定义配置，敬请期待~

>转载请保留版权信息

>作者:PJY

>新浪微博:猫溜网

