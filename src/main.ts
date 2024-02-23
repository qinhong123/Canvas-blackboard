import './style.css';

class BlackBoard {
	constructor(
		private el = document.querySelector<HTMLCanvasElement>('#canvas')!,
		private app = el?.getContext('2d')!,
		private width: number = el.width,
		private height: number = el.height,
		private btns: HTMLDivElement = document.createElement('div'),
		private bgColor = '#000',
		private lineColor = '#fff'
	) {
		this.initCanvas();
		this.bindEvent();
		this.draw();
	}
	//绘制黑板线条
	private bindEvent() {
		const callback = this.drawline.bind(this); //使用bind会创建一个新的
		this.el.addEventListener('mousedown', () => {
			this.app.beginPath(); //beginPath() 方法开始一条路径，或重置当前的路径。
			this.app.strokeStyle = this.lineColor;
			this.el.addEventListener('mousemove', callback);
			// 添加鼠标松开移除事件
			document.addEventListener('mouseup', () => {
				this.el.removeEventListener('mousemove', callback);
			});
		});
	}
	//画线
	private drawline(event: MouseEvent) {
		//点
		this.app.lineTo(event.offsetX, event.offsetY);
		// 绘制线条
		this.app.stroke();
	}
	private initCanvas() {
		this.app.fillStyle = this.bgColor;
		this.app.fillRect(0, 0, this.width, this.height);
		// 创建div容器
		this.btns.classList.add('btns');
		this.btns.style.cssText = 'margin-top:10px';
		this.el.insertAdjacentElement('afterend', this.btns);
	}
	// 设置背景颜色
	public setBgColor(color: string) {
		this.bgColor = color;

		return this;
	}
	// 清屏
	public clear() {
		const el = document.createElement('button');
		el.innerText = '清屏';
		this.btns.insertAdjacentElement('afterbegin', el);
		el.addEventListener('click', () => {
			this.app.fillStyle = this.bgColor;
			this.app.fillRect(0, 0, this.width, this.height);
		});
		return this;
	}
	// 设置线条颜色
	public setLineColor() {
		const colors = ['#ecf0f1', '#27ae60', '#2980b9', '#f1c40f', '#c0392b'];
		// 创建容器
		const container = document.createElement('div');
		// 添加clss类
		container.classList.add('color-container');
		// 遍历颜色
		colors.forEach((color) => {
			const div = document.createElement('div');
			// 设置颜色
			div.style.cssText = `width:20px; height:20px;background-color:${color}`;
			// 元素第一个子节点
			container.insertAdjacentElement('afterbegin', div);
			// 添加线条颜色改变事件
			div.addEventListener('click', () => {
				this.lineColor = color;
			});
		});
		// 放在元素最后一个节点
		this.btns.insertAdjacentElement('beforeend', container);
	}
	// 橡皮擦
	public erase() {
		const el = document.createElement('button');
		el.innerText = '橡皮擦';
		this.btns.insertAdjacentElement('afterbegin', el);
		el.addEventListener('click', () => {
			this.lineColor = this.bgColor;
			// 设置橡皮擦大小
			this.app.lineWidth = 10;
		});
		return this;
	}
	// 写字
	public draw() {
		const el = document.createElement('button');
		el.innerText = '写字';
		this.btns.insertAdjacentElement('afterbegin', el);
		el.addEventListener('click', () => {
			this.lineColor = 'white';
			// 设置线条大小
			this.app.lineWidth = 1;
		});
		return this;
	}
	// 截图
	public short() {
		const el = document.createElement('button');
		el.innerText = '截图';
		this.btns.insertAdjacentElement('afterbegin', el);
		const img = document.createElement('img');
		el.addEventListener('click', () => {
      img.src= this.el.toDataURL('image/jpeg');
      img.classList.add('img-short');
    });
		this.btns.insertAdjacentElement('afterend', img);
    // 上传图片
    // new FormData()
		return this;
	}
}
const instance = new BlackBoard();
instance.clear();
// instance.setBgColor('pink');
instance.setLineColor();
instance.erase();
instance.short();
