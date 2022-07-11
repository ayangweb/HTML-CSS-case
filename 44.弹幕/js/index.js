// 设置按钮点击后的一系列样式
// 获取按钮+输入框
const btn = document.querySelector("button");
const input = document.querySelector("input");
// second 为倒计时秒数,dmList保存弹幕列表
let second = 3,
	dmList = [],
	dmY = [18, 36, 54];
// 点击按钮
btn.addEventListener("click", function () {
	// 先获取到输入框的值
	const val = input.value;
	// 如果val去除两边空格不等于空 就可以发送了
	if (val.trim() !== "") {
		// 也清除输入框的值
		input.value = "";
		this.className = "btn_active";
		this.innerHTML = `${second} s`;
		// 开启倒计时定时器
		const timer = setInterval(() => {
			second--;
			this.innerHTML = `${second} s`;
			// 当秒数为0 则恢复
			if (second === 0) {
				// 清除定时器
				clearInterval(timer);
				this.className = "";
				this.innerHTML = "发送";
				// 恢复初始的秒数 其实可以直接写在if 判断里 ,看你自己想怎么写
				second = 3;
			}
		}, 1000);
		// 添加对象到dmList
		// canvas绘制文字三个参数 文字,x坐标,y坐标
		dmList.push({
			text: val,
			// x坐标是canvas的宽度 因为我们需要从最右边滑动出左侧
			x: 600,
			// y轴需求为最上面的三行 已知要设置弹幕字体大小为18px 那么我们要设置三个位置 进行随机获取
			// dmY = [18, 36, 54] 为什么这么设置呢 因为canvas文字绘制的基点为左下角 那么第一行的位置就得是文字的大小了,也是文字的高度 如果不理解 想一想 如果基点为左上角 是不是要将 0 作为第一行,现在是左下角哈 很好理解的
			// parseInt(Math.random() * 3) 0-2三个数字随机选取
			y: dmY[parseInt(Math.random() * 3)],
		});
	}
});

// ok  现在需求是回车也可以发送
// keyup是键盘弹起事件
input.addEventListener("keyup", (e) => {
	// e是事件对象
	// 回车键的keyCode值是13
	if (e.keyCode === 13) {
		btn.click();
	}
});

// 现在可以做canvas部分了
// 获取canvas
const canvas = document.querySelector("canvas");
// 开启2d的绘制环境
const ctx = canvas.getContext("2d");
// 设置绘制文字的样式
ctx.font = "18px 微软雅黑";
// 设置绘制的颜色
ctx.fillStyle = "#fff";
// 定义方法 进行弹幕每一帧不同位置的绘制
const draw = () => {
	// 每调用一次函数就会x坐标-1 调用频率为 每秒60帧
	dmList.forEach((item) => item.x--);
	// 利用requestAnimationFrame这个新特性 它可以获取到电脑的分辨率 使绘制动画更丝滑
	requestAnimationFrame(() => {
		// 每次绘制的时候都要清除上一次的位置
		// clearRect 四个值 我们要全屏清除 那么就从左上角开始 然后就是canvas的宽度了 高度随便给一个(因为只用到了前三行)
		ctx.clearRect(0, 0, 600, 300);
		// 等会看看不同
		// 在进行弹幕文字绘制
		dmList.forEach((item) => ctx.fillText(item.text, item.x, item.y));
	});
	// 每秒60帧 调用
	setTimeout(() => {
		draw();
	}, 1000 / 60);
};
draw();
