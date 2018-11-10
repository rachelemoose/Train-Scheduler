// Initialize Firebase
  var config = {
    apiKey: "AIzaSyClE5-v3jrjUZ9XU8vb_gxkUES-wsi3AfU",
    authDomain: "rachel-train-scheduler.firebaseapp.com",
    databaseURL: "https://rachel-train-scheduler.firebaseio.com",
    projectId: "rachel-train-scheduler",
    storageBucket: "rachel-train-scheduler.appspot.com",
    messagingSenderId: "61129977227"
  };

  firebase.initializeApp(config);

  //Create a variable to reference the database
  var database = firebase.database();
  console.log(database)

  $("#submit").on("click", function(){
      //create variables for each input field
      //name of the new train added to the table
      var addedTrain = $("#train_name").val().trim();
      //the destination of the new traim added to the table
      var destination = $("#destination").val().trim();
      //the first time that train runs 
      var firstTrainTime = $("#first_train_time").val().trim();
      //how often that train runs 
      var frequency = $("#frequency").val().trim();


//create object for holding new train data 
//first fields before the colon are Firebase fields created
//second fields after the colon are variables created in this file
  var newTrain = {
    trainName: addedTrain,
    trainDestination: destination,
    theFirstTrainTime: firstTrainTime,
    frequencyofTrain: frequency,
}

  //upload new train data to firebase
  database.ref().push(newTrain);

  //log it all to make sure it's correctly capturing
  console.log("New Train stored in Firebase: " + newTrain.trainName);
  console.log("New Train's destination: " + newTrain.trainDestination);
  console.log("What Time the First Train Arrives: " + newTrain.theFirstTrainTime);
  console.log("How Often the New Train Runs: " + newTrain.frequencyofTrain)

//clear the values after submitting 
  $("#train_name").val("");
  $("#destination").val("");
  $("#first_train_time").val("");
  $("#frequency").val("");

//create variable and log current time to make sure it is working correctly
  var currentTime = moment();
  console.log(currentTime) //this does not update unless refreshed 

// Difference between the current time and the next train time
    var diffTime = moment().diff(moment(currentTime), "minutes");

// Time apart (remainder)
  var remaining = diffTime % frequency;
    

// var MinutesTillTrain = frequency - remainder;
  var MinutesTillTrain = frequency - remaining;

  var nextTrain = moment().add(MinutesTillTrain, "minutes").format("hh:mm");
  console.log("Next train: " + nextTrain)

  });


database.ref().on("child_added", function(childSnaphot) {
    console.log(childSnaphot.val());

    var addedTrain = childSnaphot.val().trainName;
    console.log(addedTrain)
    var destination = childSnaphot.val().trainDestination;
    console.log(destination)
    var firstTrainTime = childSnaphot.val().theFirstTrainTime;
    console.log(firstTrainTime)
    var frequency = childSnaphot.val().frequencyofTrain;
    console.log(frequency)



  function displayRealTime() {
    setInterval(function(){
      $("#current_time").html(moment().format("DD/MM/YY hh:mm A"))
    }, 1000);
  }
 displayRealTime();

  //create variable and log current time to make sure it is working correctly
   var currentTime = moment();
   console.log("current time with moment" + currentTime) //this does not update unless refreshed 

	//take first train time and subtract a year - gives me a long string of numbers
	var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
	console.log("First train time converted back a year: " + firstTimeConverted)

// Difference between the current time and the next train time
 var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
 console.log("Difference in time between now and next train: " + diffTime);

// Time apart
  var remaining = diffTime % frequency;
  console.log("remaining time: " + remaining);

  // var MinutesTillTrain = frequency - remainder;
  var MinutesTillNextTrain = frequency - remaining;
  console.log("Minutes until train: " + MinutesTillNextTrain);


 var nextTrain = moment().add(MinutesTillNextTrain, "minutes").format("hh:mm");
 console.log("next train arrival time: " + moment(nextTrain).format("hh:mm"));


 $("#trainBody").append("<tr><td>" + addedTrain + "</td><td>" + destination + "</td><td>" + frequency +
 "</td>" + firstTrainTime + "</td><td>" + nextTrain + "</td><td>" + MinutesTillNextTrain + "</td></tr>")

})

