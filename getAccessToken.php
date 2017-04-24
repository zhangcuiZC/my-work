<?php
	define("appid", "wxbd5496ca8ff2f172");
	define("appsecret", "c239146ea79caef703bf7d2b1c33fff1");

	//获取access_token，每7000s重新获取
	function getAccessToken() {
		$tokenFile = "./access_token.txt";
		$data = json_decode(file_get_contents($tokenFile));

		if ($data->expire_time < time() || !$data->expire_time) {
			$appid = appid;
	    	$appsecret = appsecret;
			$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appid&secret=$appsecret";
			$res = json_decode(file_get_contents($url));
			$access_token = $res->access_token;
			if($access_token) {
				$data_new['expire_time'] = time() + 7000;
				$data_new['access_token'] = $access_token;
				file_put_contents($tokenFile, json_encode($data_new));
			}
		}else{
			$access_token = $data->access_token;
		}
		return $access_token;
	}

	// var_dump(getAccessToken());
?>