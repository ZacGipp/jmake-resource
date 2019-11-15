var TURNTABLE = {
	runtimer: null,
	RANDOM_COUNT: 10,
	FAKE_RANDOM_SPEED: 500,
	randomStartTime: 0,
	clock: null,
	currentIndex: 0,
	prizeList: [],
	prizeUuid: null,
	prizeName: '',
	drawCount: 0,
	prizeLength: 9,
	/**
	 * 初始化大转盘
	 */
	init: function (succ) {
		ajax({
			url: CONFIG.API.PRIZE_LIST,
			data: {id: CONFIG.ID},
			success: function (response) {
				TURNTABLE.prizeList = (response.data || {}).items || [];
				for (var i = 0; i < TURNTABLE.prizeLength; i++) {
					var item = createItem(i, TURNTABLE.prizeLength);
					if (item) CONFIG.el_turntable.appendChild(item);
				}
				succ && succ(response);
			}
		});
	},
	/**
	 * 刷新抽奖次数
	 */
	refreshDrawCount: function (succ) {
		ajax({
			url: CONFIG.API.CHANCE,
			data: {id: CONFIG.ID},
			success: function (response) {
				TURNTABLE.drawCount = response.data || 0;
				CONFIG.el_drawCount.innerText = TURNTABLE.drawCount;
				succ && succ(response);
			}
		});
	},
	/*抽奖*/
	draw: function () {
		if (TURNTABLE.drawCount > 0 && TURNTABLE.prizeList.length > 0) {
			TURNTABLE.randomStartTime = Date.now();
			run();
		} else {
			MSG.showMsg('抽奖结束', '没有机会了哦！')
		}
	}
};

function run() {
	if (!TURNTABLE.runtimer) {
		jackpot();
		TURNTABLE.runtimer = setInterval(function () {
			var randomRunTim = Date.now() - TURNTABLE.randomStartTime;
			var speed = TURNTABLE.FAKE_RANDOM_SPEED * Math.sin((Math.abs(randomRunTim - TURNTABLE.RANDOM_COUNT * 1000 / 2)) / (TURNTABLE.RANDOM_COUNT * 1000 / 2));
			if (Date.now() - TURNTABLE.clock < speed) {
				return;
			}
			var preActiveItem = document.querySelector(".active-prize");
			if (preActiveItem) {
				preActiveItem.classList.remove("active-prize");
			}
			var inIndex = TURNTABLE.currentIndex++ % TURNTABLE.prizeList.length;
			var activeItem = document.querySelector(".item-" + inIndex);
			activeItem.classList.add("active-prize");
			TURNTABLE.clock = Date.now();
			var prizeId = activeItem.dataset.id;

			if (Date.now() - TURNTABLE.randomStartTime > TURNTABLE.RANDOM_COUNT * 1000 && TURNTABLE.prizeUuid && TURNTABLE.prizeUuid === prizeId) {
				TURNTABLE.prizeName = TURNTABLE.prizeUuid;
				handleResult();
			}
		});
	}
}

function handleResult() {
	TURNTABLE.refreshDrawCount(function () {
		TURNTABLE.randomStartTime = 0;
		clearInterval(TURNTABLE.runtimer);
		TURNTABLE.runtimer = 0;
		MSG.showMsg('抽奖结果', '恭喜抽到了奖品：' + TURNTABLE.prizeName);
		TURNTABLE.prizeUuid = '';
	});
}

function jackpot() {
	ajax({
		url: CONFIG.API.JACKPOT,
		data: {id: CONFIG.ID},
		success: function (response) {
			TURNTABLE.prizeUuid = response.data;
		}
	});
}


/**
 * 创建奖品item
 * @param index
 * @param count
 * @returns {HTMLDivElement}
 */
function createItem(index, count) {
	var data = TURNTABLE.prizeList[index];
	if (!data) return '';
	var item = document.createElement('div');
	item.className = 'item item-' + index;
	item.dataset.id = data.id;
	var angle = 360 / count;
	var itemStyle = 'rotateZ(' + ((index * angle) - 70) + 'deg)';
	item.style.transform = itemStyle;
	item.style.webkitTransform = itemStyle;
	item.style.mozTransform = itemStyle;
	item.style.msTransform = itemStyle;

	var item_bg = document.createElement('div');
	item_bg.className = 'item-bg';
	var borderWidth = getTanDeg(angle / 2) * 324;
	item_bg.style.top = 'calc(50% - ' + borderWidth + 'px)';
	item_bg.style.borderTop = borderWidth + 'px solid transparent';
	item_bg.style.borderBottom = borderWidth + 'px solid transparent';
	item.appendChild(item_bg);
	item.style.marginTop = -borderWidth + 'px';

	// var item_border = document.createElement('div');
	// item_border.className = 'item-border';
	// var itemBorderStyle = 'rotateZ(' + (angle / 2) + 'deg)';
	// item_border.style.transform = itemBorderStyle;
	// item_border.style.webkitTransform = itemBorderStyle;
	// item_border.style.mozTransform = itemBorderStyle;
	// item_border.style.msTransform = itemBorderStyle;
	// item.appendChild(item_border);

	var item_prize = document.createElement('div');
	item_prize.className = 'item-prize';
	item_prize.style.backgroundImage = 'url(' + data.imgUrl + ')';
	item.appendChild(item_prize);

	var item_name = document.createElement('div');
	item_name.className = 'item-name';
	item_name.innerText = data.prizeName;
	item.appendChild(item_name);

	return item;
}


/**
 * 获得特定角度的正切值
 * @param deg
 * @returns {number}
 */
function getTanDeg(deg) {
	var rad = deg * Math.PI / 180;
	return Math.tan(rad);
}
