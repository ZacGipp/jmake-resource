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
	el_drawCount: document.querySelector('.draw-count'),
	el_winnerList: document.querySelector('.winner-list'),
	el_turntable: document.querySelector('.turntable'),
	el_loading: document.querySelector('.loading'),
	el_msgBtn: document.querySelector('.msg-btn'),
	DOMAIN: 'http://bmstest.j-make.com.cn/owb',
	// DOMAIN: 'http://portalmy.j-make.cn',
	API: {
		RUN_DATA: '/luckyspin/worldrecord',
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
