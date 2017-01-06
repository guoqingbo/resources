<?php
session_start();
include_once("mysql.php");//连接数据库 

 //生成随机验证码
function createtoken() {
   $codes = "0123456789";
   $code = "";
   for($i=0; $i < 6; $i++) {
    $code .=$codes{rand(0, strlen($codes)-1)}; 
   }
   return strtolower($code);
} 
//发送邮件 
function sendmail($time,$email,$token){ 
	include_once("smtp.class.php"); 
	$smtpserver = "smtp.126.com"; //SMTP服务器，如smtp.163.com 
	$smtpserverport = 25; //SMTP服务器端口 
	$smtpusermail = "zhenchuang2016@126.com"; //SMTP服务器的用户邮箱 
	$smtpuser = "zhenchuang2016"; //SMTP服务器的用户帐号 
	$smtppass = "zhenchuang2016"; //SMTP服务器的用户密码  
	$emailtype = "HTML"; //信件类型，文本:text；网页：HTML 
	$smtpemailto = $email; 
	$smtpemailfrom = $smtpusermail; 
	$emailsubject = "找回密码"; 
	$emailbody = "亲爱的".$email.":<br/>您在".$time."提交了找回密码请求。请求的验证码为".$token."(2小时内有效),请及时更改密码"; 
	$smtp = new Smtp($smtpserver, $smtpserverport, true, $smtpuser, $smtppass); 
	//这里面的一个true是表示使用身份验证,否则不使用身份验证.
//	$smtp->debug = true;
	$rs = $smtp->sendmail($smtpemailto, $smtpemailfrom, $emailsubject, $emailbody, $emailtype); 
	return $rs;
}

$email = $_REQUEST['email'];
//$email ="zhenchuang2016@126.com";
//$email ="15855413165@163.com";
//$email ="2856058001@qq.com";
$getpasstime = time(); 
$token = createtoken();//生成验证码 
$_SESSION['token']=$token;
$time = date('Y-m-d H:i'); 
$res = sendmail($time,$email,$token); 
//var_dump($res);
if($res){//邮件发送成功 
	$msg = 1; 
	//更新数据发送时间 
	$conn->query("update userlogin set passtime='$getpasstime' where email='$email'"); 
}else{ 		 
	$msg = 0; 
} 
echo $msg; 
	
?>