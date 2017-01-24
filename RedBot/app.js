var SlackBot = require('slackbots');
var parser = require('rss-parser');
var FB = require('fb');
//array of ms titles
var arrOfMsPosts =[];
//array of ms links
var arrOfMSlink=[];
/**array of rss link 
*before adding link to rss please make sure that link have many ms links
*also test that rss give have Micrsoft title as well as link by giving ranss value of rss.length-1
* if it shows the message missing error this rss will not work try another
**/
var rss =['http://gadgets.ndtv.com/rss/microsoft/feeds','http://news.microsoft.com/feed/','https://blogs.technet.microsoft.com/microsoft_blog/feed/'];
//generate random number for selecting post on facebook
function randomMS(max,min){
return Math.floor(Math.random()*(max-min)+min);
}
//connect with access token
FB.setAccessToken('add facebook access token here');
//get enteries from rss file
//add rss address here
//generates randome index in rss array
var ranrss=randomMS(rss.length,0);
//shows the array index of rss from which is taken
console.log(ranrss);
parser.parseURL(rss[ranrss], function(err, parsed) {

//parsing
//loop through each element in parsed data
parsed.feed.entries.forEach(function(entry) {
var body =entry.title + '' ;
var linkms=entry.link+'';
if(body.includes('Microsoft')||body.includes('microsoft')){
arrOfMsPosts.push(body);
arrOfMSlink.push(linkms);
}
});


/*
* runs only once when app  isfired
*
*/ 

var ranNo=randomMS(arrOfMsPosts.length,0);
//stores randomed post from msposts
var postms = arrOfMsPosts[ranNo];
var linkms=arrOfMSlink[ranNo];
//removes that post  from the array
arrOfMsPosts.splice(ranNo,1);
arrOfMSlink.splice(ranNo,1);
//show the post removed
//console.log(arrOfMsPosts[ranNo]);
//shows the post
console.log(postms);

var bot = new SlackBot({
    token: 'add slack access token here', 
    name: 'Redbot'
});

bot.on('start', function() {
        var params = {
        icon_emoji: ':smile:'

        
    };
//posts on facebook


     FB.api('me/feed', 'post', { message: postms,link: linkms }, function (res) {
                if(!res || res.error) {
                   console.log(!res ? 'error occurred' : res.error);
                   return;
                  }
                   console.log('Post Id: ' + res.id);
//posts on slack

 
 //posts on general
    bot.postMessageToChannel('general',postms +' '+ linkms, params);               
                   });

 
    

   
});

     

});