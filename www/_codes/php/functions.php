<?php
//include("server_check.php");

//Kullanıcı bilgilerini döndürüyor.
function find_user($un, $pass){
	global $dbLink;
	$user="";
	$sql="SELECT * FROM users WHERE username='".$un."' AND password='".$pass."' AND active='1'";
	$rsql=mysqli_query($dbLink, $sql);
	if(mysqli_num_rows($rsql)==1){
		$row=mysqli_fetch_array($rsql);
		$user["0"]["id"]=$row["id"];
		$user["0"]["name"]=$row["name"];
		$user["0"]["surname"]=$row["surname"];
		$user["0"]["email"]=$row["email"];
		$user["0"]["username"]=$row["username"];
	}
	return $user;
}


//Çok boyutlu (veya tek boyutlu dizide, verilen key için, verilen değer var mı kontrolü
function check_key_value($array, $key, $val){
    foreach ($array as $item){
        if (is_array($item) && check_key_value($item, $key, $val)) return true;
        if (isset($item[$key]) && $item[$key] == $val) return true;
    }
    return false;
}


//Genel fonksiyonlar

function find_site_root($root){
	if(substr($root,0,1)=="/") $root=substr($root,1,strlen($root)-1);
	if(substr($root,strlen($root)-1,1)=="/") $root=substr($root,0,strlen($root)-1);
	define (site_root, $root);
}



//Özel şifre oluşturmak için
//functions: signin
function code_generator ($with, $len, $min, $max){
	//Geri dönüşsüz kod (şifre) oluşturma fonksiyonu
	//$with; bunu da kullan, kullanıcı adı, şifre vs gibi
	//$len= length; Üretilecek kodun uzunluğu
	//$min; Üretilecek kodun minimum uzunluk
	//$max; Üretilecek kodun maksimum uzunluk
	
	//Not: $len boş değilse veya sıfır değilse bu değere göre kod uzunluğu belirlenecek. Akksi halde min ve max kullanılacak. Onlar da boşsa 1 ile md5 uzunluğu +1 arasında bir sayıda uzunlukta olacak
	$code="";
	$fc=md5($with.date("H.i.s").date("d.m.Y"));
	//$fc=md5($with);
	
	if ($len==0 or $len==""){
		if($min==0 or $min==""){
			$min=1;
		}
		if($max==0 or $max==""){
			$max=$min+strlen($fc);
		}
		
		$len=rand($min, $max);
	}
	
	while(strlen($code)<$len+1){
		$fc=md5($fc);
		$code=$code.substr($fc,rand(1,32),1);
	}
	
	return $code;
}



//Ziyaretçinin ip numarasını öğrenen kod
//functions: signin
function get_ip(){
	if (!empty($_SERVER['HTTP_CLIENT_IP'])){   //check ip from share internet
		$ip=$_SERVER['HTTP_CLIENT_IP'];
		//echo "<br>ip1=".$ip;
	}
	elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){   //to check ip is pass from proxy
		$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
		//echo "<br>ip2=".$ip;
	}
	else{
		$ip=$_SERVER['REMOTE_ADDR'];
		//echo "<br>ip3=".$ip;
	}
	return $ip;
}
	
function get_browser_language(){
	//$lang = en, tr, it, fr ...
	//Bize veritabanındaki (language_codes tablosundaki) karşılığı lazım.
	$lang=trim(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2));
	$sql="SELECT * FROM language_codes WHERE language_code='".trim($lang)."'";
	$rsql=db_fetch_assoc($sql);
	//echo "<hr>lang=".$lang."-".$rsql[0]["language_code_id"];
	return $rsql[0]["language_code_id"];
}

//Eposta kontrolü yapan fonksiyon
//True veya flase şeklinde dönüş yapıyor
//Eposta'ya (@ işaretinden sonrası), istenmeyen adres belirlenebiliyor.
function check_email($email){
	//İstenmeyen email adresleri
	$except=array();
	//$except=array("0"=>"google.com","1"=>"hotmail.com");
	
	$r=0;
	if (filter_var($email, FILTER_VALIDATE_EMAIL)){
		if (substr_count($email, "@")==1){
			$r=1;
			$e=explode("@",$email);
			for($i=0;$i<count($except);$i++){
				if(strpos($email,$except[$i])>0) $r=0;
			}
		}
	}
	
	return ($r == 1 ? true : false);
}

