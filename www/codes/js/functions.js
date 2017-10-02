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


//change_language()
//change_settings()


/* Başlangıç - .html */
/* Bitiş - .html */





function change_note_favorite(e, eid){
	var f;
	
	if($(e).attr("src")=="images/favorite.png"){
		f="0";
	}
	else{
		f="1";
	}

	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.updateMorningNoteFavorite,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.updateMorningNoteFavorite,
				nId:eid,
				nf:f
			},
		dataType: "xml"
	})
	.done(function(r){
		var tDate, subject, myNote, person, dept, i;
		data="";
		$(r).find('result').each(function(index, element) {
			if($(this).text().trim()=="0"){
				alert(messages[userPref.lang][5]);
			}
			else{
				if(f==0){
					$(e).attr("src", "images/favorite-not.png");
				}
				else{
					$(e).attr("src", "images/favorite.png");
				}
			}
		})
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
	});
	
	
}


function show_hide_part_unvisible(e){
	var p=$(e).parent().find(".part-unvisible");
	
	if(p.hasClass("hide")){
		$(p).removeClass("hide");
	}
	else{
		$(p).addClass("hide");
	}
}


function sort_notes(s, eid){
	var ret=0;
	//alert(s);
	if(s=="desc"){
		$("#"+eid).find(".part-no").each(function() {
			if($(this).parent().parent().next().find(".part-no").html()!="" && $(this).parent().parent().next().find(".part-no").html()!="undefined"){
				if($(this).html()<$(this).parent().parent().next().find(".part-no").html()){
					ret=1;
					var d=$(this).parent().parent()[0].outerHTML;
					$(this).parent().parent().next().after(d);
					$(this).parent().parent().remove();
				}
			}
		});
	}
	else if(s=="asc"){
		$("#"+eid).find(".part-no").each(function() {
			if($(this).parent().parent().next().find(".part-no").html()!="" && $(this).parent().parent().next().find(".part-no").html()!="undefined"){
				if($(this).html()>$(this).parent().parent().next().find(".part-no").html()){
					ret=1;
					var d=$(this).parent().parent().next()[0].outerHTML;
					$(this).parent().parent().next().remove();
					$(this).parent().parent().before(d);
				}
			}
		});
	}
	if(ret==1){
		sort_notes(s, eid);
	}
}



function show_hide_filter_menu(){
	if($("#filter").css("height")=="0px"){
		filterOn=1;
		$('#filter').css("display", "none");
		var el = $('#filter'),
		curHeight = el.height(),
		autoHeight = el.css('height', 'auto').css('padding', '1%').height();
		$('#filter').css("display", "block");
		el.height(curHeight).animate({height: autoHeight}, 500, function(){
			$("#filter").css("height","auto");
		});
	}
	else{
		filterOn=0;
		$("#filter").animate({
			height: "0px"
		}, 450);
		$("#filter").animate({
			padding: "0px"
		}, 50);
	}
}


function filter_notes(list_id){
	if(filterOn==1){
		var filterNote;//Notun filtrelenmiş olup olmadığını tutan değişken
		//Başlangıç değeri 1. Eğer filtre uygulanmışsa ve notun ilgili değeri filtrede yoksa (gösterilmeyecekse) değeri 0 olacak. Gösterilmesi isteniyorsa (filtre değerinde varsa) değeri 2 olacak. Sonuç olarak bu değer 1 veya 2 ise not gösterilecek.
		
		var filterVal;//İlgili filtre bölümüne (no, start, target vs.) olarak girilen değer(ler)
		var filterPart;//Notun filtre bölümü ile ilgili kısmının (no, start, target vs.) değeri
		
		$("#"+list_id).children("div").each(function(){
			filterNote=1;
						
			filterVal=$("#filter-number").val().trim().split(",");
			filterPart=$(this).find(".part-no").html();
			
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterNote=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterNote==1 && i==filterVal.length-1){
						filterNote=0;
					};
				};
			};
			
			
			
			filterVal=$("#filter-start").val().trim().split(",");
			filterPart=$(this).find(".part-sDate").html();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					
					if(filterPart.indexOf(filterVal[i])>-1){
						filterNote=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterNote==1 && i==filterVal.length-1){
						filterNote=0;
					};
				};
			};
			
			filterVal=$("#filter-target").val().trim().split(",");
			filterPart=$(this).find(".part-tDate").html();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterNote=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterNote==1 && i==filterVal.length-1){
						filterNote=0;
					};
				};
			};
			
			
			filterVal=$("#filter-person").val().trim().split(",");
			filterPart=$(this).find(".part-person").html().toLowerCase();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].toLowerCase().trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterNote=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterNote==1 && i==filterVal.length-1){
						filterNote=0;
					};
				};
			};
			
			
			
			filterVal=$("#filter-department").val().trim().split(",");
			filterPart=$(this).find(".part-department").html().toLowerCase();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].toLowerCase().trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterNote=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterNote==1 && i==filterVal.length-1){
						filterNote=0;
					};
				};
			};
			
			
			
			filterVal=$("#filter-finished").val();
			filterPart=$(this).find(".part-delay").html().toLowerCase().trim();
			if(filterVal==0){
				if(filterPart!=""){
					filterNote=2;
				}
				else{
					filterNote=0;
				}
			}
			else if(filterVal==1){
				if(filterPart==""){
					filterNote=2;
				}
				else{
					filterNote=0;
				}
			}
			
			
			
			
			filterVal=$("#filter-delay").val().trim().split(",");
			filterPart=$(this).find(".part-delay").html().toLowerCase();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].toLowerCase().trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterNote=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterNote==1 && i==filterVal.length-1){
						filterNote=0;
					};
				};
			};
			
			
			
			filterVal=$("#filter-favorite").val();
			filterPart=$(this).find(".part-favorite").html().toLowerCase().trim();
			if(filterVal==0){
				if(filterPart.indexOf("favorite.png")>-1){
					filterNote=2;
				}
				else{
					filterNote=0;
				}
			}
			else if(filterVal==1){
				if(filterPart.indexOf("favorite-not.png")>-1){
					filterNote=2;
				}
				else{
					filterNote=0;
				}
			}
			
			//alert(filterPart);
			//Listeyi düzenleme
			if(filterNote>0){
				if($(this).hasClass("hide")){
					$(this).removeClass("hide");
				}				
			}
			else{
				if(!$(this).hasClass("hide")){
					$(this).addClass("hide");
				}
			}
			
		});
		
		
	}
}


function clear_filter_box(list_id){
	$("#filter-number").val("");
	$("#filter-start").val("");
	$("#filter-target").val("");
	$("#filter-person").val("");
	$("#filter-department").val("");
	$("#filter-delay").val("");
	$("#filter-finished").val("-1");
	$("#filter-favorite").val("-1");
	filter_notes(list_id);
}





/* Başlangıç - page2.html */
function change_language(){
	//Dil değiştirme kodu. Dil ayarı değiştirildiğinde, çerezlere gerekli atamalar yapılıyor ve bulunulan sayfanın yazıları o dile çevriliyor. Bu kod settings.html ve setting-language.html sayfasında olacak genellikle.
	
	var lang=$("#"+elementsName.userLanguage).val();
	set_storaged_data(sData.userLanguage, lang);
	userPref.lang=lang;
	write_new_language_on_page();
}
/* Bitiş - page2.html */



/* Başlangıç - page4.html */
function change_settings(){
	change_language();
}
/* Bitiş - page4.html */






/* Başlangıç - page6.html */

function get_people_list(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		
		var id, name, surname, working, data;
		data="";
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			data+='<div class="part-2">';
			
			
			data+='<div class="icon-container-l margin-2 person-status-icon">';
			data+='<img class="icon"';
			if(working==1){
				 data+=' src="images/working.png"';
			}
			else{
				data+=' src="images/working_not.png"';
			}
			data+=' />';
			data+='</div>';
			
			data+='<div class="icon-container-l margin-2 person-delete-icon"><img class="icon" src="images/delete.png" /></div>';
			data+='<div class="icon-container-l margin-2 person-rename-icon"><img class="icon" src="images/rename.png" /></div>';
			
			data+='<div class="person margin-2">'+name+' '+surname+'</div>';
			
			data+='<div class="person-id hide">'+id+'</div>';
			data+='<div class="person-name hide">'+name+'</div>';
			data+='<div class="person-surname hide">'+surname+'</div>';
			data+='<div class="person-status hide">'+working+'</div>';
			
			data+='</div>';
			
			
			
        });
		$("#"+elementsName.peopleList).html(data);
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
}



$( function(){
	
	$(document).on("dblclick",".person-status-icon", function(){
		$("#person-status-name").html($(this).parent().find(".person").html());
		personID="";
		personStatus="";
		personID=$(this).parent().find(".person-id").html();
		personStatus=$(this).parent().find(".person-status").html();
		personStatus=(personStatus*1+1)%2;
		$("#person-status").removeClass("hide");
	});
	$(document).on("click","#person-status-yes", function(){
		change_person_status();
	});
	$(document).on("click","#person-status-no", function(){
		$("#person-status").addClass("hide");
	});
	
	
	
	$(document).on("dblclick",".person-delete-icon", function(){
		$("#person-delete-name").html($(this).parent().find(".person").html());
		personID="";
		personID=$(this).parent().find(".person-id").html();
		$("#person-delete").removeClass("hide");
	});
	$(document).on("click","#person-delete-yes", function(){
		change_person_delete();
	});
	$(document).on("click","#person-delete-no", function(){
		$("#person-delete").addClass("hide");
	});
	
	
	
	$(document).on("dblclick",".person-rename-icon", function(){
		personID="";
		personName="";
		personSurname="";
		personID=$(this).parent().find(".person-id").html();
		$("#person-rename-name").html($(this).parent().find(".person-name").html());
		$("#person-rename-surname").html($(this).parent().find(".person-surname").html());
		
		$("#person-new-name").val($(this).parent().find(".person-name").html());
		$("#person-new-surname").val($(this).parent().find(".person-surname").html());
		
		$("#person-rename").removeClass("hide");
	});
	$(document).on("click","#person-rename-yes", function(){
		change_person_rename();
	});
	$(document).on("click","#person-rename-no", function(){
		$("#person-rename").addClass("hide");
	});
	
	
	$(document).on("click",".person-add-icon", function(){
		$("#person-add-name").val("");
		$("#person-add-surname").val("");		
		$("#person-add").removeClass("hide");
	});
	$(document).on("click","#person-add-yes", function(){
		add_person_to_database();
	});
	$(document).on("click","#person-add-no", function(){
		$("#person-add").addClass("hide");
	});
	
});


