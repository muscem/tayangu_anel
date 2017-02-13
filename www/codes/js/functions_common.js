/*!
 * Fonksiyonlarım
 *
 * Fonksiyon isimlerinde, kelimeler arasında alt çizgi kullan.
 * Bütün harfler küçük olsun. get_storaged_data gibi
 *
 * Değişken isimlerinde kelimeleri birleştir. İlk kelimenin baş harfi küçük,
 * diğerlerinin ki büyük olsun. Diğer harfler küçük olsun.
 * Kısaltmalarda da aynı kelimenin diğer harfleri küçük olsun; cookieNectTId gibi.
 *
 *
 */

/***************************** Fonksiyon listesi 
function change_language()
function delete_storaged_all_data()//Bütün çerezleri silen kod
function delete_storaged_data(sData)//Belirli bir çerezi silen kod.
function find_page_name()
function get_storaged_data(cName)//Belirli bir çerez degerini ögrenen kod
function get_user_prefs()
function on_start()
function open_page(page, no)
function redirect_page(page)
function set_storaged_data(sName, sValue)//Belirli bir çereze değer atiyor
function user_control()
function user_login()
function user_logout()
function write_alts_on_page()
function write_labels_on_page()
function write_new_language_on_page()//Dil değişimi yapıldığında sayfa üzerindeki yazıların hepsinin dilini değiştiren kod
function write_titles_on_page()
*/

$( function() {
});




var pageNo;
//xml bağlantıları gibi gerçek siteyle bağlantılı adreserde kullanılacak.
//var siteUrlAdress="http://localhost/uygulamalar/tayangu/an-el/1";
//var siteUrlAdress="http://localhost/my-apps/tayangu/an-el/1";
var siteUrlAdress="http://www.tayangu.com.tr/anel";
//var xmlDataSendAddressAdd="";
var xmlDataSendAddressAdd="mobile/";

var xmlDataSendType="POST";//İnternet sitesinde POST, mobil uygulamalarda GET olacak.

var messages = {
	"tr" : {
		"0" : "Kullanıcı adını ve şifreyi kontrol edip tekrar deneyin lütfen!",
		"1" : "Sunucuyla ilgili bir sorun olustu. Lütfen sonra tekrar deneyin!",
		"2" : "Sunucuyla ilgili bir sorun olustu. Lütfen sonra tekrar deneyin!",
		"3" : "Ad ve soyad kısımlarını doldurun lütfen!",
		"4" : "Bu kişi kayıtlı zaten!",
		"5" : "İsteğiniz yerine getirilemedi. Daha sonra tekrar deyin. Sorun devam ederse yöneticiye bildirin lütfen!"
	},
	"en" : {
		"0" : "Please check username and password then try again!",
		"1" : "There is a server problem. Please try again later.",
		"2" : "There is a server problem. Please try again later.",
		"3" : "Please, fill the name and surname boxes!",
		"4" : "This person is already saved!",
		"5" : "This jub is not completed. Try again later. If problem will continue, report to administrator please!"
	}
}

/*var cookies={
	"userName":"un",
	"userPassword":"up",
	"userRemember":"ur",
	"userLanguage":"ul"
}*/
var sData={//Kaydedilen verilerin adları. Mesela kullanıcı adı ur ismiyle kaydedilecek
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
	"morningNoteContent":"morning-note-content",
	"favoriteMorningNotesList":"favorite-morning-notes-list",
	"morningNotesStatistics":"morning-notes-statistics"
}


var xmlsUrl = {
	"userLoginControl":"xmls/"+xmlDataSendAddressAdd+"xml_login_control.php",
	"getPeopleList":"xmls/"+xmlDataSendAddressAdd+"xml_people_list.php",
	"getDepartmentList":"xmls/"+xmlDataSendAddressAdd+"xml_department_list.php",
	"getMorningNotesList":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"submitNewMorningNote":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"getMorningNote":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"submitEditMorningNote":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"searchMorningNote":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"searchAdvancedMorningNote":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"getMorningNoteToShow":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"updateMorningNoteFavorite":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"getFavoriteMorningNotesList":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes.php",
	"getMorningNotesStatistics":"xmls/"+xmlDataSendAddressAdd+"xml_morning_notes_statistics.php"
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
	"getMorningNoteToShow":"get-morning-note-to-show",
	"updateMorningNoteFavorite":"update-morning-note-favorite",
	"getFavoriteMorningNotesList":"get-favorite-morning-notes-list"
}



