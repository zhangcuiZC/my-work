import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import BasePage from './BasePage';
import NavBar from '../components/NavBar';
import ons from 'onsenui';
var Ons = require('react-onsenui');
import '../stylus/GetBackPassword.css';
import { Button, Toast } from 'antd-mobile';
// import AccessModifyPassword from './AccessModifyPassword';
import {request_by_ajax} from '../api';
import { startValidate, validateCode } from '../actions/validatePhoneNum';

class GetBackPassword extends BasePage {
	constructor(props){
		super(props);
		this.state = {
			btn_disabled: true,
			code_btn_disabled: false,
			code_count: 0,
			is_unmount: false,
		};
	}

	renderToolbar = () => (
		<NavBar onBack={this.handleBack} title="验证手机号" rightItem=" "/>
	);
	//------------------------------------------------------------------
	//点击下一步
	handleNextStep = () => {
		const phone_code = this.refs.phone_code.value;
		const phone_num = this.props.validateInfo.validatePhone.phone_num;
		if (phone_code && phone_num) {
			//如果验证码不为空，验证输入的验证码与发送的验证码是否匹配
			this.props.dispatch(validateCode(phone_num, phone_code, this.codeCorrect.bind(this), this.notSendCode.bind(this)));
		}else{
			//如果为空，提示输入
			Toast.info('请输入验证码',1,()=>this.refs.phone_code.select(),false);
		}
	}
	// 点击下一步-成功callback
	codeCorrect = () => {
		this.pushRouter('/AccessModifyPassword');
	}
	//------------------------------------------------------------------
	//------------------------------------------------------------------
	//点击获取验证码
	getCode = () => {
		const phone_num = this.refs.phone_num.value;
		const reg=/^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])[0-9]{8}$/;
		if (!phone_num) {
			Toast.info('请输入绑定的手机号码',1,()=>this.refs.phone_num.select(),false);
		}else if (!reg.test(phone_num)) {
			Toast.info('手机号格式不正确',1,()=>this.refs.phone_num.select(),false);
		}else{
			this.props.dispatch(startValidate(phone_num, this.sendCode.bind(this, phone_num), this.notSendCode.bind(this)));
		}
		
	}

	// 点击获取验证码-成功callback
	sendCode = (phone_num) => {
		Toast.info(`验证码已发送至${phone_num}`,2,null,false);
		this.setState({code_count: 60, code_btn_disabled: true});
		this.startCounter();
		this.setState({btn_disabled: false});
	}
	// 点击获取验证码/点击下一步-失败callback
	notSendCode = (msg) => {
		Toast.info(`${msg}`);
	}

	// 点击获取验证码-成功callback-用于倒计时的函数
	startCounter = () => {
		setTimeout(()=>{
			const count_num = this.state.code_count;
			if (!this.state.is_unmount && count_num > 0) {
				this.setState({code_count: count_num - 1}, this.startCounter());
			}else{
				// 如果组件已销毁或count到0，不再setTimeout
				this.setState({code_btn_disabled: false});
			}
		}, 1000);
	}
	//------------------------------------------------------------------
	//------------------------------------------------------------------
	// 更改手机号码后使发送验证码可点
	handlePhoneChange = () => {
		if (this.state.code_btn_disabled) {
			this.setState({code_btn_disabled: false, code_count: 0});
		}
	}
	// flag指示组件卸载状态
	componentWillUnmount = () => {
		this.state.is_unmount = true;
	}
	//------------------------------------------------------------------

	render(){
		const code_text = this.state.code_count === 0 ? '获取验证码' : this.state.code_count + 's';
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<div className="gbp_container">
					<input ref="phone_num" className="p1" type="text" placeholder="请输入绑定的手机号码" onChange={this.handlePhoneChange} />
					<div className="code_box">
						<input ref="phone_code" className="p1" type="text" placeholder="请输入验证码"/>
						<Button className="code_btn" type="primary" size="small" inline onClick={this.getCode} disabled={this.state.code_btn_disabled}>{code_text}</Button>
					</div>
					<Button className="btn" type="primary" onClick={this.handleNextStep} disabled={this.state.btn_disabled}>下一步</Button>
				</div>
			</Ons.Page>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		validateInfo: state.validatePhone
	}
}

export default connect(mapStateToProps)(withRouter(GetBackPassword));