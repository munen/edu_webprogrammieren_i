$(document).ready(function() {
	$("#myInput").validate({
		rules: {
			subj: {
				required: true,
				rangelength: [1, 50]
			},
			date: {
				required: true,
				date: true
			      }
			       
		       },
		errorLabelContainer: $("#saveAlert"),
	    	submitHandler: function() {$("#saveAlert").hide(); addTask();}
	});
	$("#date").datepicker();

	MyAllRows = new AllRows();
	MyAllRows.init();
	MyAllRows.drawTables();
});

function AllRows() {

	var APP_NAME = "todo"
	this.doneRows = Array();
	this.undoneRows = Array();

	this.init = function() {
		var savedDoneRows = localStorage.getItem(APP_NAME+ "_done");
		this.savedDoneRows = JSON.parse(savedDoneRows);

		for(row in this.savedDoneRows) {
			this.doneRows.push(new Row().objToRow(this.savedDoneRows, row)) ;
		}

		var savedUndoneRows = localStorage.getItem(APP_NAME+ "_undone");
		this.savedUndoneRows = JSON.parse(savedUndoneRows);

		for(row in this.savedUndoneRows) {
			this.undoneRows.push(new Row().objToRow(this.savedUndoneRows, row)) ;
		}
		if(this.undoneRows.length < 1 && this.doneRows.length < 1) {
			$("#specialTask").modal('show');	
		}
	}

	this.addDone = function(row) {
		this.doneRows.push(row);
		this.save();
	}

	this.addUndone = function(row) {
		this.undoneRows.push(row);
		this.save();
	}

	this.save = function() {
		localStorage.setItem(APP_NAME + "_done", JSON.stringify(this.doneRows));
		localStorage.setItem(APP_NAME + "_undone", JSON.stringify(this.undoneRows));
	}

	this.remove = function(rowId) {
		var doneTask = this.getDoneRow(rowId);
		if (doneTask  != undefined) {
			this.removeDone(doneTask);
		}
	
		var undoneTask = this.getUndoneRow(rowId);
		if (undoneTask  != undefined) {
			this.removeUndone(undoneTask);
		}
		this.save();
	}

	this.removeUndone = function(task) {
		this.undoneRows.splice(this.undoneRows.indexOf(task), 1);
	}

	this.removeDone = function(task) {
		this.doneRows.splice(this.doneRows.indexOf(task), 1);
	}

	this.doneTask = function(rowId) {
		var task = this.getUndoneRow(rowId);
		if ( task != undefined) {
			task.isDone(true);
			this.addDone(task);
			this.removeUndone(task)
			this.save();	
		}
	}

	this.unDoneTask = function(rowId) {
		var task = this.getDoneRow(rowId);
		if (task  != undefined) {
			task.isDone(false);
			this.addUndone(task);
			this.removeDone(task)
			this.save();	
		}
	}

	this.getDoneRow = function(rowId) {
		for (curRow in this.doneRows) {
			if (this.doneRows[curRow].id == rowId) {
				return this.doneRows[curRow];
			}
		}
	}
	
	this.getUndoneRow = function(rowId) {

		for (curRow in this.undoneRows) {
			if (this.undoneRows[curRow].id == rowId) {
				return this.undoneRows[curRow];
			}
		 }		

		return undefined;
	}

	this.drawTables = function() {
		
		$("#undoneTable").children().remove();	
		if (this.undoneRows.length < 1) {
			$("#undoneTasks").hide();
		} else {
			$("#undoneTasks").show();
			for (curRow in this.undoneRows) {
				$("#undoneTable").prepend(this.undoneRows[curRow].toString());	
			}
		}
		$("#doneTable").children().remove();	
		if (this.doneRows.length < 1) {
			$("#doneTasks").hide();
		} else {
			$("#doneTasks").show();
			for (curRow in this.doneRows) {
				$("#doneTable").prepend(this.doneRows[curRow].toString());	
			}
		}
	}
}

function Row(subject, date, prio) {
	this.id = new Date().getTime(); 
	this.subject = subject;
	this.date = date;
	this.prio = prio;
	this.done = false;
}

Row.prototype.objToRow = function(arr, obj) {
	this.id = arr[obj].id; 
	this.subject = arr[obj].subject;
	this.date = arr[obj].date;
	this.prio = arr[obj].prio;
	this.done = arr[obj].done;
	
	return this;
}

Row.prototype.isDone = function(isDone) {
	if(isDone) {
		this.done = true;
	} else {
		this.done = false;
	}
}

Row.prototype.toString = function() {

	var classString = "";
	var icon = "icon-wrench";
	switch(this.prio){
		case "2": 
			icon = "icon-arrow-right"; 
			break;
		case "3": 
			icon = "icon-arrow-up"; 
			classString="alert alert-error"
			break;
		case "1": 
			icon = "icon-arrow-down"; 
			classString="alert alert-info"
			break;
	}

	var buttonString = "<td>";

	if (this.done) {
		classString = "alert alert-success";
		buttonString += "<a href='javascript:unDone(" + this.id + ")' title='Doch nicht erledigt'> <i class='icon-pencil'></i></a>";
	} else {
		buttonString += "<a href='javascript:done(" + this.id +")' title='erledigt'> <i class='icon-ok'></i></a>";
	}

	var html = "<tr class='" + classString + "' id='" + this.id + "'>";

	html += "<td> <i class='" + icon + "'></i></td>"	
	html += "<td>" + this.date + "</td>"	
	html += "<td>" + this.subject + "</td>"	
	html += buttonString;
	html += "<a href='javascript:askRemove(" + this.id +")' title='l&ouml;schen'> <i class='icon-remove'></i></a></td></tr>"
	
	return html;
}

function addTask() {
	var myRow = new Row($.trim($("#subj").val()), $.trim($("#date").val()), $("#prio").val()); 

	$('#prio').val('');
	$('#date').val('');
	$('#subj').val('');
	
	MyAllRows.addUndone(myRow);
	MyAllRows.drawTables();
}

function askRemove(ID) {
	$("#deleteBtn").attr("href", "javascript:remove(" + ID + ")");
	$("#myModal").modal('show');
}

function remove(ID) {
	$("#myModal").modal('hide');
	MyAllRows.remove(ID);
	MyAllRows.drawTables();
}

function unDone(ID) {
	MyAllRows.unDoneTask(ID);
	MyAllRows.drawTables();
}

function done(ID) {
	MyAllRows.doneTask(ID);
	MyAllRows.drawTables();
}

function specialFeature() {
	MyAllRows.addUndone( new Row("F&uuml;r <a href='http://de.wikipedia.org/wiki/Deutsche_Fu%C3%9Fballnationalmannschaft' title='Schalalalaaaaa Schalalalalala'^>Deutschland</a> die Daumen drücken!", "07/08/2012", "3"));
	MyAllRows.drawTables();
	$("#specialTask").modal('hide');
}
