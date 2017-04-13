import {request_by_ajax} from '../api';

export const VALIDATEPHONE_REQUEST_START = 'VALIDATEPHONE_REQUEST_START';
export const VALIDATEPHONE_REQUEST_ERROR = 'VALIDATEPHONE_REQUEST_ERROR';
export const VALIDATEPHONE_REQUEST_RECEIVE = 'VALIDATEPHONE_REQUEST_RECEIVE';

export const VALIDATECODE_REQUEST_START = 'VALIDATECODE_REQUEST_START';
export const VALIDATECODE_REQUEST_ERROR = 'VALIDATECODE_REQUEST_ERROR';
export const VALIDATECODE_REQUEST_RECEIVE = 'VALIDATECODE_REQUEST_RECEIVE';


export const requestStart = () => ({
	type: VALIDATEPHONE_REQUEST_START
});

export const requestError = () => ({
	type: VALIDATEPHONE_REQUEST_ERROR
});

export const requestReceive = (data) => ({
	type: VALIDATEPHONE_REQUEST_RECEIVE,
	...data
});

export const codeRequstStart = () => ({
	type: VALIDATECODE_REQUEST_START
});

export const codeRequstError = () => ({
	type: VALIDATECODE_REQUEST_ERROR
});

export const codeRequestReceive = (data) => ({
	type: VALIDATECODE_REQUEST_RECEIVE,
	...data
});

// 验证手机号码是否注册，如果注册，发送验证码
export const startValidate = (phone_num, success, fail) => {
	return (dispatch, getState) => {
		request_by_ajax("Mobile/Login/exist_phone",{phone_num: phone_num})
			.catch(() => dispatch(requestError()))
			.then((data) => {
				if (data.error_no === 0) {
					dispatch(requestStart());
					console.log("已注册，准备发送验证码");
					request_by_ajax("Mobile/Login/get_phone_vcode",{phone_num: phone_num})
						.catch(() => dispatch(requestError()))
						.then((data) => {
							dispatch(requestReceive({...data, phone_num}));
							if (data.error_no === 0) {
								//成功发送，调用success通知用户
								success();
							}else{
								//失败，调用fail通知用户
								fail(data.error_msg);
							}
						});
				}else {
					console.log("未注册或其他错误");
					fail(data.error_msg);
				}
			});
	};
};

// 验证验证码是否正确，如果正确，跳转修改密码页 
export const validateCode = (phone_num, vode, success, fail) => {
	return (dispatch, getState) => {
		dispatch(codeRequstStart());
		request_by_ajax("Mobile/Login/check_vcode",{phone_num: phone_num, vode: vode})
			.catch(()=>dispatch(codeRequstError()))
			.then((data)=>{
				dispatch(codeRequestReceive({...data, vode}));
				if (data.error_no === 0) {
					success();
				}else{
					fail(data.error_msg);
				}
			});
	}
}

// 验证修改密码是否成功
export const modifyPassword = (phone_num, vode, new_pwd, confirm_pwd, success, fail) => {
	return (dispatch, getState) => {
		request_by_ajax("Mobile/Login/edit_login_pwd",{phone_num, vode, new_pwd, confirm_pwd})
			.catch()
			.then((data) => {
				if (data.error_no === 0) {
					success();
				}else{
					fail(data.error_msg);
				}
			});
	}
}