function change_person_status(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.changePersonStatus,
				pi:personID,
				ps:personStatus
			},
		dataType: "xml"
	})
	.done(function(r){
		var result;
		result= $(r).find('result').text();
		if(result=="1"){
			get_people_list();
			$("#person-status").addClass("hide");
		}		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		$("#person-status").addClass("hide");
	});
}

function change_person_delete(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.changePersonDelete,
				pi:personID
			},
		dataType: "xml"
	})
	.done(function(r){
		var result;
		result= $(r).find('result').text();
		if(result=="1"){
			get_people_list();
			$("#person-delete").addClass("hide");
		}		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		$("#person-delete").addClass("hide");
	});
}

function change_person_rename(){
	personName=$("#person-new-name").val();
	personSurname=$("#person-new-surname").val();
	if(personName!="" && personSurname!="" && personId!=""){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.changePersonRename,
					pi:personID,
					n:personName,
					sn:personSurname
				},
			dataType: "xml"
		})
		.done(function(r){
			var result;
			result= $(r).find('result').text();
			if(result=="1"){
				get_people_list();
				$("#person-rename").addClass("hide");
			}		
		})
		.fail(function(){
			alert(messages[userPref.lang][2]);
			$("#person-rename").addClass("hide");
		});
	}
	else{
		alert(messages[userPref.lang][3]);
	}
}

function add_person_to_database(){
	personName=$("#person-add-name").val();
	personSurname=$("#person-add-surname").val();
	if(personName!="" && personSurname!=""){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.addPerson,
					n:personName,
					sn:personSurname
				},
			dataType: "xml"
		})
		.done(function(r){
			var result;
			result= $(r).find('result').text();
			if(result=="1"){
				get_people_list();
				$("#person-add").addClass("hide");
			}
			else if(result=="0"){
				alert(messages[userPref.lang][4]);
			}
		})
		.fail(function(){
			alert(messages[userPref.lang][2]);
			$("#person-add").addClass("hide");
		});
	}
	else{
		alert(messages[userPref.lang][3]);
	}
}

/* Bitiş - page6.html */















/* Başlangıç - page7.html */

function get_department_list(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getDepartmentList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getDepartmentList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, data;
		data="";
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			
			data+='<div class="part-2">';
			data+='<div class="icon-container-l margin-2 department-delete-icon"><img class="icon" src="images/delete.png" /></div>';
			data+='<div class="icon-container-l margin-2 department-rename-icon"><img class="icon" src="images/rename.png" /></div>';
			data+='<div class="department margin-2">'+name+'</div>';
			data+='<div class="department-id hide">'+id+'</div>';
			data+='<div class="department-name hide">'+name+'</div>';
			data+='</div>';
			
        });
		$("#"+elementsName.departmentList).html(data);
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
}



$( function(){	
	
	$(document).on("dblclick",".department-delete-icon", function(){
		$("#department-delete-name").html($(this).parent().find(".department").html());
		departmentID="";
		departmentID=$(this).parent().find(".department-id").html();
		$("#department-delete").removeClass("hide");
	});
	$(document).on("click","#department-delete-yes", function(){
		change_department_delete();
	});
	$(document).on("click","#department-delete-no", function(){
		$("#department-delete").addClass("hide");
	});
	
	
	
	$(document).on("dblclick",".department-rename-icon", function(){
		departmentID="";
		departmentName="";
		departmentID=$(this).parent().find(".department-id").html();
		$("#department-rename-name").html($(this).parent().find(".department-name").html());		
		$("#department-new-name").val($(this).parent().find(".department-name").html());
		$("#department-rename").removeClass("hide");
	});
	$(document).on("click","#department-rename-yes", function(){
		change_department_rename();
	});
	$(document).on("click","#department-rename-no", function(){
		$("#department-rename").addClass("hide");
	});
	
	
	$(document).on("click",".department-add-icon", function(){
		$("#department-add-name").val("");		
		$("#department-add").removeClass("hide");
	});
	$(document).on("click","#department-add-yes", function(){
		add_department_to_database();
	});
	$(document).on("click","#department-add-no", function(){
		$("#department-add").addClass("hide");
	});
	
});




function change_department_delete(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getDepartmentList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.changeDepartmentDelete,
				di:departmentID
			},
		dataType: "xml"
	})
	.done(function(r){
		var result;
		result= $(r).find('result').text();
		if(result=="1"){
			get_department_list();
			$("#department-delete").addClass("hide");
		}		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		$("#department-delete").addClass("hide");
	});
}

function change_department_rename(){
	departmentName=$("#department-new-name").val();
	if(departmentName!="" && departmentId!=""){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.getDepartmentList,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.changeDepartmentRename,
					di:departmentID,
					n:departmentName
				},
			dataType: "xml"
		})
		.done(function(r){
			var result;
			result= $(r).find('result').text();
			if(result=="1"){
				get_department_list();
				$("#department-rename").addClass("hide");
			}		
		})
		.fail(function(){
			alert(messages[userPref.lang][2]);
			$("#department-rename").addClass("hide");
		});
	}
	else{
		alert(messages[userPref.lang][3]);
	}
}

function add_department_to_database(){
	departmentName=$("#department-add-name").val();
	if(departmentName!=""){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.addDepartment,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.addDepartment,
					n:departmentName,
				},
			dataType: "xml"
		})
		.done(function(r){
			var result;
			result= $(r).find('result').text();
			if(result=="1"){
				get_department_list();
				$("#department-add").addClass("hide");
			}
			else if(result=="0"){
				alert(messages[userPref.lang][4]);
			}
		})
		.fail(function(){
			alert(messages[userPref.lang][2]);
			$("#department-add").addClass("hide");
		});
	}
	else{
		alert(messages[userPref.lang][3]);
	}
}



/* Bitiş - page7.html */







/* Başlangıç - page9.html */


function get_morning_notes_list(){
	//$("#cem").html(siteUrlAdress+"/"+xmlsUrl.getMorningNotesList);
	//alert(siteUrlAdress+"/"+xmlsUrl.getMorningNotesList);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getMorningNotesList,
				fId:firstNoteId,
				lId:lastNoteId
			},
		dataType: "xml"
	})
	.done(function(r){
		//var id, name, data;
		var tDate, subject, myNote, person, dept, i;
		data="";
		$(r).find('result').each(function(index, element) {
            //id=$(this).find('id').text();
			//name=$(this).find('name').text();
			//$("#cem").html($("#cem").html()+"<br>"+$(this).text());
			if(firstNoteId==0){
				firstNoteId=$(this).find('id').text();
				lastNoteId=firstNoteId;
			}
			else{
				lastNoteId=$(this).find('id').text();
			}
			
			data+='<div class="part-2">';
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-15 part-no"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			
			if($(this).find('header').text().trim()==""){
				data+='<div class="grid2-80 grid2h-10 part-header"></div>';	
			}
			else{
				data+='<div class="grid2-80 part-header">'+$(this).find('header').text()+'</div>';	
			}
			
			
			data+='<div class="grid2-5 part-favorite">';
			if($(this).find('favorite').text().trim()=="0"){
				data+='<img src="images/favorite-not.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			else{
				data+='<img src="images/favorite.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			data+='</div>';
			
			
			data+='</div>';
			
			
			data+='<div class="grid-100" onclick="show_hide_part_unvisible(this);"><hr /></div>';
			//alert(rnTobr($(this).find('subject').text())+"-"+$(this).find('subject').text());
			data+='<div class="grid-100 part-subject" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('subject').text())+'</div>';
			
			
			data+='<div class="grid-100 part-unvisible hide" onclick="show_hide_part_unvisible(this);">';
			
			
			
			if($(this).find('prosecution').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100 part-prosecution">'+rnTobr($(this).find('prosecution').text())+'</div>';
			}
			
			if($(this).find('myNote').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100">'+rnTobr($(this).find('myNote').text())+'</div>';
			}
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-40 part-sDate">'+$(this).find('sDate').text()+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-40 part-tDate">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			
			
			data+='<div class="grid2-20 part-delay">'+$(this).find('delay').text()+'</div>';
			
			data+='</div>';
			
			
			
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+="<br />";
				person+=$(this).text();
			});
			data+='<div class="grid2-45 part-person">'+person+'</div>';
			
			
			
			dept="";
			$(this).find('department').each(function(index, element){
				if(dept!="") dept+="<br />";
				dept+=$(this).text();
			});
			data+='<div class="grid2-45 part-department">'+dept+'</div>';		
			
			
			data+='</div>';
			
			
			data+='</div>';
			
			data+='</div>';
			//noteCount++;
        });
		data=$("#"+elementsName.morningNotesList).html()+data;
		$("#"+elementsName.morningNotesList).html(data);
		filter_notes(elementsName.morningNotesList);
		getNotes=0;
		//$("#cem").html($("#cem").html()+"<br>"+noteCount+"-"+getNotes);
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
	//getNotes=0;
}



/* Bitiş - page9.html */



/* Başlangıç - page10.html */

