var parser = require('rss-parser');
var FB = require('fb');
var CronJob = require('cron').CronJob;
var arrOfMsPosts =[];
var arrOfMSlink=[];
FB.setAccessToken('EAACEdEose0cBAHABKR97glJCbEkCYgVIJlcw3wMZCQNZAPTkZBwbsbQPmJLeuRj32VA8YEc6XL9NXQBSbWy4ZCJj4mEIlz9WNgI9HT1LWNfOh9A03asoK3K2JtKxYrZA14SaEOupRb9ZAl6ZAuSmDUpDmP5gvLD1hDXYYAtRtJZC6wZDZD');
//get enteries from rss file
//add rss address here
parser.parseURL('http://gadgets.ndtv.com/rss/microsoft/feeds', function(err, parsed) {
//parsing
//loop through each element in parsed data
parsed.feed.entries.forEach(function(entry) {
var body =entry.title + '' ;
var linkms=entry.link+'';
if(body.includes('Microsoft')){
arrOfMsPosts.push(body);
arrOfMSlink.push(linkms);
}
});

//generate random number for selecting post on facebook
function randomMS(max,min){
return Math.floor(Math.random()*(max-min)+min);
}

//assign job with particular time
var job = new CronJob({
cronTime: '40 47 11 * * 1-7',
onTick: function() {
/*
* Runs every weekday (
* at midnight
*/
//  generate randomnumber

var ranNo=randomMS(arrOfMsPosts.length,0);
//stores randomed post from msposts
var postms = arrOfMsPosts[ranNo];
var linkms=arrOfMSlink[ranNo];
//removes that post  from the array
arrOfMsPosts.splice(ranNo,1);
arrOfMSlink.splice(ranNo,1);
//show the post removed
// /console.log(arrOfMsPosts[ranNo]);
//shows the post
console.log(postms);
//posts on fb
      FB.api('me/feed', 'post', { message: postms,link: linkms }, function (res) {
                if(!res || res.error) {
                   console.log(!res ? 'error occurred' : res.error);
                   return;
                  }
                   console.log('Post Id: ' + res.id);
                  });
},
start: true,
timeZone: 'Asia/Calcutta'
});
});
