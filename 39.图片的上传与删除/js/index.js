// 页面加载事件 等页面渲染完毕在执行js
window.addEventListener("load", () => {
	// 先获取一下上传的这个图标元素
	let uploadFile = document.querySelector("#file");
	// 在获取一下整个list和file这个框框
	let list = document.querySelector(".list");
	let file = document.querySelector(".file");
	// 为这个按钮添加change事件 当你选中图片然后点击确定时触发
	uploadFile.addEventListener("change", function () {
		for (let item of this.files) {
			// 利用正则表达式判断是否是图片类型;
			if (!/image\/\w+/.test(item.type)) {
				alert("只能选择图片");
				return;
			}
			// 创建一个FileReader()对象
			let reader = new FileReader();
			// readAsDataURL方法可以将上传的图片格式转为base64,然后在存入到图片路径,这样就可以上传任意位置的图片
			reader.readAsDataURL(item);
			reader.addEventListener("load", function () {
				// reader.result得到的是转换后的图片base64格式直接放到src路径即可
				let li = document.createElement("li");
				li.innerHTML = `
				<div class="close">×</div>
				<img src="
					${this.result}
					" />
				`;
				list.insertBefore(li, file);
			});
		}
	});
	// ok  现在做删除功能 因为每次添加新的li元素都会重绘dom树 没法给每个.close元素绑定事件 这里我们就用事件委托实现
	list.addEventListener("click", (e) => {
		// e是页面一开启就自动生成的事件对象
		// e.target是触发事件的对象 ndoeName是每一个dom元素都有节点 且值全部都是大写
		// 这里就是如果点击的是×号就删除 否则不删除
		if (e.target.nodeName == "DIV") {
			// removeChild是移除子元素 括号写的是点击的div对应的父元素就是某一个li了
			list.removeChild(e.target.parentNode);
		}
	});
	// 到此 功能实现 第一次写js视频 有点不太会的亚子 不会的私信或者评论哈,感谢支持 我继续努力 一起加油
});
