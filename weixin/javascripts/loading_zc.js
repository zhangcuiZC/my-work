function Loading_zc(isleft_bool, post_data_json, create_html_func, url_str, bind_position_event_func, bind_redirect_event_func) {
	this.isleft = isleft_bool;
	this.isloading = false;
	this.url = url_str;
	this.info = post_data_json;
	this.create_html = create_html_func.bind(this);
	this.box_height = $('#container').height();
	this.loading_timer = null;
	this.bind_position_event = bind_position_event_func;
	this.bind_redirect_event = bind_redirect_event_func;
}

Loading_zc.prototype = {
	constructor: Loading_zc,

	load_more: function() {
		var _this = this;
		$('.weui-loadmore').html('<span class="weui-loadmore__tips click_to_load">加载更多</span>');
		$(".click_to_load").click(function(event) {
			if (!_this.isloading) {
				_this.fetch_by_ajax(_this.url, _this.info);
			}
		});
	},

	in_loading: function() {
		$('.weui-loadmore').html('<i class="weui-loading"></i><span class="weui-loadmore__tips">正在加载</span>');
	},

	no_more: function() {
		$('.weui-loadmore').html('<span class="weui-loadmore__tips">无更多数据</span>');
	},

	show_date: function(str) {
		var d = + str.substr(6,13);
		var _date = new Date(d);
		var year = _date.getFullYear();
		var month = ('' + (+_date.getMonth() + 1)).length == 2 ? (+_date.getMonth() + 1) : '0' + (+_date.getMonth() + 1);
		var date = _date.getDate();
		return year+ '/' + month + '/' + date;
	},

	show_week: function(str) {
		var d = + str.substr(6,13);
		var _date = new Date(d);
		var day = _date.getDay();
		var week_arr=["周日","周一","周二","周三","周四","周五","周六"];
		return week_arr[day];
	},

	fetch_by_ajax: function(url, info) {
		var _this = this;
		console.log('start loading');
		this.isloading = true;
		this.in_loading();
		this.info.currentpage += 1;
		console.log(this.info);
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: {info: info},
			success: function(data) {
				console.log(data);

				_this.isloading = false;

				if (data.isleft) {
					_this.load_more();
				}else{
					_this.no_more();
					_this.isleft = false;
				}

				var _h = _this.create_html(data.datas);
				$(_h).insertBefore('.weui-loadmore');
				$('.weui-loadmore').data('page', _this.info.currentpage).data('isleft', data.isleft);
				history.replaceState({current_html: $('.page').html()}, '', '');

				if (_this.bind_position_event) {
					_this.bind_position_event();
				}
				if (_this.bind_redirect_event) {
					_this.bind_redirect_event();
				}
			}
		});
	},

	init: function() {
		var _this = this;
		$(".page").on('scroll', function() {
			if (!_this.isleft || _this.isloading) {
				return false;
			}
			if (_this.loading_timer) {
				clearTimeout(_this.loading_timer);
			}

			_this.loading_timer = setTimeout(function() {
				var o = $('.weui-loadmore').offset();
				if (o.top + o.height - 3 <= _this.box_height) {
					_this.fetch_by_ajax(_this.url, _this.info);
				}
			}, 100);
		});

		$(".click_to_load").click(function(event) {
			if (!_this.isloading) {
				_this.fetch_by_ajax(_this.url, _this.info);
			}
		});
	}
};