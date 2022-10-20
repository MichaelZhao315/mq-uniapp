
// 定义接口返回的字段类型
export interface apiDataInterface {
result: any[];
[x: string]: any[];
	code: number,
	data: any,
	msg: string
}

const api = (opts: any) => {
	//是否有loading加载
	if (opts.loading) {
		uni.showLoading({
			title: '加载中'
		});
	}
	return new Promise<apiDataInterface>((resolve, reject) => {
		var headers = opts.header
		let { VITE_APP_BASE_API_URL } = import.meta.env;
		//请求内容类型
		opts.dataType = 'json';
		if (!opts.method) opts.method = 'GET';
		opts.contentType = 'application/json';

		if (opts.data && opts.method) {
			var method = opts.method.toUpperCase();
			if (method === 'POST' || method === 'PUT' || method === 'DELETE')
				opts.data = JSON.stringify(opts.data);
		}
		let url = VITE_APP_BASE_API_URL + opts.url;

		//打印出请求参数
		uni.request({
			url: url,
			header: headers,
			data: opts.data,
			method: opts.method,
			success: (res: {
				data: any
			}) => {
				//业务异常处理
				if (res.data.code === 402 || res.data.code === 403 || res.data.code === 250) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none',
						duration: 2000
					});
					reject(res.data);
				} else if (res.data.code === 500) {
					uni.showToast({
						title: '系统异常请稍后：' + res.data.code,
						icon: 'none',
						duration: 2000
					});
					reject(res.data);
				} else if (res.data.code === 200) {
					//隐藏加载
					if (opts.loading) {
						uni.hideLoading();
					}
					resolve(res.data);
				} else {
					resolve(res.data);
				}
			},
			fail: (res) => {
				uni.showToast({
					icon: 'none',
					title: '操作失败：' + res.errMsg,
					duration: 3000
				});
				reject(res);
			},
			complete: () => {
				//隐藏加载
				if (opts.loading) {
					uni.hideLoading();
				}
			}
		});
	});
};


export default api;
