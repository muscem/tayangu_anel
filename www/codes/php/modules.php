<?php
//Eklenecek modullerin belirlendiği sayfa olacak.
//Her sayfada olmasını istediğim kodları buraya koyacağım.
//Böylece her sayfaya tekrar tekrar eklemek zorunda kalamayacağım.

//
//
//Başlangıç - Çekirdek modüller. Olmazsa olmazlar.//
//
//
//echo "<hr>".$_SERVER["DOCUMENT_ROOT"];
//echo "<hr>".dirname(__FILE__);

//find_site_root(str_replace(basename(__FILE__), "", $_SERVER['PHP_SELF']));
//echo "<hr>site_root=".site_root;

//Veritabanına bağlantı moduülü. Her sayfada ilk yapılması gereken işlem.

$modules["databaseConnection"]=1; //Değiştirilemez.
//include("modules/databaseConnection.php");
include(dirname(__FILE__)."/modules/databaseConnection.php");
//include(dirname(__FILE__)."/modules/user.php");







if(1==2){
	//Sitenin menülerini oluşturmak için gerekli sınıfın bulunduğu modül.
	$modules["menu"]=1; //Değiştirilemez.
	//include("modules/menu.php");
	include(dirname(__FILE__)."/menu.php");

	//Sayfanın görünüşünü belirleyen sınıfın bulunduğu modül.
	$modules["page"]=1; //Değiştirilemez.
	//include("modules/page.php");
	include(dirname(__FILE__)."/page.php");

	//Site ile ilgili bilgiler için gerekli sınıfların bulunduğu modül.
	$modules["site"]=1; //Değiştirilemez.
	//include("modules/site.php");
	include(dirname(__FILE__)."/site.php");

	$modules["permission"]=1; //Değiştirilemez.
	//include("modules/permission.php");
	include(dirname(__FILE__)."/permission.php");

	$modules["label"]=1; //Değiştirilemez.
	//include("modules/label.php");
	include(dirname(__FILE__)."/label.php");

	$modules["meta"]=1; //Değiştirilemez.
	//include("modules/meta.php");
	include(dirname(__FILE__)."/meta.php");

	$modules["visit"]=1; //Değiştirilemez.
	//include("modules/visit.php");
	include(dirname(__FILE__)."/visit.php");

	$modules["comment"]=1; //Değiştirilemez.
	//include("modules/comment.php");
	include(dirname(__FILE__)."/comment.php");

	$modules["log"]=1; //Değiştirilemez.
	//include("modules/log.php");
	include(dirname(__FILE__)."/log.php");

	$modules["search"]=1; //Değiştirilemez.
	//include("modules/search.php");
	include(dirname(__FILE__)."/search.php");

	$modules["setting"]=1; //Değiştirilemez.
	//include("modules/search.php");
	include(dirname(__FILE__)."/setting.php");


	$modules["language"]=1; //Değiştirilemez.
	//include("modules/permission.php");
	include(dirname(__FILE__)."/language.php");


	//
	//
	//Bitiş - Çekirdek modüller. Olmazsa olmazlar.//
	//
	//


	//Seçimle etkin-pasif hale getirilebilen modüller
	//Veritabanından alınacak bu bilgiler

	//Kullanıcı girişi ile ilgili sınıfın bulunduğu modül.
	//include("modules/user.php");





	$msql="SELECT * FROM `modules` WHERE `use`='1'";
	$rmsql=mysqli_query($dbLink, $msql);

	for($i=0;$i<mysqli_num_rows($rmsql);$i++){
		include(dirname(__FILE__)."/".f_mysqli_result($rmsql,$i,"address").".php");
		$modules[f_mysqli_result($rmsql,$i,"address")]=1;
	//echo 	"<br>modules/".f_mysqli_result($rmsql,$i,"address").".php";
	}

}


?>