function add_responsible_person(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="responsible-person[]" class="form-element-1 left">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			if(working==1){
				data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
			}
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="icon" src="images/minus-red.png" onclick="delete_responsible_person(this);" />';
		data+='</div>';
		data+='</div>';
		$("#resp-pers").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function delete_responsible_person(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}



function add_responsible_department(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getDepartmentList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getDepartmentList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="responsible-department[]" class="form-element-1 left">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			data+='<option value="'+id+'">'+name+'</option>\';';
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="icon" src="images/minus-red.png" onclick="delete_responsible_department(this);" />';
		data+='</div>';
		data+='</div>';
		$("#resp-dep").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function delete_responsible_department(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}


function add_target_date(){
	var data;
	data='<div class="grid-100">';
	data+='<input type="text" name="target[]"  class="form-element-1 left date-picker" />';
	data+='<div class="icon-container-l-2 margin-left-3">';
	data+='<img class="icon" src="images/minus-red.png" onclick="delete_target_date(this);" />';
	data+='</div>';
	data+='</div>';
	$("#target-date").append(data);
	
	$( ".date-picker" ).datepicker( $.datepicker.regional[ "tr" ] );
	$( ".date-picker" ).datepicker({
	  showOtherMonths: true,
	  selectOtherMonths: true
	});
	
	stop_search();//home12.html için gerekli
}

function delete_target_date(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}


function submit_new_morning_note_form(){
	var frm = $('#new_morning_note_form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitNewMorningNote;
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.submitNewMorningNote,
		timeout: 260000,
		data: d,
		success: function (r) {

			$(r).find('result').each(function(index, element) {
				if($(this).text()=="1"){
					$("#morning-note-added").removeClass("hide");
				}
				else{
					$("#morning-note-not-added").removeClass("hide");
				}
			})
			
		}
	});

	e.preventDefault();
}


$( function(){	
	$(document).on("click","#morning-note-added-yes", function(){
		open_page("page10.html","");
	});
	$(document).on("click","#morning-note-added-no", function(){
		open_page("page8.html","");
	});
	$(document).on("click","#morning-note-not-added-ok", function(){
		$("#morning-note-not-added").addClass("hide");
	});
	
});
/* Bitiş - page10.html */






/* Başlangıç - page11.html */

function get_morning_note(){
	noteId=get_storaged_data(find_page_name());
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNote,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getMorningNote,
				nId:noteId
			},
		dataType: "xml"
	})
	.done(function(r){
		var data, person, dep;
		data="";
		$(r).find('result').each(function(index, element) {
			
            $("#note-id").val($(this).find('id').text());
			$("#note-no").val($(this).find('no').text());
			$("#note-start").val($(this).find('sDate').text());
			$("#note-delay").val($(this).find('delay').text());
			$("#note-header").val($(this).find('header').text());
			$("#note-subject").val($(this).find('subject').text());
			$("#note-prosecution").val($(this).find('prosecution').text());
			$("#note-my-notes").val($(this).find('myNote').text());
			if($(this).find('finished').text()=="1"){
				$("#note-finished").prop('checked', true);
			}
			
			
			$(this).find('tDate').each(function(index, element){
				
				tDate=$(this).text();				
				data='<div class="grid-100">';
                data+='<input type="text" name="target[]"  class="form-element-1 left  date-picker" value="'+tDate+'" />';
                data+='<div class="icon-container-l-2 margin-left-3">';
                data+='<img class="icon" src="images/minus-red.png" onclick="delete_target_date(this);" />';
                data+='</div>';
                data+='</div>';
						
						
				$("#target-date").append(data);
	
			});
			
			$(this).find('person').each(function(index, element){
				person=$(this).text();
				add_responsible_person();
				$("#resp-pers select").last().val(person);
			});
			
			$(this).find('department').each(function(index, element){
				dep=$(this).text();
				add_responsible_department();
				$("#resp-dep select").last().val(dep);
			});
        });
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
	});
}


function submit_edit_morning_note_form(){
	var frm = $('#edit_morning_note_form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitEditMorningNote;
	//alert(d);
	//return false;
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.submitEditMorningNote,
		timeout: 260000,
		data: d,
		success: function (r) {
			//alert(r);
			$(r).find('result').each(function(index, element) {
				//alert($(this).text());
				if($(this).text()=="1"){
					$("#morning-note-added").removeClass("hide");
				}
				else{
					$("#morning-note-not-added").removeClass("hide");
				}
			})
			
		}
	});
	e.preventDefault();
}

$( function(){	
	$(document).on("click","#morning-note-editted-yes", function(){
		open_page("page11.html","");
	});
	$(document).on("click","#morning-note-editted-no", function(){
		open_page("page8.html","");
	});
	$(document).on("click","#morning-note-not-editted-ok", function(){
		$("#morning-note-not-added").addClass("hide");
	});
	
});
/* Bitiş - page11.html */




/* Başlangıç - page12.html */
function change_between_display(e){
	if($(e).attr("src")=="images/between-grey.png"){
		$(e).attr("src","images/between-white.png");
		$(e).parent().parent().parent().find("div").last().removeClass("hide");
	}
	else{
		$(e).attr("src","images/between-grey.png");
		$(e).parent().parent().parent().find("div").last().addClass("hide");
	}
	stop_search();
}


function change_search_mode(e){
	if($(e).attr("src")=="images/search-advanced.png"){
		$(e).attr("src","images/search.png");
		$("#morning-notes-search-basic").addClass("hide");
		$("#morning-notes-search-advanced").removeClass("hide");
	}
	else{
		$(e).attr("src","images/search-advanced.png");
		$("#morning-notes-search-advanced").addClass("hide");
		$("#morning-notes-search-basic").removeClass("hide");
	}
	stop_search()
}


function search_morning_note(){
	firstNoteId=0;
	lastNoteId=0;
	noteCount=1;
	searchMode="basic";
	$("#search-morning-notes-list").html("");
	get_search_morning_note()
}

function get_search_morning_note(){
	var search_keyword=$("#aranacak").val();
	//alert("cem\r\ncem");
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.searchMorningNote,
		timeout: 260000,
		data: {
			un:userPref.uName,
			p:userPref.uPassword,
			s:xmlsString.searchMorningNote,
			sk:search_keyword,
			fId:firstNoteId,
			lId:lastNoteId
			},
		dataType: "xml"
	})
	.done(function(r){
		
		var tDate, subject, myNote, i;
		data="";
		$(r).find('result').each(function(index, element) {
			if(firstNoteId==0){
				firstNoteId=$(this).find('id').text();
				lastNoteId=firstNoteId;
			}
			else{
				lastNoteId=$(this).find('id').text();
			}
			
			
						data+='<div class="part-2">';
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-15 part-no"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			
			
			if($(this).find('header').text().trim()==""){
				data+='<div class="grid2-80 grid2h-10 part-header"></div>';	
			}
			else{
				data+='<div class="grid2-80 part-header">'+$(this).find('header').text()+'</div>';	
			}
			
			
			data+='<div class="grid2-5 part-favorite">';
			if($(this).find('favorite').text().trim()=="0"){
				data+='<img src="images/favorite-not.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			else{
				data+='<img src="images/favorite.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			data+='</div>';
			
			
			data+='</div>';
			
			
			data+='<div class="grid-100" onclick="show_hide_part_unvisible(this);"><hr /></div>';
			data+='<div class="grid-100 part-subject" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('subject').text())+'</div>';
			//alert(rnTobr($(this).find('subject').html())+"-"+$(this).find('subject').html());
			
			data+='<div class="grid-100 part-unvisible hide" onclick="show_hide_part_unvisible(this);">';
			
			
			
			if($(this).find('prosecution').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100 part-prosecution">'+rnTobr($(this).find('prosecution').text())+'</div>';
			}
			
			if($(this).find('myNote').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100">'+rnTobr($(this).find('myNote').text())+'</div>';
			}
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-40 part-sDate">'+rnTobr($(this).find('sDate').text())+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-40 part-tDate">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			
			
			data+='<div class="grid2-20 part-delay">'+$(this).find('delay').text()+'</div>';
			
			data+='</div>';
			
			
			
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+="<br />";
				person+=$(this).text();
			});
			data+='<div class="grid2-45 part-person">'+person+'</div>';
			
			
			
			dept="";
			$(this).find('department').each(function(index, element){
				if(dept!="") dept+="<br />";
				dept+=$(this).text();
			});
			data+='<div class="grid2-45 part-department">'+dept+'</div>';		
			
			
			data+='</div>';
			
			
			data+='</div>';
			
			data+='</div>';
			
        });
		data=$("#"+elementsName.searchMorningNotesList).html()+data;
		$("#"+elementsName.searchMorningNotesList).html(data);
		filter_notes(elementsName.searchMorningNotesList);
		getNotes=0;
		
		if($(r).find('result').text()!="" && 
		($(window).scrollTop()+$(window).height()*1 >= $(document).height()*1)){
			
			
			//alert($(r).find('result').text());
			get_search_morning_note();
			//windows_size_check_after_search();
		}
		
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
	
}

function search_advanced_morning_note(){
	firstNoteId=0;
	lastNoteId=0;
	noteCount=1;
	searchMode="advanced";
	$("#search-morning-notes-list").html("");
	get_search_advanced_morning_note()
}

function get_search_advanced_morning_note(){
	var frm = $('#morning_note_advanced_search_form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.searchAdvancedMorningNote+"&fId="+firstNoteId+"&lId="+lastNoteId;
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.searchAdvancedMorningNote,
		timeout: 260000,
		data: d,
		dataType: "xml"
	})
	.done(function(r){
		//var id, name, data;
		var tDate, subject, myNote, i;
		data="";
		//alert("cem2");
		$(r).find('result').each(function(index, element) {
			//alert($(this).text());
			if(firstNoteId==0){
				firstNoteId=$(this).find('id').text();
				lastNoteId=firstNoteId;
			}
			else{
				lastNoteId=$(this).find('id').text();
			}
			
						data+='<div class="part-2">';
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-15 part-no"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			
			
			if($(this).find('header').text().trim()==""){
				data+='<div class="grid2-80 grid2h-10 part-header"></div>';	
			}
			else{
				data+='<div class="grid2-80 part-header">'+$(this).find('header').text()+'</div>';	
			}
			
			
			data+='<div class="grid2-5 part-favorite">';
			if($(this).find('favorite').text().trim()=="0"){
				data+='<img src="images/favorite-not.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			else{
				data+='<img src="images/favorite.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			data+='</div>';
			data+='</div>';
			
			
			data+='<div class="grid-100" onclick="show_hide_part_unvisible(this);"><hr /></div>';
			data+='<div class="grid-100 part-subject" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('subject').text())+'</div>';
			
			
			data+='<div class="grid-100 part-unvisible hide" onclick="show_hide_part_unvisible(this);">';
			
			
			
			if($(this).find('prosecution').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100 part-prosecution">'+rnTobr($(this).find('prosecution').text())+'</div>';
			}
			
			if($(this).find('myNote').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100">'+rnTobr($(this).find('myNote').text())+'</div>';
			}
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-40 part-sDate">'+$(this).find('sDate').text()+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-40 part-tDate">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			
			
			data+='<div class="grid2-20 part-delay">'+$(this).find('delay').text()+'</div>';
			
			data+='</div>';
			
			
			
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+="<br />";
				person+=$(this).text();
			});
			data+='<div class="grid2-45 part-person">'+person+'</div>';
			
			
			
			dept="";
			$(this).find('department').each(function(index, element){
				if(dept!="") dept+="<br />";
				dept+=$(this).text();
			});
			data+='<div class="grid2-45 part-department">'+dept+'</div>';		
			
			
			data+='</div>';
			
			
			data+='</div>';
			
			data+='</div>';
			
        });
		data=$("#"+elementsName.searchMorningNotesList).html()+data;
		$("#"+elementsName.searchMorningNotesList).html(data);
		filter_notes(elementsName.searchMorningNotesList);
		getNotes=0;
		
		if($(r).find('result').text()!="" && 
		($(window).scrollTop()+$(window).height()*1 >= $(document).height()*1)){
			get_search_advanced_morning_note();
		}
		
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
	//getNotes=0;
}



