// 添加页面加载事件
window.addEventListener("load", () => {
	// 获取打开按钮
	const open = document.querySelector(".open");
	// 获取关闭按钮
	const close = document.querySelector(".close");
	// 获取整个大的模态框
	const fillScreen = document.querySelector(".model-box");

	// 获取模态框可移动的头部区域
	const header = document.querySelector(".title");

	// 获取模态框珠主区域
	const modelBox = document.querySelector(".content");

	// 做打开功能
	open.addEventListener("click", () => {
		// 点击打开按钮 改变display属性值
		fillScreen.style.display = "block";
	});

	// 关闭功能
	close.addEventListener("click", () => {
		fillScreen.style.display = "none";
	});

	// 在做移动功能
	// 为header添加鼠标按下事件
	// 写错了 尴尬
	header.addEventListener("mousedown", (event) => {
		// event 获取事件对象 每个元素都有 页面加载就给了
		// 现在我们想让这个模态框移动 我们就得知道鼠标在header区域的光标位置 计算方式 是先算出鼠标光标在整个浏览器区域的位置 再算出模态框距离浏览器边缘位置的大小 相减就可以了
		// event.pageX可以获取鼠标光标距离浏览器边缘位置的大小
		// modelBox.offsetLeft 可以获取到模态框区里浏览器左边框的距离
		// 上面(Y轴)同理
		const x = event.pageX - modelBox.offsetLeft;
		const y = event.pageY - modelBox.offsetTop;
		console.log(x, y);
		// 现在我们要移动模态框 由于在这个页面移动 并且实在按下之后移动 所有在按下事件内添加移动事件 并且是给document
		document.addEventListener("mousemove", move);
		// 这里我们待会有要做鼠标弹起事件 所以必须给一个写好的函数
		function move(event) {
			// 算出移动时的模态框的位置距离 并赋值 原理和上面求x,y一样
			// css属性值需要单位 别忘了哦
			modelBox.style.left = event.pageX - x + "px";
			modelBox.style.top = event.pageY - y + "px";
		}
		// 现在要弹起鼠标 就移除事件 我先写完
		// document.removeEventListener("mousemove", move); 这句 可以移除一个事件 那么在这里我们刚刚写的函数就起了作用 在移除一个事件的时候 事件源必须是同一个 所以我们必须指定用一个函数 不然就移除不了 可以自己同手试试哦 我赶时间 哈哈哈~~~
		document.addEventListener("mouseup", () => {
			document.removeEventListener("mousemove", move);
		});
	});
});
