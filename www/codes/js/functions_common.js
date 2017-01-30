/*!
 * Fonksiyonlarım
 *
 * Fonksiyon isimlerinde, kelimeler arasında alt çizgi kullan.
 * Bütün harfler küçük olsun. get_site_cookie gibi
 *
 * Değişken isimlerinde kelimeleri birleştir. İlk kelimenin baş harfi küçük,
 * diğerlerinin ki büyük olsun. Diğer harfler küçük olsun.
 * Kısaltmalarda da aynı kelimenin diğer harfleri küçük olsun; cookieNectTId gibi.
 *
 *
 */

/***************************** Fonksiyon listesi 
function change_language()
function delete_site_all_cookie()//Bütün çerezleri silen kod
function delete_site_cookie(cName)//Belirli bir çerezi silen kod.
function find_page_name()
function get_site_cookie(cName)//Belirli bir çerez degerini ögrenen kod
function get_user_prefs()
function on_start()
function open_page(page, no)
function redirect_page(page)
function set_site_cookie(cName, cValue, eDays)//Belirli bir çereze değer atiyor
function user_control()
function user_login()
function user_logout()
function write_alts_on_page()
function write_labels_on_page()
function write_new_language_on_page()//Dil değişimi yapıldığında sayfa üzerindeki yazıların hepsinin dilini değiştiren kod
function write_titles_on_page()
*/



document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//
function onDeviceReady() {
	// Now safe to use the PhoneGap API
	//alert("Device is ready");
	$.support.cors=true;
	on_start();
}

$( function() {
});

var pageNo;
//xml bağlantıları gibi gerçek siteyle bağlantılı adreserde kullanılacak.
//var siteUrlAdress="http://localhost/uygulamalar/tayangu/an-el/1";
var siteUrlAdress="http://www.tayangu.com.tr/anel";
var messages = {
	"tr" : {
		"0" : "Kullanıcı adını ve şifreyi kontrol edip tekrar deneyin lütfen!",
		"1" : "Sunucuyla ilgili bir sorun olustu. Lütfen sonra tekrar deneyin!",
		"2" : "Sunucuyla ilgili bir sorun olustu. Lütfen sonra tekrar deneyin!",
		"3" : "Ad ve soyad kısımlarını doldurun lütfen!",
		"4" : "Bu kişi kayıtlı zaten!"
	},
	"en" : {
		"0" : "Please check username and password then try again!",
		"1" : "There is a server problem. Please try again later.",
		"2" : "There is a server problem. Please try again later.",
		"3" : "Please, fill the name and surname boxes!",
		"4" : "This person is already saved!" 
	}
}

var cookies={
	"userName":"un",
	"userPassword":"up",
	"userRemember":"ur",
	"userLanguage":"ul"
}
//Çerezlerle ilgili olarak;
//Her sayfa adının başına "back" kelimesi eklenerek (backsettings.html gibi) açılacak sayfanın geri dönüş tuşunda kullanılacak sayfa adresi (sadece sayfa adı; main.html) çerez olarak kaydedilecek


var userPref={
	"uName":"",
	"uPassword":"",
	"uRemember":"",
	"lang":"en"
}


var pages={
	"login":"page1.html",
	"main":"page3.html",
	"settings":"page4.html",
	"settingLanguage":"page2.html"
}


var elementsName={
	"userName":"username",
	"userPassword":"password",
	"userRememeber":"remember",
	"userLanguage":"user-language",
	"peopleList":"people-list",
	"departmentList":"department-list",
	"morningNotesList":"morning-notes-list",
	"searchMorningNotesList":"search-morning-notes-list",
	"morningNote":"morning-note",
	"morningNoteContent":"morning-note-content"
}

var xmlsUrl = {
	"userLoginControl":"xmls/xml_login_control.php",
	"getPeopleList":"xmls/xml_people_list.php",
	"getDepartmentList":"xmls/xml_department_list.php",
	"getMorningNotesList":"xmls/xml_morning_notes.php",
	"submitNewMorningNote":"xmls/xml_morning_notes.php",
	"getMorningNote":"xmls/xml_morning_notes.php",
	"submitEditMorningNote":"xmls/xml_morning_notes.php",
	"searchMorningNote":"xmls/xml_morning_notes.php",
	"searchAdvancedMorningNote":"xmls/xml_morning_notes.php",
	"getMorningNoteToShow":"xmls/xml_morning_notes.php"
}

