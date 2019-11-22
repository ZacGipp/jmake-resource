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

		MSG.show(CONFIG.el_msg, 'msg');
		focusElement(CONFIG.el_msgBtn);
	},
	hideMsg: function () {
		if (CONFIG.el_msg.classList.contains('msg-type2')) CONFIG.el_msg.className = 'msg';
		if (CONFIG.el_msgContent.className.indexOf('msg-prize-type') > -1) CONFIG.el_msgContent.className = 'msg-content';
		CONFIG.qrcode.clear();
		MSG.hide(CONFIG.el_msg);
	},
	showPopup: function (title, type) {
		CONFIG.el_popupTitle.innerText = title;
		type === 'rule-pop' ? showElement(CONFIG.el_rulePop) : showElement(CONFIG.el_jackpotRecord);
		MSG.show(CONFIG.el_popup, 'popup');
		focusElement(CONFIG.el_jackpotNav[0]);
	},
	hidePopup: function () {
		hideElement(CONFIG.el_rulePop);
		hideElement(CONFIG.el_jackpotRecord);
		MSG.hide(CONFIG.el_popup);
	},
	show: function (el, hash) {
		showElement(el);
		MSG.setMainBtnsDisabled(true);
		MSG.setMask(true);
		setHash(hash);
	},
	hide: function (el) {
		hideElement(el);
		MSG.setMainBtnsDisabled();
		MSG.setMask();
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
	setMainBtnsDisabled: function (bool) {
		CONFIG.el_drawBtn.disabled = bool;
		for (var i = 0; i < CONFIG.el_bottomBtns.children.length; i++) {
			CONFIG.el_bottomBtns.children[i].disabled = bool;
		}
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
	},
	noLogin: function() {
		MSG.showMsg({
			msgType: 1,
			detail: '登录之后才能抽奖哦!',
			btnLabel: '立即登录',
			btnClick: function () {
				goOTTPage({
					pageCode: "0009",
					pageName: "登录页面"
				})
			}
		});
	},
};
