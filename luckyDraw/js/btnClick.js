function startDraw() {
	if (CONFIG.loading || CONFIG.ENDING) return;
	if (TURNTABLE.drawCount <= 0) {
		MSG.noChance();
		return;
	}
	TURNTABLE.draw();
}

function activityRule() {
	if (CONFIG.loading) return;
	MSG.showPopup('活动规则', 'rule-pop');
}

function prizeOrder() {
	if (CONFIG.loading) return;
	MSG.showPopup('活动中奖记录');
}

function msgClick() {
	MSG.btnClick();
}

function msgClick2() {
	goPayPage();
}