function stop_search(){
	if(find_page_name()=="page12.html"){
		searchMode="";
	}
}
/* Bitiş - page12.html */









//data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';

/* Başlangıç - page13.html */
function show_morning_note(){
	noteId=get_storaged_data(find_page_name());
	//alert(noteId);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNoteToShow,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getMorningNoteToShow,
				nId:noteId
			},
		dataType: "xml"
	})
	.done(function(r){
		var data, person, dept, tDate;
		data="";
		$(r).find('result').each(function(index, element) {
			
			data+='<div class="part-1">';
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-15 part-no2">'+$(this).find('no').text()+'</div>';
			
			
			if($(this).find('header').text().trim()==""){
				data+='<div class="grid2-80 grid2h-10 part-header"></div>';	
			}
			else{
				data+='<div class="grid2-80 part-header">'+$(this).find('header').text()+'</div>';	
			}
			
			
			data+='<div class="grid2-5 part-favorite">';
			if($(this).find('favorite').text().trim()=="0"){
				data+='<img src="images/favorite-not.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			else{
				data+='<img src="images/favorite.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			data+='</div>';
			
			
			
			
			data+='</div>';
			
			
			data+='<div class="grid-100" onclick="show_hide_part_unvisible(this);"><hr /></div>';
			data+='<div class="grid-100 part-subject" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('subject').text())+'</div>';
			
			
			data+='<div class="grid-100 part-unvisible hide" onclick="show_hide_part_unvisible(this);">';
			
			
			
			if($(this).find('prosecution').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100 part-prosecution">'+rnTobr($(this).find('prosecution').text())+'</div>';
			}
			
			if($(this).find('myNote').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100">'+rnTobr($(this).find('myNote').text())+'</div>';
			}
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-40 part-sDate">'+$(this).find('sDate').text()+'</div>';
						
			tDate="";
			$(this).find('tDate').each(function(index, element){
				if(tDate!="") tDate+="<br />";
				tDate+=$(this).text();
			});
			data+='<div class="grid2-40 part-tDate">'+tDate+'</div>';
			
			
			
			data+='<div class="grid2-20 part-delay">'+$(this).find('delay').text()+'</div>';
			
			data+='</div>';
			
			
			
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+="<br />";
				person+=$(this).text();
			});
			data+='<div class="grid2-45 part-person">'+person+'</div>';
			
			dept="";
			$(this).find('department').each(function(index, element){
				if(dept!="") dept+="<br />";
				dept+=$(this).text();
			});
			data+='<div class="grid2-45 part-department">'+dept+'</div>';
			data+='</div>';
			
			data+='</div>';
			
			data+='</div>';
			
			data+='</div>';
			

        });
		
		data=$("#"+elementsName.morningNote).html()+data;
		$("#"+elementsName.morningNote).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
	});
}
/* Bitiş - page13.html */








/* Başlangıç - page14.html */
function get_favorite_morning_notes_list(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getFavoriteMorningNotesList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getFavoriteMorningNotesList,
				fId:firstNoteId,
				lId:lastNoteId
			},
		dataType: "xml"
	})
	.done(function(r){
		//var id, name, data;
		var tDate, subject, myNote, person, dept, i;
		data="";
		$(r).find('result').each(function(index, element) {
			if(firstNoteId==0){
				firstNoteId=$(this).find('id').text();
				lastNoteId=firstNoteId;
			}
			else{
				lastNoteId=$(this).find('id').text();
			}
			
			data+='<div class="part-2">';
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-15 part-no"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			
			if($(this).find('header').text().trim()==""){
				data+='<div class="grid2-80 grid2h-10 part-header"></div>';	
			}
			else{
				data+='<div class="grid2-80 part-header">'+$(this).find('header').text()+'</div>';	
			}
			
			
			data+='<div class="grid2-5 part-favorite">';
			if($(this).find('favorite').text().trim()=="0"){
				data+='<img src="images/favorite-not.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			else{
				data+='<img src="images/favorite.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_note_favorite(this, \''+$(this).find('id').text()+'\')" />';
			}
			data+='</div>';
			
			
			data+='</div>';
			
			
			data+='<div class="grid-100" onclick="show_hide_part_unvisible(this);"><hr /></div>';
			data+='<div class="grid-100 part-subject" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('subject').text())+'</div>';
			
			
			data+='<div class="grid-100 part-unvisible hide" onclick="show_hide_part_unvisible(this);">';
			
			
			
			if($(this).find('prosecution').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100 part-prosecution">'+rnTobr($(this).find('prosecution').text())+'</div>';
			}
			
			if($(this).find('myNote').text().trim()!=""){
				data+='<div class="grid-100"><hr /></div>';
				data+='<div class="grid-100">'+rnTobr($(this).find('myNote').text())+'</div>';
			}
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-40 part-sDate">'+$(this).find('sDate').text()+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-40 part-tDate">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			
			
			data+='<div class="grid2-20 part-delay">'+$(this).find('delay').text()+'</div>';
			
			data+='</div>';
			
			
			
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+="<br />";
				person+=$(this).text();
			});
			data+='<div class="grid2-45 part-person">'+person+'</div>';
			
			
			
			dept="";
			$(this).find('department').each(function(index, element){
				if(dept!="") dept+="<br />";
				dept+=$(this).text();
			});
			data+='<div class="grid2-45 part-department">'+dept+'</div>';		
			
			
			data+='</div>';
			
			
			data+='</div>';
			
			data+='</div>';
			//noteCount++;
        });
		data=$("#"+elementsName.favoriteMorningNotesList).html()+data;
		$("#"+elementsName.favoriteMorningNotesList).html(data);
		filter_notes(elementsName.favoriteMorningNotesList);
		getNotes=0;
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
	//getNotes=0;
}

/* Bitiş - page14.html */






/* Başlangıç - page15.html */

