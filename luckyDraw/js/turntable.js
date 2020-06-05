var TURNTABLE = {
	STOP_UUID: '999999999',
	NOT_WON_UUID: '999999998',
	runtimer: null,
	RANDOM_COUNT: 10,
	FAKE_RANDOM_SPEED: 500,
	randomStartTime: 0,
	clock: null,
	currentIndex: 0,
	prizeList: [],
	jackpot: {},
	prizeUuid: null,
	prizeData: '',
	drawCount: 0,
	prizeLength: 9,
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
		if (TURNTABLE.prizeList.length > 0) {
			TURNTABLE.randomStartTime = Date.now();
			run();
		}
	},
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
			var prizeId = activeItem.dataset.id || '';

			if (Date.now() - TURNTABLE.randomStartTime > TURNTABLE.RANDOM_COUNT * 1000 && TURNTABLE.prizeUuid) {
				if (TURNTABLE.prizeUuid === TURNTABLE.STOP_UUID) {
					preActiveItem.classList.remove("active-prize");
					MSG.error('服务器错误!');
				} else if (TURNTABLE.prizeUuid === prizeId || (TURNTABLE.prizeUuid === TURNTABLE.NOT_WON_UUID && TURNTABLE.prizeData.type === 0)) {
					TURNTABLE.prizeData = TURNTABLE.prizeList[inIndex];
					handleResult();
				}
			}
		});
	}
}

function handleResult() {
	TURNTABLE.refreshDrawCount(function () {
		TURNTABLE.randomStartTime = 0;
		clearInterval(TURNTABLE.runtimer);
		TURNTABLE.runtimer = 0;
		var showMsgConfig = {};
		switch (TURNTABLE.prizeData.type) {
			case 0:
				showMsgConfig = {
					prizeType: 'not-won',
					title: '再接再厉',
					detail: '差一点就中奖啦，再接再厉',
					btnLabel: TURNTABLE.drawCount > 0 ? '继续抽奖' : '继续订购',
					btnClick: function () {
						if (TURNTABLE.drawCount > 0) {
							pageBack();
						} else {
							CONFIG.NEED_REFRESH_DRAW_COUNT = true;
							CONFIG.NEED_REFRESH_USER_INFO = true;
							goPayPage();
						}
					},
				};
				break;
			case 1: {
				refreshOTTUserInfo();
				showMsgConfig = {
					prizeType: 'days',
					title: '恭喜您中奖啦！',
					img: TURNTABLE.prizeData.bigImgUrl,
					detail: '已累加至' + TURNTABLE.jackpot.vipExpireTime.split(' ')[0],
					btnLabel: '确认',
					btnClick: function () {
						CONFIG.NEED_REFRESH_USER_INFO = true;
						pageBack();
					},
				};
				break;
			}
			case 2:
				showMsgConfig = {
					prizeType: 'device',
					title: '恭喜获得大奖',
					img: TURNTABLE.prizeData.bigImgUrl,
					code: TURNTABLE.jackpot.recordId,
				};
				break;
			case 3:
				showMsgConfig = {
					prizeType: 'vip',
					title: '恭喜您中奖啦！',
					img: TURNTABLE.prizeData.bigImgUrl,
					detail: '恭喜获得' + TURNTABLE.prizeData.prizeName,
					btnLabel: '现在使用',
					btnClick: function () {
						CONFIG.NEED_REFRESH_DRAW_COUNT = true;
						CONFIG.NEED_REFRESH_USER_INFO = true;
						goPayPage();
					},
				};
				break;
			case 4:
			case 5:
				showMsgConfig = {
					prizeType: 'qrcode',
					title: '恭喜您中奖啦！',
					img: TURNTABLE.jackpot.url,
					detail: '恭喜获得' + TURNTABLE.prizeData.prizeName,
				};
				break;
			default: {
				MSG.setMainBtnsDisabled(false);
				focusElement(CONFIG.el_drawBtn);
				break;
			}
		}
		MSG.showMsg(showMsgConfig);
		TURNTABLE.prizeUuid = '';
	});
}

function jackpot() {
	MSG.setMainBtnsDisabled(true);
	ajax({
		url: CONFIG.API.JACKPOT,
		data: {id: CONFIG.ID},
		success: function (response) {
			if (response.status === 3018) {
				TURNTABLE.prizeUuid = TURNTABLE.NOT_WON_UUID;
				return;
			}
			if (response.status !== 1) {
				TURNTABLE.prizeUuid = TURNTABLE.STOP_UUID;
				return;
			}
			TURNTABLE.jackpot = response.data || {};
			TURNTABLE.prizeUuid = TURNTABLE.jackpot.prizeId;
		},
		fail: function () {
			TURNTABLE.prizeUuid = TURNTABLE.STOP_UUID;
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
	// var borderWidth = (getTanDeg(angle / 2) * 324) / 192;
	// item_bg.style.top = 'calc(50% - ' + borderWidth + 'rem)';
	// item_bg.style.borderTop = borderWidth + 'rem solid transparent';
	// item_bg.style.borderBottom = borderWidth + 'rem solid transparent';
	// item.appendChild(item_bg);
	// item.style.marginTop = -borderWidth + 'rem';

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
