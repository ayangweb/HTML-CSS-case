// 不要慌, 哈哈哈, 本期js用来获取数据渲染列表
// 先获取列表元素
const musicList = document.querySelector(".musicList");

// 现在需要对播放量进行处理
// 咱们就简单写个函数处理一下
const numberTransform = (number) => {
	// 如果数字小于1w 就原样输出
	if (number < 10000) {
		return number;
	} else if (number >= 10000 && number < 100000000) {
		// 此处处理千万以内的
		// 现将数字转为字符串 然后切割出 除了千位前面的 然后拼接'.' 在切割出千位数字
		return (
			number.toString().slice(0, -4) +
			"." +
			number.toString().slice(-4, -3) +
			"万"
		);
	} else {
		// 处理亿位
		// 同理获得对应位置的数字
		// 这里转为字符串 选取自己喜欢的方法哦 number+'' 可以的
		return (
			number.toString().slice(0, -8) +
			"." +
			number.toString().slice(-8, -7) +
			"亿"
		);
	}
};

// 发送fetch请求 获取数据
fetch("mock/musicData.json")
	.then((res) => res.json())
	.then((res) => {
		console.log(res);
		// 遍历数据 渲染列表
		res.data.forEach((item) => {
			// 每遍历到一个 创建一个li元素
			const li = document.createElement("li");
			// 给li加内容 利用模板字符串
			li.innerHTML = `
			<div class="img">
			  <img src="${item.cover_url_medium}" />
			  <div class="mask"><img src="images/play.png" /></div>
		  </div>
		  <div class="title">${item.title}</div>
		  <div class="playCount">播放量：${numberTransform(item.access_num)}</div>
			`;
			// 将创建好的li加到列表中
			musicList.appendChild(li);
		});
	});

// 好了数据完成了 可以做返回顶部功能了
