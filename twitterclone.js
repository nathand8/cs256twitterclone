// Initialize Firebase
var config = {
    apiKey: "AIzaSyBDgHk3_m-vqyUbTGIqgCZ8qAb-CoY5ID4",
    authDomain: "luminous-torch-6850.firebaseapp.com",
    databaseURL: "https://luminous-torch-6850.firebaseio.com",
    storageBucket: "luminous-torch-6850.appspot.com",
    messagingSenderId: "825487892602"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var tweetsRef = database.ref().child('chatty');

$(function() {
    $("#postTweet").click(postTweet);
    $("#text")[0].focus();
}); 

function createTweetHTML(tweet) {
    var tweetHtml = '<div class="panel panel-default">';
    tweetHtml += '<div class="panel-heading">';
    tweetHtml += '<h3 class="panel-title">';
    tweetHtml += tweet.message.substring(0, 20) + '...';
    tweetHtml += '</h3></div>';
    tweetHtml += '<div class="panel-body">';
    tweetHtml += tweet.message;
    if (tweet.sender) {
        tweetHtml += '<br /><br />';
        tweetHtml += '<span class="sender">';
        tweetHtml += '- ';
        tweetHtml += tweet.sender;
        tweetHtml += '</span>';
    }
    tweetHtml += '</div></div>';
    return tweetHtml;
}

// https://www.firebase.com/docs/web/guide/retrieving-data.html
// this gets called for every child when the database first loads (order not guaranteed)
tweetsRef.on("child_added", function(tweet) {
    var tweetObj = tweet.val();
    if (tweetObj && tweetObj.message) {
        var tweetHtml = createTweetHTML(tweetObj);
        $("#tweetlist").prepend(tweetHtml); 
    }
    var tweetList = $("#tweetlist");
    while (tweetList.children().length > 5) {
        tweetList.children()[tweetList.children().length - 1].remove();
    }
});

function displayTweet() {
}

function postTweet() {
    var t = {
        message: $("#text").val(),
        sender: $("#name").val()
    }
    tweetsRef.push(t);
}