function get_post_data_control($data){
	global $dbLink;
	$data=mysqli_real_escape_string($dbLink, trim($data));
	return $data;
}

function menu_name_correction($name){
	$new = array("&lt;", "&gt;");
	$old = array("<", ">"); 
	$newname = str_replace($old, $new, $name);
	return $newname;
}

function menu_url_correction($name){
	$new = array("&lt;", "&gt;", "c", "c", "g", "g", "i", "i", "o", "o", "s", "s", "u", "u");
	$old = array("<", ">", "ç", "Ç", "ğ", "Ğ", "İ", "ı", "ö", "Ö", "ş", "Ş", "ü", "Ü"); 
	$newname = str_replace($old, $new, $name);
	return $newname;
}


//xml_menu.php dosyasında kullanılıyor
function list_menu_xml($pid, $ml, $sel, $dbLink){
	//üst menünün id değeri (parent_id - pid) ve
	//listelenecek menülerin dili (menu language - ml
	//değerlerine göre alt menülerin xml olarak listelenmesini sağlayan fonksiyon.
	//$sql="SELECT * FROM `menus` WHERE `parent_id`='".$pid."' AND `language_id`='".$ml."' ORDER BY `priority`, `menu_name` ASC";
	if($pid==0){
		$sql="SELECT * FROM `menus` WHERE `parent_id`='0' AND `language_id`='".$ml."' ORDER BY `priority`, `menu_name` ASC";
	}
	else{
		$sql="SELECT * FROM `menus` WHERE `parent_id`=(SELECT `menu_id` FROM `menus` WHERE  `language_group`=(SELECT `language_group` FROM `menus` WHERE `menu_id`='".$pid."') AND `language_id`='".$ml."') AND `language_id`='".$ml."' ORDER BY `priority`, `menu_name` ASC";
	}
	$rsql=mysqli_query($dbLink, $sql);
	//echo $sql;
	$sel2=0; //Hiç bir menü 0 olmadığı için echo kısmında hep 0 yazacak.
	if($sel>0){
		$selsql="SELECT * FROM `menus` WHERE  `language_group`=(SELECT `language_group` FROM `menus` WHERE `menu_id`='".$sel."') AND `language_id`='".$ml."' ORDER BY `priority`, `menu_name` ASC";
		//echo $selsql;
		$rselsql=db_fetch_assoc($selsql);
		$sel2=$rselsql[0]["menu_id"];
	}
	for($i=0;$i<mysqli_num_rows($rsql);$i++){
		echo "<menu>";
		echo "<sel>";
		if($sel2==f_mysqli_result($rsql,$i,"menu_id")){
			echo "1";
		}
		else{
			echo "0";
		}
		echo"</sel>";
		echo "<id>".menu_name_correction(f_mysqli_result($rsql,$i,"menu_id"))."</id>";
		echo "<name><![CDATA[".menu_name_correction(f_mysqli_result($rsql,$i,"menu_name"))."]]></name>";
		echo "</menu>";
	}
}




function lowerStr($str){
	
	$new = array("a", "b", "c", "ç", "d", "e", "f", "g", "ğ", "h", "ı", "i", "j", "k", "l", "m", "n", "o", "ö", "p", "q", "r", "s", "ş", "t", "u", "ü", "v", "w", "x", "y", "z");
	
	$old = array("A", "B", "C", "Ç", "D", "E", "F", "G", "Ğ", "H", "I", "İ", "J", "K", "L", "M", "N", "O", "Ö", "P", "Q", "R", "S", "Ş", "T", "U", "Ü", "V", "W", "X", "Y", "Z"); 
	
	$newStr = str_replace($old, $new, $str);
	return $newStr;
}





//Başlıklarda kullanılacak
//Kod bölümlerinde kullanılacak
function changeHtmlChar($url){
	//Menü adi olarak girilen ismi sayfada, html karakterleri yazı olarak gösterebilmek için kullanılacak fonksiyon
	
	$eski1 = array("&");
	$yeni1 = array("&amp;");
	
	$eski2 = array("<", ">", "\"");
	$yeni2 = array("&lt;", "&gt;", "&quot;");
	//İki adımda olmazsa, diğer dönüşümler sonucu gelen & karakterini bir &amp; yazdığından, istenmeyen görünüm oluşuyor
	
	$yeniurl = str_replace($eski2, $yeni2, str_replace($eski1, $yeni1, $url));
	
	return $yeniurl;
}




