
function startDraw() {
	if (CONFIG.loading || CONFIG.ENDING) return;
	TURNTABLE.draw();
}

function activityRule() {
	if (CONFIG.loading) return;
	MSG.showMsg('活动规则', 'lsjdlsjldjfsldjflsjdlfjlajsldjfalsdjlajsdlj');
}

function prizeOrder() {
	if (CONFIG.loading) return;
	MSG.showMsg('抽奖记录', 'lasjdljasldjfalsjdlasjdlfajsdlfjasldjflasjdflasj');
}

function msgClick() {
	alert('hahahaha');
}
