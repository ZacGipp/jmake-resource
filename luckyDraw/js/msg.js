var MSG = {
	showMsg: function (config) {
		if (config.msgType) CONFIG.el_msg.classList.add('msg-type2');
		if (config.prizeType !== '') {
			var className = 'msg-prize-type-';
			CONFIG.el_msgContent.classList.add(className + (config.prizeType || '0'));
		}
		if (config.title) CONFIG.el_msgTitle.textContent = config.title;
		if (config.detail) CONFIG.el_msgDetail.textContent = config.detail;
		if (config.img && config.prizeType !== 'qrcode') CONFIG.el_msgPrizeImg.style.backgroundImage = 'url(' + config.img + ')';
		if (config.img && config.prizeType === 'qrcode') makeQrcodeCode(config.img);
		if (config.btnLabel) CONFIG.el_msgBtn.textContent = config.btnLabel || '按钮';
		if (config.btnClick) MSG.btnClick = config.btnClick;

		showElement(CONFIG.el_msg);
		this.setMask.call(MSG, true);
		setHash("msg");
		focusElement(CONFIG.el_msgBtn);
	},
	hideMsg: function () {
		this.setMask.call(MSG);
		if (CONFIG.el_msg.classList.contains('msg-type2')) CONFIG.el_msg.className = 'msg';
		if (CONFIG.el_msgContent.className.indexOf('msg-prize-type') > -1) CONFIG.el_msgContent.className = 'msg-content';
		hideElement(CONFIG.el_msg);
		CONFIG.qrcode.clear();
		setHash("");
	},
	setLoading: function (bool) {
		this.setMask.call(MSG, bool);
		CONFIG.loading = bool;
		bool
			? showElement(CONFIG.el_loading)
			: hideElement(CONFIG.el_loading);
	},

	setMask: function (bool) {
		bool
			? showElement(CONFIG.el_mask)
			: hideElement(CONFIG.el_mask);
	},

	btnClick: function () {
		throw new Error('未定义按钮事件');
	},

	error: function (msg) {
		MSG.showMsg({
			detail: msg || '服务器错误！',
			msgType: 1,
			prizeType: 'error',
		});
	},
	noChance: function () {
		MSG.showMsg({
			msgType: 1,
			prizeType: 'no-chance',
			btnLabel: '去订购',
			btnClick: goPayPage,
		});
	},
	notWon: function () {
		MSG.showMsg({
			prizeType: 'not-won',
			title: '再接再厉',
			detail: '差一点就中奖啦，再接再厉',
			btnLabel: '继续订购',
			btnClick: goPayPage,
		});
	}

};
