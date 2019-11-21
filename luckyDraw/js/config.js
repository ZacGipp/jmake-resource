var CONFIG = {
	ID: getQueryString('id'),
	loading: false,
	ENDING: false, // 活动结束

	el_btnListening: document.querySelectorAll('.btn-listening'),
	el_drawBtn: document.querySelector('.draw-btn'),
	el_processing: document.querySelector('.processing'),
	el_ending: document.querySelector('.ending'),
	el_mask: document.querySelector('.mask'),
	el_msg: document.querySelector('.msg'),
	el_msgTitle: document.querySelector('.msg-title'),
	el_msgContent: document.querySelector('.msg-content'),
	el_msgDetail: document.querySelector('.msg-detail'),
	el_msgBtn: document.querySelector('.msg-btn'),
	el_msgPrizeImg: document.querySelector('.msg-prize-img'),
	el_popup: document.querySelector('.popup'),
	el_popupTitle: document.querySelector('.popup-title'),
	el_jackpotNav: [],
	el_jackpotRecord: document.querySelector('.jackpot-record'),
	el_rulePop: document.querySelector('.rule-pop'),
	el_drawCount: document.querySelector('.draw-count'),
	el_bottomBtns: document.querySelector('.bottom-btns'),
	el_winnerList: document.querySelector('.winner-list'),
	el_turntable: document.querySelector('.turntable'),
	el_loading: document.querySelector('.loading'),
	qrcode: new QRCode('qrcode', {
		width: 220,
		height: 220,
	}),
	DOMAIN: 'http://bmstest.j-make.com.cn/owb',
	// DOMAIN: 'http://portalmy.j-make.cn',
	API: {
		// 用户信息
		USER_INFO: '/user/info',
		// 查询还有多少次 参数id
		CHANCE: '/luckyspin/chance',
		// 抽奖 参数id
		JACKPOT: '/luckyspin/jackpot',
		// 奖品列表 参数id
		PRIZE_LIST: '/luckyspin/list',
		// 获奖记录 参数id,page,pageSize
		PERSONAL_PRIZE_RECORD: '/luckyspin/prizes',
		// 轮播获奖记录 参数id,pageSize
		WORLD_RECORD: '/luckyspin/worldrecord'
	}
};

initBtnStatusListening();

// 初始化按钮焦点状态监听
function initBtnStatusListening() {
	for (var i = 0; i < CONFIG.el_btnListening.length; i++) {
		btnListening(CONFIG.el_btnListening[i]);
	}
}

function btnListening(el, focusClass) {
	if (!focusClass) focusClass = 'btn-focus';
	el.onfocus = function (e) {
		e.target.classList.add(focusClass);
	};
	el.onblur = function (e) {
		e.target.classList.remove(focusClass);
	};
}