function get_all_statistics(){
	get_statistics1();
	get_statistics2();
	get_statistics3();
	get_statistics4();
	get_statistics5();
	get_statistics6();
	get_statistics7();
	get_statistics8();
	get_statistics9();
	get_statistics10();
	
}
function get_statistics1(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"1",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		data+='<div class="grid-100">';
			
		data+='<div class="grid2-30 part-4 part-yellow">Bölüm</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Bitmiş</div>';
		data+='<div class="grid2-24 part-4 part-yellow center">Bitmemiş</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Toplam</div>';
		
		data+='</div>';
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-30 part-5">'+$(this).find('department').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('finished').text()+'</div>';
			data+='<div class="grid2-24 part-5 center">'+$(this).find('unfinished').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics2(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"2",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		data+='<div class="grid-100">';
			
		data+='<div class="grid2-30 part-4 part-yellow">Kişi</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Bitmiş</div>';
		data+='<div class="grid2-24 part-4 part-yellow center">Bitmemiş</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Toplam</div>';
		
		data+='</div>';
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-30 part-5">'+$(this).find('person').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('finished').text()+'</div>';
			data+='<div class="grid2-24 part-5 center">'+$(this).find('unfinished').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics3(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"3",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5 part-yellow">Ortalama Erteleme Süresi</div>';
			data+='<div class="grid2-50 part-5">'+$(this).find('delay_average').text()+'</div>';		
			data+='</div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics4(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"4",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5 part-yellow">Günlük Ortalama Not Oluşturma Sayısı</div>';
			data+='<div class="grid2-50 part-5">'+$(this).find('note_count').text()+'</div>';		
			data+='</div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics5(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"5",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Başlatılan Not sayısı (Gün)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">'+$(this).find('date').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics6(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"6",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Başlatılan Not sayısı (Ay)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">';
			if($(this).find('month').text().length==1) data+='0';

			data+=$(this).find('month').text()+"."+$(this).find('year').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics7(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"7",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Bitirilen Not sayısı (Gün)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">'+$(this).find('date').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics8(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"8",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Bitirilen Not sayısı (Ay)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">';
			if($(this).find('month').text().length==1) data+='0';

			data+=$(this).find('month').text()+"."+$(this).find('year').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics9(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"9",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5 part-yellow">Günlük Ortalama Not Bitirme Sayısı</div>';
			data+='<div class="grid2-50 part-5">'+$(this).find('note_count').text()+'</div>';		
			data+='</div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

/* Bitiş - page15.html */















/* Başlangıç - page17.html */
function add_kaizen_type(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.listKaizenTypes,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.listKaizenTypes
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="kaizen-type" id="kaizen-type" class="form-element-1 left">';
		data+='<option value="0">--</option>';
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			data+='<option value="'+id+'">'+name+'</option>\';';
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='</div>';
		data+='</div>';
		$("#kaizen-type-container").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function add_proposal_person(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="proposal-person" id="proposal-person" class="form-element-1 left">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			if(working==1){
				data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
			}
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		//data+='<img class="icon" src="images/minus-red.png" onclick="delete_proposal_person(this);" />';
		data+='</div>';
		data+='</div>';
		$("#prop-pers").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function delete_proposal_person(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}


function add_kaizen_responsible_group(gNo){
	if(gNo=="") gNo=0;
	
	$.ajax({
		async: false,
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.listKaizenGroups,
		timeout: 260000,
		data: {un:userPref.uName,
			   p:userPref.uPassword,
			   s:xmlsString.listKaizenGroups,
			   gno: gNo
		},
		success: function (r) {
			
			var kgName;
			var kgNo;
			var data;
			data="";
			data='<select name="kaizen-responsible-group" id="kaizen-responsible-group" class="form-element-1 left">';
			data+='<option value="0" style="font-weight:bold">---</option>';
			$(r).find('group').each(function(index, element) {
				
				
				$(this).find('group_name').each(function(index, element) {
					kgName=$(this).text();
				});
				
				$(this).find('group_id').each(function(index, element) {
					kgNo=$(this).text();
				});
				data+='<option value="'+kgNo+'" style="font-weight:bold">'+kgName+'</option>';
				
				
				$(this).find('person').each(function(index, element) {
					data+='<option value="" disabled="disabled">'+$(this).text()+'</option>';
				});
				data+='<option value="" disabled="disabled"></option>'; 
			});
			
			data+='</select>';
			
			$("#kaizen-resp-group").append(data);

		}
	});
}


function delete_kaizen_responsible_person(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}


function add_proposal_person_department(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getDepartmentList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getDepartmentList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="proposal-person-department" id="proposal-person-department" class="form-element-1 left">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			data+='<option value="'+id+'">'+name+'</option>\';';
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		//data+='<img class="icon" src="images/minus-red.png" onclick="delete_proposal_person_department(this);" />';
		data+='</div>';
		data+='</div>';
		$("#prop-resp-dep").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function delete_proposal_person_department(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}


function add_proposal_refree(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		
		<!--proposal-refree-->
		data+='<select name="proposal-refree[]" class="form-element-1 left proposal-refree-select">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			if(working==1){
				data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
			}
        });
		data+='</select>';
		
		<!--proposal-refree-point-->
		data+='<select name="proposal-refree-point[]" class="form-element-1 left proposal-refree-point" onchange="sum_refree_points()">';
		data+='<option value="-1">--</option>';
		data+='<option value="0">0</option>';
		data+='<option value="1">1</option>';
		data+='<option value="2">2</option>';
		data+='<option value="3">3</option>';
		data+='<option value="4">4</option>';
		data+='</select>';
		
		<!--proposal-refree-approval-->
		data+='<select name="proposal-refree-approval[]" id="refree-approval" class="form-element-1 left refree-approval">';
        data+='<option value="0">---</option>';
        data+='<option value="1">Onay</option>';
        data+='<option value="2">Red</option>';
        data+='</select>';
		
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="icon" src="images/minus-red.png" onclick="delete_proposal_refree(this);" />';
		data+='</div>';
		data+='</div>';
		$("#kaizen-refrees").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}

function sum_refree_points(){
	var sum;
	sum=0;
	var ref_count;
	ref_count=0;
	$(".proposal-refree-point").each(function(index, element) {
        if($(this).val()>-1){
			ref_count++;
			sum+=$(this).val()*1;
		}
    });
	if(ref_count==0){
		$("#point").val("0");
	}
	else{
		$("#point").val(Math.round(sum*1/(ref_count*1)));
	}
	
	
}

function delete_proposal_refree(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
	sum_refree_points();
}





function submit_new_kaizen_form(){
	
	var frm = $('#new_kaizen_form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitNewKaizenForm;
	
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.submitNewKaizenForm,
		timeout: 260000,
		data: d,
		success: function (r) {
			//alert($(r).find('sql').text());
			$(r).find('result').each(function(index, element) {
				if($(this).text()=="1"){
					$("#kaizen-added").removeClass("hide");
				}
				else{
					$("#kaizen-not-dded").removeClass("hide");
				}
			})
		}
	});

	e.preventDefault();
}


$( function(){	
	$(document).on("click","#kaizen-added-yes", function(){
		//alert("cem");
		open_page("page17.html","");
	});
	$(document).on("click","#kaizen-added-no", function(){
		open_page("page16.html","");
	});
	$(document).on("click","#kaizen-not-added-ok", function(){
		$("#kaizen-not-added").addClass("hide");
	});
	
});
/* Bitiş - page17.html */



/* Başlangıç - page18.html */

function add_proposal_refree_for_search(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		
		<!--proposal-refree-->
		data+='<select name="proposal-refree[]" class="form-element-1 left proposal-refree-select">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			if(working==1){
				data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
			}
        });
		data+='</select>';
		
		<!--proposal-refree-point-->
		data+='<select name="proposal-refree-point[]" class="form-element-1 left proposal-refree-point" onchange="sum_refree_points()">';
		data+='<option value="-2">--</option>';
		data+='<option value="-1">Değerlendirmemiş</option>';
		data+='<option value="0">0</option>';
		data+='<option value="1">1</option>';
		data+='<option value="2">2</option>';
		data+='<option value="3">3</option>';
		data+='<option value="4">4</option>';
		data+='</select>';
		
		<!--proposal-refree-approval-->
		data+='<select name="proposal-refree-approval[]" id="refree-approval" class="form-element-1 left">';
        data+='<option value="-1">---</option>';
		data+='<option value="0">Değerlendirmemiş</option>';
        data+='<option value="1">Onay</option>';
        data+='<option value="2">Red</option>';
        data+='</select>';
		
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="icon" src="images/minus-red.png" onclick="delete_proposal_refree(this);" />';
		data+='</div>';
		data+='</div>';
		$("#kaizen-refrees").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}

function search_kaizen(){
	firstKaizenId=0;
	lastKaizenId=0;
	KaizenCount=1;
	searchMode="basic";
	$("#"+elementsName.searchKaizensList).html("");
	get_search_kaizen()
}

function get_search_kaizen(){
	var search_keyword=$("#aranacak").val();
	
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.searchKaizens,
		timeout: 260000,
		data: {
			un:userPref.uName,
			p:userPref.uPassword,
			s:xmlsString.searchKaizens,
			sk:search_keyword,
			fId:firstKaizenId,
			lId:lastKaizenId
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		data=prepareKaizenHtmlCode(r);
		
		data=$("#"+elementsName.searchKaizensList).html()+data;
		$("#"+elementsName.searchKaizensList).html(data);
		filter_notes(elementsName.searchKaizensList);
		getNotes=0;
		
		if($(r).find('result').text()!="" && 
		($(window).scrollTop()+$(window).height()*1 >= $(document).height()*1)){
			
			get_search_kaizen();
		}
		
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
	
}

function search_advanced_kaizen(){
	firstKaizenId=0;
	lastKaizenId=0;
	KaizenCount=1;
	searchMode="advanced";
	$("#"+elementsName.searchKaizensList).html("");
	get_search_advanced_kaizen();
}

function get_search_advanced_kaizen(){
	var frm = $('#morning_note_advanced_search_form');
	var d;
	
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.searchAdvancedKaizens+"&fId="+firstKaizenId+"&lId="+lastKaizenId;
	//alert(d);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.searchAdvancedKaizens,
		timeout: 260000,
		data: d,
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data=prepareKaizenHtmlCode(r);
		data=$("#"+elementsName.searchKaizensList).html()+data;
		$("#"+elementsName.searchKaizensList).html(data);
		filter_notes(elementsName.searchKaizensList);
		getNotes=0;

		if($(r).find('result').text()!="" && 
		($(window).scrollTop()+$(window).height()*1 >= $(document).height()*1)){
			
			get_search_advanced_kaizen();
		}
		
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}



function stop_search_kaizen(){
	if(find_page_name()=="page12.html"){
		searchMode="";
	}
}
/* Bitiş - page18.html */





/* Başlangıç - page19.html */
function filter_kaizens(list_id){
	
	if(filterOn==1){
		var filterKaizen;//Kaizenin filtrelenmiş olup olmadığını tutan değişken
		//Başlangıç değeri 1. Eğer filtre uygulanmışsa ve notun ilgili değeri filtrede yoksa (gösterilmeyecekse) değeri 0 olacak. Gösterilmesi isteniyorsa (filtre değerinde varsa) değeri 2 olacak. Sonuç olarak bu değer 1 veya 2 ise not gösterilecek.
		
		var filterVal;//İlgili filtre bölümüne (no, start, target vs.) olarak girilen değer(ler)
		var filterPart;//Notun filtre bölümü ile ilgili kısmının (no, start, target vs.) değeri
		
		$("#"+list_id).children("div").each(function(){
			filterKaizen=1;
			
			filterVal=$("#filter-number").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-no").html();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			
			
			filterVal=$("#filter-date").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-proposal-date").html();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			filterVal=$("#filter-problem").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-problem").html();			
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			filterVal=$("#filter-solution").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-solution").html();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			
			filterVal=$("#filter-person").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-person").html().toLowerCase();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].toLowerCase().trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			
			
			filterVal=$("#filter-department").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-department").html().toLowerCase();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].toLowerCase().trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			filterVal=$("#filter-kaizen-type").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-type").html().toLowerCase();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].toLowerCase().trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			
			filterVal=$("#filter-group").val().trim().split(",");
			filterPart=$(this).find(".part-kaizen-group-name").html();
			for(var i=0;i<filterVal.length;i++){
				filterVal[i]=filterVal[i].trim();
				if(filterVal[i]!=""){
					filterControl=1;
					if(filterPart.indexOf(filterVal[i])>-1){
						filterKaizen=2;
					}
					else if(filterPart.indexOf(filterVal[i])==-1 && filterKaizen==1 && i==filterVal.length-1){
						filterKaizen=0;
					};
				};
			};
			
			
			filterVal=$("#filter-approval").val();
			filterPart=$(this).find(".part-kaizen-approval").html().toLowerCase().trim();
			if(filterVal==0){
				if(filterPart!=""){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			else if(filterVal==1){
				if(filterPart==""){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			
			
			filterVal=$("#filter-approval").val();
			filterPart=$(this).find(".part-kaizen-approval").html().toLowerCase().trim();
			if(filterVal==0){
				if(filterPart.indexOf("delay.png")>-1){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			else if(filterVal==1){
				if(filterPart.indexOf("ok.png")>-1){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			else if(filterVal==2){
				if(filterPart.indexOf("ok_not.png")>-1){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			
			filterVal=$("#filter-favorite").val();
			filterPart=$(this).find(".part-kaizen-favorite").html().toLowerCase().trim();
			if(filterVal==0){
				if(filterPart.indexOf("favorite.png")>-1){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			else if(filterVal==1){
				if(filterPart.indexOf("favorite-not.png")>-1){
					filterKaizen=2;
				}
				else{
					filterKaizen=0;
				}
			}
			
			
			//Listeyi düzenleme
			if(filterKaizen>0){
				if($(this).hasClass("hide")){
					$(this).removeClass("hide");
				}				
			}
			else{
				if(!$(this).hasClass("hide")){
					$(this).addClass("hide");
				}
			}
			
		});
		
		
	}
}


function clear_filter_kaizen_box(list_id){
	$("#filter-number").val("");
	$("#filter-start").val("");
	$("#filter-target").val("");
	$("#filter-person").val("");
	$("#filter-department").val("");
	$("#filter-delay").val("");
	$("#filter-finished").val("-1");
	$("#filter-favorite").val("-1");
	filter_kaizens(list_id);
}

function get_kaizens_list(){
	
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getKaizensList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getKaizensList,
				fId:firstKaizenId,
				lId:lastKaizenId
			},
		dataType: "xml"
	})
	.done(function(r){
		
		var data;
		data="";
		data=prepareKaizenHtmlCode(r);
		data=$("#"+elementsName.kaizensList).html()+data;
		$("#"+elementsName.kaizensList).html(data);
		filter_notes(elementsName.kaizensList);
		getKaizens=0;
		//$("#cem").html($("#cem").html()+"<br>"+noteCount+"-"+getNotes);
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getKaizens=0;
	});
	//getNotes=0;
}

function change_kaizen_favorite(e, eid){
	var f;
	if($(e).attr("src")=="images/favorite.png"){
		f="0";
	}
	else{
		f="1";
	}

	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.updateKaizenFavorite,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.updateKaizenFavorite,
				kId:eid,
				kf:f
			},
		dataType: "xml"
	})
	.done(function(r){
		data="";
		$(r).find('result').each(function(index, element) {
			if($(this).text().trim()=="0"){
				alert(messages[userPref.lang][5]);
			}
			else{
				if(f==0){
					$(e).attr("src", "images/favorite-not.png");
				}
				else{
					$(e).attr("src", "images/favorite.png");
				}
			}
		})
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
	});
	
	
}

function sort_kaizens(s, eid){
	var ret=0;
	if(s=="desc"){
		$("#"+eid).find(".part-kaizen-no").each(function() {
			if($(this).parent().parent().next().find(".part-kaizen-no").html()!="" && $(this).parent().parent().next().find(".part-kaizen-no").html()!="undefined"){
				if($(this).html()<$(this).parent().parent().next().find(".part-kaizen-no").html()){
					ret=1;
					var d=$(this).parent().parent()[0].outerHTML;
					$(this).parent().parent().next().after(d);
					$(this).parent().parent().remove();
				}
			}
		});
	}
	else if(s=="asc"){
		$("#"+eid).find(".part-kaizen-no").each(function() {
			if($(this).parent().parent().next().find(".part-kaizen-no").html()!="" && $(this).parent().parent().next().find(".part-kaizen-no").html()!="undefined"){
				if($(this).html()>$(this).parent().parent().next().find(".part-kaizen-no").html()){
					ret=1;
					var d=$(this).parent().parent().next()[0].outerHTML;
					$(this).parent().parent().next().remove();
					$(this).parent().parent().before(d);
				}
			}
		});
	}
	if(ret==1){
		sort_kaizens(s, eid);
	}
}



/* Bitiş - page19.html */

/* Başlangıç - page20.html */
//get_kaizen_type_list

function get_kaizen_type_list(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getKaizenTypeList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getKaizenTypeList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, data;
		data="";
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			data+='<div class="part-2">';
			data+='<div class="icon-container-l margin-2 kaizen-type-delete-icon"><img class="icon" src="images/delete.png" /></div>';
			data+='<div class="icon-container-l margin-2 kaizen-type-rename-icon"><img class="icon" src="images/rename.png" /></div>';
			data+='<div class="kaizen-type margin-2">'+name+'</div>';
			data+='<div class="kaizen-type-id hide">'+id+'</div>';
			data+='<div class="kaizen-type-name hide">'+name+'</div>';
			data+='</div>';
			
        });
		$("#"+elementsName.kaizenTypeList).html(data);
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
}

function change_kaizen_type_rename(){
	kaizenTypeNewName=$("#kaizen-type-new-name").val();
	if(kaizenTypeNewName!="" && kaizenTypeID!=""){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.changeKaizenTypeRename,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.changeKaizenTypeRename,
					kti:kaizenTypeID,
					n:kaizenTypeNewName
				},
			dataType: "xml"
		})
		.done(function(r){
			var result;
			result= $(r).find('result').text();
			if(result=="1"){
				get_kaizen_type_list();
				$("#kaizen-type-rename").addClass("hide");
			}		
		})
		.fail(function(){
			alert(messages[userPref.lang][2]);
			$("#kaizen-type-rename").addClass("hide");
		});
	}
	else{
		alert(messages[userPref.lang][3]);
	}
}

function change_kaizen_type_delete(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getKaizenTypeList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.changeKaizenTypeDelete,
				kti:kaizenTypeID
			},
		dataType: "xml"
	})
	.done(function(r){
		var result;
		result= $(r).find('result').text();
		if(result=="1"){
			get_kaizen_type_list();
			$("#kaizen-type-delete").addClass("hide");
		}		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		$("#kaizen-type-delete").addClass("hide");
	});
}



function add_kaizen_type_to_database(){

	kaizenTypeName=$("#kaizen-type-add-name").val();
	if(kaizenTypeName!=""){
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.addKaizenType,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.addKaizenType,
					n:kaizenTypeName,
				},
			dataType: "xml"
		})
		.done(function(r){
			var result;
			result= $(r).find('result').text();
			if(result=="1"){
				get_kaizen_type_list();
				$("#kaizen-type-add").addClass("hide");
			}
			else if(result=="0"){
				alert(messages[userPref.lang][4]);
			}
		})
		.fail(function(){
			alert(messages[userPref.lang][2]);
			$("#kaizen-type-add").addClass("hide");
		});
	}
	else{
		alert(messages[userPref.lang][3]);
	}
}


