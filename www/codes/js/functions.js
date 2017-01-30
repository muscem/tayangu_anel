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


//change_language()
//change_settings()


/* Başlangıç - .html */
/* Bitiş - .html */



/* Başlangıç - page2.html */
function change_language(){
	//Dil değiştirme kodu. Dil ayarı değiştirildiğinde, çerezlere gerekli atamalar yapılıyor ve bulunulan sayfanın yazıları o dile çevriliyor. Bu kod settings.html ve setting-language.html sayfasında olacak genellikle.
	
	var lang=$("#"+elementsName.userLanguage).val();
	set_site_cookie(cookies.userLanguage, lang, "y");
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
		type: "POST",
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
			
			
			data+='<div class="grid2-7 margin-2 person-status-icon">';
			data+='<img class="icon"';
			if(working==1){
				 data+=' src="images/working.png"';
			}
			else{
				data+=' src="images/working_not.png"';
			}
			data+=' />';
			data+='</div>';
			
			data+='<div class="grid2-7 margin-2 person-delete-icon"><img class="icon" src="images/delete.png" /></div>';
			data+='<div class="grid2-7 margin-2 person-rename-icon"><img class="icon" src="images/rename.png" /></div>';
			
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
		type: "POST",
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
		type: "POST",
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
			type: "POST",
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
			type: "POST",
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
		type: "POST",
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
			data+='<div class="grid2-7 margin-2 department-delete-icon"><img class="icon" src="images/delete.png" /></div>';
			data+='<div class="grid2-7 margin-2 department-rename-icon"><img class="icon" src="images/rename.png" /></div>';
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
		type: "POST",
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
			type: "POST",
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
			type: "POST",
			url: siteUrlAdress+"/"+xmlsUrl.getDepartmentList,
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
	$.ajax({
		async: false,		
		type: "POST",
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
		var tDate, subject, myNote, person, i;
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
			data+='<div class="grid2-20"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+noteCount+"-"+$(this).find('no').text()+'</div>';
			data+='<div class="grid2-30">'+$(this).find('sDate').text()+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-30">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			data+='<div class="grid2-20">'+$(this).find('delay').text()+'</div>';
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid-50">'+$(this).find('header').text()+'</div>';
			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+=", ";
				person+=$(this).text();
			});
			data+='<div class="grid-50">'+person+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('subject').text()+'</div>';
			
//			i=0;
//			$(this).find('subject').each(function(index, element){
//				subject=$(this).text();
//				i++;
//			});
//			data+='<div class="grid-100">';
//			if(i>1) data+='! ';
//			data+=subject;
//			data+='</div>';

			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('prosecution').text()+'</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('myNote').text()+'</div>';
			
//			i=0;
//			$(this).find('myNote').each(function(index, element){
//				myNote=$(this).text();
//				i++;
//			});
//			data+='<div class="grid-100">';
//			if(i>1) data+='! ';
//			data+=myNote;
//			data+='</div>';
			
			
			
			
			data+='</div>';
			noteCount++;
        });
		data=$("#"+elementsName.morningNotesList).html()+data;
		$("#"+elementsName.morningNotesList).html(data);
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

