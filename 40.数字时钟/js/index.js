// 给js文件添加页面加载事件
window.addEventListener("load", () => {
	// 获取放置时间的元素
	// 小时
	const hour = document.querySelector(".hour>span");
	// 分钟
	const minute = document.querySelector(".minute>span");
	// 秒钟
	const second = document.querySelector(".second>span");

	// 先获取两个元素
	// 开启
	const running = document.querySelector(".running>span");
	// 暂停
	const paused = document.querySelector(".paused>span");

	// 获取提示框
	const toast = document.querySelector(".toast");

	// 定义函数 更新时间
	const getTime = () => {
		// 获取当前的事件
		const nowTime = new Date();
		// 获取当前的小时
		const hours = nowTime.getHours();
		// 更新页面的时间 所有都是小于 10 前面加个0 小时 分钟 秒钟 同理
		hour.innerHTML = hours < 10 ? "0" + hours : hours;
		// 获取当前的分钟
		const minutes = nowTime.getMinutes();
		minute.innerHTML = minutes < 10 ? "0" + minutes : minutes;
		// 获取当前的秒钟
		const seconds = nowTime.getSeconds();
		second.innerHTML = seconds < 10 ? "0" + seconds : seconds;
	};
	// 顺便调用一下
	getTime();

	// 定义定时器 更新时间
	let timer = setInterval(() => {
		getTime();
	}, 1000);

	// 定义一个变量 控制定时器 是否需要开启
	let flag = false;

	// 外面定义一个值来保存opacity的值
	let opacity = 0;

	// 定义一个函数来弹出提示框 因为我们需要在散出用到
	const showToast = () => {
		// 调出提示框 开启定时器 逐渐显示 提示框
		const toastTimer = setInterval(() => {
			opacity += 0.1;
			// 设置提示框的透明度
			toast.style.opacity = opacity;
			// ok 现在我们让提示框显示后1.5s后关闭
			// 在定义一个一次性定时器
			// 如果opacity>=1就是完全显示了 css opacity的值最大是1
			if (opacity >= 1) {
				setTimeout(() => {
					// 现将opacity重新赋值为0
					opacity = 0;
					// 清除定时器
					clearInterval(toastTimer);
					// 奇了怪了 诶呀我大意了 没让提示框消失
					toast.style.opacity = 0;
				}, 1500);
			}
		}, 30);
	};

	// 没问题了 现在做提示框
	// OK 现在做开启和暂停
	// 先做暂停
	paused.addEventListener("click", () => {
		// 调用提示框
		// 先写个内容
		toast.innerHTML = "时钟已暂停~";
		showToast();

		// 点击暂停 清除定时器
		clearInterval(timer);
		// 暂停之后 就赋新值个给flag
		flag = true;
	});
	// OK 在做开启
	// 现在有bug 我们一起看看 我点击多次开启 就无法暂停
	// 这个就是开启多个定时器 点击暂停就不知道找哪个了 我们定义一个变量来控制定时器是否需要开启
	running.addEventListener("click", () => {
		// 如果flag是true就开启 否则不开启
		if (flag) {
			// 开启提示框
			toast.innerHTML = "时钟已开启~";
			showToast();

			// 点击开启重新开启一个定时器
			timer = setInterval(() => {
				getTime();
			}, 1000);
			// 当然这里开启之后就把值赋为false
			flag = false;
		} else {
			// 这里如果时钟已开启 就提示已经开启了
			toast.innerHTML = "时钟已经在开启状态~";
			showToast();
		}
	});
});