//Ayrı değişkenlerdeki bilgileri dizi haline getirmek için kullanılacak
//Mesela, log_class_add_log fonksiyonuna bilgi aktarırken.
function set_array(){
    $data = func_get_args();
    return $data;
}


//İkinci bir sınıfın içinde kullanılacak birinci sınıfın fonksiyonları\metodları fonksiyon olarak yazılacak.
//Gerekirse; fonksiyon içinde birinci sınıfın olup olmaması kontrol edilecek.
//Bu özel fonksiyonlar şu şekilde tanımlanacak.
//function sınıf_adı_fonksiyon_adı()
function log_class_add_log($log_type, $log_data){
	if (class_exists('log_class', false)) {
		global $log;
		global $user;
		$log->add_log($user->info["user_id"], $log_type, $log_data, $user->user_ip);
	}
}


function log_class_check_unsuccessful_log(){

//Hata verirse, new_xml.php sayfalarını kontrol et.

//$trace = debug_backtrace();
//for($i=0;$i<count($trace);$i++){
//	$caller = $trace[$i];	
//	echo "<br>Called by {$caller['function']}";
//	if (isset($caller['class'])) echo " in {$caller['class']}";
//}
	
	
	if (class_exists('log_class', false) and class_exists('setting_class', false)) {
		global $log;
		global $setting;
		//var_dump($setting->site_settings);
		//echo "<br>".$setting->site_settings["max_number_of_unsuccessful_login_attempt"];
		//echo "<br>".$setting->site_settings["duration_of_login_attempt_serie"];
		//echo "<br>".$setting->site_settings["unsuccessful_login_attempt_ban_period"];
		//$log->check_unsuccesful_log("3", "5", "10");
		if($setting->site_settings["max_number_of_unsuccessful_login_attempt"]==0 or $setting->site_settings["duration_of_login_attempt_serie"]==0 or $setting->site_settings["unsuccessful_login_attempt_ban_period"]==0){
			//echo "<br>cem5";
			return false;
		}
		else{
			//echo "<br>cem6";
			return $log->check_unsuccessful_log($setting->site_settings["max_number_of_unsuccessful_login_attempt"], $setting->site_settings["duration_of_login_attempt_serie"], $setting->site_settings["unsuccessful_login_attempt_ban_period"]);
			
		}
		
		//return $log->check_unsuccessful_log($setting->site_settings["max_number_of_unsuccessful_login_attempt"], $setting->site_settings["duration_of_login_attempt_serie"], $setting->site_settings["unsuccessful_login_attempt_ban_period"]);
		
	}
//echo "<br>cem2";
}

//$log_data=set_array();
//log_class_add_log($log_type, $log_data);
//log_data biçimleri
//Veritabanı kayıtlarında sorgunun VALUES kısmı
//Veritabanından okumada, sorguda kullanılan değişkenler yazılış sıralarına göre
//Veritabanı güncellemede, güncelleme için gerekli bilgilerin hepsi, yazılış sıralarına göre 



//Bunu iptal ediyorum. Yerine have_permission kullanılacak
function permission_class_have_permission($per, $set=""){
	if (class_exists('permission_class', false)) {
		global $permission;
		if($set=="") $set=$per;
    	return $permission->have_permission($per, $set);
	}
}


function have_permission($per){
	if (class_exists('permission_class', false)) {
		global $permission;
    	return $permission->have_permission($per);
	}
}








//Id değerleri verilen kullanıcıların bilgileri (şimdilik sadece un - user name) bulunuyor
//$users_ids = '1','2' gibi olacak
function find_users($users_ids){
	$r=false;
	if (class_exists('user_class', false)) {
		global $user;
    	$r=$user->find_users($users_ids);
	}
	return $r;
}



//menu_id değerinden url oluşturan kod.
function find_url_from_id($mid){
	if (class_exists('menu_class', false)) {
		global $menu;
    	return $menu->find_url_from_mid($mid);
	}
}