// PhoneGap is loaded and it is now safe to make calls PhoneGap methods
//
function onDeviceReady() {
	// Now safe to use the PhoneGap API
	//alert("Device is ready");
	//$.support.cors=true;

	
	xmlDataSendType="GET";
	siteUrlAdress="http://www.tayangu.com.tr/anel";
	//show_storaged_data();
	
	
/*
	find_page_number();
	get_user_prefs();
	user_control();
	write_new_language_on_page();
	on_start_this_page();//Her sayfanın kendi başlangıç kodunun olduğu kod
	
*/


	startAllPagesWithThis();
	
}




function startAllPagesWithThis(){
	find_page_number();
	get_user_prefs();
	user_control();
	write_new_language_on_page();
	if($("#wrapper").hasClass("hide")){
		$("#wrapper").removeClass("hide");
		$("#background-logo").css("background","url(images/background-logo.jpg) no-repeat top center");
	}
	on_start_this_page();
}

function on_start(){
/*	show_storaged_data();*/

	//startAllPagesWithThis();
	
	
/*
	find_page_number();
	get_user_prefs();
	user_control();
	write_new_language_on_page();
	on_start_this_page();//Her sayfanın kendi başlangıç kodunun olduğu kod
	
*/	
	

}



function get_user_prefs(){
	
	
	if(get_storaged_data(sData.userRemember)!="" && get_storaged_data(sData.userRemember)!=null) userPref.uRemember=get_storaged_data(sData.userRemember);
	if(userPref.uRemember!=""){
		var uRDate1 = new Date();
		var uRDate2 = new Date(userPref.uRemember);
		if(uRDate2-uRDate1>0){
			if(get_storaged_data(sData.userName)!="" && get_storaged_data(sData.userName)!=null) userPref.uName=get_storaged_data(sData.userName);
			if(get_storaged_data(sData.userPassword)!="" && get_storaged_data(sData.userPassword)!=null) userPref.uPassword=get_storaged_data(sData.userPassword);
			
		}
	}
	
	if(get_storaged_data(sData.userLanguage)!="" && get_storaged_data(sData.userLanguage)!=null) userPref.lang=get_storaged_data(sData.userLanguage);
	
	//alert(get_storaged_data(sData.userLanguage));
	
	
	//alert(userPref.uName+"-"+userPref.uPassword+"-"+userPref.uRemember+"-"+userPref.lang+"\n"+get_storaged_data(sData.userName)+"-"+get_storaged_data(sData.userPassword)+"-"+get_storaged_data(sData.userRemember)+"-"+get_storaged_data(sData.userLanguage));
}


/* Baslangiç - Çerez islemleri ile ilgili */
var storagedData = window.localStorage;
//var value = storagedData.getItem(key); // Pass a key name to get its value.
//storagedData.setItem(key, value) // Pass a key name and its value to add or update that key.
//storagedData.removeItem(key) // Pass a key name to remove that key from storage.


//Belirli bir çerezi silen kod.
//function delete_site_cookie(cName){
function delete_storaged_data(sName){
	storagedData.removeItem(sName)
}

//Kullanilmiyor.
//Bütün çerezleri silen kod
/*function delete_site_all_cookie(){	
	var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
		var c2 = c.split('=');
		c2[0]=c2[0].trim();
		set_storaged_data(c2[0], "");
    }
}*/

function delete_storaged_all_data(){
	storagedData.clear();
}
//Belirli bir çerez degerini ögrenen kod
/*function get_site_cookie(cName){
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
}*/
function get_storaged_data(sName){
	return storagedData.getItem(sName);
}
function show_storaged_data(){
	var d;
	d="";
	for(var i=0, len=localStorage.length; i<len; i++) {
    var key = localStorage.key(i);
    var value = localStorage[key];
	if (d!="") d+="\n";
    d=d+key + " => " + value;
	//delete_storaged_data(key);
	}

	alert(d);
}
//Belirli bir çereze değer atiyor
//cValue; boş ise siliyor
//eDays; y ise yıllık bitiş süresi (expires), yani 360 günlük süre belirleniyor
//eDays; s ise oturumluk (session) atama yapılıyor. Bitiş süresi (expires) verilmiyor.
/*function set_site_cookie(cName, cValue, eDays){
	
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
}*/
function set_storaged_data(sName, sValue){
	storagedData.setItem(sName, sValue)
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
	
	
	//set_storaged_data("back"+p, find_page_name(), "y");
	set_storaged_data("back"+p, backUrl);
	if(no!="") set_storaged_data(p, no);
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
	p=get_storaged_data("back"+find_page_name());
	redirect_page(p);
//	alert(window.location.pathname+"-"+find_page_name());
	//set_storaged_data("back"+p, backUrl);
}

function redirect_page(u){
	//window.location.replace(siteUrlAdress+"/"+u);
	window.location.replace(u);
}








