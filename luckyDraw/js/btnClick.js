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
	getJackpotRecord();
	setTimeout(function () {
		MSG.showPopup('我的抽奖记录');
	}, 500);
}

function msgClick() {
	MSG.btnClick();
}

function msgClick2() {
	goPayPage();
}

/**
 * 个人中奖记录
 */
function getJackpotRecord() {
	ajax({
		url: CONFIG.API.PERSONAL_PRIZE_RECORD,
		data: {id: CONFIG.ID, pageSize: 50},
		success: function (response) {
			var fakeData = (response.data || {}).result || [];
			var fakeDataHtml = "";
			for (var i = 0; i < fakeData.length; i++) {
				var drawTime = fakeData[i].drawTime;
				var prizeName = fakeData[i].prizeName;
				var endTime = fakeData[i].endTime;
				var type = fakeData[i].type;
				fakeDataHtml += '<div class="jackpot-item">' +
					'<div class="jackpot-item-left">' +
					'<button class="jackpot-nav"></button>' +
					'<div class="jackpot-line"></div>' +
					'</div>' +
					'<div class="jackpot-item-right">' +
					'<div class="jackpot-date">' + drawTime + '</div>' +
					'<div class="jackpot-detail">' +
					'<div class="jackpot-detail-name">' + (type === 0 ? '未中奖' : prizeName) + '</div>' +
					((type !== 1 && type !== 0) ? '<div class="jackpot-expiretime">有效期：' +  endTime + '</div>' : '') +
					'</div>' +
					'</div>' +
					'</div>';
			}
			CONFIG.el_jackpotRecord.innerHTML = fakeDataHtml;
			CONFIG.el_jackpotNav = document.querySelectorAll('.jackpot-nav');
			for (var j = 0; j < CONFIG.el_jackpotNav.length; j++) {
				btnListening(CONFIG.el_jackpotNav[j], 'jackpot-nav-active');
			}

		}
	});
}