var xmlsString = {
	"userLoginControl":"user_login_control",
	"getPeopleList":"get-people-list",
	"changePersonStatus":"change-person-status",
	"changePersonDelete":"change-person-delete",
	"changePersonRename":"change-person-rename",
	"addPerson":"add-person",
	"getDepartmentList":"get-department-list",
	"changeDepartmentDelete":"change-department-delete",
	"changeDepartmentRename":"change-department-rename",
	"addDepartment":"add-department",
	"getMorningNotesList":"get-morning-notes-list",
	"submitNewMorningNote":"submit-new-morning-note",
	"getMorningNote":"get-morning-note",
	"submitEditMorningNote":"submit-edit-morning-note",
	"searchMorningNote":"search-morning-note",
	"searchAdvancedMorningNote":"search-advanced-morning-note",
	"getMorningNoteToShow":"get-morning-note-to-show"
}


function on_start(){
	//alert("cem1");
	//document.addEventListener('deviceready', onDeviceReady, false);
	//alert("cem2");
	find_page_number();
	//alert("cem3");
	get_user_prefs();
	//alert("cem4");
	user_control();
	//alert("cem5");
	write_new_language_on_page();
	//alert("cem6");
	on_start_this_page();//Her sayfanın kendi başlangıç kodunun olduğu kod
	//alert("cem7");
}

function get_user_prefs(){
	if(get_site_cookie(cookies.userName)!="") userPref.uName=get_site_cookie(cookies.userName);
	if(get_site_cookie(cookies.userPassword)!="") userPref.uPassword=get_site_cookie(cookies.userPassword);
	if(get_site_cookie(cookies.userRemember)!="") userPref.uRemember=get_site_cookie(cookies.userRemember);
	if(get_site_cookie(cookies.userLanguage)!="") userPref.lang=get_site_cookie(cookies.userLanguage);
	
	//alert(userPref.uName+"-"+userPref.uPassword+"-"+userPref.uRemember+"-"+userPref.lang+"\n"+get_site_cookie(cookies.userName)+"-"+get_site_cookie(cookies.userPassword)+"-"+get_site_cookie(cookies.userRemember)+"-"+get_site_cookie(cookies.userLanguage));
}


/* Baslangiç - Çerez islemleri ile ilgili */

//Belirli bir çerezi silen kod.
function delete_site_cookie(cName){
	set_site_cookie(cName, "", "");
}

//Kullanilmiyor.
//Bütün çerezleri silen kod
function delete_site_all_cookie(){	
	var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
		var c2 = c.split('=');
		c2[0]=c2[0].trim();
		set_site_cookie(c2[0], "", "");
    }
}