$( function(){	
	
	$(document).on("dblclick",".kaizen-type-delete-icon", function(){
		$("#department-kaizen-type-name").html($(this).parent().find(".kaizen-type").html());
		kaizenTypeID="";
		kaizenTypeID=$(this).parent().find(".kaizen-type-id").html();
		$("#kaizen-type-delete").removeClass("hide");
	});
	$(document).on("click","#kaizen-type-delete-yes", function(){
		change_kaizen_type_delete();
	});
	$(document).on("click","#kaizen-type-delete-no", function(){
		$("#department-delete").addClass("hide");
	});
	
	
	
	$(document).on("dblclick",".kaizen-type-rename-icon", function(){
		kaizenTypeID="";
		kaizenTypeName="";
		kaizenTypeID=$(this).parent().find(".kaizen-type-id").html();
		$("#kaizen-type-rename-name").html($(this).parent().find(".kaizen-type-name").html());		
		$("#kaizen-type-new-name").val($(this).parent().find(".kaizen-type-name").html());
		$("#kaizen-type-rename").removeClass("hide");
	});
	$(document).on("click","#kaizen-type-rename-yes", function(){
		change_kaizen_type_rename();
	});
	$(document).on("click","#kaizen-type-rename-no", function(){
		$("#kaizen-type-rename").addClass("hide");
	});
	
	
	$(document).on("click",".kaizen-type-add-icon", function(){
		$("#kaizen-type-add-name").val("");		
		$("#kaizen-type-add").removeClass("hide");
	});
	$(document).on("click","#kaizen-type-add-yes", function(){
		add_kaizen_type_to_database();
	});
	$(document).on("click","#kaizen-type-add-no", function(){
		$("#kaizen-type-add").addClass("hide");
	});
	
});

/* Bitiş - page20.html */

/* Başlangıç - page21.html */
function get_kaizen(){
	kaizenId=get_storaged_data(find_page_name());
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getKaizen,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getKaizen,
				kId:kaizenId
			},
		dataType: "xml"
	})
	.done(function(r){
		
		$(r).find('result').each(function(index, element) {
			
			$("#kid").val($(this).find('kid').text());
			$("#no").val($(this).find('kaizen_no').text());
			$("#date").val($(this).find('proposal_date').text());
			$("#finished").val($(this).find('finished').text());
			$("#proposal-problem").val($(this).find('problem').text());
			$("#proposal-solution").val($(this).find('solution').text());
			$("#my-note").val($(this).find('my_note').text());
			$("#proposal-person").val($(this).find('person_id').text());
			add_kaizen_responsible_group();
			//$("#kaizen-responsible-group").attr("selected", true);
			$("#kaizen-responsible-group").val($(this).find('group_id').text());//.attr("selected", true).prop("selected", true);
			//alert($("#kaizen-responsible-group").val()+"-"+$(this).find('group_id').text());
			
			$("#proposal-person-department").val($(this).find('department_id').text());
			$("#kaizen-type").val($(this).find('kaizen_type_id').text());
			
			$("#approval").val($(this).find('approval').text());
			
			if($(this).find('point').text()=="-1"){
				$("#point").val("0");
			}
			else{
				$("#point").val($(this).find('point').text());
			}
			
			$(this).find('referee_person').each(function(index, element) {
				add_proposal_refree();
				$(".proposal-refree-select:last").val($(this).find('referee_person_id').text());
				$(".proposal-refree-point:last").val($(this).find('referee_person_point').text());
				$(".refree-approval:last").val($(this).find('referee_person_approval').text());
				
			});
			
			//alert($("#kaizen-responsible-group").val()+"-"+$(this).find('group_id').text());
			
        });
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});

}

function submit_kaizen_edit_form(){
	
	var frm = $('#kaizen_edit_form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitKaizenEditForm;
	
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.submitKaizenEditForm,
		timeout: 260000,
		data: d,
		success: function (r) {
			$(r).find('result').each(function(index, element) {
				if($(this).text()=="1"){
					$("#kaizen-edited").removeClass("hide");
				}
				else{
					$("#kaizen-not-edited").removeClass("hide");
				}
			})
		}
		
	});

	e.preventDefault();
}

$( function(){	
	$(document).on("click","#kaizen-edited-yes", function(){
		redirect_page("page21.html","");
	});
	$(document).on("click","#kaizen-edited-no", function(){
		redirect_page("page23.html","");
	});
	$(document).on("click","#kaizen-not-edited-ok", function(){
		$("#kaizen-not-edited").addClass("hide");
	});
	
});

/* Bitiş - page21.html */



/* Başlangıç - page23.html */
function show_kaizen(){
	kaizenId=get_storaged_data(find_page_name());
	//alert(noteId);
	//alert("cem"+"-"+kaizenId);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getKaizenToShow,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getKaizenToShow,
				kId:kaizenId
			},
		dataType: "xml"
	})
	.done(function(r){		
		var data;
		data="";
        data=prepareKaizenHtmlCode(r);
		data=$("#"+elementsName.kaizen).html()+data;
		$("#"+elementsName.kaizen).html(data);		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});

}



/* Bitiş - page23.html */


