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
function deneme(){
	//alert(window.location.pathname);
	//alert($(".label-4").attr("type"));//.prop("tagName"));
	alert(userPref.lang+"-"+sData.userName);
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
			"0":"An-El",
			"1":"Sabah toplantısı notları",
			"2":"Kullanıcı Adı",
			"3":"Şifre",
			"4":"Hatırla",
			"5":"Giriş"
		},
		"en":{
			"0":"An-El",
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
			"1":"Sabah Toplantısı Notları",
			"2":"Veritabanı İşlemleri",
			"3":"Günlük Görüşme Planı",
			"4":"Notlar",
			"5":"Araştırmalar",
			"6":"Dosyalar",
			"7":"Kaizen Önerileri"
		},
		"en":{
			"0":"An-El",
			"1":"Morning Meeting Notes",
			"2":"Database Operations",
			"3":"Daily Meeting Plan",
			"4":"Notes",
			"5":"Studies",
			"6":"Files",
			"7":"Kaizen Offers"
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
			"3":"Not Listesi",
			"4":"Favori Not Listesi",
			"5":"İstatistikler"
		},
		"en":{
			"0":"Morning Meeting Notes",
			"1":"New Note Additon",
			"2":"Search Note",
			"3":"Notes List",
			"4":"Favorite Note List",
			"5":"Statistics"
		}
	},
	"9":{//morning-notes-list.html
		"tr":{
			"0":"Sabah Toplantısı Notları Listesi"
		},
		"en":{
			"0":"List Of Morning Meeting Notes"
		}
	},
	"10":{//new-morning-notes-adding.html
		"tr":{
			"0":"Yeni Sabah Notu Ekleme",
			"1":"No",
			"2":"Başlangıç Tarihi",
			"3":"Hedef Tarih",
			"4":"Bitmiş",
			"5":"Gecikme",
			"6":"Başlık",
			"7":"Konu",
			"8":"Araştırma",
			"9":"Sorumlu Birim",
			"10":"Sorumlu Kişi",
			"11":"Notlarım",
			"12":"Kaydet",
			"13":"Sabah toplantısı notu başarıyla kaydedildi.",
			"14":"Yeni bir not girmek ister misiniz?",
			"15":"Evet",
			"16":"Hayır",
			"17":"Bir sorun oluştu ve sabah toplantısı notu kaydedilemedi.",
			"18":"Tamam"
		},
		"en":{
			"0":"Add New Morning Note",
			"1":"Number",
			"2":"Start",
			"3":"Target",
			"4":"Delay",
			"5":"Finished",
			"6":"Headline",
			"7":"Subject",
			"8":"Prosecution",
			"9":"Responsible Department",
			"10":"Responsible Person",
			"11":"My Notes",
			"12":"Save",
			"13":"Morning note is saved successfully.",
			"14":"Do you want to save another note?",
			"15":"Yes",
			"16":"Not",
			"17":"Problem is occured. Morning not is not saved!",
			"18":"Ok"
		}
	},
	"11":{//morning-note-editting.html
		"tr":{
			"0":"Yeni Sabah Notu Ekleme",
			"1":"No",
			"2":"Başlangıç Tarihi",
			"3":"Hedef Tarih",
			"4":"Bitmiş",
			"5":"Gecikme",
			"6":"Başlık",
			"7":"Konu",
			"8":"Araştırma",
			"9":"Sorumlu Birim",
			"10":"Sorumlu Kişi",
			"11":"Notlarım",
			"12":"Güncelle",
			"13":"Sabah toplantısı notu başarıyla güncellendi.",
			"14":"Değişiklik yapmaya devam etmek ister misiniz?",
			"15":"Evet",
			"16":"Hayır",
			"17":"Bir sorun oluştu ve sabah toplantısı güncellenemedi.",
			"18":"Tamam"
		},
		"en":{
			"0":"Add New Morning Note",
			"1":"Number",
			"2":"Start",
			"3":"Target",
			"4":"Delay",
			"5":"Finished",
			"6":"Headline",
			"7":"Subject",
			"8":"Prosecution",
			"9":"Responsible Department",
			"10":"Responsible Person",
			"11":"My Notes",
			"12":"Save",
			"13":"Morning note is updated successfully.",
			"14":"Do you want to continue to edit the note?",
			"15":"Yes",
			"16":"Not",
			"17":"Problem is occured. Morning not is not updated!",
			"18":"Ok"
		}
	},
	"12":{//search.html
		"tr":{
			"0":"Sabah Toplantısı Notu Arama",
			"1":"Ara",
			"2":"No",
			"3":"Başlangıç Tarihi",
			"4":"Hedef Tarih",
			"5":"Bitmiş",
			"6":"Gecikme",
			"7":"Başlık",
			"8":"Konu",
			"9":"Araştırma",
			"10":"Sorumlu Birim",
			"11":"Sorumlu Kişi",
			"12":"Notlarım",
			"13":"Ara"
		},
		"en":{
			"0":"Morning Note Search",
			"1":"Search",
			"2":"Number",
			"3":"Start",
			"4":"Target",
			"5":"Delay",
			"6":"Finished",
			"7":"Headline",
			"8":"Subject",
			"9":"Prosecution",
			"10":"Responsible Department",
			"11":"Responsible Person",
			"12":"My Notes",
			"13":"Search"
		}
	},
	"13":{//morning-meeting-note.html
		"tr":{
			"0":"Sabah Toplantısı Notu"
		},
		"en":{
			"0":"Morning Meeting Note"
		}
	},
	"16":{//morning-notes.html
		"tr":{
			"0":"Kaizen Önerileri",
			"1":"Yeni Kaizen Önerisi Ekleme",
			"2":"Kaizen Önerisi Arama",
			"3":"Kaizen Önerileri Listesi",
			"4":"Favori Kaizen Önerileri Listesi",
			"5":"İstatistikler"
		},
		"en":{
			"0":"Kaizen Offers",
			"1":"New Kaizen Offer Additon",
			"2":"Search Kaizen Offer",
			"3":"Kaizen Offers List",
			"4":"Favorite Kaizen Offer List",
			"5":"Statistics"
		}
	}
}


