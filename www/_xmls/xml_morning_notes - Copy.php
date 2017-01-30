<?php
//Sabah notları ile ilgili kodlar


//Çeşitli şekillerde girilen tarihi veritabanına girilecek hale gitiriyor.
function makeDate($d){
	$d=str_replace("/","-",$d);
	$d=str_replace(".","-",$d);
	$new_date=explode("-",$d);
	$d=$new_date[2]."-".$new_date[1]."-".$new_date[0];
	return $d;
}

//Veritabanından alınan yıl-ay-gün şeklindeki tarihi gün.ay.yıl şeklinde gösteriyor
function showDate($d){
	$new_date=explode("-",$d);
	$d=$new_date[2].".".$new_date[1].".".$new_date[0];
	return $d;
}


header("Content-type: text/xml");
echo "<?xml version='1.0' encoding='utf-8' ?>";

include("../_codes/php/modules.php");
include("../_codes/php/functions.php");


$userName=get_post_data_control(@$_POST["un"]);
$userPassword=get_post_data_control(@$_POST["p"]);
$xmlString=get_post_data_control(@$_POST["s"]);

//$userName="mci";
//$userPassword="123456";
//$xmlString="get-morning-note";
//$noteId="11";

$user=find_user($userName, md5($userPassword));

if(count($user)==1){
	
	$firstId=get_post_data_control(@$_POST["fId"]);//listeleme sayfasında kullanılıyor
	$lastId=get_post_data_control(@$_POST["lId"]);//listeleme sayfasında kullanılıyor
	$noteId=get_post_data_control(@$_POST["nId"]);//düzenleme (edit) sayfasında veri alırken kullanılıyor
	$noteId=get_post_data_control(@$_POST["note-id"]);//düzenleme (edit) sayfasında veri kaydederken kullanılıyor
	
	$restriction="";
	if($firstId>0){
		$restriction=" id>'".$firstId."'";
	}
	
	if($lastId>0){
		if($restriction!="") $restriction=$restriction." OR";
		$restriction=" id<'".$lastId."'";
	}
	if($restriction!="") $restriction=" WHERE".$restriction;
	//$restriction=" WHERE id>'".$firstId."' OR id<'".$lastId."'";
	
	$sql="SELECT * FROM `daily_notes`".$restriction." ORDER BY `id` DESC LIMIT 1";// ORDER BY `start` DESC";
	
	if($noteId!=""){//Düzenleme sayfası için gerekiyorsa bu sorgu kullanılacak
		$sql="SELECT * FROM `daily_notes` WHERE `id`='".$noteId."'";
	}
	$rsql_dnotes=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_departments`";
	$rsql_dndepartments=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_my_notes`";
	$rsql_dnmnotes=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_people`";
	$rsql_dnpeople=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_subjects`";
	$rsql_dnsubjects=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_targets` WHERE `active`='1'";
	$rsql_dntargets=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_prosecutions`";
	$rsql_dnprosec=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `departments`";
	$rsql_dep=db_fetch_assoc($sql);
	for($i=0;$i<count($rsql_dep);$i++){
		$depts[$rsql_dep[$i]["id"]]=$rsql_dep[$i]["name"];
	}
	
	$sql="SELECT * FROM `people`";
	$rsql_people=db_fetch_assoc($sql);
	for($i=0;$i<count($rsql_people);$i++){
		$people[$rsql_people[$i]["id"]]=$rsql_people[$i]["name"]." ".$rsql_people[$i]["surname"];
	}






	echo "<results>";
	
	if($xmlString=="get-morning-notes-list"){
		
		for($i=0;$i<count($rsql_dnotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dnotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dnotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dnotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dntargets);$j++){
                	if($rsql_dntargets[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dntargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<delay>".($rsql_dnotes[$i]["delay"]=="0" ? "" : $rsql_dnotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dnotes[$i]["header"]."</header>";
				
				
				for($j=0;$j<count($rsql_dnsubjects);$j++){
					if($rsql_dnsubjects[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<subject>".$rsql_dnsubjects[$j]["subject"]."</subject>";
					}
				}
				
				
				for($j=0;$j<count($rsql_dnmnotes);$j++){
					if($rsql_dnmnotes[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<myNote>".$rsql_dnmnotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dndepartments);$j++){
                    if($rsql_dndepartments[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<department>".$depts[$rsql_dndepartments[$j]["department_id"]]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dnpeople);$j++){
                    if($rsql_dnpeople[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<person>".$people[$rsql_dnpeople[$j]["person_id"]]."</person>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	
	elseif($xmlString=="submit-new-morning-note"){
		
		$sql="SELECT * FROM `departments` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql_dep=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `people` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql_people=db_fetch_assoc($sql);
		
		$var=0;
		$var2=0;
		$error_message="";
		
		$no=get_post_data_control(@$_POST["no"]);
		$start=makeDate(get_post_data_control(@$_POST["start"]));
		$target=$_POST["target"];
		$delay=get_post_data_control(@$_POST["delay"]);
		$finished=get_post_data_control(@$_POST["finished"]);
		$header=get_post_data_control(@$_POST["header"]);
		$subject=get_post_data_control(@$_POST["subject"]);
		$prosecution=get_post_data_control(@$_POST["prosecution"]);
		$my_notes=get_post_data_control(@$_POST["my-notes"]);
		$responsible_department=@$_POST["responsible-department"];
		$responsible_person=@$_POST["responsible-person"];
		//echo "<result>".$no."</result>";
		if(trim($no)=="" or trim($start)=="" or trim($subject)=="" or $responsible_department=="") $var=1;
		
		if($var==0){
			$finished=($finished=="on" ? "1" : "0");	
			$sql="INSERT INTO `daily_notes` (`id`, `no`, `start`, `header`, `finished`, `delay`, `active`) VALUES (NULL, '".$no."', '".$start."', '".$header."', '".$finished."', '0', '1')";
			mysqli_query($dbLink, $sql);
			$new_daily_note_id=mysqli_insert_id($dbLink);
			
			for($i=0;$i<count($target);$i++){
				if($target[$i]!=""){
					$target[$i]=makeDate(get_post_data_control($target[$i]));
					$sql="INSERT INTO `daily_notes_targets` (`id`, `daily_note_id`, `target`) VALUES (NULL, '".$new_daily_note_id."', '".$target[$i]."')";
					mysqli_query($dbLink, $sql);
				}
			}
			
			$sql="INSERT INTO `daily_notes_subjects` (`id`, `daily_note_id`, `subject`) VALUES (NULL, '".$new_daily_note_id."', '".$subject."')";
			//echo $sql;
			mysqli_query($dbLink, $sql);
			
			$sql="INSERT INTO `daily_notes_my_notes` (`id`, `daily_note_id`, `note`) VALUES (NULL, '".$new_daily_note_id."', '".$my_notes."')";
			mysqli_query($dbLink, $sql);
			
			$sql="INSERT INTO `daily_notes_prosecutions` (`id`, `daily_note_id`, `prosecution`) VALUES (NULL, '".$new_daily_note_id."', '".$prosecution."')";
			mysqli_query($dbLink, $sql);
			
			for($i=0;$i<count($responsible_department);$i++){
				$var2=0;
				$responsible_department[$i]=get_post_data_control($responsible_department[$i]);
				if($responsible_department[$i]!=0){
					for($k=0;$k<$i;$k++){
						if($responsible_department[$i]==$responsible_department[$k]){
							$var2=1;
							$k=$i;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_departments` (`id`, `daily_note_id`, `department_id`, `active`) VALUES (NULL, '".$new_daily_note_id."', '".$responsible_department[$i]."', '1')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			for($i=0;$i<count($responsible_person);$i++){
				$var2=0;
				$responsible_person[$i]=get_post_data_control($responsible_person[$i]);
				if($responsible_person[$i]!=0){
					for($k=0;$k<$i;$k++){
						if($responsible_person[$i]==$responsible_person[$k]){
							$var2=1;
							$k=$i;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_people` (`id`, `daily_note_id`, `person_id`, `active`) VALUES (NULL, '".$new_daily_note_id."', '".$responsible_person[$i]."', '1')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			if($finished==1){
				$sql="UPDATE `daily_notes` SET `delay`=DATEDIFF(
					(SELECT `target` FROM `daily_notes_targets` WHERE `daily_note_id`='".$new_daily_note_id."' ORDER BY `target` DESC LIMIT 1),
					(SELECT `target` FROM `daily_notes_targets` WHERE `daily_note_id`='".$new_daily_note_id."' ORDER BY `target` ASC LIMIT 1)
					) WHERE `id`='".$new_daily_note_id."'";
				mysqli_query($dbLink, $sql);
			}
			
			echo "<result>1</result>";
		}
		else{
			echo "<result>0</result>";
		}
	}
	
	
	
	
	elseif($xmlString=="get-morning-note"){
		
		for($i=0;$i<count($rsql_dnotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dnotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dnotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dnotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dntargets);$j++){
                	if($rsql_dntargets[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dntargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<finished>".$rsql_dnotes[$i]["finished"]."</finished>";
				echo "<delay>".($rsql_dnotes[$i]["delay"]=="0" ? "" : $rsql_dnotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dnotes[$i]["header"]."</header>";
				
				
				
				for($j=0;$j<count($rsql_dnsubjects);$j++){
					if($rsql_dnsubjects[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<subject>".$rsql_dnsubjects[$j]["subject"]."</subject>";
					}
				}
				
				
				for($j=0;$j<count($rsql_dnmnotes);$j++){
					if($rsql_dnmnotes[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<myNote>".$rsql_dnmnotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dndepartments);$j++){
                    if($rsql_dndepartments[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<department>".$rsql_dndepartments[$j]["department_id"]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dnpeople);$j++){
                    if($rsql_dnpeople[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<person>".$rsql_dnpeople[$j]["person_id"]."</person>";
                    }
                }
				
				for($j=0;$j<count($rsql_dnprosec);$j++){
                    if($rsql_dnprosec[$j]["daily_note_id"]==$rsql_dnotes[$i]["id"]){
						echo "<prosecution>".$rsql_dnprosec[$j]["prosecution"]."</prosecution>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	
	
	elseif($xmlString=="submit-edit-morning-note"){
		$noteId=get_post_data_control(@$_POST["note-id"]);//düzenleme (edit) sayfasında veri kaydederken kullanılıyor
		
		
		
		$sql="SELECT * FROM `daily_notes` WHERE `id`='".$noteId."'";
		$rsql_dnotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_departments` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dndepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dnmnotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dnpeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dnsubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dntargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dnprosec=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `departments`";
		$rsql_dep=db_fetch_assoc($sql);
		for($i=0;$i<count($rsql_dep);$i++){
			$depts[$rsql_dep[$i]["id"]]=$rsql_dep[$i]["name"];
		}
		
		$sql="SELECT * FROM `people`";
		$rsql_people=db_fetch_assoc($sql);
		for($i=0;$i<count($rsql_people);$i++){
			$people[$rsql_people[$i]["id"]]=$rsql_people[$i]["name"]." ".$rsql_people[$i]["surname"];
		}
		
		
		
		$sql="SELECT * FROM `departments` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql_dep=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `people` WHERE `active`='1' ORDER BY `name` ASC";
		$rsql_people=db_fetch_assoc($sql);
		
		$var=0;
		$var2=0;
		$error_message="";
		
		$no=get_post_data_control(@$_POST["no"]);
		$start=makeDate(get_post_data_control(@$_POST["start"]));
		$target=$_POST["target"];
		$delay=get_post_data_control(@$_POST["delay"]);
		$finished=get_post_data_control(@$_POST["finished"]);
		$header=get_post_data_control(@$_POST["header"]);
		$subject=get_post_data_control(@$_POST["subject"]);
		$prosecution=get_post_data_control(@$_POST["prosecution"]);
		$my_notes=get_post_data_control(@$_POST["my-notes"]);
		$responsible_department=@$_POST["responsible-department"];
		$responsible_person=@$_POST["responsible-person"];
		//echo "<result>".$no."</result>";
		if(trim($no)=="" or trim($start)=="" or trim($subject)=="" or $responsible_department=="") $var=1;
		
		if($var==0){
			$finished=($finished=="on" ? "1" : "0");	
			//$sql="INSERT INTO `daily_notes` (`id`, `no`, `start`, `header`, `finished`, `delay`, `active`) VALUES (NULL, '".$no."', '".$start."', '".$header."', '".$finished."', '0', '1')";
			$sql="UPDATE `daily_notes` SET `no`='".$no."', `start`='".$start."', `header`='".$header."', `finished`='".$finished."' WHERE `id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			//$new_daily_note_id=mysqli_insert_id($dbLink);
			
			
			$sql="UPDATE `daily_notes_targets` SET `active`='0' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			for($i=0;$i<count($target);$i++){
				if($target[$i]!=""){
					$target[$i]=makeDate(get_post_data_control($target[$i]));
					$var2=0;
					for($j=0;$j<count($rsql_dntargets);$j++){
						if($target[$i]==$rsql_dntargets[$j]["target"]){
							$sql="UPDATE `daily_notes_targets` SET `active`='1' WHERE `id`='".$rsql_dntargets[$j]["id"]."'";
							mysqli_query($dbLink, $sql);
							//array_splice($input, $i+1, 1);
							$var2=1;
							$i--;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_targets` (`id`, `daily_note_id`, `target`) VALUES (NULL, '".$new_daily_note_id."', '".$target[$i]."')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			
			$sql="UPDATE `daily_notes_subjects` SET `subject`='".$subject."' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			$sql="UPDATE `daily_notes_my_notes` SET `note`='".$new_daily_note_id."' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			$sql="UPDATE `daily_notes_prosecutions` SET `prosecution`='".$prosecution."' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			
			
			
			
			$sql="UPDATE `daily_notes_departments` SET `active`='0' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			for($i=0;$i<count($responsible_department);$i++){
				if($responsible_department[$i]!=""){
					//$responsible_department[$i]=makeDate(get_post_data_control($target[$i]));
					$var2=0;
					for($j=0;$j<count($rsql_dndepartments);$j++){
						if($responsible_department[$i]==$rsql_dndepartments[$j]["target"]){
							$sql="UPDATE `daily_notes_departments` SET `active`='1' WHERE `id`='".$rsql_dndepartments[$j]["id"]."'";
							mysqli_query($dbLink, $sql);
							//array_splice($input, $i+1, 1);
							$var2=1;
							$i--;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_targets` (`id`, `daily_note_id`, `target`, `active`) VALUES (NULL, '".$new_daily_note_id."', '".$responsible_department[$i]."', '1')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			
			for($i=0;$i<count($responsible_department);$i++){
				$var2=0;
				$responsible_department[$i]=get_post_data_control($responsible_department[$i]);
				if($responsible_department[$i]!=0){
					for($k=0;$k<$i;$k++){
						if($responsible_department[$i]==$responsible_department[$k]){
							$var2=1;
							$k=$i;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_departments` (`id`, `daily_note_id`, `department_id`, `active`) VALUES (NULL, '".$new_daily_note_id."', '".$responsible_department[$i]."', '1')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			for($i=0;$i<count($responsible_person);$i++){
				$var2=0;
				$responsible_person[$i]=get_post_data_control($responsible_person[$i]);
				if($responsible_person[$i]!=0){
					for($k=0;$k<$i;$k++){
						if($responsible_person[$i]==$responsible_person[$k]){
							$var2=1;
							$k=$i;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_people` (`id`, `daily_note_id`, `person_id`, `active`) VALUES (NULL, '".$new_daily_note_id."', '".$responsible_person[$i]."', '1')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			if($finished==1){
				$sql="UPDATE `daily_notes` SET `delay`=DATEDIFF(
					(SELECT `target` FROM `daily_notes_targets` WHERE `daily_note_id`='".$new_daily_note_id."' ORDER BY `target` DESC LIMIT 1),
					(SELECT `target` FROM `daily_notes_targets` WHERE `daily_note_id`='".$new_daily_note_id."' ORDER BY `target` ASC LIMIT 1)
					) WHERE `id`='".$new_daily_note_id."'";
				mysqli_query($dbLink, $sql);
			}
			
			echo "<result>1</result>";
		}
		else{
			echo "<result>0</result>";
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	elseif($xmlString=="change-department-rename"){
		$departmentId=@$_POST["di"];
		$name=@$_POST["n"];
				
		$sql="UPDATE `departments` SET `name`='".$name."' WHERE `id`='".$departmentId."' ";
		mysqli_query($dbLink, $sql);
		
		echo "<result>1</result>";
	}
	
	elseif($xmlString=="add-department"){
		$name=@$_POST["n"];
		
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