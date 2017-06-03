function show_prev_html() {
	var prev_html = history.state && history.state.current_html;
	if (prev_html) {
		$('.page').html(prev_html);
	}
}

function scroll_prev_position() {
	var st = sessionStorage.st;
	if ((+st) > 0) {
		console.log('scroll to prev position-', st);
		$('.page').scrollTop(st);
	}

	$('.back_to_home').click(function(event) {
		sessionStorage.removeItem('st');
		return true;
	});
}

function bind_position_event() {
	$(".page > a").click(function() {
		var st = $('.page').scrollTop();
		sessionStorage.st = st;
	});
}