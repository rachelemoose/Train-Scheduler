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
  var newTrain = {
    name: addedTrain,
    destin: destination,
    firstTT: firstTrainTime,
    frequence: frequency,
}

  //upload new train data to firebase
  database.ref().push(newTrain);

  //log it all to make sure it's correctly capturing
  console.log(newTrain.name);
  console.log(newTrain.destin);
  console.log(newTrain.firstTT);
  console.log(newTrain.frequence)

//clear the values after submitting 
  $("#train_name").val("");
  $("#destination").val("");
  $("#first_train_time").val("");
  $("#frequency").val("");

  });


database.ref().on("child_added", function(childSnaphot) {
    console.log(childSnaphot.val());

    var addedTrain = childSnaphot.val().name;
    console.log(addedTrain)
    var destination = childSnaphot.val().destin;
    console.log(destination)
    var firstTrainTime = childSnaphot.val().firstTT;
    console.log(firstTrainTime)
    var frequency = childSnaphot.val().frequence;
    console.log(frequency)

    //create variable and log current time to make sure it is working correctly
  var currentTime = moment().format("DD/MM/YY hh:mm A");
  console.log(currentTime) //this does not update unless refreshed 

  function displayRealTime() {
    setInterval(function(){
      $("#current_time").html(moment().format("DD/MM/YY hh:mm A"))
    }, 1000);
  }
 displayRealTime();

 $("#trainBody").append("<tr><td>" + addedTrain + "</td><td>" + destination + "</td><td>" + frequency +
 "</td>" + firstTrainTime + "</td></tr>")

})

