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

//$userName="mci";
//$userPassword="123456";
//$xmlString="get-department-list";

$user=find_user($userName, md5($userPassword));

if(count($user)==1){

	echo "<results>";
	
	
	if($xmlString=="get-department-list"){
		$sql="SELECT * FROM `departments` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql=db_fetch_assoc($sql);
		
		for($i=0;$i<count($rsql);$i++){
			echo "<result>";
				echo "<id>".$rsql[$i]["id"]."</id>";
				echo "<name>".$rsql[$i]["name"]."</name>";
			echo "</result>";
		}
	}
	
	
	elseif($xmlString=="change-department-delete"){
		$departmentId=get_post_data_control(@$_POST["di"]);
		
		$sql="UPDATE `departments` SET `active`='0' WHERE `id`='".$departmentId."' ";
		mysqli_query($dbLink, $sql);
		
		echo "<result>1</result>";
	}
	
	elseif($xmlString=="change-department-rename"){
		$departmentId=get_post_data_control(@$_POST["di"]);
		$name=@$_POST["n"];
				
		$sql="UPDATE `departments` SET `name`='".$name."' WHERE `id`='".$departmentId."' ";
		mysqli_query($dbLink, $sql);
		
		echo "<result>1</result>";
	}
	
	elseif($xmlString=="add-department"){
		$name=get_post_data_control(@$_POST["n"]);
		
		$sql="SELECT * FROM `departments` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql_departments=db_fetch_assoc($sql);
		$var=0;
		for($i=0;$i<count($rsql_departments);$i++){
			if(strtolower($rsql_departments[$i]["name"])==strtolower($name)){
				$i=count($rsql_departments);
				$var=1;
			}
		}
		if($var==0){
		
			$sql="INSERT INTO `department` (`id`, `name`, `active`) VALUES (NULL, '".$name."', '1')";
			mysqli_query($dbLink, $sql);
			
			echo "<result>1</result>";
		}
		else{
			echo "<result>0</result>";
		}
	}
	
	echo "</results>";

}
?>