//Belirli bir çerez degerini ögrenen kod
function get_site_cookie(cName){
    var name = cName + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//Belirli bir çereze değer atiyor
//cValue; boş ise siliyor
//eDays; y ise yıllık bitiş süresi (expires), yani 360 günlük süre belirleniyor
//eDays; s ise oturumluk (session) atama yapılıyor. Bitiş süresi (expires) verilmiyor.
function set_site_cookie(cName, cValue, eDays){
	
	var c=cName + "=" + cValue + "; ";
	if (eDays=="") eDays="s";	//eDays boşsa oturumluk atama yapılacak. Yani bitiş süresi (expires) verilmeyecek.
	if(eDays=="y") eDays=360;	//Yıllık atama için kısa kod
	if(cValue="") eDays=-360;	//Silme kodu için eski tarih atanıyor
	
	if(eDays!="s"){
		var d = new Date();
		d.setTime(d.getTime() + (eDays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		c= c + expires + "; ";
	}
	c = c + " path=/";
	document.cookie = c;
}

/* Bitis - Çerez islemleri ile ilgili */


function find_page_name(){
	var p=window.location.pathname.split("/");
	return p[p.length-1];
}
function find_page_number(){
	var p=window.location.pathname.split("/");
	var pNo=p[p.length-1];
	pNo=pNo.replace("page","");
	pNo=pNo.replace(".html","");
	pageNo=pNo;
}

function open_page(p, no){
	//Açılacak sayfa (page)
	//Açılacak sayfaya gönderilecek değer. Bir tür form veya get ile bilgi göndermek gibi
	var root=p.split("/");
	var backUrl=find_page_name();
//	for(var i=1; i<root.length;i++){
//		backUrl="../"+backUrl;
//	}
	
	
	//set_site_cookie("back"+p, find_page_name(), "y");
	set_site_cookie("back"+p, backUrl, "y");
	if(no!="") set_site_cookie(p, no, "y");
	redirect_page(p);
}


//Kullanılmıyor
function open_back_page(){
	
//	var page=window.location.pathname.split("/");
//	var newUrl="";
//	for(var i=0;i<page.length;i++){
//		if(newUrl!="") newUrl=newUrl+"/";
//		newUrl=newUrl+page[i];
//	}
//	alert("cem");
	
	var p;
	p=get_site_cookie("back"+find_page_name());
	redirect_page(p);
//	alert(window.location.pathname+"-"+find_page_name());
	//set_site_cookie("back"+p, backUrl, "y");
}

function redirect_page(u){
	//window.location.replace(siteUrlAdress+"/"+u);
	window.location.replace(u);
}








//Dil değişimi yapıldığında sayfa üzerindeki yazıların hepsinin dilini değiştiren kod
function write_new_language_on_page(){
	write_labels_on_page();
	write_titles_on_page();
	write_alts_on_page();
}


function write_labels_on_page(){
	if(pageNo in labels){
		for(var i=0;i<Object.keys(labels[pageNo][userPref.lang]).length;i++){
			
			if($(".label-"+i).prop("tagName")=="INPUT"){
				if($(".label-"+i).attr("type")=="button"){
					$(".label-"+i).val(labels[pageNo][userPref.lang][i]);
				}
			}
			else if($(".label-"+i).prop("tagName")=="SPAN"){
				$(".label-"+i).html(labels[pageNo][userPref.lang][i]);
			}
			else if($(".label-"+i).prop("tagName")=="DIV"){
				$(".label-"+i).html(labels[pageNo][userPref.lang][i]);
			}
		}
	}
}



function write_titles_on_page(){
	if(pageNo in labels){
		for(var i=0;i<Object.keys(titles[pageNo][userPref.lang]).length;i++){
			$(".title-"+i).attr("title", titles[pageNo][userPref.lang][i]);
		}
	}
}


function write_alts_on_page(){
	if(pageNo in labels){
		for(var i=0;i<Object.keys(alts[pageNo][userPref.lang]).length;i++){
			$(".alt-"+i).attr("alt", alts[pageNo][userPref.lang][i]);
		}
	}
}



function change_language(){
	var lang=$("#"+elementsName.userLanguage).val();
	set_site_cookie(cookies.userLanguage, lang);
	userPref.lang = lang;
	write_labels_on_page();
	write_titles_on_page();
	write_alts_on_page();
}









function user_logout(){
	set_site_cookie(cookies.userName, "", "");
	set_site_cookie(cookies.userPassword, "", "");
	set_site_cookie(cookies.userRemember, "", "");
	open_page(pages.login, "");
}


//Sadece login sayfasında kullanılacak
function user_login(){	
	
	var uName=$("#"+elementsName.userName).val();
	var uPassword=$("#"+elementsName.userPassword).val();
	var uRemember=$("#"+elementsName.userRememeber).is(":checked");
	$.ajax({
		async: false,		
		type: "GET",
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.userLoginControl,
		timeout: 260000,
		data: {un:uName,
				p:uPassword,
				s:xmlsString.userLoginControl
			},
		dataType: "xml"
	})
	.done(function(r){
		var uc = $(r).find('result').text();
		if(uc==1){
			var ur="s";
			if(uRemember=="true") ur="y";
			set_site_cookie(cookies.userName, uName, ur);
			set_site_cookie(cookies.userPassword, uPassword, ur);
			set_site_cookie(cookies.userRemember, uRemember, ur);
			if(pages.login==find_page_name()) open_page(pages.main,"");
		}
		else{
			alert(messages[userPref.lang][0]);
		}
	})
	.fail(function(){
		alert(messages[userPref.lang][1]);
	});
}


//Her sayfanın başında kullanılacak
function user_control(){	
	//alert(siteUrlAdress+"/"+xmlsUrl.userLoginControl);
	$.ajax({
		async: false,		
		type: "GET",
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.userLoginControl,
		timeout: 260000,
		data: {un:"mci",
				p:"123456",
				s:"user_login_control"
			},
		dataType: "xml"
	})
	.done(function(r){
		var uc = $(r).find('result').text();
		//alert(uc+"-"+userPref.uName+"-"+userPref.uPassword+"-"+$(this).text());
		if(uc==1){
			var ur="s";
			if(userPref.uRemember=="true") ur="y";
			//set_site_cookie(cookies.userName, userPref.uName, ur);
			//set_site_cookie(cookies.userPassword, userPref.uPassword, ur);
			//set_site_cookie(cookies.userRemember, userPref.uRemember, ur);
			if(pages.login==find_page_name()) open_page(pages.main,"");
		}
		else{
			if(pages.login!=find_page_name() && pages.settingLanguage!=find_page_name()) open_page(pages.login,"");
			//alert("Kullanıcı adını ve şifreyi kontrol edip tekrar deneyin lütfen!");
		}
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
}
