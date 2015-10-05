var timer = true;
var sleepingHoursGl = 0;
var sleepStartTimeGl = 0;
var hideInactiveAssignments = function(node) {
  $('html,body').animate({
    scrollTop: $(document).height()/4.5,
  }, 1000);

  $("#assignmentList tr").each(function(el){
    if ($(this).attr("id") !== $(node).parent().attr("id")){
      $(this).hide();
    } else {
      var timeRemaining = $(this).text();
      console.log($(this).find('td')[1].id);
      timeRemaining.trim();

      var numberOfLetters = timeRemaining.length;
      var finalTimeWithSpaces="";
      for ( var i = 0; i < numberOfLetters; i ++ ) {
        if(timeRemaining[i] == timeRemaining[i]/1) {
            finalTimeWithSpaces= finalTimeWithSpaces + timeRemaining[i];
            //final time --> number of minutes that the user inputted
        } else {
          //If it is a letter
        }
      }
      //removes extra space
      var finalTime= parseInt(finalTimeWithSpaces.replace(/\s+/g, ''));
      //callTimer("#mins", finalTime-1, 60);
      //var display = $(this);
      var display = $($(this).find('td')[1]);
      console.log(display);
      var seconds = 59;
	  document.cookie="assignmentTtime=" + finalTime; //Added Synsynoia
      startTimer(finalTime, seconds, display);
      console.log(finalTime);
    }
  });
  document.getElementById("addMinutes").style.display = "block";
  document.getElementById("addMinutesButton").style.display = "block";
}

var showInactiveAssignments = function(node) {
  timer = false;
  $("html, body").animate({
      scrollTop: 0
  }, 600);

  $("#assignmentList tr").each(function(el){
    $(this).show();
  });
  document.getElementById("addMinutes").style.display = "none";
  document.getElementById("addMinutesButton").style.display = "none";
}

// Timer function
function startTimer(minutesRemaining, secondsRemaining, display) {
  minutesRemaining--;
  setInterval(function () {
    // actual minutes algorithm

    if(minutesRemaining > 0) {
      if(timer == true) {
        display.text(parseInt(minutesRemaining) + " : " + parseInt(secondsRemaining));
        secondsRemaining--;
        if(secondsRemaining < 0) {
          minutesRemaining--;
          secondsRemaining = 60;
        }
      } else {
        // do nothing
      }
    } else {
      display.text("Finished!");
      console.log("Finished!");
    }
      //display.text(duration);
  }, 1000);
}

