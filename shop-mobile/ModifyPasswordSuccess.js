import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import BasePage from './BasePage';
import NavBar from '../components/NavBar';
import ons from 'onsenui';
var Ons = require('react-onsenui');
import '../stylus/GetBackPassword.css';
import { Button, List, InputItem } from 'antd-mobile';
import LoginPage from './LoginPage';

class ModifyPasswordSuccess extends BasePage {
	constructor(props){
		super(props);
		this.handleLogin=this.handleLogin.bind(this);
	}

	renderToolbar = () => (
		<NavBar onBack={this.handleBack} title="修改密码" rightItem=" "/>
	);

	handleLogin = () => {
		this.pushPage(LoginPage);
	}

	handleHome = () => {
		this.pushRouter('/home');
	}
	
	render(){
		return (
			<Ons.Page renderToolbar={this.renderToolbar}>
				<div className="gbp_container">
					<p className="modify_success">
						<span>修改密码成功</span>
					</p>
					<Button className="btn to_login" type="primary" onClick={this.handleLogin}>登 录</Button>
					<Button className="btn to_home" type="primary" onClick={this.handleHome}>首 页</Button>
				</div>
			</Ons.Page>
		);
	}
}

export default withRouter(ModifyPasswordSuccess);