/* Başlangıç - page24.html */
function get_favorite_kaizens_list(){
	//alert(siteUrlAdress+"/"+xmlsUrl.getFavoriteKaizensList);
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getFavoriteKaizensList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getFavoriteKaizensList,
				fId:firstKaizenId,
				lId:lastKaizenId
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		data=prepareKaizenHtmlCode(r);
		data=$("#"+elementsName.favoriteKaizensList).html()+data;
		$("#"+elementsName.favoriteKaizensList).html(data);
		filter_notes(elementsName.favoriteKaizensList);
		getKaizens=0;
		
	})
	.fail(function(){
		//if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
		getKaizens=0;
	});
	//getNotes=0;
}
/* Bitiş - page24.html */




/* Başlangıç - page25.html */

function get_all_kaizen_statistics(){
	get_kaizens_statistics1();
	/*get_statistics2();
	get_statistics3();
	get_statistics4();
	get_statistics5();
	get_statistics6();
	get_statistics7();
	get_statistics8();
	get_statistics9();
	get_statistics10();*/
	
}
function get_kaizens_statistics1(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getKaizensStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"0",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		data+='<div class="grid-100">';
			
		data+='<div class="grid2-30 part-4 part-yellow">Grup</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Bitmiş</div>';
		data+='<div class="grid2-24 part-4 part-yellow center">Bitmemiş</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Toplam Kaizen</div>';
		
		data+='</div>';
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-30 part-5">'+$(this).find('group').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('finished').text()+'</div>';
			data+='<div class="grid2-24 part-5 center">'+$(this).find('nfinished').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.kaizensStatistics).html()+data;
		$("#"+elementsName.kaizensStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

/*
function get_statistics2(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"2",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		data+='<div class="grid-100">';
			
		data+='<div class="grid2-30 part-4 part-yellow">Kişi</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Bitmiş</div>';
		data+='<div class="grid2-24 part-4 part-yellow center">Bitmemiş</div>';
		data+='<div class="grid2-23 part-4 part-yellow center">Toplam</div>';
		
		data+='</div>';
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-30 part-5">'+$(this).find('person').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('finished').text()+'</div>';
			data+='<div class="grid2-24 part-5 center">'+$(this).find('unfinished').text()+'</div>';
			data+='<div class="grid2-23 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics3(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"3",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5 part-yellow">Ortalama Erteleme Süresi</div>';
			data+='<div class="grid2-50 part-5">'+$(this).find('delay_average').text()+'</div>';		
			data+='</div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics4(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"4",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5 part-yellow">Günlük Ortalama Not Oluşturma Sayısı</div>';
			data+='<div class="grid2-50 part-5">'+$(this).find('note_count').text()+'</div>';		
			data+='</div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics5(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"5",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Başlatılan Not sayısı (Gün)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">'+$(this).find('date').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics6(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"6",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Başlatılan Not sayısı (Ay)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">';
			if($(this).find('month').text().length==1) data+='0';

			data+=$(this).find('month').text()+"."+$(this).find('year').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics7(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"7",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Bitirilen Not sayısı (Gün)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">'+$(this).find('date').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics8(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"8",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
		
		data+='<div class="grid-100 part-4 part-yellow center">Bitirilen Not sayısı (Ay)</div>';
		
		data+='<div class="grid-100">';
		data+='<div class="grid2-50 part-4 part-yellow">Tarih</div>';
		data+='<div class="grid2-50 part-4 part-yellow center">Note Sayısı</div>';		
		data+='</div>';
		
		data+='<div class="grid-100"><hr></div>';
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5">';
			if($(this).find('month').text().length==1) data+='0';

			data+=$(this).find('month').text()+"."+$(this).find('year').text()+'</div>';
			data+='<div class="grid2-50 part-5 center">'+$(this).find('count').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr></div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}

function get_statistics9(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getMorningNotesStatistics,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:"9",
			},
		dataType: "xml"
	})
	.done(function(r){
		var data;
		data="";
			
		$(r).find('result').each(function(index, element){
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid2-50 part-5 part-yellow">Günlük Ortalama Not Bitirme Sayısı</div>';
			data+='<div class="grid2-50 part-5">'+$(this).find('note_count').text()+'</div>';		
			data+='</div>';

        });
		data='<div class="part-2">'+data+'</div>';
		data=$("#"+elementsName.morningNotesStatistics).html()+data;
		$("#"+elementsName.morningNotesStatistics).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
		getNotes=0;
	});
}
*/

/* Bitiş - page25.html */


/* Başlangıç - page26.html */

function show_new_kaizen_group_div(){
	$("#new-kaizen-group-name").val("");
	$("#new-kaizen-group-people").html("");
	if($("#new-kaizen-group").hasClass("hide")){
		$("#new-kaizen-group").removeClass("hide");
	}
	else{
		$("#new-kaizen-group").addClass("hide");
	}
}

function show_kaizen_group_edit_div(kgName, kgNo){
	if($("#edit-kaizen-group").hasClass("hide")){
		$("#edit-kaizen-group-name").val(kgName);
		$("#edit-kaizen-group-id").val(kgNo);
		fill_kaizen_group_edit_div(kgNo);
		$("#edit-kaizen-group").removeClass("hide");
	}
	else{
		$("#edit-kaizen-group").addClass("hide");
	}
}

function show_kaizen_group_delete_div(kgName, kgNo){
	if($("#delete-kaizen-group").hasClass("hide")){
		$("#delete-kaizen-group-name").html(kgName);
		$("#delete-kaizen-group-no").val(kgNo);
		$("#delete-kaizen-group").removeClass("hide");
	}
	else{
		$("#delete-kaizen-group").addClass("hide");
	}
}



function add_new_kaizen_group(){
	
	var frm = $('#new-kaizen-group-form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitNewKaizenGroup;
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.submitNewKaizenGroup,
		timeout: 260000,
		data: d,
		success: function (r) {

			$(r).find('result').each(function(index, element) {
				if($(this).text()=="1"){
					$("#kaizen-group-added").removeClass("hide");
				}
				else{
					$("#kaizen-group-not-added").removeClass("hide");
				}
			})
			
		}
	});
	
	show_new_kaizen_group_div();
}

function new_kaizen_group_add_person(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="new-kaizen-group-person[]" class="form-element-1 left new-kaizen-group-person">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			if(working==1){
				data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
			}
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="icon" src="images/minus-red.png" onclick="delete_new_kaizen_group_person(this);" />';
		data+='</div>';
		data+='</div>';
		$("#new-kaizen-group-people").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}

function delete_new_kaizen_group_person(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}

function edit_kaizen_group_add_person(){
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
		timeout: 260000,
		data: {un:userPref.uName,
				p:userPref.uPassword,
				s:xmlsString.getPeopleList
			},
		dataType: "xml"
	})
	.done(function(r){
		var id, name, surname, working, data;
		data="";
		data='<div class="grid-100">';
		data+='<select name="edit-kaizen-group-person[]" class="form-element-1 left edit-kaizen-group-person">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			surname=$(this).find('surname').text();
			working=$(this).find('working').text();
			
			if(working==1){
				data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
			}
        });
		data+='</select>';
		data+='<div class="icon-container-l-2 margin-left-3">';
		data+='<img class="icon" src="images/minus-red.png" onclick="delete_edit_kaizen_group_person(this);" />';
		data+='</div>';
		data+='</div>';
		$("#edit-kaizen-group-people").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}

function delete_edit_kaizen_group_person(e){
	$(e).parent().parent().remove();
	stop_search();//home12.html için gerekli
}

$( function(){	
	$(document).on("click","#kaizen-group-added-yes", function(){
		open_page("page26.html","");
	});
	$(document).on("click","#kaizen-group-added-no", function(){
		open_page("page16.html","");
	});
	$(document).on("click","#kaizen-group-not-added-ok", function(){
		$("#kaizen-group-not-added").addClass("hide");
	});
	
	
	$(document).on("click","#kaizen-group-delete-yes", function(){
		delete_kaizen_group($("#delete-kaizen-group-no").val());
		$("#delete-kaizen-group").addClass("hide");
	});
	$(document).on("click","#kaizen-group-delete-no", function(){
		$("#delete-kaizen-group").addClass("hide");
	});
	$(document).on("click","#kaizen-group-deleted-ok", function(){
		open_page("page26.html","");
	});
	$(document).on("click","#kaizen-group-not-deleted-ok", function(){
		$("#kaizen-group-not-deleted").addClass("hide");
	});
	
	$(document).on("click","#kaizen-group-edited-ok", function(){
		open_page("page26.html","");
	});
	$(document).on("click","#kaizen-group-not-edited-ok", function(){
		$("#kaizen-group-not-edited").addClass("hide");
	});
	
});

function list_kaizen_groups(gNo){
	if(gNo=="") gNo=0;
	
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.listKaizenGroups,
		timeout: 260000,
		data: {un:userPref.uName,
			   p:userPref.uPassword,
			   s:xmlsString.listKaizenGroups,
			   gno: gNo
		},
		success: function (r) {
			
			var kgName;
			var kgNo;
			var data;
			data="";
			//alert(data);
			//alert($(r).text());
			//alert(r.toSource());
			//alert(JSON.stringify(r, null, 4));
			$(r).find('group').each(function(index, element) {
				
				data+='<div class="kaizen-group">';
				$(this).find('group_name').each(function(index, element) {
					kgName=$(this).text();
				});
				
				$(this).find('group_id').each(function(index, element) {
					kgNo=$(this).text();
				});
				
				data+='<div class="kaizen-group-name">'+kgName;
				data+='<img class="kaizen-group-icon margin-left-5" src="images/edit.png" onclick="show_kaizen_group_edit_div(\''+kgName+'\',\''+kgNo+'\');" />';
				data+='<img class="kaizen-group-icon margin-left-5" src="images/delete.png" onclick="show_kaizen_group_delete_div(\''+kgName+'\',\''+kgNo+'\');" />';
				data+='</div>';
				
				
				
				data+='<div class="group-people">';
				$(this).find('person').each(function(index, element) {
					data+='<div class="group-person">'+$(this).text()+'</div>';
				});
				data+='</div>';
				data+='</div>'; 
			});
			
			$("#kaizen-groups").append(data);
			
               
                
            
		}
	});
}

function delete_kaizen_group(gNo){
	if(gNo>0){
		$.ajax({
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.deleteKaizenGroup,
			timeout: 260000,
			data: {un:userPref.uName,
				   p:userPref.uPassword,
				   s:xmlsString.deleteKaizenGroup,
				   gno: gNo
			},
			success: function (r) {
				
				$(r).find('result').each(function(index, element) {
					if($(this).text()==1){
						$("#kaizen-group-deleted").removeClass("hide");
					}
					else{
						$("#kaizen-group-not-deleted").removeClass("hide");
					}
					
				});
				   
				
			}
		});
	}
}

