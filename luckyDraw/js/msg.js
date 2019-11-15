var MSG = {
	showMsg: function (title, content) {
		CONFIG.el_msgTitle.textContent = title;
		CONFIG.el_msgContent.textContent = content;
		showElement(CONFIG.el_msg);
		this.setMask.call(MSG, true);
		setHash("msg");
		focusElement(CONFIG.el_msgBtn);
	},
	hideMsg: function () {
		hideElement(CONFIG.el_msg);
		this.setMask.call(MSG);
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

};
