<?php
//Kullanıcı kontrolü ile ilgili fonksiyon ve sınıflaarın olduğu dosya
//Kullanıcı kaydı "users_reg_info" isimli tabloya yapılacak
//Kullanıcı ile ilgili bilgiler "users_info" isimli tabloya yapılacak
//Kullanıcının site ile ilgili tercihleri "users_site_pref" isimli tabloya yapılacak

//deneme için
//user name=mci
//pass=1



//Kayıt sayfası yapıldıktan sonra düzenle.


//Form, session ve cookie ile girilmesi gereken şifreler farklı olacak.
//Veritabanındaki değer;
//Formdan gelen değer kayıt sırasında alınanın 5 kere geçirilmiş hali olacak
//Formdan gelen isim, harfleri küçültülmüş alandan kontrol edilecek. Bu yüzden büyük ahrfle yazılmış isimler öenmli olmayacak. Ama veritabanında her ikisi için alana (sütuna) ihtiyaç var.

//Kontrol sırasında ise;
//Formdan gelen 5 kere md5'ten geçecek, sadece şifre
//cookie: Kayıtta üretilecek ve sürekli o kullanılacak. Çerezler silinmek istendiğinde silinecek. Böylece birden fazla bilgisayar kullanan biri birinde çerezi silnce diğer çerezlerde geçersiz olacak. Bunu bir ayara bağlamak da mümkün. Sadece o bilgisayardaki çerez de silinebilir. Sonrası için düşüneceğim.
//Session ile gelen üretilen kod olacak, her formdan veya çerez ile girişte üretilecek.

//Kontrol sırası form, session, cookie şeklinde olacak


//ob_start();	//Şimdilik gereği yok.
session_start();	//Sınınf içinden çalışıtıramadım. Dışarıda olması gerekiyor.

class user_class{
	
	public $_dbLink;	 //Veritabanı bağlantısı yapmak için kullanılacak.
	public $reg_info="";	//users_reg_inf tablosundan alınan bilgiler
	public $info=array();	//users_info tablosundan alınan bilgiler
	public $pref="";	//users_pref tablosundan alınan bilgiler
	public $user_ip;	//login fonksiyonu içinde tanımlı. Giriş yapmamış bile olsa alınıyor.
	
	public $too_much_sigin_attempt=0; //Çok sayıda üye giriş denemesi yapılmış ise 1 olacak. Üye giriş menüsünün gösterimini önlemekte kullanılacak.
	
	//Aslında bunu iptal ettim. Ancak kodun içinden tam olarak ayıklamadım.
	public $loginOk=0; //Giriş yapılıp yapılmadığını görmek için; 0-ziyaretçi (anonymus), 1-üye
	//0 ve 1'den başka değer almamalı
	
	//Ayarlar
	//public $user_nick_min=3; //Minimum kullanıcı adı uzunluğu
	//public $user_pass_min=1; //Minimum kullanıcı adı uzunluğu
	//public $user_nick_max=16; //Maksimum kullanıcı adı uzunluğu
	//public $user_pass_max=16; //Maksimum kullanıcı adı uzunluğu
	//public $reg_err_detail=0; //Kayıt sırasında girilen bilgilerdeki yanlışlıkla ilgili detaylı hata mesajı verilip verilmeyeceği. 0 ise verilmeyecek, 1 ise verilecek (isim yanlıi, şifre kısa gibi)
	//public $reg_activation=1;	//Aktivasyon işlemi yapılıp yapılmayacağı. Aktivasyon 0-gerekli değil, 1- gerekli
	//public $reg_email=1;	//Aynı eposta ile tek kayıda izin vermek 0-Çok kayıt, 1-tek kayıt yapılabilir
	//$this->settings[]
	
	
	public $settings=array(
		"nick_min"=>3,	//Minimum kullanıcı adı uzunluğu
		"nick_max"=>16,	//Maksimum kullanıcı adı uzunluğu
		"pass_min"=>1,	//Minimum şifre uzunluğu
		"pass_max"=>16,	//Maksimum şifre uzunluğu
		"reg_error_detail"=>1,	//Kayıt sırasında girilen bilgilerdeki yanlışlıkla ilgili detaylı hata mesajı verilip verilmeyeceği. 0 ise verilmeyecek, 1 ise verilecek (isim yanlıi, şifre kısa gibi)
		"reg_activation"=>1,	//Aktivasyon işlemi yapılıp yapılmayacağı. Aktivasyon 0-gerekli değil, 1- gerekli
		"email_multiaccount"=>1	//Aynı eposta ile birden fazla kayıt 0-Çok kayıt, 1-tek kayıt yapılabilir
		);
		
