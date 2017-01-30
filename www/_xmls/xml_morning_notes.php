<?php
//Sabah notları ile ilgili kodlar


//Çeşitli şekillerde girilen tarihi veritabanına girilecek hale gitiriyor.
function makeDate($d){
	if($d!=""){
		$d=str_replace("/","-",$d);
		$d=str_replace(".","-",$d);
		$new_date=explode("-",$d);
		$d=$new_date[2]."-".$new_date[1]."-".$new_date[0];
	}
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
//$xmlString="get-morning-note-to-show";
//$noteId="11";

$user=find_user($userName, md5($userPassword));

if(count($user)==1){
/*	
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
	$rsql_dNotes=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_departments`";
	$rsql_dNDepartments=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_my_notes`";
	$rsql_dNMNotes=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_people`";
	$rsql_dNPeople=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_subjects`";
	$rsql_dNSubjects=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_targets` WHERE `active`='1'";
	$rsql_dNTargets=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `daily_notes_prosecutions`";
	$rsql_dNProsec=db_fetch_assoc($sql);
	
	$sql="SELECT * FROM `departments`";
	$rsql_dep=db_fetch_assoc($sql);
	for($i=0;$i<count($rsql_dep);$i++){
		$depts[$rsql_dep[$i]["id"]]=$rsql_dep[$i]["name"];
	}
	
	$sql="SELECT * FROM `people`";
	$rsql_people=db_fetch_assoc($sql);
	for($i=0;$i<count($rsql_people);$i++){
		$people[$rsql_people[$i]["id"]]=$rsql_people[$i]["name"]." ".$rsql_people[$i]["surname"];
	}*/






	echo "<results>";
	
	if($xmlString=="get-morning-notes-list"){
		$firstId=get_post_data_control(@$_POST["fId"]);//listeleme sayfasında kullanılıyor
		$lastId=get_post_data_control(@$_POST["lId"]);//listeleme sayfasında kullanılıyor
		
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
		$rsql_dNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_departments`";
		$rsql_dNDepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes`";
		$rsql_dNMNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people`";
		$rsql_dNPeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects`";
		$rsql_dNSubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets` WHERE `active`='1'";
		$rsql_dNTargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions`";
		$rsql_dNProsec=db_fetch_assoc($sql);
		
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
	
		for($i=0;$i<count($rsql_dNotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dNotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dNotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dNotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dNTargets);$j++){
                	if($rsql_dNTargets[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dNTargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<delay>".($rsql_dNotes[$i]["delay"]=="0" ? "" : $rsql_dNotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dNotes[$i]["header"]."</header>";
				
				
				for($j=0;$j<count($rsql_dNSubjects);$j++){
					if($rsql_dNSubjects[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<subject>".$rsql_dNSubjects[$j]["subject"]."</subject>";
					}
				}
				
				for($j=0;$j<count($rsql_dNProsec);$j++){
					if($rsql_dNProsec[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<prosecution>".$rsql_dNProsec[$j]["prosecution"]."</prosecution>";
					}
				}
				
				for($j=0;$j<count($rsql_dNMNotes);$j++){
					if($rsql_dNMNotes[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<myNote>".$rsql_dNMNotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dNDepartments);$j++){
                    if($rsql_dNDepartments[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<department>".$depts[$rsql_dNDepartments[$j]["department_id"]]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dNPeople);$j++){
                    if($rsql_dNPeople[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<person>".$people[$rsql_dNPeople[$j]["person_id"]]."</person>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	
	elseif($xmlString=="submit-new-morning-note"){
		
		//$sql="SELECT * FROM `departments` WHERE `active`='1' ORDER BY `name` ASC";
		$sql="SELECT * FROM `departments`";
		$rsql_dep=db_fetch_assoc($sql);
		
		//$sql="SELECT * FROM `people` WHERE `active`='1' ORDER BY `name` ASC";
		$sql="SELECT * FROM `people`";
		$rsql_people=db_fetch_assoc($sql);
		
		$var=0;
		$var2=0;
		
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
		
		if(trim($no)=="" or trim($start)=="" or trim($subject)=="" or $responsible_department=="") $var=1;
		
		if($var==0){
			$finished=($finished=="on" ? "1" : "0");	
			$sql="INSERT INTO `daily_notes` (`id`, `no`, `start`, `header`, `finished`, `delay`, `active`) VALUES (NULL, '".$no."', '".$start."', '".$header."', '".$finished."', '0', '1')";
			mysqli_query($dbLink, $sql);
			$new_daily_note_id=mysqli_insert_id($dbLink);
			
			for($i=0;$i<count($target);$i++){
				if($target[$i]!=""){
					$target[$i]=makeDate(get_post_data_control($target[$i]));
					$sql="INSERT INTO `daily_notes_targets` (`id`, `daily_note_id`, `target`, `active`) VALUES (NULL, '".$new_daily_note_id."', '".$target[$i]."', '1')";
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
		
		
		$noteId=get_post_data_control(@$_POST["nId"]);//düzenleme (edit) sayfasında veri alırken kullanılıyor
		//$noteId="11";
		
		$sql="SELECT * FROM `daily_notes` WHERE `id`='".$noteId."'";		
		$rsql_dNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_departments` WHERE `daily_note_id`='".$noteId."' AND `active`='1'";
		$rsql_dNDepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNMNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people` WHERE `daily_note_id`='".$noteId."' AND `active`='1'";
		$rsql_dNPeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNSubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets`  WHERE `daily_note_id`='".$noteId."' AND `active`='1'";
		$rsql_dNTargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNProsec=db_fetch_assoc($sql);
		
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
		
		
		for($i=0;$i<count($rsql_dNotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dNotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dNotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dNotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dNTargets);$j++){
                	if($rsql_dNTargets[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dNTargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<finished>".$rsql_dNotes[$i]["finished"]."</finished>";
				echo "<delay>".($rsql_dNotes[$i]["delay"]=="0" ? "" : $rsql_dNotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dNotes[$i]["header"]."</header>";
				
				
				
				for($j=0;$j<count($rsql_dNSubjects);$j++){
					if($rsql_dNSubjects[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<subject>".$rsql_dNSubjects[$j]["subject"]."</subject>";
					}
				}
												
				for($j=0;$j<count($rsql_dNMNotes);$j++){
					if($rsql_dNMNotes[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<myNote>".$rsql_dNMNotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dNDepartments);$j++){
                    if($rsql_dNDepartments[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<department>".$rsql_dNDepartments[$j]["department_id"]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dNPeople);$j++){
                    if($rsql_dNPeople[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<person>".$rsql_dNPeople[$j]["person_id"]."</person>";
                    }
                }
				
				for($j=0;$j<count($rsql_dNProsec);$j++){
                    if($rsql_dNProsec[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<prosecution>".$rsql_dNProsec[$j]["prosecution"]."</prosecution>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	
	
	elseif($xmlString=="submit-edit-morning-note"){
		$noteId=get_post_data_control(@$_POST["note-id"]);//düzenleme (edit) sayfasında veri kaydederken kullanılıyor
		
		
		
		$sql="SELECT * FROM `daily_notes` WHERE `id`='".$noteId."'";
		$rsql_dNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_departments` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNDepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNMNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNPeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNSubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNTargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNProsec=db_fetch_assoc($sql);
		
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
		
		if(trim($no)=="" or trim($start)=="" or trim($subject)=="" or $responsible_department=="") $var=1;
		
		if($var==0){
			$finished=($finished=="on" ? "1" : "0");	
			
			$sql="UPDATE `daily_notes` SET `no`='".$no."', `start`='".$start."', `header`='".$header."', `finished`='".$finished."' WHERE `id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			
			$sql="UPDATE `daily_notes_targets` SET `active`='0' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			for($i=0;$i<count($target);$i++){
				if($target[$i]!=""){
					$target[$i]=makeDate(get_post_data_control($target[$i]));
					$var2=0;
					for($j=0;$j<count($rsql_dNTargets);$j++){
						if($target[$i]==$rsql_dNTargets[$j]["daily_note_id"]){
							$sql="UPDATE `daily_notes_targets` SET `active`='1' WHERE `id`='".$rsql_dNTargets[$j]["id"]."'";
							mysqli_query($dbLink, $sql);
							//array_splice($input, $i+1, 1);
							$var2=1;
							$i--;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_targets` (`id`, `daily_note_id`, `target`) VALUES (NULL, '".$note_id."', '".$target[$i]."')";
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
					$var2=0;
					for($j=0;$j<count($rsql_dNDepartments);$j++){
						if($responsible_department[$i]==$rsql_dNDepartments[$j]["daily_note_id"]){
							$sql="UPDATE `daily_notes_departments` SET `active`='1' WHERE `id`='".$rsql_dNDepartments[$j]["id"]."'";
							mysqli_query($dbLink, $sql);
							$var2=1;
							$i--;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_departments` (`id`, `daily_note_id`, `department_id`, `active`) VALUES (NULL, '".$noteId."', '".$responsible_department[$i]."', '1')";
						mysqli_query($dbLink, $sql);
					}
				}
			}
			
			
			
			
			
			$sql="UPDATE `daily_notes_people` SET `active`='0' WHERE `daily_note_id`='".$noteId."'";
			mysqli_query($dbLink, $sql);
			
			for($i=0;$i<count($responsible_person);$i++){
				if($responsible_person[$i]!=""){
					$var2=0;
					for($j=0;$j<count($rsql_dNPeople);$j++){
						if($responsible_person[$i]==$rsql_dNPeople[$j]["daily_note_id"]){
							$sql="UPDATE `daily_notes_people` SET `active`='1' WHERE `id`='".$rsql_dNPeople[$j]["id"]."'";
							mysqli_query($dbLink, $sql);
							$var2=1;
							$i--;
						}
					}
					if($var2==0){
						$sql="INSERT INTO `daily_notes_people` (`id`, `daily_note_id`, `person_id`, `active`) VALUES (NULL, '".$noteId."', '".$responsible_person[$i]."', '1')";
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
	
	
	
	
	elseif($xmlString=="search-morning-note"){
		$firstId=get_post_data_control(@$_POST["fId"]);//listeleme sayfasında kullanılıyor
		$lastId=get_post_data_control(@$_POST["lId"]);//listeleme sayfasında kullanılıyor
		$search_keyword=get_post_data_control(@$_POST["sk"]);
		
//		$firstId=17;
//		$lastId=17;
//		$search_keyword="a";
		
		
		$restriction="";
		if($firstId>0){
			$restriction=" `id`>'".$firstId."'";
		}
		
		if($lastId>0){
			if($restriction!="") $restriction=$restriction." OR";
			$restriction=" `id`<'".$lastId."'";
		}
		if($restriction!="") $restriction=" WHERE".$restriction;
		
		
		
		
		
		$sql="
		SELECT * FROM `daily_notes` WHERE `no` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT * FROM `daily_notes` WHERE `header` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_departments` WHERE `department_id` = ANY ( SELECT id FROM `departments` WHERE `name` LIKE '%".$search_keyword."%'))
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_my_notes` WHERE `note` LIKE '%".$search_keyword."%')			
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_people` WHERE `person_id` = ANY ( SELECT id FROM `people` WHERE `name` LIKE '%".$search_keyword."%' OR `surname` LIKE '%".$search_keyword."%'))
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_prosecutions` WHERE `prosecution` LIKE '%".$search_keyword."%')
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_subjects` WHERE `subject` LIKE '%".$search_keyword."%')
		
		ORDER BY `id` DESC
		";
		
		$sql="SELECT * FROM (".$sql.") t".$restriction." LIMIT 1";
		//echo $sql;
		//exit();
/*		$sql2="
		SELECT `id` FROM `daily_notes` WHERE `no` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT `id` FROM `daily_notes` WHERE `header` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_departments` WHERE `department_id` = ANY ( SELECT id FROM `departments` WHERE `name` LIKE '%".$search_keyword."%'))
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_my_notes` WHERE `note` LIKE '%".$search_keyword."%')			
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_people` WHERE `person_id` = ANY ( SELECT id FROM `people` WHERE `name` LIKE '%".$search_keyword."%' OR `surname` LIKE '%".$search_keyword."%'))
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_prosecutions` WHERE `prosecution` LIKE '%".$search_keyword."%')
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_subjects` WHERE `subject` LIKE '%".$search_keyword."%')
		
		ORDER BY `id` DESC LIMIT 1
		";
		$sql2=" WHERE `daily_note_id` = ANY (SELECT * FROM (".$sql2.") t".$restriction.")";*/
		
		//$sql="SELECT * FROM `daily_notes`".$restriction." ORDER BY `id` DESC LIMIT 1";// ORDER BY `start` DESC";
		
		$rsql_dNotes=db_fetch_assoc($sql);
		
		$sql2=" WHERE `daily_note_id`= ANY (SELECT id FROM (".$sql.") As t2)";
		
		$sql="SELECT * FROM `daily_notes_departments`".$sql2;
		$rsql_dNDepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes`".$sql2;
		$rsql_dNMNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people`".$sql2;
		$rsql_dNPeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects`".$sql2;
		$rsql_dNSubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets`".$sql2;
		$rsql_dNTargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions`".$sql2;
		$rsql_dNProsec=db_fetch_assoc($sql);
		
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
	
		for($i=0;$i<count($rsql_dNotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dNotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dNotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dNotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dNTargets);$j++){
                	if($rsql_dNTargets[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dNTargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<delay>".($rsql_dNotes[$i]["delay"]=="0" ? "" : $rsql_dNotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dNotes[$i]["header"]."</header>";
				
				
				for($j=0;$j<count($rsql_dNSubjects);$j++){
					if($rsql_dNSubjects[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<subject>".$rsql_dNSubjects[$j]["subject"]."</subject>";
					}
				}
				
				
				for($j=0;$j<count($rsql_dNMNotes);$j++){
					if($rsql_dNMNotes[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<myNote>".$rsql_dNMNotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dNDepartments);$j++){
                    if($rsql_dNDepartments[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<department>".$depts[$rsql_dNDepartments[$j]["department_id"]]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dNPeople);$j++){
                    if($rsql_dNPeople[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<person>".$people[$rsql_dNPeople[$j]["person_id"]]."</person>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	
	elseif($xmlString=="search-advanced-morning-note"){
		$firstId=get_post_data_control(@$_POST["fId"]);//listeleme sayfasında kullanılıyor
		$lastId=get_post_data_control(@$_POST["lId"]);//listeleme sayfasında kullanılıyor
		
//		$firstId=17;
//		$lastId=17;
//		$search_keyword="a";

		$restriction="";
		if($firstId>0){
			$restriction=" id>'".$firstId."'";
		}
		
		if($lastId>0){
			if($restriction!="") $restriction=$restriction." OR";
			$restriction=" id<'".$lastId."'";
		}
		if($restriction!="") $restriction=" WHERE".$restriction;
		
		
		
		$search_keyword=get_post_data_control(@$_POST["sk"]);
		
		
		$no1=get_post_data_control(@$_POST["no1"]);
		$no2=get_post_data_control(@$_POST["no2"]);
		$start1=makeDate(get_post_data_control(@$_POST["start1"]));
		$start2=makeDate(get_post_data_control(@$_POST["start2"]));
		$target1=makeDate(get_post_data_control(@$_POST["target1"]));
		$target2=makeDate(get_post_data_control(@$_POST["target2"]));
		$delay1=get_post_data_control(@$_POST["delay1"]);
		$delay2=get_post_data_control(@$_POST["delay2"]);
		$finished=get_post_data_control(@$_POST["finished"]);
		$header=get_post_data_control(@$_POST["header"]);
		$subject=get_post_data_control(@$_POST["subject"]);
		$prosecution=get_post_data_control(@$_POST["prosecution"]);
		$my_notes=get_post_data_control(@$_POST["my-notes"]);
		$responsible_department=@$_POST["responsible-department"];
		$responsible_person=@$_POST["responsible-person"];
		
		//$no1="1";
		
		$sql="";
		
		if($no1!="" & $no2==""){
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `no` LIKE '%".$no1."%'";
		}
		elseif($no1!="" & $no2!=""){
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `no` >= '".$no1."' AND `no` <= '".$no2."' ";
		}
		
		if($start1!="" & $start2==""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `start` LIKE '%".$start1."%'";
		}
		elseif($start1!="" & $start2!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `start` >= '".$start1."' AND `start` <= '".$start2."' ";
		}
		
		if($target1!="" & $target2==""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `id` = ANY (SELECT `daily_note_id` FROM `daily_notes_targets` WHERE `target`='".$target1."')";
		}
		elseif($target1!="" & $target2!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `id` = ANY (SELECT `daily_note_id` FROM `daily_notes_targets` WHERE `target`>='".$target1."' AND `target`>='".$target2."')";
		}
		
		if($delay1!="" & $delay2==""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `delay` LIKE '%".$delay1."%'";
		}
		elseif($delay1!="" & $delay2!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `delay` >= '".$delay1."' AND `delay` <= '".$delay2."' ";
		}
		
		if($finished=="") $finished=2;
		if($finished==0 or $finished==1){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `finished`='".$finished."'";
		}
		
		if($header!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `header` LIKE '%".$header."%'";
		}
		
		if($subject!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE `id` = ANY (SELECT `daily_note_id` FROM `daily_notes_subjects` WHERE `subject` LIKE '%".$subject."%')";
		}
		
		
		if($prosecution!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_prosecutions` WHERE `prosecution` LIKE '%".$prosecution."%')";
		}
		
		if($my_notes!=""){
			if($sql!="") $sql=$sql." UNION ";
			$sql=$sql."SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_my_notes` WHERE `note` LIKE '%".$my_notes."%')";
		}
		
		
		if(count($responsible_department)>0){
			$sql3="";
			for($i=0;$i<count($responsible_department);$i++){
				$responsible_department[$i]=get_post_data_control($responsible_department[$i]);
				if($sql3!="") $sql3=$sql3." AND";
				$sql3=$sql3." `department_id`='".$responsible_department[$i]."'";
				
			}
			if($sql3!=""){
				if($sql!="") $sql=$sql." UNION ";
				$sql=$sql."SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_departments` WHERE ".$sql3.")";
			}
		}
		
		
		
		if(count($responsible_person)>0){
			$sql3="";
			for($i=0;$i<count($responsible_person);$i++){
				$responsible_person[$i]=get_post_data_control($responsible_person[$i]);
				if($sql3!="") $sql3=$sql3." AND";
				$sql3=$sql3." `department_id`='".$responsible_person[$i]."'";
				
			}
			if($sql3!=""){
				if($sql!="") $sql=$sql." UNION ";
				$sql=$sql."SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_people` WHERE ".$sql3.")";
			}
		}
		
		
		$sql="SELECT * FROM (".$sql." ORDER BY `id` DESC) t".$restriction." LIMIT 1";
		
		//echo $sql;
		
		
/*		$sql="
		SELECT * FROM `daily_notes` WHERE `no` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT * FROM `daily_notes` WHERE `header` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_departments` WHERE `department_id` = ANY ( SELECT id FROM `departments` WHERE `name` LIKE '%".$search_keyword."%'))
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_my_notes` WHERE `note` LIKE '%".$search_keyword."%')			
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_people` WHERE `person_id` = ANY ( SELECT id FROM `people` WHERE `name` LIKE '%".$search_keyword."%' OR `surname` LIKE '%".$search_keyword."%'))
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_prosecutions` WHERE `prosecution` LIKE '%".$search_keyword."%')
		UNION
		SELECT * FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_subjects` WHERE `subject` LIKE '%".$search_keyword."%')
		
		ORDER BY `id` DESC LIMIT 1
		";
		
		$sql="SELECT * FROM (".$sql.") t".$restriction;*/
		
/*		$sql2="
		SELECT `id` FROM `daily_notes` WHERE `no` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT `id` FROM `daily_notes` WHERE `header` LIKE '%".$search_keyword."%' OR `delay` LIKE '%".$search_keyword."%'
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_departments` WHERE `department_id` = ANY ( SELECT id FROM `departments` WHERE `name` LIKE '%".$search_keyword."%'))
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_my_notes` WHERE `note` LIKE '%".$search_keyword."%')			
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_people` WHERE `person_id` = ANY ( SELECT id FROM `people` WHERE `name` LIKE '%".$search_keyword."%' OR `surname` LIKE '%".$search_keyword."%'))
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_prosecutions` WHERE `prosecution` LIKE '%".$search_keyword."%')
		UNION
		SELECT `id` FROM `daily_notes` WHERE id= ANY (SELECT `daily_note_id` FROM `daily_notes_subjects` WHERE `subject` LIKE '%".$search_keyword."%')
		
		ORDER BY `id` DESC LIMIT 1
		";
		$sql2=" WHERE `daily_note_id` = ANY (SELECT * FROM (".$sql2.") t".$restriction.")";
		*/
		//$sql="SELECT * FROM `daily_notes`".$restriction." ORDER BY `id` DESC LIMIT 1";// ORDER BY `start` DESC";
		$rsql_dNotes=db_fetch_assoc($sql);
		
		$sql2=" WHERE `daily_note_id`= ANY (SELECT id FROM (".$sql.") As t2)";
		
		$sql="SELECT * FROM `daily_notes_departments`".$sql2;
		$rsql_dNDepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes`".$sql2;
		$rsql_dNMNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people`".$sql2;
		$rsql_dNPeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects`".$sql2;
		$rsql_dNSubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets`".$sql2;
		$rsql_dNTargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions`".$sql2;
		$rsql_dNProsec=db_fetch_assoc($sql);
		
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
	
		for($i=0;$i<count($rsql_dNotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dNotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dNotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dNotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dNTargets);$j++){
                	if($rsql_dNTargets[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dNTargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<delay>".($rsql_dNotes[$i]["delay"]=="0" ? "" : $rsql_dNotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dNotes[$i]["header"]."</header>";
				
				
				for($j=0;$j<count($rsql_dNSubjects);$j++){
					if($rsql_dNSubjects[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<subject>".$rsql_dNSubjects[$j]["subject"]."</subject>";
					}
				}
				
				
				for($j=0;$j<count($rsql_dNMNotes);$j++){
					if($rsql_dNMNotes[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<myNote>".$rsql_dNMNotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dNDepartments);$j++){
                    if($rsql_dNDepartments[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<department>".$depts[$rsql_dNDepartments[$j]["department_id"]]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dNPeople);$j++){
                    if($rsql_dNPeople[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<person>".$people[$rsql_dNPeople[$j]["person_id"]]."</person>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	
	elseif($xmlString=="get-morning-note-to-show"){
		
		
		$noteId=get_post_data_control(@$_POST["nId"]);//düzenleme (edit) sayfasında veri alırken kullanılıyor
		//$noteId="11";
		
		$sql="SELECT * FROM `daily_notes` WHERE `id`='".$noteId."'";		
		$rsql_dNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_departments` WHERE `daily_note_id`='".$noteId."' AND `active`='1'";
		$rsql_dNDepartments=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_my_notes` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNMNotes=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_people` WHERE `daily_note_id`='".$noteId."' AND `active`='1'";
		$rsql_dNPeople=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_subjects` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNSubjects=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_targets`  WHERE `daily_note_id`='".$noteId."' AND `active`='1'";
		$rsql_dNTargets=db_fetch_assoc($sql);
		
		$sql="SELECT * FROM `daily_notes_prosecutions` WHERE `daily_note_id`='".$noteId."'";
		$rsql_dNProsec=db_fetch_assoc($sql);
		
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
		
		
		for($i=0;$i<count($rsql_dNotes);$i++){
			echo "<result>";
				echo "<id>".$rsql_dNotes[$i]["id"]."</id>";
				echo "<no>".$rsql_dNotes[$i]["no"]."</no>";
				echo "<sDate>".showDate($rsql_dNotes[$i]["start"])."</sDate>";
				
				for($j=0;$j<count($rsql_dNTargets);$j++){
                	if($rsql_dNTargets[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
                    	echo "<tDate>".showDate($rsql_dNTargets[$j]["target"])."</tDate>";
                	}
            	}
				
				echo "<finished>".$rsql_dNotes[$i]["finished"]."</finished>";
				echo "<delay>".($rsql_dNotes[$i]["delay"]=="0" ? "" : $rsql_dNotes[$i]["delay"])."</delay>";
				echo "<header>".$rsql_dNotes[$i]["header"]."</header>";
				
				
				
				for($j=0;$j<count($rsql_dNSubjects);$j++){
					if($rsql_dNSubjects[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<subject>".$rsql_dNSubjects[$j]["subject"]."</subject>";
					}
				}
												
				for($j=0;$j<count($rsql_dNMNotes);$j++){
					if($rsql_dNMNotes[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<myNote>".$rsql_dNMNotes[$j]["note"]."</myNote>";
					}
				}
				
				for($j=0;$j<count($rsql_dNDepartments);$j++){
                    if($rsql_dNDepartments[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<department>".$depts[$rsql_dNDepartments[$j]["department_id"]]."</department>";
                    }
                }
				
				
				for($j=0;$j<count($rsql_dNPeople);$j++){
                    if($rsql_dNPeople[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<person>".$people[$rsql_dNPeople[$j]["person_id"]]."</person>";
                    }
                }
				
				for($j=0;$j<count($rsql_dNProsec);$j++){
                    if($rsql_dNProsec[$j]["daily_note_id"]==$rsql_dNotes[$i]["id"]){
						echo "<prosecution>".$rsql_dNProsec[$j]["prosecution"]."</prosecution>";
                    }
                }
				
			echo "</result>";
		}
	}
	
	echo "</results>";

}
?>