$(document).ready(function(){
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
  // delete the assignment from the table
  window.deleteAssignment = function deleteAssignment(elem) {
    $(elem).parent().remove();
    console.log($(elem).parent().attr("id"));

    var rowId = Parse.Object.extend("Assignment");
    var queryRemove = new Parse.Query(rowId);
    var obj = $(elem).parent();
    queryRemove.get($(elem).parent().attr('id'), {
      success: function(obj) {
        console.log(obj + " got it");
        obj.destroy({
          success: function() {
            console.log("Deleted!");
          },
          error: function () {
            console.log("Deleted fail!");
          }
        });
      },
      error: function(obj ,error) {
        console.log("error.");
      }
    });
  }

  //Returns the Username of the current user by accessing a cookie
	var getUsername = function (){
		/*var half = (document.cookie).substring(9);
		var array = (half).split(";");
		var username = array[0];*/
		//Taking complete cookie string as a username, needs to send username specific  cookie only
		var username = getCookie("username");
		return username;
	}

  //Returns user to registration if no username/cookie present
  var username = getUsername();
  if (username == "") {
	 console.log("Username not found");
	 window.location.replace("registration.html");
	 //document.location = "registration.html";
  }

  var currentAssignmentId;

  $("#" + currentAssignmentId).addClass();

  //Creates a New assignment
  $("#addNewAssignment").on('click', function(){
    var username = getUsername();
    var assignment = $("#assignment").val();
    var time = parseInt($("#mins").val());
    if (time == null || assignment == "") {
      window.alert("Please input an assigment and how long you think it will take!");
    } else if (time > 0) {
      createNewAssignment(assignment, username, time);
      console.log(time);
    }
    // remove the add buttons
    document.getElementById("addMinutes").style.display = "none";
    document.getElementById("addMinutesButton").style.display = "none";
  });

  //  making the list of assignment in the ui from the assignments pulled from the database
  var createNewTR = function (result, objectId){
      var tr = $('<tr></tr>');
      //adding assignment id to the row
      $(tr).attr("id", objectId);

     //Table element values
	   var td = '<input type="button" value="\u00D7" id="remove" class="remoteButtons" style="position: relative; right: -15%; margin-top: 8px; background: transparent; border-color: transparent; color: white" onclick="deleteAssignment(this)">';
      var td2 = $('<td></td>').text(result.get("assignment"));
      var td3 = $('<td id="timeInput"></td>').text(result.get("time"));
      // Start Button
      var td4 = '<input type="button" value="Start" id="countDown" class="remoteButtons" style="font-size: 16px; font-weight: 10px; background: white; width: 65px; border-radius: 4px; height: 30px; color: green;border: 2px solid white;-webkit-transition: .7s; position: relative;left: 5px;" onclick="hideInactiveAssignments(this)">';
      // Stop Button
      var td5 = '<input type="button" value="Stop" id="pause" class="remoteButtons" style="font-size: 16px; font-weight: 10px; background: white; width: 65px; border-radius: 4px; height: 30px; color: red;border: 2px solid white;-webkit-transition: .7s; position: relative; left: 10px;" onclick="showInactiveAssignments(this)" >';
      // Delete Button

      //This makes the list in the table
      $(tr).append(td);
      $(tr).append(td2);
      $(tr).append(td3);
      $(tr).append(td4);
      $(tr).append(td5);

      //This is the date that the assignment is added to Parse
      var seconds = result.get("time");

      var t;
      var count = result.get("time");

      $("#assignmentList").append(tr);
  }

  //Makes the Assignment list by searching for items in parse given the username
  var makeAssignmentList = function(username){
	var totAssignmentTime = 0;
    var query = new Parse.Query("Assignment");
    //console.log(query);
    query.equalTo("username", username);
    query.equalTo("completed", 0);
    query.find({
  	  success: function(results){
    	  for(var i = 0; i < results.length; i++ ){
      	   console.log(results[i].get("assignment"));
		   //document.cookie="assignment=" + results[i].get("assignment")+"||"+results[i].get("time");
		   //totAssignmentTime = totAssignmentTime + results[i].get("time");
      	   var objectId = results[i].id;
      	   //Query to determine whether or not the Assignment was completed
      	   var completedQuery = results[i].get("completed");
      	   //Determines date of assignment
      	   var createdAt = results[i].get("createdAt");
           // gets the date of assignment in the format below
      	   var date = new Date(createdAt);
      	   var yr = date.getFullYear();
      	   var mo = date.getMonth() + 1;
      	   var day = date.getDate();
      	   var newCreatedAt = yr + '-' + mo  + '-' + day;

           //Adds values to the other table values
           createNewTR(results[i], objectId);
    	   }
		   //document.cookie="assignmentTtime=" + totAssignmentTime;
  	   },
    	error: function( assignment,error) {
    		// Show the error message somewhere and let the user try again.
    		console.log("Error: " + error.code + " " + error.message);
      }
    });
  };

  //Returns the date today
  var todayDate = function(){
  		   //Determines the date today
	   var currentDate = new Date();
	   var dayToday = currentDate.getDate();
	   var month = currentDate.getMonth() + 1;
	   var year = currentDate.getFullYear();
	   var todayDate = year+ '-' + month  + '-' + dayToday;
	   return todayDate;
  }

//Function for creating a new assignment and adding to the database
  var createNewAssignment = function (assignmentName, username, time){
    var Assignment = Parse.Object.extend("Assignment");

    //Creating a new instance of the class
    var assignment = new Assignment();

    var _assignmentName = assignmentName;
    var _time = time;
    var assignment_data = {assignment: _assignmentName, username: username, time: _time, completed: 0};

    /* Save the Assignment */

    assignment.save(assignment_data,{
      success: function(assignment) {
        //add the newly created assignment to the bottom of the table
        var assignmentList = $("#assignmentList");
        assignmentList.html("");
        makeAssignmentList(username);
     },
      error: function( assignment,error) {
       // Show the error message somewhere and let the user try again.
       console.log("Error: " + error.code + " " + error.message);
      }
    });
	 //things to do after the save takes place
    };

    //var username = getUsername();
	var username = getCookie("username");
    makeAssignmentList(username);

    var done= document.getElementById('done-button');
    console.log(done);

    $(".done-button").click(function(){
	     console.log(clicked);
    });

    //Function to send settings data to Parse
    //Go to line 200 for reference
    $('#saveButton').on('click', function() {
	  var username = getCookie("username");	
      console.log("button clicked");
	  var sleepHour = parseInt($('#idsleepHour').val());
      var sleepMinute = parseInt($('#idsleepMin').val());
	  var sleepAmpm = $('#idsleepAmpm').val();
      var wakeUpHr = parseInt($('#idwakeUpHR').val());	
      var wakeUpMin = parseInt($('#idwakeUpMin').val()); 
	  var wakeupAmpm = $('#idwakeupAmpm').val();


      console.log(sleepHour + " --> start work (hour)");
      console.log(sleepMinute + " --> start work (min)");
	  console.log(sleepAmpm + " --> ampm");
	  console.log(wakeUpHr + " --> wake up time (hour)!");
      console.log(wakeUpMin + " --> wake up time (min)!");
	  console.log(wakeupAmpm + " --> ampm");
      //console.log(otherActivitiesHr + " --> other activities (hour)");
      //console.log(otherActivitiesMin + " --> other activities (min)");
      console.log(username + " --> current user.");

      //Sending settings data to Parse
      var SettingsId = Parse.Object.extend("Settings");
      // Look for user's objectId in settings Class
      var objectId = new Parse.Query(SettingsId);
      objectId.equalTo("username", username);
	  //alert(username);
      objectId.first({
        success: function(objectId) {
          var objectSettingsId = objectId.id;
          var settingsId = new SettingsId();
          settingsId.id = objectSettingsId;
          //settingsId.set("username", username);
		  settingsId.set("sleepHour", sleepHour);
          settingsId.set("sleepMinute", sleepMinute);
		  settingsId.set("sleepAmpm", sleepAmpm);
          settingsId.set("wakeUpHour", wakeUpHr);
          settingsId.set("wakeUpMinute", wakeUpMin);
		  settingsId.set("wakeupAmpm",  wakeupAmpm);
          //settingsId.set("otherActivitiesHour", otherActivitiesHr);
          //settingsId.set("otherActivitiesMinute", otherActivitiesMin);
          //settingsId.set("sleepCalculatorCheck", sleepCalculatorCheck);
          settingsId.save(null, {
            success: function(settingsId) {
              console.log("Saved to Parse");
            },
            error: function(settingsId, error) {
              console.log(error + " error");
            }
          });
        },
        error: function(error) {
          console.log(error + " --> error");
        }
      });
    });

    $('#settingsButton').on('click', function(){
										  
      var SettingsId = Parse.Object.extend("Settings");
      // Look for user's objectId in settings Class
      var objectId = new Parse.Query(SettingsId);
      objectId.equalTo("username", username);
      objectId.first({
        success: function(objectId) {
          var userId = objectId.id;
          var SettingsData = Parse.Object.extend("Settings");
          var preSettingsData = new Parse.Query(SettingsData);
          preSettingsData.get(userId, {
            success: function(userId) {             
              var sleepHourData = userId.get("sleepHour");
              var sleepMinuteData = userId.get("sleepMinute");
			  var sleepAmpmData = userId.get("sleepAmpm");
			  var wakeUpHourData = userId.get("wakeUpHour");
              var wakeUpMinuteData = userId.get("wakeUpMinute");
			  var wakeupAmpmData = userId.get("wakeupAmpm");
              //alert(wakeUpHourData+"--"+wakeUpMinuteData+"--"+sleepHourData+"--"+sleepMinuteData);			  
			  $('#idsleepHour').val(sleepHourData+":00").attr("selected", "selected");
			  $('#idsleepMin').val(sleepMinuteData).attr("selected", "selected");
			  $('#idsleepAmpm').val(sleepAmpmData).attr("selected", "selected");
			  $('#idwakeUpHR').val(wakeUpHourData+":00").attr("selected", "selected");
			  $('#idwakeUpMin').val(wakeUpMinuteData).attr("selected", "selected");
			  $('#idwakeupAmpm').val(wakeupAmpmData).attr("selected", "selected");
            },
            error: function(userId) {
              console.log(error + " --> incorrect. MUST FIX!");
            }
          });
        },
        error: function(error) {
          console.log(error + " --> error");
        }
      });
    });
	
	//get settings attributes starts here
      var SettingsId = Parse.Object.extend("Settings");
      // Look for user's objectId in settings Class
      var objectId = new Parse.Query(SettingsId);
      objectId.equalTo("username", username);
      objectId.first({
        success: function(objectId) {
          var userId = objectId.id;
          var SettingsData = Parse.Object.extend("Settings");
          var preSettingsData = new Parse.Query(SettingsData);
          preSettingsData.get(userId, {
            success: function(userId) {             
              var sleepHourData = userId.get("sleepHour");
              var sleepMinuteData = userId.get("sleepMinute");
			  var sleepAmpmData = userId.get("sleepAmpm");
			  var wakeUpHourData = userId.get("wakeUpHour");
              var wakeUpMinuteData = userId.get("wakeUpMinute");
			  var wakeupAmpmData = userId.get("wakeupAmpm");
              //alert(wakeUpHourData+"--"+wakeUpMinuteData+"--"+sleepHourData+"--"+sleepMinuteData);			  
			  $('#idsleepHour').val(sleepHourData+":00").attr("selected", "selected");
			  $('#idsleepMin').val(sleepMinuteData).attr("selected", "selected");
			  $('#idsleepAmpm').val(sleepAmpmData).attr("selected", "selected");
			  $('#idwakeUpHR').val(wakeUpHourData+":00").attr("selected", "selected");
			  $('#idwakeUpMin').val(wakeUpMinuteData).attr("selected", "selected");
			  $('#idwakeupAmpm').val(wakeupAmpmData).attr("selected", "selected");
			 var timeSetsArr = {"8:00": 0.85, "8:15": 0.875, "8:30": 0.9,"8:45": 0.925, "9:00": 1, "9:15": 1.06,"9:30": 1.1, "9:45": 1.16,"10:00": 1.2, "10:15": 1.25, "10:30": 1.3,"10:45": 1.4, "11:00": 1.5, "11:15": 1.6,"11:30": 1.7, "11:45": 1.8,"12:00": 2, "12:15": 2.2, "12:30": 2.4,"12:45": 2.6, "1:00": 3, "1:15": 3.2,"1:30": 3.4, "1:45": 3.6, "2:00": 6, "2:15": 8.85,"2:30": 11.85, "2:45": 17.85,"3:00": 90, "3:15": -20,"3:30": -11, "3:45": -8,"4:00": -6, "4:15": -4.50,"4:30": -3.50, "4:45": -3.20,"5:00": -3, "5:15": -2.60,"5:30": -2.40, "5:45": -2.20,"6:00": 2, "6:15": -1.80,"6:30": -1.70, "6:45": -1.60,"7:00": -1.50, "7:15": -1.40,"7:30": -1.35, "7:45": -1.27};
  
			
			  var sleepStartTime = sleepHourData+":"+sleepMinuteData;
			  sleepStartTimeGl = timeSetsArr[sleepStartTime];
			  //alert(sleepingHoursGl);
			  sleepingHoursGl = sleepStartTime;
			  if(sleepHourData <12 && sleepAmpmData=='pm' ){
				var hours1 = 11 - parseInt(sleepHourData) ;
				if(wakeupAmpmData=="am"){
					actHours = hours1 + parseInt(wakeUpHourData);
				}
				var extraHourCheck = (sleepMinuteData+wakeUpMinuteData)/60;
				//alert(actHours);
				if(extraHourCheck>=1){
					actHours = actHours+1;
					mins = (sleepMinuteData+wakeUpMinuteData)%60;
				}else{
					mins = sleepMinuteData+wakeUpMinuteData;
				}
				
			  }else{
				actHours = wakeUpHourData - sleepHourData;
				var extraHourCheck = (sleepMinuteData+wakeUpMinuteData)/60;
				if(extraHourCheck>=1){
					actHours = actHours+1;
					mins = (sleepMinuteData+wakeUpMinuteData)%60;
				}else{
					mins = sleepMinuteData+wakeUpMinuteData;
				}
			  }
			  //sleepingHoursGl = actHours+":"+mins;
			  var secs1 = actHours*60*60;
			  var secs2 = mins*60;
			  sleepingHoursGl = secs1+secs2;
			  //alert(sleepingHoursGl);
			  document.cookie="slHourCk=" + sleepingHoursGl;
			  document.cookie="slStratTimeCk=" + timeSetsArr[sleepStartTime];
			  //alert(actHours+":"+mins);
			 // var startSleepTime = sleepStartTime.; var endSleepTime= wakeUpMorTime;			 
			  // s = startSleepTime.split(':');
			  // e = endSleepTime.split(':');
			   // alert(s);
			   //min = e[1]-s[1];
			   //hour_carry =24;if(min <0){
				   //min +=60;
				   //hour_carry +=1;}
			  //hour = e[0]-s[0]-hour_carry;
			  //min =((min/60)*100).toString()
			  // diff = hour +":"+ min.substring(0,2);
			  //alert(diff);
            },
            error: function(userId) {
              console.log(error + " --> incorrect. MUST FIX!");
            }
          });
        },
        error: function(error) {
          console.log(error + " --> error");
        }
      });

	//get settings attributes ends here
});

//added by synsynoia
function getCookie(name) {
	//alert("In Coockie:"+name);
	//alert(document.cookie);
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