//menu_id değerinden bütün üst url adreslerini oluşturan kod.
function show_url_tree_from_id($mid){
	if (class_exists('menu_class', false)) {
		global $menu;
    	$result_url=$menu->find_url_tree_from_mid($mid);
		
		for($i=0;$i<count($result_url);$i++){
			//if($i>0) echo " > ";
			echo '<a class="url_tree" href="'.$result_url[$i][1].'">'.menu_name_correction($result_url[$i][0]).'</a>';
		}
		
	}
}


//Açılan sayfanın diğer dillerdeki versiyonları ile birlikte listesini oluşturuyor.
//Listeyi bayraklar şeklinde gösteriyor. Açık olan sayfa dışındakiler silik gösteriliyor.
function show_language_pages_url(){
	if (class_exists('menu_class', false)) {
		global $menu;
    	$all_language_pages=$menu->find_language_pages($menu->db_selected_menus["menu_id"]);
		for($i=0;$i<count($all_language_pages);$i++){
			
			if($menu->db_selected_menus["menu_id"]==$all_language_pages[$i]["menu_id"]){
				$p=1;
			}
			else{
				$p=2;
			}
			echo '<a class="language_anchor" href="'.find_url_from_id($all_language_pages[$i]["menu_id"]).'.php"><img class="language_image" src="images/'.$all_language_pages[$i]["language_code"].$p.'.jpg"></img></a>';
		}		
	}
}


//Verilen menu_id ve language_id değerine göre;
//O menu_id değerinin sahip olduğu language_group'un içindeki verilen language_id değerine sahip menü bulunuyor.
//Kısacası, menünün verilen dildeki karşılığı
function get_language_page_from_mid($mid, $lang){
	if (class_exists('menu_class', false)) {
		global $menu;
    	$all_language_pages=$menu->find_language_pages($mid);
		for($i=0;$i<count($all_language_pages);$i++){
			
			if($all_language_pages[$i]["language_id"]==$lang){
				return $all_language_pages[$i];
			}
		}
		return false;
	}
}



//Bu fonksiyonu ileride değiştireceğim.
//Sitenin ayarına bağlı olarak tarihi gün, ay, yıl düzenlemesi yapacak.
//$d= date = 2015-11-18 00:01:26 veritabanından geldiği şekilde
function show_date($d){
	return date("d.m.Y - H.i.s", strtotime($d));
}


//Kullanılmayanlar
//  $s="SELECT * FROM menus WHERE menu_id='5'";
//	$r=mysqli_fetch_all(mysqli_query($dbLink, $s), MYSQLI_ASSOC);
//	echo "<hr>count=".count($r)."<br>".$r[0]["menu_name"];


//Çalışmayanlar
//Belirli bir süre kaç defa giriş yaptığını belirleyen fonksiyon
function check_visit_count($user_id, $ip, $time, $time_type){
	if (class_exists('visit_class', false)) {
		global $visit;
    	return $visit->check_visit_count_in_minute($user_id, $ip, $time, $time_type);
	}
}

function check_page_useage($check){
	if($check==""){
		
	}
}



$global_page_labels=""; //İki fonksiyonun içinde kullanacağım (db_insert_labels ve find_label)