var titles={
	"1":{//login.html
		"tr":{
			"0":"Dil",
			"1":"Yenile"
		},
		"en":{
			"0":"Language",
			"1":"Refresh"
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
	"9":{//list-of-morning-meeting-notes.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Artan Şeklinde Sırala",
			"3":"Azalan Şeklinde Sırala",
			"4":"Filtrele",
			"5":"Numara",
			"6":"Başlangıç",
			"7":"Hedef",
			"8":"Kişi",
			"9":"Bölüm",
			"10":"Gecikme",
			"11":"Bitiş",
			"12":"Favori",
			"13":"Filtreyi Temizle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Sort by Ascending",
			"3":"Sort by Descending",
			"4":"Filter",
			"5":"Number",
			"6":"Start",
			"7":"Target",
			"8":"Person",
			"9":"Department",
			"10":"Delay",
			"11":"Finished",
			"12":"Favorite",
			"13":"Clear Filter"
		}
	},
	"10":{//new-morning-notes-adding.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	},
	"11":{//new-morning-notes-adding.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	},
	"12":{//search.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Artan Şeklinde Sırala",
			"3":"Azalan Şeklinde Sırala",
			"4":"Filtrele",
			"5":"Numara",
			"6":"Başlangıç",
			"7":"Hedef",
			"8":"Kişi",
			"9":"Bölüm",
			"10":"Gecikme",
			"11":"Bitiş",
			"12":"Favori",
			"13":"Filtreyi Temizle",
			"14":"Basit - Gelişmiş Arama"	
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Sort by Ascending",
			"3":"Sort by Descending",
			"4":"Filter",
			"5":"Number",
			"6":"Start",
			"7":"Target",
			"8":"Person",
			"9":"Department",
			"10":"Delay",
			"11":"Finished",
			"12":"Favorite",
			"13":"Clear Filter",
			"14":"Simple - Advanced Search",
		}
	},
	"13":{//morning-meting-note.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Notu Düzenle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Edit Note"
		}
	}
}

var alts={
	"1":{//login.html
		"tr":{
			"0":"Dil",
			"1":"Yenile"
		},
		"en":{
			"0":"Language",
			"1":"Refresh"
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
	"9":{//list-of-morning-meeting-notes.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	},
	"10":{//new-morning-notes-adding.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	},
	"11":{//morning-note-editting.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa"		
		},
		"en":{
			"0":"Back",
			"1":"Home Page"
		}
	},
	"12":{//search.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Basit - Gelişmiş Arama"	
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Simple - Advanced Search"
		}
	},
	"13":{//morning-meting-note.html
		"tr":{
			"0":"Geri",
			"1":"Ana Sayfa",
			"2":"Notu Düzenle"
		},
		"en":{
			"0":"Back",
			"1":"Home Page",
			"2":"Edit Note"
		}
	}
}

var selectOptions={
	"12":{//login.html
		"tr":{
			"0":{
				"0":"Sadece Bitmemişlerde",
				"1":"Sadece Bitmişlerde"
			}
		},
		"en":{
			"0":{
				"0":"Only In Finished",
				"1":"Only In Not Finished"
			}
		}
	}
}