//Dil değişimi yapıldığında sayfa üzerindeki yazıların hepsinin dilini değiştiren kod
function write_new_language_on_page(){
	//alert("cem p1-"+userPref.lang);
	write_labels_on_page();
	//alert("cem p2");
	write_titles_on_page();
	//alert("cem p3");
	write_alts_on_page();
	//alert("cem p4");
	write_options_on_page();
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
	if(pageNo in titles){
		for(var i=0;i<Object.keys(titles[pageNo][userPref.lang]).length;i++){
			$(".title-"+i).attr("title", titles[pageNo][userPref.lang][i]);
		}
	}
}


function write_alts_on_page(){
	if(pageNo in alts){
		for(var i=0;i<Object.keys(alts[pageNo][userPref.lang]).length;i++){
			$(".alt-"+i).attr("alt", alts[pageNo][userPref.lang][i]);
		}
	}
}

function write_options_on_page(){
	if(pageNo in selectOptions){
		for(var i=0;i<Object.keys(selectOptions[pageNo][userPref.lang]).length;i++){
			for(var j=0;j<Object.keys(selectOptions[pageNo][userPref.lang][i]).length;j++){
				$(".sOption-"+i+" option[value='"+j+"']").text(selectOptions[pageNo][userPref.lang][i][j]);
			}
		}
	}
}



function change_language(){
	var lang=$("#"+elementsName.userLanguage).val();
	set_storaged_data(sData.userLanguage, lang);
	userPref.lang = lang;
	write_labels_on_page();
	write_titles_on_page();
	write_alts_on_page();
}









function user_logout(){
	set_storaged_data(sData.userName, "");
	set_storaged_data(sData.userPassword, "");
	set_storaged_data(sData.userRemember, "");
	open_page(pages.login, "");
}


//Sadece login sayfasında kullanılacak
function user_login(){	
	//alert("user_login"+"\n"+siteUrlAdress+"/"+xmlsUrl.userLoginControl+"\n pref Uname="+userPref.uName+"\n pref pass="+userPref.uPassword);
	var uName=$("#"+elementsName.userName).val();
	var uPassword=$("#"+elementsName.userPassword).val();
	var uRemember=$("#"+elementsName.userRememeber).is(":checked");
	if($("#"+elementsName.userRememeber).is(":checked")){
		var uRDate1 = new Date();
		var uRDate2 = new Date(uRDate1.getTime()+(100*366*24*60*60*1000));//Yüz yıl
		uRemember=uRDate2;
	}
	else{
		var uRDate1 = new Date();
		var uRDate2 = new Date(uRDate1.getTime()+(24*60*60*1000));//Bir gün
		uRemember=uRDate2;
	}
	$.ajax({
		async: false,		
		type: xmlDataSendType,
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
		//alert("user_login"+"\n uc="+uc+"\n name="+uName+"\n pass="+uPassword)
		if(uc==1){
			set_storaged_data(sData.userName, uName);
			set_storaged_data(sData.userPassword, uPassword);
			set_storaged_data(sData.userRemember, uRemember);
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
	//alert("user_control"+"\n"+siteUrlAdress+"/"+xmlsUrl.userLoginControl+"\n pref Uname="+userPref.uName+"\n pref pass="+userPref.uPassword);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.userLoginControl,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.userLoginControl
			},
		dataType: "xml"
	})
	.done(function(r){
		var uc = $(r).find('result').text();
		//alert("user_control"+"\n uc="+uc+"\n pref Uname="+userPref.uName+"\n pref pass="+userPref.uPassword);
		if(uc==1){
			var uRDate1 = new Date();
			var uRDate2 = new Date(userPref.uRemember);
			if(userPref.uRemember=="" || uRDate2-uRDate1<(24*60*60*1000)){//Bir gün
				var uRDate3 = new Date(uRDate1.getTime()+(24*60*60*1000));//Bir gün
				userPref.uRemember=uRDate3;
				set_storaged_data(sData.userRemember, userPref.uRemember);
			}
			else if(uRDate2-uRDate1>(24*60*60*1000)){//Bir gün
				var uRDate4 = new Date(uRDate1.getTime()+(100*366*24*60*60*1000));//Yüz yıl
				userPref.uRemember=uRDate4;
				set_storaged_data(sData.userRemember, userPref.uRemember);
			}
			//set_storaged_data(sData.userName, userPref.uName);
			//set_storaged_data(sData.userPassword, userPref.uPassword);
			//set_storaged_data(sData.userRemember, userPref.uRemember);
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


document.addEventListener("deviceready", onDeviceReady, false);