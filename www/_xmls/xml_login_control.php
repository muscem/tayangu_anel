<?php
//Kullanıcı kontrolü
//kullanıcı adı ve şifresi verilen kullanıcı varsa 1 dönüyor, yoksa 0 dönüyor

header("Content-type: text/xml");
echo "<?xml version='1.0' encoding='utf-8' ?>";

include("../_codes/php/modules.php");
include("../_codes/php/functions.php");


$userName=get_post_data_control(@$_POST["un"]);
$userPassword=get_post_data_control(@$_POST["p"]);
$xmlString=get_post_data_control(@$_POST["s"]);

/*$user_name="mci";
$user_password="123456";
$search_string="login_check";*/

echo "<results>";
if($xmlString=="user_login_control"){
	$sql="SELECT * FROM users WHERE username='".$userName."' AND password='".md5($userPassword)."' AND active='1'";
	$rsql=db_fetch_assoc($sql);
	
	if(count($rsql)==1){
		echo "<result>1</result>";
	}
	else{
		echo "<result>0</result>";
	}
}
echo "</results>";
?>