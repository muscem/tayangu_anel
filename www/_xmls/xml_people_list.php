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
//$xmlString="get_people_list";

$user=find_user($userName, md5($userPassword));

if(count($user)==1){

	echo "<results>";
	
	
	if($xmlString=="get-people-list"){
		$sql="SELECT * FROM `people` WHERE `active`='1' ORDER BY `name`, `surname` ASC";
		$rsql=db_fetch_assoc($sql);
		
		for($i=0;$i<count($rsql);$i++){
			echo "<result>";
				echo "<id>".$rsql[$i]["id"]."</id>";
				echo "<name>".$rsql[$i]["name"]."</name>";
				echo "<surname>".$rsql[$i]["surname"]."</surname>";
				echo "<working>".$rsql[$i]["working"]."</working>";
			echo "</result>";
		}
	}
	
	
	
	elseif($xmlString=="change-person-status"){
		$personId=get_post_data_control(@$_POST["pi"]);
		$personStatus=get_post_data_control(@$_POST["ps"]);
		
		$sql="UPDATE `people` SET `working`='".$personStatus."' WHERE `id`='".$personId."' ";
		mysqli_query($dbLink, $sql);
		
		echo "<result>1</result>";
	}
	
	
	elseif($xmlString=="change-person-delete"){
		$personId=get_post_data_control(@$_POST["pi"]);
		
		$sql="UPDATE `people` SET `working`='0', `active`='0' WHERE `id`='".$personId."' ";
		mysqli_query($dbLink, $sql);
		
		echo "<result>1</result>";
	}
	
	elseif($xmlString=="change-person-rename"){
		$personId=get_post_data_control(@$_POST["pi"]);
		$name=get_post_data_control(@$_POST["n"]);
		$surname=get_post_data_control(@$_POST["sn"]);
		
		$sql="UPDATE `people` SET `name`='".$name."', `surname`='".$surname."' WHERE `id`='".$personId."' ";
		mysqli_query($dbLink, $sql);
		
		echo "<result>1</result>";
	}
	
	elseif($xmlString=="add-person"){
		$name=get_post_data_control(@$_POST["n"]);
		$surname=get_post_data_control(@$_POST["sn"]);
		
		$sql="SELECT * FROM `people` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql_people=db_fetch_assoc($sql);
		$var=0;
		for($i=0;$i<count($rsql_people);$i++){
			if(strtolower($rsql_people[$i]["name"])==strtolower($name) & strtolower($rsql_people[$i]["surname"])==strtolower($surname)){
				$i=count($rsql_people);
				$var=1;
			}
		}
		if($var==0){
		
			$sql="INSERT INTO `people` (`id`, `name`, `surname`, `working`, `active`) VALUES (NULL, '".$name."', '".$surname."', '1', '1')";
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