function db_insert_labels($page_labels){
	global $setting;
	global $label;
	global $user;
	global $global_page_labels;
	
	$dbt=debug_backtrace();
	$label_file=str_replace($setting->site_settings["working_directory"]."|", "", str_replace("\\", "|", $dbt[0]["file"]));
	
	$global_page_labels[$label_file]=$page_labels;
	//print_r($global_page_labels);
	$no=array_keys($page_labels);
	for($i=0;$i<count($no);$i++){
		$page_labels_languages=array_keys($page_labels[$no[$i]]);
		
		for($j=0;$j<count($page_labels_languages);$j++){
			$lang=$page_labels_languages[$j];
			
			$lang_db_ok=0;//Belirtilen dil veritabanında yok. Kontrolü sonra yapılacak.
			$insert_label_ok=0; //Kayıt yapılıp yapılmayacağı.
			
			//$lang degiskenlerinin tr, en, fr gibi olmasini istiyorum. Ama bazi 1, 2 ,3 gibi kodun veritabani degeri girilirse bile düzgün çalismasi için ayar yapiyorum.
			if(array_key_exists($lang, $label->db_language_code)){
				$lang=$label->db_language_code[$lang];
				$lang_db_ok=1;
			}
			elseif(array_key_exists($lang, $label->db_language_id)){
				$lang_db_ok=1;
			}
			
			//Veritabanında kayıtlı mı (veritabanından çekilen dilde var mı) diye kontrol edilecek. Yoksa kayıt yapılacak
			
			if($lang_db_ok==1 and isset($label->db_labels_lang)){
				if(array_key_exists($lang, $label->db_labels_lang)){
					if(array_key_exists($label_file, $label->db_labels_lang[$lang])){
						if(array_key_exists($no[$i], $label->db_labels_lang[$lang][$label_file])){
							$insert_label_ok=1;
						}
//						else{
//							//Kayıt kodu
//							//$label->db_insert_label($label_file, $no[$i], $page_labels[$no[$i]][$page_labels_languages[$j]], $lang, "page");
//						}
					}
//					else{
//						//Kayıt kodu
//						//$label->db_insert_label($label_file, $no[$i], $page_labels[$no[$i]][$page_labels_languages[$j]], $lang, "page");
//					}
				}
//				else{
//					//kayıt kodu
//					//$label->db_insert_label($label_file, $no[$i], $page_labels[$no[$i]][$page_labels_languages[$j]], $lang, "page");
//				}
			}
			
			if($insert_label_ok==0){
				$label->db_insert_label($label_file, $no[$i], $page_labels[$no[$i]][$page_labels_languages[$j]], $lang, "page");
			}
			
			//echo "<br>".$page_labels[$no[$i]][$page_labels_languages[$j]];
		}
		
		
		//$this->db_labels_lang[$lang][$place][$no];
		
		//if(array_key_exists($lang_org , $label->db_language_code)){
		//	$lang_org=$label->db_language_code[$lang_org];
		//}
		
		//print_r($page_labels_languages); 
	}
	
	
	//$page_labels_languages=array_keys($page_labels);
	
	//$lang ve $lang_org degiskenlerinin tr, en, fr gibi olmasini istiyorum. Ama bazi 1, 2 ,3 gibi kodun veritabani degeri girilirse bile düzgün çalismasi için ayar yapiyorum.
//	if(array_key_exists($lang , $label->db_language_code)){
//		$lang=$label->db_language_code[$lang];
//	}
//	
//	if(array_key_exists($lang_org , $label->db_language_code)){
//		$lang_org=$label->db_language_code[$lang_org];
//	}
			
			
			
	//echo count($label->db_labels_lang[1]["layouts|menus|default|menu.php"])."-".$label->db_labels_lang[1]["layouts|menus|default|menu.php"][1];
	//for($i=0;$i<count($page_labels);$i++){
	//	$label
	//}
	//print_r($label->db_labels_lang);
	//print_r(array_keys($page_labels));
	//echo "<hr>";
	//print_r($page_labels);
}

function find_label($no){
	global $user;
	global $setting;
	global $label;
	global $global_page_labels;
	$r="";
    
	$dbt=debug_backtrace();
	$label_file=str_replace($setting->site_settings["working_directory"]."|", "", str_replace("\\", "|", $dbt[0]["file"]));
	//$label_file=str_replace($setting->site_settings["working_directory"]."|", "", $dbt[0]["file"]);
	//echo "<br>".$dbt[0]["file"];



//$label->show_label($user->pref["site_lang"], dirname(__FILE__)."\\".basename(__FILE__), 5, "Eposta", "tr");
//$label->show_label($user->pref["site_lang"], $label_file, $no, $label_written, $lang);
	$label_ok=0;
	
	if(array_key_exists($label_file, $label->db_labels_place)){
		if(array_key_exists($no, $label->db_labels_place[$label_file])){
			if(array_key_exists($user->pref["site_lang"], $label->db_labels_place[$label_file][$no])){
				$r=$label->db_labels_lang[$user->pref["site_lang"]][$label_file][$no];
				$label_ok=1;
			}
		}
	}
	
	if($label_ok==0){
		if(array_key_exists($label_file, $global_page_labels)){
			if(array_key_exists($no, $global_page_labels[$label_file])){
				$keys=array_keys($global_page_labels[$label_file][$no]);
				if(count($keys)>0){
					$r=$global_page_labels[$label_file][$no][$keys[0]];
				}
			}
		}
		
	}
	return $r;
	
}

?>
