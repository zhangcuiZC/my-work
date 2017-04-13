import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import BasePage from './BasePage';
import NavBar from '../components/NavBar';
import ons from 'onsenui';
var Ons = require('react-onsenui');
import '../stylus/GetBackPassword.css';
import { Button, List, InputItem, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { modifyPassword } from '../actions/validatePhoneNum';

class AccessModifyPassword extends BasePage {
	constructor(props){
		super(props)
		this.state = {
			btn_disabled: true,
		}
	}

	renderToolbar = () => (
		<NavBar onBack={this.handleBack} title="修改密码" rightItem=" "/>
	);
	
	//------------------------------------------------------------------
	// 点击下一步
	handleNextStep = () => {
		this.props.form.validateFields((error, value) => {
			const new_pwd = value.new_pwd;
			const new_pwd_ag = value.new_pwd_ag;
			if (!new_pwd) {
				Toast.info('请输入新密码');
				return false;
			}else if (new_pwd.length < 6 || new_pwd.length > 20) {
				Toast.info('密码长度应为6-20位，请重新输入');
				return false;
			}
			if (!new_pwd_ag) {
				Toast.info('请再次输入密码');
				return false;
			}else if (new_pwd !== new_pwd_ag) {
				Toast.info('密码不一致，请重新输入');
				return false;
			}

			const { phone_num } = this.props.validateInfo.validatePhone;
			const { vode } = this.props.validateInfo.validateCode;

			if (!phone_num || !vode) {
				Toast.info('请验证手机号码后再执行修改');
				return false;
			}

			this.props.dispatch(modifyPassword(phone_num, vode, new_pwd, new_pwd_ag, this.successModify.bind(this), this.failModify.bind(this)));
		});

	}
	// 点击下一步-成功callback
	successModify = () => {
		this.pushRouter('/ModifyPasswordSuccess');
	}
	// 点击下一步-失败callback
	failModify = (msg) => {
		Toast.info(`${msg}`);
	}
	//------------------------------------------------------------------

	handleBlur = (value) => {
		if (value) {
			this.setState({btn_disabled: false});
		}else{
			this.setState({btn_disabled: true});
		}
	}
	
	render(){
		const { getFieldProps } = this.props.form;
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<div className="gbp_container">
					<List>
						<InputItem placeholder="请输入新密码" {...getFieldProps('new_pwd')} onBlur={this.handleBlur} type="password" maxLength={20}>新 密 码</InputItem>
					</List>
					<List>
						<InputItem placeholder="再输入新密码一次" {...getFieldProps('new_pwd_ag')} type="password" maxLength={20}>确认密码</InputItem>
					</List>
					<p className="modify_info">
						密码由6-20位英文字母，数字或符号组成
					</p>
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

export default connect(mapStateToProps)(withRouter(createForm()(AccessModifyPassword)));