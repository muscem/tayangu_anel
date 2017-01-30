<?php
//Veritabanı ile ilgili fonksiyonlar ve sınıfların olduğu dosya
//Mysqli bağlantı kodları

//Veritabanı bağlantısında kullanılan değişken. Bütün bağlantılarda bu kullanılacak
$dbLink="";

//Veritabanına bağlanma fonksiyonu
function dbConnect($db='anel'){
	//$db="tayangud_tayangu_com";
	//$iletisim_Eposta="iletisim@tayangu.com";
	//$dbhost = "sql.byethost23.org";	//'localhost';
	//$dbuser = "tayangud_qazwsx";	//'user'; 
	//$dbpass = "503052006";	//'password';
	
	$db='anel';
	$iletisim_Eposta="iletisim@tayangu.com";
	$dbhost = "localhost";	//'localhost';
	$dbuser = "root";	//'user'; 
	$dbpass = "";	//'password';
	//$db="mci";	//database
	
	global $dbLink;
	
	$dbLink=@mysqli_connect($dbhost, $dbuser, $dbpass, $db)
	or die('Su an veritabani ile ilgili bir sorun yasanmakta! Lütfen sonra tekrar deneyiniz. Sorun devam ederse lütfen bildiriniz: '.$iletisim_Eposta);
	
	if (mysqli_connect_errno()) {
		printf('Su anda veritabanina ulasilamiyor! Lütfen sonra tekrar deneyiniz. Sorun devam ederse lütfen bildiriniz: platform@tayangu.com.tr %s\n', mysqli_connect_error());
		exit();
	}
			
	mysqli_query($dbLink, "SET NAMES 'utf8' COLLATE 'utf8_general_ci'");
	mysqli_query($dbLink, "SET CHARACTER SET utf8");
	mysqli_query($dbLink, "SET COLLATION_CONNECTION = 'utf8_general_ci'");
	
	//$dbLink global olarak kullanıldığı için return kullanılmayacak
	//return $dbLink;
}


//Veritabanından dönen sonuç tek sıra da olsa, birden fazla sıra da olsa,
//dönen değerin bir dizi değişken olmasını sağlıyor.
//Böylece count ile dönen sıra sayısı öğrenilebiliyor.
//Bu fonksiyon kullanılmadığında tek sıra dönen sonuçlarda count komutu
//sütun sayısını veriyor.
function db_fetch_assoc($sql){
	global $dbLink;
	$results_array = array();
	$result=mysqli_query($dbLink, $sql);
	//$result = $mysqli->query($query);
	while ($row = mysqli_fetch_assoc($result)) {
		$results_array[] = $row;
	}
	return $results_array;
}

//Veritabanı bağlantısı yapılıyor.
//Veritabanı bağlantısı ilk ve en önceliklik gerekli işlem olduğundan bağlantı burada yapılıyor.
dbConnect();
?>