		//Mesajlar, hatalar vs
		public $user_module_messages=array(
		"0"=>"Kullanıcı adı ve şifresi minimum karakterden fazla olmalı.",
		"1"=>"Kullanıcı adı maksimum karakterden az olmalı.",
		"2"=>"Kullanıcı şifresi maksimum karakterden az olmalı.",
		"3"=>"Girilen şifreler birbirine eşit olmalı.",
		"4"=>"Kabul edilen eposta adreslerinden biri kullanılmalı.",
		"5"=>"Mevcut kayıtlı kullanıcı adı seçilmiş olmamalı",
		"6"=>"Kayıt yapılamadı.",//Detaylı hata bildirimi istenmzese, bu gösterilecek.
		"7"=>"Kayıt başarıyla yapıldı.",
		"8"=>"Güncelleme yapılamadı.",
		"9"=>"Güncelleme başarıyla yapıldı.",
		"10"=>"Aynı eposta ile birden fazla kayıt yapılamaz."
	);
	
	//Bildirm mi hata mı ayırt etmek için. Gösterimde farklı şekillerde göstermk için.
	//0: Hata mesajları
	//1: Bildirim mesajları
	public $user_module_messages_type=array("0"=>0, "1"=>0, "2"=>0, "3"=>0, "4"=>0, "5"=>0, "6"=>0, "7"=>1, "8"=>0, "9"=>1, "10"=>0);
	
	//Mesajların gösterilmesini sağlayan fonksiyon
	//Css süslemeleri vs buradan yapılacak.
	public function show_message($msg){
		//echo "<br>msg=".$msg[count($msg)-1];
		for($i=0;$i<count($msg);$i++){
			if($i>0) echo "<br>";
			if ($this->user_module_messages_type[$msg[$i]]==0){
				echo "<h1>".$this->user_module_messages[$msg[$i]]."<h1>";
			}
			elseif ($this->user_module_messages_type[$msg[$i]]==1){
				echo "<h2>".$this->user_module_messages[$msg[$i]]."<h2>";
			}
		}
	}
	
	
	
	//cookie ve session ile gelecek bilgi, formdan gelen kullanıcı adı ve şifresinden farklı olacak. Otomatik oluşturulacak. Formdan giriş yapıldığı her seferinde yeniden oluşturulacak.
	
	
	//Kullanıcı adı, user_name_lower kontrol edilerek yapılıyor. İleride buna seçenek verilebilir.
	//Kontrol sırasında user_name kontrolü yapılarak da yapılabilir
	
