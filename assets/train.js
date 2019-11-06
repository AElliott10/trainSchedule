
//https://trainschedule-727b5.firebaseio.com/
 var firebaseConfig = {
  apiKey: "AIzaSyAsCY11VBVdWJsK4KHBRrzo66s1bI1KKF0",
  authDomain: "trainschedule-727b5.firebaseapp.com",
  databaseURL: "https://trainschedule-727b5.firebaseio.com",
  projectId: "trainschedule-727b5",
  storageBucket: "trainschedule-727b5.appspot.com",
  messagingSenderId: "836585805658",
  appId: "1:836585805658:web:a17f86a362614b5cc24563"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


//Add data to firebase - this works
$("#add-user").on('click',function(){

  var trainName = $("#trainName").val().trim();
  var destination =  $("#destination").val().trim();
  var firstTrain =  $("#firstTrain").val().trim();
  var frequency =  $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  }

  database.ref().push(newTrain);

alert("Train Added");

  $("trainNameInput").val("");
  $("destinationInput").val("");
  $("firstTrainInput").val("");
  $("frequencyInput").val("");
});

//Pull data from the database and manipulate data from the database to display train schedule - this works
database.ref().on("child_added", function(childSnapshot, prevChildKey){
  let trainDestination = childSnapshot.val().destination;
  let trainName = childSnapshot.val().name;
  let trainFrequency = childSnapshot.val().frequency;
  let trainFirstTime = childSnapshot.val().firstTrain;
  let timeArr =  trainFirstTime.split(":");
  var trainTime = moment().hours(timeArr[0]).minutes(timeArr[1]);
  var timeMinutes;
  var timeArrival;
  var differenceTimes = moment().diff(trainTime, "minutes");
  var timeRemainder = differenceTimes % trainFrequency;
  timeMinutes = trainFrequency - timeRemainder;
  timeArrival = moment().add(timeMinutes, "m").format("hh:mm A");

  var newRow = $("<tr>");
  var trainNameData = $("<td>" + trainName + "</td>");
  var trainDestinationData = $("<td>" + trainDestination + "</td>");
  var trainFreqData = $("<td>" + trainFrequency + "</td>");
  var trainFirstTimeData = $("<td>" + timeArrival + "</td>");
  var trainMinuteData = $("<td>" + timeMinutes + "</td>");

  newRow.append(trainNameData);
  newRow.append(trainDestinationData);
  newRow.append(trainFreqData);
  newRow.append(trainFirstTimeData);
  newRow.append(trainMinuteData);


  $("table").append(newRow);


})