function fill_kaizen_group_edit_div(gNo){
	if(gNo=="") gNo=0;
	
	if(gNo>0){
		var dataPeople;
		var peopleId=[];
		
		$.ajax({
			async: false,		
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.getPeopleList,
			timeout: 260000,
			data: {un:userPref.uName,
					p:userPref.uPassword,
					s:xmlsString.getPeopleList
				},
			dataType: "xml"
		})
		.done(function(r){
			var id, name, surname, working, data;
			data="";
			data='<div class="grid-100">';
			data+='<select name="edit-kaizen-group-person[]" class="form-element-1 left edit-kaizen-group-person">';
			data+='<option value="0">--</option>';
			
			$(r).find('result').each(function(index, element) {
				id=$(this).find('id').text();
				name=$(this).find('name').text();
				surname=$(this).find('surname').text();
				working=$(this).find('working').text();
				
				if(working==1){
					data+='<option value="'+id+'">'+name+' '+surname+'</option>\';';
				}
			});
			data+='</select>';
			data+='<div class="icon-container-l-2 margin-left-3">';
			data+='<img class="icon" src="images/minus-red.png" onclick="delete_edit_kaizen_group_person(this);" />';
			data+='</div>';
			data+='</div>';
			dataPeople=data;
		});
		
		$.ajax({
			type: xmlDataSendType,
			crossDomain: true,
			url: siteUrlAdress+"/"+xmlsUrl.listKaizenGroupPeopleId,
			timeout: 260000,
			data: {un:userPref.uName,
				   p:userPref.uPassword,
				   s:xmlsString.listKaizenGroupPeopleId,
				   gno: gNo
			},
			success: function (r) {
				
				$(r).find('person_id').each(function(index, element){
					peopleId[peopleId.length]=$(this).text();
				});
				$("#edit-kaizen-group-people").html("");
				
				for(var i=0;i<peopleId.length;i++){
					
					$("#edit-kaizen-group-people").append(dataPeople);
					$(".edit-kaizen-group-person:last").val(peopleId[i]);
				}
				
			}
		});
	}
	
}

function edit_kaizen_group(){
	
	var frm = $('#edit-kaizen-group-form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitEditKaizenGroup;
	
	$.ajax({
		type: xmlDataSendType,
		crossDomain: true,
		url: siteUrlAdress+"/"+xmlsUrl.submitEditKaizenGroup,
		timeout: 260000,
		data: d,
		success: function (r) {

			$(r).find('result').each(function(index, element) {
				if($(this).text()=="1"){
					$("#kaizen-group-edited").removeClass("hide");
				}
				else{
					$("#kaizen-group-not-edited").removeClass("hide");
				}
			})
			
		}
	});
	
}
/* Bitiş - page26.html */



function changeRefreeApproval(){
	if($("#approval").val()==1){
		$("#kaizen-refrees").find('.proposal-refree-point').each(function(index, element) {
			$(this).val("1");
		});
		$("#kaizen-refrees").find('.refree-approval').each(function(index, element) {
			$(this).val("1");
		});
	}
	else if($("#approval").val()==2){
		$("#kaizen-refrees").find('.proposal-refree-point').each(function(index, element) {
			$(this).val("0");
		});
		$("#kaizen-refrees").find('.refree-approval').each(function(index, element) {
			$(this).val("2");
		});
	}
	sum_refree_points();
}












function prepareKaizenHtmlCode(r){
	var ipn, irn; //i person name
	var data;
	data="";
	$(r).find('result').each(function(index, element) {
		
			if(firstKaizenId==0){
				firstKaizenId=$(this).find('kaizen_id').text();
				lastKaizenId=firstKaizenId;
			}
			else{
				lastKaizenId=$(this).find('kaizen_id').text();
			}
			
			
			data+='<div class="part-2">';
			
			data+='<div class="grid-100">';
			
			data+='<div class="grid-50">';
			
			data+='<div class="grid2-60 part-kaizen-no"';
			data+=' onclick="open_page(\'page23.html\',\''+$(this).find('kaizen_id').text()+'\')"';
			data+='>'+$(this).find('kaizen_no').text()+'</div>';
			
			data+='<div class="grid2-40 part-kaizen-department">'+$(this).find('department_name').text()+'</div>';
			
			data+='</div>';
			data+='<div class="grid-50">';
			
			data+='<div class="grid2-84 part-kaizen-group-name">'+$(this).find('group_name').text()+'</div>';
			
			data+='<div class="grid2-8 part-kaizen-approval">'
			if($(this).find('approval').text()=="1"){
				data+='<img src="images/ok.png" class="icon4" title="Onaylanmış" alt="Onaylanmış" />';
			}
			else if($(this).find('approval').text()=="2"){
				data+='<img src="images/ok_not.png" class="icon4" title="Reddedilmiş" alt="Reddedilmiş" />';
			}
			else{
				data+='<img src="images/delay.png" class="icon4" title="Değerlendirmeyi Bekliyor" alt="Değerlendirmeyi Bekliyor" />';
			}
			
			data+='</div>';
			data+='<div class="grid2-8 part-kaizen-favorite">';
			if($(this).find('favorite').text().trim()=="0" || $(this).find('favorite').text().trim()==""){
				data+='<img src="images/favorite-not.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_kaizen_favorite(this, \''+$(this).find('kaizen_id').text()+'\')" />';
			}
			else{
				data+='<img src="images/favorite.png" class="icon4" title="Favori" alt="Favori" ondblclick="change_kaizen_favorite(this, \''+$(this).find('kaizen_id').text()+'\')" />';
			}
			data+='</div>';
			data+='</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100 part-kaizen-problem" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('problem').html())+'</div>';
			
			
			data+='<div class="grid-100 part-unvisible hide" >';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100 part-kaizen-solution" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('solution').html())+'</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100 part-kaizen-my-note" onclick="show_hide_part_unvisible(this);">'+rnTobr($(this).find('my_note').html())+'</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid-50">';
			data+='<div class="grid2-60 part-kaizen-person" onclick="show_hide_part_unvisible(this);">'+$(this).find('person').text()+'</div>';
			
			data+='<div class="grid2-40 part-kaizen-type" onclick="show_hide_part_unvisible(this);">'+$(this).find('kaizen_type').text()+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-50">';
			
			data+='<div class="grid2-70 part-kaizen-proposal-date" onclick="show_hide_part_unvisible(this);">'+$(this).find('proposal_date').text()+'</div>';
			
			data+='<div class="grid2-8 part-kaizen-point" onclick="show_hide_part_unvisible(this);">';
			if($(this).find('point').text()>"-1"){
				data+=$(this).find('point').text();
			}
			else{
				data+='<img src="images/delay.png" class="icon4" title="Değerlendirmeyi Bekliyor" alt="Değerlendirmeyi Bekliyor" />';
			}
			data+='</div>';
			
			data+='</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			
			ipn=0;
			data+='<div class="grid-100 part-kaizen-group">'+$(this).find('group_name').text()+'<br />';
			$(this).find('group_person').each(function(index, element) {
				if(ipn>0) data+=', ';
				data+=$(this).find('group_person_name').text();
				ipn++;
			});
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			irn=0;
			data+='<div class="grid-100 part-kaizen-referee">';
			$(this).find('referee_person').each(function(index, element) {
				//if(irn>0) data+='<hr />';
				data+='<div class="grid2-90">'+$(this).find('referee_person_name').text()+'</div>';
				if($(this).find('referee_person_point').text()>"-1"){
					data+='<div class="grid2-5">'+$(this).find('referee_person_point').text()+'</div>';
				}
				else{
					data+='<div class="grid2-5"><img src="images/delay.png" class="icon4" title="Değerlendirmeyi Bekliyor" alt="Değerlendirmeyi Bekliyor" /></div>';
				}
			
				//data+='<div class="grid-25">'+$(this).find('referee_person_point').text()+'</div>';
				
				if($(this).find('referee_person_approval').text()=="1"){
					data+='<div class="grid2-5"><img src="images/ok.png" class="icon4" title="Onay" alt="Onay" /></div>';
				}
				else if($(this).find('referee_person_approval').text()=="2"){
					data+='<div class="grid2-5"><img src="images/ok_not.png" class="icon4" title="Red" alt="Red" /></div>';
				}
				else{//$(this).find('referee_person_approval').text()==0 için
					data+='<div class="grid2-5"><img src="images/delay.png" class="icon4" title="Değerlendirmeyi Bekliyor" alt="Değerlendirmeyi Bekliyor" /></div>';
				}
				
			});
			data+='</div>';
			
			
			data+='</div>';
			
			data+='</div>';
	});
	return data;
}























/*function open_settings_page(){
	set_storaged_data(sData.settingsPageBack, find_page_name());
	open_page(pages.settings, no);
} */





//var language;
//language = get_storaged_data("language");
//alert(document.cookie);
//alert("cem "+language+"-"+document.cookie);








/*


$(".unit").on("click", function(){
	alert("cem");
  //$(this).css("border:1px #FF0 solid");
});





//deneme
function xml_login(username, password, toPage){
	if (typeof toPage === 'undefined'){
		toPage = "";
	}
	
	var geturl="xmls/xml_login.php";
	var type="user_login";
	
	$.ajax({
		async: false,		
		type: xmlDataSendType,
		crossDomain: true,
		url: geturl,
		timeout: 260000,
		data: {un:username,
				p:password,
				t:type
			},
		dataType: "xml"
	})
	.done(function(r){
		var uc = $(r).find('result').text();
		var page=window.location.pathname.split("/");
		if(uc==1){
			set_storaged_data(cookieUn, username);
			set_storaged_data(cookiePw, password);
			if(toPage!=""){
				redirect_page(toPage);
			}
			else if(page[page.length-1].trim()==pageLogin){
				redirect_page(pageMain);
			}
		}
		else{
			if(page[page.length-1].trim()!=pageLogin){
				redirect_page(pageLogin);
			}
			else{
				alert("Kullanici adini ve sifreyi kontrol edip tekrar deneyin lütfen");
			}
		}
	})
	.fail(function(){
		alert("Bir sorun olustu. Lütfen sonra tekrar deneyin.");
	});
}

*/