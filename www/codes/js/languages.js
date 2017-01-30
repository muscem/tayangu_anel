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
function deneme(){
	//alert(window.location.pathname);
	//alert($(".label-4").attr("type"));//.prop("tagName"));
	alert(userPref.lang+"-"+cookies.userName);
}



/*	"4":{//.html
		"tr":{
			"0":"",
			"1":"",
			"2":""		
		},
		"en":{
			"0":"",
			"1":"",
			"2":""
		}
	}
*/


var labels={
	"1":{//login.html
		"tr":{
			"0":"An-El 1.1",
			"1":"Sabah toplantısı notları",
			"2":"Kullanıcı Adı",
			"3":"Şifre",
			"4":"Hatırla",
			"5":"Giriş"
		},
		"en":{
			"0":"An-El 1.1",
			"1":"Morning meeting notes",
			"2":"Username",
			"3":"Password",
			"4":"Remember",
			"5":"Login"
		}
	},
	"2":{//setting-language.html
		"tr":{
			"0":"Dil Ayarı",
			"1":"Dil",
			"2":"Tamam"		
		},
		"en":{
			"0":"Language Setting",
			"1":"Language",
			"2":"Ok"
		}
	},
	"3":{//main.html
		"tr":{
			"0":"An-El",
			"1":""		
		},
		"en":{
			"0":"An-El",
			"1":""
		}
	},
	"4":{//settings.html
		"tr":{
			"0":"Ayarlar",
			"1":"Dil",
			"2":"Tamam"		
		},
		"en":{
			"0":"Settings",
			"1":"Language",
			"2":"Ok"
		}
	},
	"5":{//databases.html
		"tr":{
			"0":"Veritabanı İşlemleri",
			"1":"Çalışanlar",
			"2":"Bölümler"	
		},
		"en":{
			"0":"Database Operations",
			"1":"People",
			"2":"Departments"
		}
	},
	"6":{//people-list.html
		"tr":{
			"0":"An-El",
			"1":"Çalışanların Listesi",
			"2":" isimli çalışanının çalışma durumunu değiştirmek istediğinize emin misiniz?",
			"3":"Evet",
			"4":"Hayır",
			"5":" isimli çalışanı silmek istediğinize emin misiniz? <br /><br />Silinen kişinin ismi listede gözükmeyecektir. Bu işlemi geri alamazsınız. Bu işlemin gerçekleşebilmesi için veritabanında bu çalışanla bağlantılı bilgiler bulunmaması gerekmektedir. Silme işlemi; sadece yanlışlıkla oluşturulan isimler için kullanılmalıdır.",
			"6":"Evet",
			"7":"Hayır",
			"8":"Değiştir",
			"9":"İptal",
			"10":"Yeni Çalışan Ekleme",
			"11":"Ad",
			"12":"Soyad",
			"13":"Ekle",
			"14":"İptal"
			
		},
		"en":{
			"0":"An-El",
			"1":"People List",
			"2":"'s working status wil be changed. Do you really want this?",
			"3":"Yes",
			"4":"No",
			"5":" will be deleted. Are you sure you want to delete? <br /><br />This name will not be in list anymore. You can not take back this action. To delete a person, he/she does not have any relation with other database tables. You should delete only mistakenly added person.",
			"6":"Yes",
			"7":"No",
			"8":"Rename",
			"9":"Cancel",
			"10":"New Person Addition",
			"11":"Name",
			"12":"Surname",
			"13":"Add",
			"14":"Cancel"
		}
	},
	"7":{//departments-list.html
		"tr":{
			"0":"An-El",
			"1":"Bölümlerin Listesi",
			"2":" isimli bölümü silmek istediğinize emin misiniz? <br /><br />Silinen bölüm ismi listede gözükmeyecektir. Bu işlemi geri alamazsınız. Bu işlemin gerçekleşebilmesi için veritabanında bu bölümle bağlantılı bilgiler bulunmaması gerekmektedir. Silme işlemi; sadece yanlışlıkla oluşturulan bölüm isimleri için kullanılmalıdır.",
			"3":"Evet",
			"4":"Hayır",
			"5":"Değiştir",
			"6":"İptal",
			"7":"Yeni Bölüm Ekleme",
			"8":"Ad",
			"9":"Ekle",
			"10":"İptal"
			
		},
		"en":{
			"0":"An-El",
			"1":"Departments List",
			"2":" will be deleted. Are you sure you want to delete? <br /><br />This department's name will not be in list anymore. You can not take back this action. To delete a deparment, it does not have any relation with other database tables. You should delete only mistakenly added department name.",
			"3":"Yes",
			"4":"No",
			"5":"Rename",
			"6":"Cancel",
			"7":"New Department Addition",
			"8":"Name",
			"9":"Add",
			"10":"Cancel"
		}
	},
	"8":{//morning-notes.html
		"tr":{
			"0":"Sabah Toplantısı Notları",
			"1":"Yeni Not Ekleme",
			"2":"Not Arama",
			"3":"Not Listesi"
		},
		"en":{
			"0":"Morning Meeting Notes",
			"1":"New Note Additon",
			"2":"Search Note",
			"3":"Notes List"
		}
	},
	"9":{//morning-notes-list.html
		"tr":{
			"0":"Sabah Toplantısı Notları Listesi"
		},
		"en":{
			"0":"List Of Morning Meeting Notes"
		}
	}
}


var titles={
	"1":{//login.html
		"tr":{
			"0":"Dil"
		},
		"en":{
			"0":"Language",
		}
	},
	"2":{//setting-language.html
		"tr":{
			"0":"Geri"
		},
		"en":{
			"0":"Back"
		}
	},
	"3":{//main.html
		"tr":{
			"0":"Ayarlar",
			"1":"Çıkış"
		},
		"en":{
			"0":"Settings",
			"1":"Exit"
		}
	},
	"4":{//settings.html
		"tr":{
			"0":"Geri"
		},
		"en":{
			"0":"Back"
		}
	},
	"5":{//databases.html
		"tr":{
			"0":"Geri"		
		},
		"en":{
			"0":"Back"
		}
	},
	"6":{//people-list.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Kişi Ekle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Add Person"
		}
	},
	"7":{//departments-list.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Bölüm Ekle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Add Department"
		}
	},
	"8":{//morning-notes.html
		"tr":{
			"0":"Geri"		
		},
		"en":{
			"0":"Back"
		}
	},
	"9":{//morning-notes.html
		"tr":{
			"0":"Geri"		
		},
		"en":{
			"0":"Back"
		}
	}
}

var alts={
	"1":{//login.html
		"tr":{
			"0":"Dil"
		},
		"en":{
			"0":"Language"
		}
	},
	"2":{//setting-language.html
		"tr":{
			"0":"Geri"
		},
		"en":{
			"0":"Back"
		}
	},
	"3":{//main.html
		"tr":{
			"0":"Ayarlar",
			"1":"Çıkış"
		},
		"en":{
			"0":"Settings",
			"1":"Exit"
		}
	},
	"4":{//settings.html
		"tr":{
			"0":"Geri"
		},
		"en":{
			"0":"Back"
		}
	},
	"5":{//databases.html
		"tr":{
			"0":"Geri"		
		},
		"en":{
			"0":"Back"
		}
	},
	"6":{//people-list.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Kişi Ekle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Add Person"
		}
	},
	"7":{//deparments-list.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Kişi Ekle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Add Department"
		}
	},
	"8":{//morning-notes.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	},
	"9":{//morning-notes.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	}
}