function addResponsiblePerson(){
	$.ajax({
		async: false,		
		type: "POST",
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
		data+='<select name="responsible-person[]"  class="form-element-2">';
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
		data+='<img class="minus-button" src="images/minus-red.png" onclick="deleteResponsiblePerson(this);" />';
		data+='</div>';
		$("#resp-pers").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function deleteResponsiblePerson(e){
	$(e).parent().remove();
	stop_search();//home12.html için gerekli
}



function addResponsibleDepartment(){
	$.ajax({
		async: false,		
		type: "POST",
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
		data+='<select name="responsible-department[]"  class="form-element-2">';
		data+='<option value="0">--</option>';
		
		$(r).find('result').each(function(index, element) {
            id=$(this).find('id').text();
			name=$(this).find('name').text();
			data+='<option value="'+id+'">'+name+'</option>\';';
        });
		data+='</select>';
		data+='<img class="minus-button" src="images/minus-red.png" onclick="deleteResponsibleDepartment(this);" />';
		data+='</div>';
		$("#resp-dep").append(data);
		
	})
	.fail(function(){
		if(pages.login!=find_page_name()) open_page(pages.login,"");
		alert(messages[userPref.lang][2]);
	});
	stop_search();//home12.html için gerekli
}


function deleteResponsibleDepartment(e){
	$(e).parent().remove();
	stop_search();//home12.html için gerekli
}


function addTargetDate(){
	var data;
	data='<div class="grid-100">';
	data+='<input type="text" name="target[]"  class="form-element-2" />';
	data+='<img class="minus-button" src="images/minus-red.png" onclick="deleteTargetDate(this);" />';
	data+='</div>';
	$("#target-date").append(data);
	stop_search();//home12.html için gerekli
}

function deleteTargetDate(e){
	$(e).parent().remove();
	stop_search();//home12.html için gerekli
}


function submit_new_morning_note_form(){
	var frm = $('#new_morning_note_form');
	var d;
	d=frm.serialize()+"&un="+userPref.uName+"&p="+userPref.uPassword+"&s="+xmlsString.submitNewMorningNote;
    //frm.submit(function (e) {
        $.ajax({
            type: "POST",
            url: siteUrlAdress+"/"+xmlsUrl.submitNewMorningNote,
			timeout: 260000,
            data: d,
            success: function (r) {

				$(r).find('result').each(function(index, element) {
					if($(this).text()=="1"){
						$("#morning-note-added").removeClass("hide");
					}
					else{
						$("#morning-note-not-dded").removeClass("hide");
					}
				})
                
            }
        });

        e.preventDefault();
    //});
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
	noteId=get_site_cookie(find_page_name());
	//alert(noteId);
	$.ajax({
		async: false,		
		type: "POST",
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
			//alert($(this).find('prosecution').text());
			$("#note-prosecution").val($(this).find('prosecution').text());
			$("#note-my-notes").val($(this).find('myNote').text());
			//alert($(this).find('finished').text());
			if($(this).find('finished').text()=="1"){
				$("#note-finished").prop('checked', true);
			}
			
			
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				data='<div class="grid-100">';
				data+='<input type="text" name="target[]"  class="form-element-2" value="'+tDate+'" />';
				data+='<img class="minus-button" src="images/minus-red.png" onclick="deleteTargetDate(this);" />';
				data+='</div>';
				$("#note-target-date").append(data);
	
			});
			
			$(this).find('person').each(function(index, element){
				person=$(this).text();
				addResponsiblePerson();
				//alert(person+"-"+$("#resp-pers select").val());
				$("#resp-pers select").last().val(person);
			});
			
			$(this).find('department').each(function(index, element){
				dep=$(this).text();
				addResponsibleDepartment();
				//alert(dep);
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
    //frm.submit(function (e) {
        $.ajax({
            type: "POST",
            url: siteUrlAdress+"/"+xmlsUrl.submitEditMorningNote,
			timeout: 260000,
            data: d,
            success: function (r) {

				$(r).find('result').each(function(index, element) {
					if($(this).text()=="1"){
						$("#morning-note-added").removeClass("hide");
					}
					else{
						$("#morning-note-not-dded").removeClass("hide");
					}
				})
                
            }
        });

        e.preventDefault();
    //});
}


/* Bitiş - page11.html */




/* Başlangıç - page12.html */
function change_between_display(e){
	if($(e).attr("src")=="images/between-grey.png"){
		$(e).attr("src","images/between-white.png");
		$(e).parent().parent().find("div").last().removeClass("hide");
	}
	else{
		$(e).attr("src","images/between-grey.png");
		$(e).parent().parent().find("div").last().addClass("hide");
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
	
	$.ajax({
		async: false,		
		type: "POST",
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
			data+='<div class="grid2-20"';
			//data+=' onclick="show_morning_note(\''+$(this).find('id').text()+'\')"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			
			//data+='<div class="grid2-20"';
			//data+=' onclick="open_page(\'page11.html\',\''+$(this).find('id').text()+'\')"';
			//data+='>'+noteCount+"-"+$(this).find('no').text()+'</div>';
			data+='<div class="grid2-30">'+$(this).find('sDate').text()+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-30">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			data+='<div class="grid2-20">'+$(this).find('delay').text()+'</div>';
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid-50">'+$(this).find('header').text()+'</div>';
			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+=", ";
				person+=$(this).text();
			});
			data+='<div class="grid-50">'+person+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('subject').text()+'</div>';


			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('prosecution').text()+'</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('myNote').text()+'</div>';

			data+='</div>';
			noteCount++;
        });
		data=$("#"+elementsName.searchMorningNotesList).html()+data;
		$("#"+elementsName.searchMorningNotesList).html(data);
		
//		alert($(r).find('result').text()+"\n"+
//		$(window).scrollTop() +"\n"+ 
//		($(window).height()*1) +"\n"+
//		($(document).height()*1)+"\n"+
//		firstNoteId+"\n"+
//		lastNoteId
//		);
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
		type: "POST",
		url: siteUrlAdress+"/"+xmlsUrl.searchAdvancedMorningNote,
		timeout: 260000,
		data: d,
		dataType: "xml"
	})
	.done(function(r){
		//var id, name, data;
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
			data+='<div class="grid2-20"';
			//data+=' onclick="show_morning_note(\''+$(this).find('id').text()+'\')"';
			data+=' onclick="open_page(\'page13.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			data+='<div class="grid2-30">'+$(this).find('sDate').text()+'</div>';
			tDate="";
			i=0;
			$(this).find('tDate').each(function(index, element){
				tDate=$(this).text();
				i++;
			});
			data+='<div class="grid2-30">'+tDate;
			if(i>1) data+=' !';
			data+='</div>';
			data+='<div class="grid2-20">'+$(this).find('delay').text()+'</div>';
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid-50">'+$(this).find('header').text()+'</div>';
			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+=", ";
				person+=$(this).text();
			});
			data+='<div class="grid-50">'+person+'</div>';
			
			data+='</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('subject').text()+'</div>';


			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('prosecution').text()+'</div>';
			
			data+='<div class="grid-100"><hr /></div>';
			
			data+='<div class="grid-100">'+$(this).find('myNote').text()+'</div>';
			
			data+='</div>';
			noteCount++;
        });
		data=$("#"+elementsName.searchMorningNotesList).html()+data;
		$("#"+elementsName.searchMorningNotesList).html(data);
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
	noteId=get_site_cookie(find_page_name());
	//alert(noteId);
	$.ajax({
		async: false,		
		type: "POST",
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
		var data, person, dep, tDate;
		data="";
		$(r).find('result').each(function(index, element) {
			
			data+='<div class="part-1">';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-30"';
			data+=' onclick="open_page(\'page11.html\',\''+$(this).find('id').text()+'\')"';
			data+='>'+$(this).find('no').text()+'</div>';
			
			
			data+='<div class="grid2-70">'+$(this).find('header').text()+'</div>';
			data+='</div>';
			
			data+='<div class="grid-100 grid2h-20"></div>';
			
			data+='<div class="grid-100">';
			data+='<div class="grid2-40">'+$(this).find('sDate').text()+'</div>';
			
			tDate="";
			$(this).find('tDate').each(function(index, element){
				if(tDate!="") tDate+="<br />";
				tDate+=$(this).text();
			});
			data+='<div class="grid2-40">'+tDate+'</div>';
			data+='<div class="grid2-20">'+$(this).find('delay').text()+'</div>';
			data+='</div>';
			
			data+='<div class="grid-100 grid2h-20"></div>';
			
			data+='<div class="grid-100">';
			
			person="";
			$(this).find('person').each(function(index, element){
				if(person!="") person+="<br />";
				person+=$(this).text();
			});
			data+='<div class="grid2-50">'+person+'</div>';
			
			dep="";
			$(this).find('department').each(function(index, element){
				if(dep!="") dep+="<br />";
				dep+=$(this).text();
			});
			data+='<div class="grid2-50">'+dep+'</div>';
			
			data+='</div>';
			
			
			data+='<div class="grid-100 grid2h-20"></div>';
			
			data+='<div class="grid-100">'+$(this).find('subject').text()+'</div>';


			data+='<div class="grid-100 grid2h-20"></div>';
			
			data+='<div class="grid-100">'+$(this).find('prosecution').text()+'</div>';
			
			data+='<div class="grid-100 grid2h-20"></div>';
			
			data+='<div class="grid-100">'+$(this).find('myNote').text()+'</div>';
			
			data+='</div>';
			//noteCount++;
        });
		
		data=$("#"+elementsName.morningNote).html()+data;
		$("#"+elementsName.morningNote).html(data);
		
	})
	.fail(function(){
		alert(messages[userPref.lang][2]);
	});
}
/* Bitiş - page13.html */










/*function open_settings_page(){
	set_site_cookie(cookies.settingsPageBack, find_page_name(), "y");
	open_page(pages.settings, no);
} */





//var language;
//language = get_site_cookie("language");
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
		type: "POST",
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
			set_site_cookie(cookieUn, username);
			set_site_cookie(cookiePw, password);
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