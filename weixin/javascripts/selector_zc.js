function setup_selector(url, starttime, endtime) {
	$('.petc_date_start').click(function(event) {
		var _this = this;
		weui.datePicker({
			start: 2000,
			end: new Date(),
			defaultValue: starttime.split('-'),
			onConfirm: function(result){
				loading = weui.loading('加载中...', {
				    className: 'loading'
				});
				var start_time_choosed = result[0].value + '-' + ((('' + result[1].value).length === 2) ? result[1].value : '0' + result[1].value) + '-' + ((('' + result[2].value).length === 2) ? result[2].value : '0' + result[2].value);
				var end_time = $(".petc_date_end").text();
				if (new Date(start_time_choosed) > new Date(end_time)) {
					start_time_choosed = end_time;
				}
				sessionStorage.removeItem('st');
				
				window.location = url + '&starttime=' + start_time_choosed + "&endtime=" + end_time;
			},
			id: 'ph_date_start'
		});
	});
	$('.petc_date_end').click(function(event) {
		var _this = this;
		weui.datePicker({
			start: 2000,
			end: new Date(),
			defaultValue: endtime.split('-'),
			onConfirm: function(result){
				loading = weui.loading('加载中...', {
				    className: 'loading'
				});
				var end_time_choosed = result[0].value + '-' + ((('' + result[1].value).length === 2) ? result[1].value : '0' + result[1].value) + '-' + ((('' + result[2].value).length === 2) ? result[2].value : '0' + result[2].value);
				var start_time = $(".petc_date_start").text();
				if (new Date(start_time) > new Date(end_time_choosed)) {
					end_time_choosed = start_time;
				}
				sessionStorage.removeItem('st');
				
				window.location = url + '&starttime=' + start_time + "&endtime=" + end_time_choosed;
			},
			id: 'ph_date_end'
		});
	});
}