	public function __construct($dbLink){
		//public function __construct($dbLink, site_class $site){
		$this->_dbLink=$dbLink;
		$this->user_ip=get_ip();
	}
	
	
	public function login(){
		//Kullanıcı girişinin yapılıp yapılmadığını denetleyen fonksiyon
		//İlk olarak bu fonksiyon çalıştırılmalı.
		//Kullanıcı adı, şifre doğru olmalı ve aktivasyon yapılmış olmalı. Aktvasyon ayarı kapalıysa, kayıt sırasında otomatik olarak aktivasyon yapılıyor (activated=1). 
		//ob_start();	//Şimdilik gereği yok.
		//session_start();	//Sınıf içinden çalıştıramadım. Dışarıda olması gerekiyor.
		
		
		$this->info["user_id"]="0"; //Üye bulunsun veya bulunmasın gereken bir değer.
		
		//Üye bulunsun veya bulunmasın gereken bir değer.
		$this->pref["site_lang"]=mysqli_real_escape_string($this->_dbLink, @$_COOKIE["site_lang"]);
		//echo "<hr>site_lang1=".$this->pref["site_lang"];
		if($this->pref["site_lang"]==""){
			$this->pref["site_lang"]=get_browser_language(); 
		}
		//echo "<hr>site_lang2=".$this->pref["site_lang"];
		
		
		$form=0; //Formdan giriş yapıldığını anlamak için lazım.
		$session=0;	//Oturumdan (session) giriş yapıldığını anlamak için
		$cookie=0;	//Çerezden (cookie) giriş yapıldığını anlamak için
		/*$un;	//form user name
		$up;	//form user password
		$sun;	//session user name
		$sup;	//session user password
		$cun;	//cookie user name
		$cup;	//cokkie user password
		*/
		$ur = 0;	//user remember; Form ile giriş sırasında hatırlama kutucuğu işaretli ise; 1 yoksa 0
		
		
		if(@$_POST["user_name"] != "" and $_POST["user_password"] != ""){
			//Formdan bilgi gelmişse
			$form=1;
			$un = mysqli_real_escape_string($this->_dbLink, @$_POST["user_name"]);
			$up = md5(md5(md5(md5(md5(mysqli_real_escape_string($this->_dbLink, $_POST["user_password"]))))));
			
			$ur = mysqli_real_escape_string($this->_dbLink, @$_POST["user_remember"]);
		}
		elseif(@$_SESSION["sun"] != "" and $_SESSION["sup"] != ""){
			//Oturumdan (session) bilgi gelmişse
			$session=1;
			$sun = mysqli_real_escape_string($this->_dbLink, @$_SESSION["sun"]);
			$sup = mysqli_real_escape_string($this->_dbLink, @$_SESSION["sup"]);
		}
		else if(@$_COOKIE["cun"] != "" and $_COOKIE["cup"] != ""){
			//Çerezden (Cookie) bilgi gelmişse
			$cookie=1;
			$cun = mysqli_real_escape_string($this->_dbLink, @$_COOKIE["cun"]);
			$cup = mysqli_real_escape_string($this->_dbLink, @$_COOKIE["cup"]);
		}
		
		
		
		$sql_login="";
		$sql_user_info="";
		$sql_user_pref="";
		$rsql_login="";
		$rsql_user_info="";
		$rsql_user_pref="";
		
		//echo "<br>form user name=".@$_POST["user_name"]."<br>form password=".@$_POST["user_password"]."<br>session user name=".@$_SESSION["sun"]."<br>session password=".@$_SESSION["sup"]."<br>cookie user name=".@$_COOKIE["cun"]."<br>cookie password=".@$_COOKIE["cup"]."<br>";
		
		
		
		//Oturum kapatılmak isteniyorsa 
		if (@$_POST["logout"] != ""){
			//echo "<br>Oturum kapatılıyor.";
			
			//Log alınıyor.
			$log_data=set_array($sun, $sup, $cun, $cup, get_ip());
			log_class_add_log("logout", $log_data);
			
			session_destroy();
			setcookie("cun","", time()-60*60*24*365*10, "/");	//un=user_name //10 yıl öncesine atama
			setcookie("cup","", time()-60*60*24*365*10, "/");	//up=user_pass //10 yıl öncesine atama
			
			
		}
		elseif(log_class_check_unsuccessful_log()=="true"){
			//echo "<br>user_id in user module=".$this->info["user_id"]."-".log_class_check_unsuccessful_log();
			$this->too_much_sigin_attempt=1;
			//echo "<br>Başarısız giriş sayısı çok fazla. uid=".$this->info["user_id"];
		}
		else{	//if ($_POST["logout"]!=""){
			
			if($form==1){
				//Formdan giriş yapılmışsa, formdan giriş bilgileri kontrol edilecek
				$sql_login = "SELECT * FROM users_reg_info WHERE un_lower='".strtolower($un)."' AND up='".$up."' AND activated='1'";
				$log_type="form";
				$log_data=set_array(strtolower($un), mysqli_real_escape_string($this->_dbLink, $_POST["user_password"]),$up);
			}
			elseif($session==1){
				//Oturumdan (session) giriş yapılmışsa, oturum bilgileri kontrol edilecek
				$sql_login = "SELECT * FROM users_reg_info WHERE sun='".$sun."' AND sup='".$sup."' AND activated='1'";
				$log_type="session";
				$log_data=set_array($sun, mysqli_real_escape_string($this->_dbLink, @$_SESSION["sup"]), $sup);
			}
			elseif($cookie==1){
				//Çerezden (cookie) giriş yapılmışsa, çerez bilgileri kontrol edilecek
				$sql_login = "SELECT * FROM users_reg_info WHERE cun='".$cun."' AND cup='".$cup."' AND activated='1'";
				$log_type="cookie";
				$log_data=set_array($cun, mysqli_real_escape_string($this->_dbLink, @$_COOKIE["cup"]), $cup);
			}
			else{
				//Kullanıcı girişi kontrolü yapılmayacak
				$sql_login = "";
			}
			
			
			//Eğer bir giriş yapıldıysa (form, çerez veya oturum'dan bilgi geldiyse),
			//veritabanı kontrol edilecek.
			
			if ($sql_login != ""){
				//echo "<br>".$sql_login."<br>";
				$rsql_login = mysqli_query($this->_dbLink, $sql_login);
				//echo "<br>üye sayısı<br>".mysqli_num_rows($this->_dbLink, $this->sql_login_result)."<br>";
				
				
				if (mysqli_num_rows($rsql_login) == 1){
					//Eğer 1 kullanıcı bulunmuş ise,
					//echo "<br>Kullanıcı bulundu";
					$this->loginOk=1;//Değeri kullanamyacağım
					
					//Kullanıcının bilgileri değişkenlere yükleniyor.
					$this->reg_info=mysqli_fetch_assoc($rsql_login);
		
					$sql_info = "SELECT * FROM users_info WHERE id='".$this->reg_info["id"]."'";
					$rsql_info = mysqli_query($this->_dbLink, $sql_info);
					if (mysqli_num_rows($rsql_info)==1) $this->info=mysqli_fetch_assoc($rsql_info);
					
					$sql_pref = "SELECT * FROM users_site_pref WHERE  id='".$this->reg_info["id"]."'";
					$rsql_pref = mysqli_query($this->_dbLink, $sql_pref);
					if (mysqli_num_rows($rsql_pref)==1) $this->pref=mysqli_fetch_assoc($rsql_pref);
					
					
					$_SESSION["sun"] = $this->reg_info["sun"];
					$_SESSION["sup"] = $this->reg_info["sup"];
					
					//Giriş yapıldığı sürece veritabanından dili alacağı için çerezlere atmıyorum.
					//setcookie("site_lang", $this->reg_info["cun"], time()+360*60*60*24, "/");	//1 yıl sonrası
					//echo $this->reg_info["sun"]."-".$this->reg_info["sup"];
					//echo "<br>remember=".$this->ur;
					
					//Eğer form ile gelen bilgilerde hatırlama seçilmiş ise
					if ($ur === "on"){
						//echo "<br>remember2=".$this->remember;
						
						//echo "<br>Hatırlama seçildi";
						//echo "<br>user remember=".$ur;
						setcookie("cun", $this->reg_info["cun"], time()+360*60*60*24, "/");	//1 yıl sonrası
						setcookie("cup", $this->reg_info["cup"], time()+360*60*60*24, "/");	//1 yıl sonrası
					}
					
					//Log alınıyor.
					$log_data=set_array("");
					//echo $log_type."-".$log_data[0];
					log_class_add_log("successful_login_".$log_type, $log_data);
				
				
				}
				else if (mysqli_num_rows($rsql_login) == 0){
					//Hiçbir kullanıcı bulunamamış durum	
					//echo "<hr>kullanıcı bulunamadı";
					
					//Log alınıyor.
					//echo "<br>log_type=".$log_type;
					log_class_add_log("unsuccessful_login_".$log_type, $log_data);
				}
				else {
					//Birden fazla kullanıcı bulunmuş durum (hatalı durum oluyor)	
					//echo "<hr>!!!!Birden fazla kullanıcı bulundu!!!!<hr>";
					//echo "<br>üye sayısı<br>".mysqli_num_rows($this->_dbLink, $this->sql_login_result)."<br>";
					
					//Eksik
					//Log alınıyor.
					log_class_add_log("unsuccessful_login_".$log_type, $log_data);
				}
			
			}	//if ($sql_login!=""){
		
		}	//else{	//if ($_POST["logout"]!=""){
		
		//ob_end_flush();
	}	//function login(){
	
	
	//Kullanıcı kaydı için kullanılan fonksiyon
	//Kullanıcı bilgileri ile ilgili sütunlara göre değiştirilecek.
	public function signin(){
		
		$signin=0;
		//Kayıt için tuşa basılmış olmalı ve zaten bir kullanıcı girişi yapılmamış olmalı
		if(@$_POST["signin"] != "" and $this->loginOk==0){
			
			$un = mysqli_real_escape_string($this->_dbLink, @$_POST["username"]);
			$un_lower=strtolower($un);
			$up = mysqli_real_escape_string($this->_dbLink, @$_POST["userpassword"]);
			$up2 = mysqli_real_escape_string($this->_dbLink, @$_POST["userpassword2"]);
			$email = mysqli_real_escape_string($this->_dbLink, @$_POST["email"]);
			$msg=array();
			
			//Kullanıcı adı ve şifresi minimum uzunluktan fazla olmalı
			if(strlen($un)>=$this->settings["nick_min"] and strlen($up)>=$this->settings["pass_min"]){
				$signin=1;
			}
			else{
				$msg[count($msg)]=0;
			}
			//echo "<br>".strlen($un)."-".$this->user_nick_min."-".strlen($up)."-".$this->user_pass_min."-".$this->user_nick_max."-".$this->user_pass_max."-".check_email($email)."-".$signin;
			
			//Kullanıcı adı; maksimum uzunluk sıfır değil ise maksimum uzunluktan az olmalı.
			if(strlen($un)>$this->settings["nick_max"] and $this->settings["nick_max"]>0){
				$signin=0;
				$msg[count($msg)]=1;
			}
			//echo "<br>1-singin=".$signin."-".$un;
			
			//Kullanıcı şifresi; maksimum uzunluk sıfır değil ise maksimum uzunluktan az olmalı.
			if(strlen($up)>$this->settings["pass_max"] and $this->settings["pass_max"]>0){
				$signin=0;
				$msg[count($msg)]=2;
			}
			//echo "<br>2-singin=".$signin;
			
			//Girilen iki şifre birbirine eşit olmalı.
			if($up!=$up2){
				$signin=0;
				$msg[count($msg)]=3;
			}
			//echo "<br>3-singin=".$signin;
			
			//Eposta kabul edilebilir olmalı.
			if(!check_email($email)){
				$signin=0;
				$msg[count($msg)]=4;
			}
			//echo "<br>4-singin=".$signin;
			
			//Daha önceden aynı isimle kayıtlı olmamalı,
			//Daha doğrusu benzer (küçük harfli yazımı aynı) isimde olmamalı.
			if($signin==1){
				$sql="SELECT * FROM users_reg_info WHERE un_lower='".$un_lower."'";
				//echo "<br>".$sql;
				$rsql = mysqli_query($this->_dbLink, $sql);
				if(mysqli_num_rows($rsql)>0){
					$signin=0;
					$msg[count($msg)]=5;
				}
			}
			//echo "<br>5-singin=".$signin;
			
			
			
			//Aynı eposta ile birden fazla kayıt olmayacaksa
			if($signin==1){
				if($this->settings["email_multiaccount"]==1){
					$sql="SELECT * FROM users_info WHERE email='".$email."'";
					//echo "<br>".$sql;
					$rsql = mysqli_query($this->_dbLink, $sql);
					if(mysqli_num_rows($rsql)>0){
						$signin=0;
						$msg[count($msg)]=10;
					}
				}
		
			}
			
		
			
			if($signin==1){
				$date=date("Y.m.d H.i.s");
				$up=md5(md5(md5(md5(md5($up)))));
				//echo "<br>kayıt kısmına girildi";
				$sun = "";	//code_generator($un, 32, "", "");
				$sup = "";	//code_generator($un, 32, "", "");
				$cun = "";	//code_generator($un, 32, "", "");
				$cup = "";	//code_generator($un, 32, "", "");
				
				
				//Aktifleştirme yapılacaksa, kayıt sırasında benzersiz cun, aktivated=0 değerleri olacak
				//Daha sonra aktifleştirme yapıldığında cun silinecek ve activated=1 yapılacak
				if($this->settings["reg_activation"]==1){
					//Actifleştirme kodu.
					$a="0";
					$cun = code_generator($email, 32, "", "");
					$sql="SELECT * FROM `users_reg_info` WHERE `cun`='".$cun."'";
					$rsql=mysqli_query($this->_dbLink, $sql);
					while(mysqli_num_rows($rsql)!=0){
						//Aynı aktifleştirme kodunun
						//birden fazla kişide olma ihtimali ortadan kaldırılıyor
						$a=code_generator($email, 32, "", "");
						$sql="SELECT * FROM `users_reg_info` WHERE `cun`='".$cun."'";
						$rsql=mysqli_query($sql);
					}
					$a_date="";
				}
				else{
					$a="1";	//Aktivasyon gerekli değil. Bu yüzden activated değeri 1 olacak.
					$a_date=$date;
				}
				
				
				$name = mysqli_real_escape_string($this->_dbLink, @$_POST["name"]);
				$surname = mysqli_real_escape_string($this->_dbLink, @$_POST["surname"]);
				$tel = mysqli_real_escape_string($this->_dbLink, @$_POST["telephone"]);
				$address = mysqli_real_escape_string($this->_dbLink, @$_POST["address"]);
				$city = mysqli_real_escape_string($this->_dbLink, @$_POST["city"]);
				$country = mysqli_real_escape_string($this->_dbLink, @$_POST["country"]);
				$ip = get_ip();
				
				$sql="INSERT INTO `users_reg_info` (`id`, `un`, `un_lower`, `up`, `sun`, `sup`, `cun`, `cup`, `ip`, `reg_date`, `activated`, `activated_date`) VALUES (NULL, '$un', '$un_lower', '$up', '$sun', '$sup', '$cun', '$cup', '$ip', '$date', '$a', '$a_date')";
				$rsql = mysqli_query($this->_dbLink, $sql);
				$user_id=mysqli_insert_id($this->_dbLink);
				
				$sql="INSERT INTO `users_info` (`id`, `user_id`, `name`, `surname`, `email`, `telephone`, `address`, `city`, `country`, `ip`, `update`) VALUES (NULL, '$user_id', '$name', '$surname', '$email', '$tel', '$address', '$city', '$country', '$ip', '$date')";
				$rsql = mysqli_query($this->_dbLink, $sql);
				$user_info_id=mysqli_insert_id($this->_dbLink);
				if($user_id>0 and $user_info_id>0){
					$msg[count($msg)]=7;
					$this->show_message($msg);
					
					//Log alınıyor.
					$log_data=set_array("NULL", $un, $un_lower, $up, $sun, $sup, $cun, $cup, $ip, $date, $a, $a_date, "NULL", $user_id, $name, $surname, $email, $tel, $address, $city, $country, $ip, $date);
					log_class_add_log("successful_signin", $log_data);
				}
				
				
				
			}	//if($signin==1){
			else{
				if($this->settings["reg_error_detail"]==1){
					$this->show_message($msg);
				}
				else{
					unset($msg);
					$msg=array();
					$msg[count($msg)]=6;
					$this->show_message($msg);
					//echo "<br>Kayıt yapılamadı.";
				}
			}
			
		}	//if(@$_POST["signin"] != "" and $this->signOk==0){
			
	}
	
	
	//Üye bilgilerini güncellemekte kullanılan fonksiyon
	public function user_info_update(){
		$msg=array();
		if(@$_POST["update"] != "" and $this->loginOk==1){
		
			$date=date("Y.m.d H.i.s");
			$email = mysqli_real_escape_string($this->_dbLink, @$_POST["email"]);
			$name = mysqli_real_escape_string($this->_dbLink, @$_POST["name"]);
			$surname = mysqli_real_escape_string($this->_dbLink, @$_POST["surname"]);
			$tel = mysqli_real_escape_string($this->_dbLink, @$_POST["telephone"]);
			$address = mysqli_real_escape_string($this->_dbLink, @$_POST["address"]);
			$city = mysqli_real_escape_string($this->_dbLink, @$_POST["city"]);
			$country = mysqli_real_escape_string($this->_dbLink, @$_POST["country"]);
			$ip = get_ip();
			
			//Eposta kabul edilebilir olmalı.
			if(check_email($email)){
			
				$sql="UPDATE `users_info` SET `name`='$name', `surname`='$surname', `email`='$email', `telephone`='$tel', `address`='$address', `city`='$city', `country`='$country', `ip`='$ip', `update`='$date' WHERE user_id='".$this->reg_info['id']."'";
				$rsql = mysqli_query($this->_dbLink, $sql);
				$msg[count($msg)]=9;
				$this->show_message($msg);
			}
			else{
				$msg[count($msg)]=8;
				$this->show_message($msg);
			}
			
		}	//if(@$_POST["update"] != "" and $this->signOk==1){
	}
	
	
	//Aktivasyon işini gerçekleştiren fonksiyon
	public function activate(){
		//Aktivasyonun yapılmış olması, tarihin değiştirilmesiyle gerçekleşiyor.
		$a = mysqli_real_escape_string($this->_dbLink, @$_POST["a"]);
		if($a!=""){
		$date=date("Y.m.d H.i.s");
			$sql_activ = "UPDATE `users_reg_info` SET `cun`='', `activated_date`='".$date."', `activated`='1' WHERE `cun`='".$a."' and `activated`='0'";
			$rsql_activ=mysql_query($sql_activ);
			if(mysql_affected_rows($rsql_activ)==1){
				//Aktive edildi.
			}
			else{
				
			}
		}
		else{
		}
		
	}
	
	//Kullanılmıyorlar, Çalışmıyorlar
	
	
	public function find_users($users_ids){
		//$users_ids = '1','2' gibi olacak
		$r=false;
		$sql="SELECT * FROM users_reg_info WHERE id IN (".$users_ids.")";
		$rsql=mysqli_query($this->_dbLink, $sql);
		//$users=mysqli_fetch_all($rsql, MYSQLI_ASSOC);
		$users=db_fetch_assoc($sql);
		
		for ($i=0;$i<mysqli_num_rows($rsql);$i++){
			$r[$users[$i]["id"]]["un"]=$users[$i]["un"];
		}
		return $r;
	}
	
	
	
	public function change_user_pref($pref, $value){
		$sql="UPDATE `user_site_pref` SET `".$pref."`='".$value."'";
	}
	
}	//class user{
?>