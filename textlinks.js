var svg;
var eachEntry;
var xScale;
var xAxis;
var years = [];
var alongWidth;
var uniqueYears;
var uniqueAuthors;
var uniqueKeywords;
var uniqueMostKeyed;
var uniqueTotalsKeyed;

var journalTypes = [];
var authors = [];
var keywords = [];
var uniqueTypes;
var goSecond = false;
var totals = [];
var totalAuthors = [];
var totalKeywords = [];
var huh = [];
var total1 = 0;
var total2 = 0;
var total3 = 0;
var total4 = 0;
var total5 = 0;
var total6 = 0;
var totalss = {};
var opacityMap;
var firstLoadVar;
// var firstLoadVar;
var firstLoad = 0;

// var firstLoad = -1;
var secLoad = -1;
var secondLoadVar;
var secondLoad = -1;
var padding = 35;
var padX = 100;

var minYear;
var maxYear;
var maxAuthor;
var maxCited;
var thisTotal;
var totalsCircles;
var textsAre;
var heightScale;
var singleScale;
var thisData = [];
var theseAuthors = [];
var theseKeywords = [];
var focusKeywords = [];
var totalK = [];
var uniqueKDone=false;


var theX = [];
var maxEntries;
var citeNums = [];
var radius = 3;
    //Width and height
var w = window.outerWidth;
var h = window.innerHeight-50;
var newCircle;

var color; //=  d3.scale.category20c();
var colorSpectrum;

var initialZoom = 1,
    maxZoom = 10;
var filterNum;

var exitK;
var returnK;
var minK;
var otherTransform;
var doOther;

var animateZoom = false;
var showReset = false;
var overallView = false;
var loadIt;
var itsDone=false;

var tweets = [];
var uncommonArr = [];
var loadOne;
var stopMove;
var randomOne = false;
var randomTwo = false;
var firstPrep = false;
var secondPrep = false;
var ktick;
var tickOne;
var tickTwo;
var concordNodes;
// var s;
function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById('txt').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}
function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
startTime();


svg = d3.select("#container")
    .append("svg")
    .attr({
      "width": "100%",
      "height": "100%",
        })
 var vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 0 + ")");  

loadData("allresponses.csv", .25)
function loadData(csvName, filterNum){
citeNums.length = 0;
keywords.length = 0;
authors.length = 0;
theseKeywords.length = 0;
theseAuthors.length = 0;
journalTypes.length = 0;
totals.length = 0;
totalAuthors.length = 0;
totalKeywords.length = 0;
focusKeywords.length = 0;
totalK.length = 0;

d3.csv(csvName, function(data) {
thisData=(data);
for (i = 0;i<data.length; i++){ 

    if (data[i].BrainTweets!="undefined"){
        tweets[i] = data[i].BrainTweets;
        keywords[i] = data[i].BrainTweets.split(" ");
        // keywords[i].push(unkeywords.toLowerCase());
        }
        for (j=0; j<keywords[i].length; j++){
        theseKeywords.push(keywords[i][j]);   
        }
} //generates an array of all Names
var keywordSorted = false;
    for (i=0; i<theseKeywords.length; i++){ 
        if(theseKeywords[i].length==0){
              theseKeywords.splice(i,1)
        }
    }







var common = 'the, I,in,t,co,and,im,rt,shit,bitch,bitches, s, from,those,that, it, is, we, all, a, an, by, to, you, me, he, she, they, we, it, i, are, to, for, of';
function getUncommon(sentence, common) {
    var wordArr = sentence.match(/\w+/g),
        commonObj = {},
        word, i;
    
    common = common.split(',');
    for ( i = 0; i < common.length; i++ ) {
        commonObj[ common[i].trim() ] = true;
    }
    for ( i = 0; i < wordArr.length; i++ ) {
        word = wordArr[i].trim().toLowerCase();
        if ( !commonObj[word] ) {
            uncommonArr.push(word);
        }
        else{}
    }
    keywordSorted = true;
    return uncommonArr;
}

// if(tweets.length==296){
//     loadUncommon()
// }
// var firstLoadVar;
// var firstLoad = 0;
// function loadUncommon(){
//     console.log("in here")
//     firstLoadVar = setInterval(function(){ 
//         if (firstLoad<=tweets.length){
//             if(tweets[firstLoad].length>0){
//             var oneTweet = tweets[firstLoad];
//             getUncommon(oneTweet, common); //store inner subjects is the loading function for the big data      
//             firstLoad++;
//         }
//         } 
//         else {
//           clearInterval(firstLoadVar); //and stop loading stuff in
//         }
//     },100)
// } 

// if(tweets.length==296){
for (i=0; i<tweets.length; i++){
    if(tweets[i].length>0){
        getUncommon(tweets[i], common); 
    }
}
// }






function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
} 

uniqueKeywords = uncommonArr.filter( onlyUnique ); //finds unique authors
// uniqueKeywords = theseKeywords.filter( onlyUnique ); //finds unique authors

// console.log("Unique Keywords: " + uniqueKeywords);

function keyConsolidation(givenKey,i) { 
    var total = 0;
        for (i = 0;i<uncommonArr.length; i++){ 
            if(uncommonArr[i] == givenKey){
                total++;
            }else{
            }
        }
         return total;
} 
if(keywordSorted==true){
    for (i = 0; i<uncommonArr.length; i++){
      // if(theseKeywords[i].length>0){
        totalKeywords[i]= keyConsolidation(uncommonArr[i])
        var mostKeyed = d3.max(totalKeywords);        
        if(totalKeywords[i]>mostKeyed*filterNum){
        focusKeywords.push(uncommonArr[i]);
      }
    }
    // } //creates a new aray with the sums of all the different Names
}
// if(keywordSorted==true){
//     for (i = 0; i<theseKeywords.length; i++){
//       if(theseKeywords[i].length>0){
//         totalKeywords[i]= keyConsolidation(theseKeywords[i])
//         var mostKeyed = d3.max(totalKeywords);        
//         if(totalKeywords[i]>mostKeyed*filterNum){
//         focusKeywords.push(theseKeywords[i]);
//       }
//     }
//     } //creates a new aray with the sums of all the different Names
// }
// uniqueMostKeyed = uncommonArr.filter( onlyUnique ); //finds unique authors
uniqueMostKeyed = focusKeywords.filter( onlyUnique ); //finds unique authors
for (i = 0; i<uniqueMostKeyed.length; i++){
   totalK[i]= keyConsolidation(uniqueMostKeyed[i])
    uniqueKDone=true;   
}

colorSpectrum = [
"#fc5988" 
,"#b14a41"
,"#6ab054"
,"#8675ee"
,"#fcb752"
,"#89e2fe"]

color = d3.scale.ordinal()
    .domain([0, uniqueMostKeyed.length])
    .range(colorSpectrum);
    console.log(uniqueMostKeyed.length)
if(uncommonArr.length>3000){
    console.log("yes")
callOthers();    
}
// } 

// function toTitleCase(str){
//     return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
//     }
})
}



//also should do node scale?       

var fishEyeGo = false;
var b=0;
var whatis = [];
var loadTime;

$( document ).ready(function() {

        // $("#titlename").toggle();  //show   
$("body").keypress(function(){


    (b+=1);
    if (b==1){
        force.stop();
        randomOne = true;
if(randomOne){
    loadTime = 5;//500;
}
        loadOne();
 
        }            
    if (b==2){
          clearInterval(firstLoadVar); //and stop loading stuff in


       concordNodes();

        // randomOne = false;
        // randomTwo = true;
          // clearInterval(firstLoadVar); //and stop loading stuff in
//         firstLoad = 0;
// if(randomTwo){
//     loadTime = 10;
// }
//         loadOne();

    }
    if (b==3){   
        firstPrep = false;
        secondPrep = true;
          clearInterval(firstLoadVar); //and stop loading stuff in
        returnNodes();   
        // simpleNodes();
        // b=0;
        // $("#titlename").toggle();  //show    

    }
    if(b==4){
        // $(".labels").show();
    }
    if(b==5){
                // $("#titlename").hide();  //show    
        // $("#titlename").toggle();  //show    
        // makeNewNodes();
    }      
    if(b==6){
        // doOther();       
    }  
    if(b==7){
    // whatis[0]=whatis[0]-radius*4;
    // whatis[1]=whatis[1]-radius*4;        
    //     minK(whatis)
    }    
});
})
var saveOne=[];
var thisY = [];
var thisX = [];

var links = [];
var nodeCited = [];
var nodes = {};
var drag;
var n;
var maxNodeCited;

function callOthers(){
links = [];
console.log(links.length)

if(itsDone==false){
for (i=0; i<thisData.length; i++){ 
    for (j=0; j<uniqueMostKeyed.length; j++){ 
        if (keywords[i].indexOf(uniqueMostKeyed[j])!=-1){
        links.push({"source":keywords[i],"target":uniqueMostKeyed[j],"headline":tweets[i],"split":tweets[i].split(" ")}) 
    }
}
}    
// for (i=0; i<uncommonArr.length; i++){ 
//     for (j=0; j<uniqueMostKeyed.length; j++){ 
//         if (uncommonArr[i].indexOf(uniqueMostKeyed[j])!=-1){
//         links.push({"source":uncommonArr[i],"target":uniqueMostKeyed[j],"headline":tweets[i]}) 
//     }
// }
// }    
firstPrep = true;
    simpleNodes();
}
if(itsDone==true){
    // makeNewNodes();
}
// simpleNodes();
console.log(links.length)

}

var rMap; 

var circle, path, text;
var force;
var scaleRadius = 5;
var howLong = [];
var nodes = {};

var thisPaperName;
getTextWidth = function(text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
};


var what = [];
var majorNodes=[];
var nodesMax;
var subradius = 325;
var nodesLength;
var jump;
var theseHeadlines = [];
// var subradius = 325;
// nodesLength = d3.selectAll(circle[0]).size()
// jump = (Math.PI*2)/links.length; 
var chunks = [];
function simpleNodes(){

console.log(links.length);

// $("#titleName").toggle();  
   
// Compute the distinct nodes from the links.
links.forEach(function(link) {
    // console.log(link.source+link.target);
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, headline:link.headline, split:link.split});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([w, h])
    .linkDistance(100)
    .charge(-600)
    .on("tick", function(){
        if(firstPrep){
            tick();
        }
        // if(randomOne){
        //     tickOne();
        // }
        // if(randomTwo){
        //     tickTwo();
        // }
        if(secondPrep){
            ktick();
        }
    })
    .start();

drag = force.drag() 
    .on("dragstart", dragstart);   

var thisMap;

var thisWeight = [];
var maxWeight;
path = vis.selectAll("path")
    .data(force.links())
    .enter().append("path")
    .attr("class",function(d,i){
        return "link"+i;
    }) 
    .attr("stroke","gray")
    .attr("opacity",.1)
    .attr("fill","none")

circle = vis.selectAll("node")
    .data(force.nodes())
    .enter().append("circle")
    .attr("class",function(d,i){
        // nodesMax = force.nodes().length
        howLong.push(d.name);
        thisWeight.push(d.weight);
        maxWeight = d3.max(thisWeight, function(d){ return d; })
        rMap = d3.scale.linear()
            .domain([0,maxWeight])
            .range([radius, radius*9])  
            return "node"+i;
    })  
    circle
    .attr("r", function(d,i){
        return 3;
    })
    .attr("fill", function(d,i){
        for(j=0; j<uniqueMostKeyed.length; j++){
           if(d.name==uniqueMostKeyed[j]){
                majorNodes.push(i);
                return "white";                    
            }
        }
        for (k=0; k<uniqueKeywords.length; k++){
            for(j=0; j<d.name.length; j++){
                if(d.name[j]==uniqueKeywords[k] && d.name.length>1){
                    return color(k);
                }
            }
        }
    })
    .attr("stroke", function(d,i){
        for(j=0; j<uniqueMostKeyed.length; j++){
               if(d.name==uniqueMostKeyed[j]){
                    majorNodes.push(i);
                    return "gray";                    
                }
            }
            for (k=0; k<uniqueKeywords.length; k++){
                for(j=0; j<d.name.length; j++){
                    if(d.name[j]==uniqueKeywords[k] && d.name.length>1){
                        return "none";
                    }
                }
            }        
    })
    // .attr("stroke-width",.3)
    .on("dblclick", dblclick)
    .call(drag);

    circle
        .transition()
        .duration(2000)
        .attr("r", function(d,i){
            for(j=0; j<uniqueMostKeyed.length; j++){
                if(d.name==uniqueMostKeyed[j]){
                    return rMap(d.weight);
                }
            }
            return 3;            
        });

nodesLength = d3.selectAll(circle[0]).size()-majorNodes.length;
jump = (Math.PI*2)/nodesLength; 

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }
    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }

console.log("simple nodes")

// text= vis.selectAll("labels")
//     .data(force.nodes())
//     .enter().append("text")
//     .attr("class",function(d,i){
//         return "labels"+i;
//     })
//     .attr("x", 8)
//     .attr("y", ".31em")
//     .attr("font-size","10px")
//     .text(function(d,i) {
//         for(j=0; j<uniqueMostKeyed.length; j++){
//             if(d.name==uniqueMostKeyed[j]){
//                 return d.name;
//             }
//         }
//         for(k=0; k<majorNodes.length; k++){
//             if(i!=k){
//                 //make this only if d.headline matches an action word
//                 // for()
//                 for(z=0; z<uncommonArr.length; z++){
//                 if (d.split.indexOf(uncommonArr[z])!=-1){

//                     // if(indexOf(d.headline.split(" "))==uncommonArr[z]){
//                         return uncommonArr[z];
//                     }           
//                 }
//             }
//         }
//     });
text= vis.selectAll("labels")
    .data(force.nodes())
    .enter().append("text")
    .attr("class",function(d,i){
        return "labels"+i;
    })
    .attr("x", 8)
    .attr("y", ".31em")
    .attr("font-size","10px")
    .text(function(d,i) {
        return d.headline;
    });

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
      circle
      .attr("transform", transprep);
      text.attr("transform", transprep);
}
function transprep(d) {
  d.x = w-radius;
  d.y = Math.max(radius, Math.min(h - radius, d.y));   
  return "translate(" + d.x+ "," + d.y + ")";
}
ktick = function(){
    for(i=0; i<links.length; i++){
      d3.selectAll(".link"+i)
      .transition()
        .attr("d", linkArc);

      d3.selectAll(".node"+i)
      .transition()
      .attr("transform", transform);

       d3.selectAll(".labels"+i)     
       .transition()
       .attr("transform", transform);     
       }  
   }
function transform(d) {
  d.x = Math.max(radius, Math.min(w - radius, d.x));
  d.y = Math.max(radius, Math.min(h - radius, d.y));   
  return "translate(" + d.x+ "," + d.y + ")";
}








function lastNChars(n, str) {
    var result = str.substr(str.length - Math.min(n, str.length), str.length);
    if(result.length < str.length) {
        result = "..." + result;
    }
    return result;
}

function firstNChars(n, str) {
    if(typeof(str) == 'undefined')
        return null;

    var result = str.substr(0, Math.min(n, str.length));
    if(result.length < str.length) {
        result = result + "...";
    }
    return result;
}



concordNodes = function(){
    var term = "brain";
var chunks1=[];
var chunks2 = [];
    console.log("concordNodes")
 
        for(var i=0; i<tweets.length; i++) {
        if(typeof(tweets[i]) == 'undefined')
            return;

            if(tweets[i].length>0){
            // var tweet = tweets[i];
            chunks[i] = tweets[i].split(term);
            chunks1.push(lastNChars(50, chunks[i][0]));
            chunks2.push(firstNChars(50, chunks[i][1]));
        }
    }
    // if(chunks.length==59){
            // text
            // .transition()
            // .data(chunks)
            // .attr("class","prefix")
            // .attr("translate", transAgain)
            // .text(function(d,i){
            //     return d[0];
            // })
for(i=0; i<chunks.length; i++){
       d3.selectAll(".labels"+i)
       .attr("y",0)
       .transition()
       .duration(2000)
        .text("brain")
        .attr("transform", transAgain)

       d3.selectAll(".node"+i)
       .transition()
       .duration(2000)
        .attr("transform", transAgain)

       d3.selectAll(".links"+i)
       .transition()
       .duration(2000)
        .attr("transform", linkArc)  

    function transAgain(d) {
      d.x = w/2;
      d.y = i*40;  
      return "translate(" + d.x+ "," + d.y + ")";
    }
}


           var textOne = vis.selectAll("label")
            .data(chunks)
            .enter().append("text")
            .attr("class","prefix")
            .attr("x", function(d,i){
                return w/2-getTextWidth(d[0])-getTextWidth(term)*2;
            })
            .attr("y", function(d,i){
                return i*40;
            })
            .attr("font-size","10px")
            .text(function(d,i){
                return d[0];
            })     

            // var textTerm = vis.selectAll("label")
            // .data(chunks)
            // .enter().append("text")
            // .attr("class","term")
            // .attr("x", w/2)
            // .attr("y", function(d,i){
            //     return i*40;
            // })
            // .attr("font-size","10px")
            // .text(term)

            var textTwo = vis.selectAll("label")
            .data(chunks)
            .enter().append("text")
            .attr("class","suffix")
            .attr("x",function(d,i){
                return w/2+getTextWidth(term)*2; //+getTextWidth(d[1]);//getTextWidth(term)*2; //getTextWidth(d[1])
            })
            .attr("y", function(d,i){
                return i*40;
            })
            .attr("font-size","10px")
            .text(function(d,i){
                return d[1];
            })            
    // for(i=0; i<chunks.length; i++){
    //    d3.selectAll(".labels"+i)
    //     .transition()
    //     .duration(8000)
    //     .attr("x", w/2)
    //     .attr("y", function(d){
    //         return i*40;
    //     })
    // }
}
    // }
        // for(var i=0; i<data.results.length; i++) {
        //     var tweet = data.results[i];
        //     var chunks = tweet.text.split(term);
        //     chunks[0] = lastNChars(50, chunks[0]);
        //     chunks[1] = firstNChars(50, chunks[1]);
        //     table.append( $('<tr>')
        //                   .append($('<td>').addClass('prefix').text(chunks[0]))
        //                   .append($('<td>').addClass('term').text(term))
        //                   .append($('<td>').addClass('suffix').text(chunks[1])) );

        // }

        // $('#output').prepend(table);






returnNodes = function(){

    console.log("return nodes")
// if(secondPrep){
    // force.stop();
// var kforce = d3.layout.force()
//     .nodes(d3.values(nodes))
//     .links(links)
//     .size([w, h])
//     .linkDistance(40)
//     .charge(-200)
//     .on("tick",ktick)
//     .start(); 
for(i=0; i<links.length; i++){
   d3.selectAll(".labels"+i)
   .transition()
   .duration(2000)
    .text(function(d,i) {
        for(j=0; j<uniqueMostKeyed.length; j++){
            if(d.name==uniqueMostKeyed[j]){
                return d.name;
            }
        }
        for(k=0; k<majorNodes.length; k++){
            if(i!=k){
                //make this only if d.headline matches an action word
                // for()
                for(z=0; z<uncommonArr.length; z++){
                if (d.split.indexOf(uncommonArr[z])!=-1){

                    // if(indexOf(d.headline.split(" "))==uncommonArr[z]){
                        return uncommonArr[z];
                    }           
                }
            }
        }
    })
    .transition()
    .duration(2000)
    .each("end", function(){
        force.start();
    })
}  
}


stopMove = function(){
force.stop();
  circle
  .attr("transform", transOut);
  text.attr("transform", transOut);   
   path.attr("d", linkArc);

    function transOut(d) {
      d.x = w-radius;
      d.y = h-radius;  
      return "translate(" + d.x+ "," + d.y + ")";
    }  
}



loadOne = function(){
    console.log("in here")
    firstLoadVar = setInterval(function(){ 
    if (firstLoad<=links.length){
        for(i=0; i<majorNodes.length; i++){
            if (firstLoad==majorNodes[i]){
                firstLoad++;
            }
            else{            
                // var oneTweet = links[firstLoad];
                shootOut(firstLoad); //store inner subjects is the loading function for the big data      
                firstLoad++;
            }
        }
    } 
        else {
          clearInterval(firstLoadVar); //and stop loading stuff in
        }
    },loadTime)
} 

function shootOut(firstLoad){
    // console.log("shoot out")
for(i=0; i<majorNodes.length; i++){
    if (firstLoad==majorNodes[i]){
        console.log(majorNodes[i])
     d3.selectAll(".node"+majorNodes[i])
     .transition()
     .attr("class","new")
    // .attr("stroke","gray")

    d3.selectAll(".labels"+majorNodes[i])
    .transition()
     .attr("class","new")
    // .duration(100).attr("transform", transOther);

    d3.selectAll(".link"+majorNodes[i])
    .transition()
     .attr("class","new")    
    // .duration(100).attr("d", linkArc);
    }

    if(firstLoad!=majorNodes[i]){
        // tickOne = function(){
        if(randomOne){
             d3.selectAll(".node"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform",transOne);

            d3.selectAll(".labels"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform", transOne);

            d3.selectAll(".link"+firstLoad)
            .transition()
            .duration(loadTime).attr("d", linkArc);
       }
   // }
        // tickTwo = function(){
        if(randomTwo){
            console.log("randomTwo")
             d3.selectAll(".node"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform",transNew);

            d3.selectAll(".labels"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform", transNew);

            d3.selectAll(".link"+firstLoad)
            .transition()
            .duration(loadTime/2).attr("d", linkArc);
       }
        // }
    }
}
function transOne(d) {
    // console.log(s)
    d.x=(w-s*20);
    d.y = Math.max(radius, Math.min(h - radius, d.y));  
      return "translate(" + d.x+ "," + d.y + ")";
}
function transNew(d) {
    d.x=w/2+subradius*Math.cos(jump*firstLoad);
    d.y=h/2+subradius*Math.sin(jump*firstLoad);     
      return "translate(" + d.x+ "," + d.y + ")";
}
}
//  tickOne = function(){
//         if(randomOne){
//              d3.selectAll(".node"+firstLoad)
//             .transition()
//             .duration(10).attr("transform",transOne);

//             d3.selectAll(".labels"+firstLoad)
//             .transition()
//             .duration(10).attr("transform", transOne);

//             d3.selectAll(".link"+firstLoad)
//             .transition()
//             .duration(5).attr("d", linkArc);
//        }
// }
// tickTwo = function(){
//     if(randomTwo){
//         console.log("randomTwo")
//         d3.selectAll(".node"+firstLoad)
//             .transition()
//             .duration(10).attr("transform",transNew);

//         d3.selectAll(".labels"+firstLoad)
//             .transition()
//             .duration(10).attr("transform", transNew);

//         d3.selectAll(".link"+firstLoad)
//             .transition()
//             .duration(5).attr("d", linkArc);
//        }
// }
// function transOne(d) {
//     d.x=(firstLoad*2)+50;
//     d.y = Math.max(radius, Math.min(h - radius, d.y));  
//       return "translate(" + d.x+ "," + d.y + ")";
// }
// function transNew(d) {
//     d.x=w/2+subradius*Math.cos(jump*firstLoad);
//     d.y=h/2+subradius*Math.sin(jump*firstLoad);     
//       return "translate(" + d.x+ "," + d.y + ")";
// }


$('circle').tipsy({
    gravity: 'w', 
    html: true, 
    delayIn: 500, 
    title: function() {

        var d = this.__data__;  
            console.log(d);
        if (d.name[0].length==1){
         return "Keyword: "+d.name;
        }
         return "Tweet Keywords:"+'<br>'+d.name+'<br>';
    }
});
}
// $('#clickZoom').fadeIn();
// var kLabels = false;
// var allLabels = true;
// $('#labelsOn').fadeIn();
// $('#labelsOn').click(function(){  
//     if(kLabels){
//         $(".kandellabels").show();        
//     }
//     if(allLabels){
//         $(".labels").show();
//     }
// })

// var c = false;
// $('#citeRate').slideDown();
// $('#labelsOn').slideDown();
// $('#focusKandel').slideDown();

// $('#citeRate').click(function(){  
//         allLabels=true;
//         kLabels = false;        

//     nodesBack();
//     $("#titlename").show();  
//     $(".paperTitle").hide();    
//     $(".kandellabels").hide();        
//     exitK();

// })

// var k = false;
// var otherDone = false;
// $('#focusKandel').click(function(){  
// $(".labels").hide();
// $("#titlename").hide();  
//         allLabels=false;
//         kLabels = true;
// if(itsDone==false){
//     focusKandel();
// }
// else{
//     stopBigNet();
// }

//     $(".paperTitle").show();  
//     $("#titlename").hide();               
// })


// citeYScale = d3.scale.linear()
//     .domain([0, maxNodeCited])
//     .range([h-padding, h/10]);

// function nodesToOther(){
//     //HERE MAYBE WORDS SHOULD COME BACK BUT ONLY IF THEY ARE THE MAJOR ONES?
//     force.stop();
//     circle.transition()
//     .attr("transform", newTransform);

//     // text
//     // .attr("opacity",0);
//     // .transition()
//     // .attr("transform", newTransform);

//     path
//     .transition()
//     .attr("d", linkArc);

//     function textTransform(d,i){
//         if(i%2==1){
//             var thisy = citeYScale(nodeCited[i])-padding*2+Math.random()*i;
//             return "translate(" + d.x+ "," + thisy + ")";        
//         } 
//         else{
//             var thisy = citeYScale(0)+padding*1.8-Math.random()*i;   
//             return "translate(" + d.x+ "," + thisy + ")";        
//         }
//     }

//     function newTransform(d,i){
//         if (isNaN(parseInt(d.cites))==false){
//             d.y = citeYScale(nodeCited[i]); //not links[i].cites
//             return "translate(" + d.x+ "," + d.y + ")";
//         }
//         else{
//              d.y = citeYScale(0); //not links[i].cites
//             return "translate(" + d.x+ "," + d.y + ")";           
//         }
//     }    
// }

var p0 = [w/2, h/2, 1000];
var p1;
var p2;

// function focusKandel(){
//     force.stop()
//     circle.transition()
//     .duration(4000)
//     .attr("stroke",function(d){    
//          if (d.headline=="Cognitive neuroscience and the study of memory"){
//             newCircle = d3.select(this).transition().attr("class","newClass")
//             .attr("stroke", "yellow");
//             console.log(newCircle.attr("x"))
//    // p7 = [calcX[specialCirc], calcY[specialCirc], 100];

//             return "yellow";
//         }                  
//     })    
//     // .each("end", zoomingTransition());
//     .each("end", transitionKandel());    
// }


// var loadK;
// var didLoad = false;

// loadK=setInterval(function () {
// if(itsDone==true){
//     loadIt("theseCiteKandel.csv");
//     didLoad = true;
// }  
// if(didLoad==true){
//     console.log("done")
//     clearInterval(loadK);
// }    
// }, 500);




// function transitionKandel(){
//    circle.transition()
//     .duration(4000)
//     .attr("transform", newTransform)
//      .each("end", function(){
//         itsDone = true;         
//     })

//     // text
//     // .transition()
//     // .duration(4000)    
//     // .attr("transform", function(){
//     //     newTransform;
//     //     if(d.y>h/1.5){
//     //         d3.select(this)
//     //         .attr("opacity",0)
//     //     }
//     // })
//     // .each("end", function(){
//     //     text.attr("opacity",0);
//     // })

//     path
//     .transition()
//     .duration(4000)    
//     .attr("d", linkArc);
//     // .each("end",loadIt())
// var t = [1];
// var selectedPaper = "Selected Paper: Cognitive neuroscience and the study of memory";
// thisPaperName = getTextWidth(selectedPaper, "12px Helvetica Neue");  // reports 84

// var newLabel = vis.selectAll("newlabel")
//     .data(t)
//     .enter()
//     .append("text").attr("class","paperTitle")
//     .attr("x", w/2-thisPaperName/2)
//     .attr("y", h/10)
//     .attr("fill","gray")
//     .text("Selected Paper: Cognitive neuroscience and the study of memory")

// var newLabel = vis.selectAll("newlabel")
//     .data(t)
//     .enter()
//     .append("text").attr("class","paperTitle")
//     .attr("x", w/2-thisPaperName/2)
//     .attr("y", h/7.5)
//     .attr("fill","gray")
//     .text("Principal Investigator: Eric Kandel")
  
// newCircle
//     .transition()
//     .duration(500)
//     .attr("r", function(d){ 
//         p1 = [d.x, d.y, 1000];
//         console.log(d.x+"x"+d.y+"y")
//         return rMap(d.cites)/8;
//     })
//     .each("end", function(){
//             // zoomingTransition();    
//         d3.select(this)
//         .transition()
//         .duration(500)
//         .attr("r",radius)
//         .each("end", function(){
//             d3.select(this)
//             .transition()
//             .duration(500)
//             .attr("r",function(d){ 
//                 p2 = [d.x, d.y, 1000];                
//                 return rMap(d.cites)/8;
//             })
//             .each("end", function(){
//                 d3.select(this)
//                 .transition()
//                 .duration(1000)
//                 .attr("class","otherClass")                
//                 .attr("transform",otherTransform)
//             })
//         })        
//     })
// // circle
// // .transition()
// // .duration(8000)
// // .delay(4000)
// // .attr("transform",newTransform)
// // .each("end", loadIt("theseCiteKandel.csv"));//loadIt("citedByKandel.csv"


//     function newTransform(d,i){
//             d.y = h; //not links[i].cites
//             return "translate(" + d.x+ "," + d.y + ")";
//     } 

//     otherTransform = function (d,i){
//             d.y = h/10; //not links[i].cites
//             d.x = w/2-thisPaperName/2;
//             return "translate(" + d.x+ "," + d.y + ")";
//     }     

// }


// function zoomingTransition(){
//     svg.call(transition, p0, p1);
// }
// function zoomingTransition2(){
//     svg.call(transition, p1, p2);
// }
// var center = [w/2,h/2];

// function transition(svg, start, end) {

// var  i = d3.interpolateZoom(start, end);
//     vis
//         .attr("transform", transform(start))
//         .transition()
//         .duration(i.duration * 2)
//         .attrTween("transform", function() { 
//             return function(t) { 
//                 return transform(i(t)); 
//             }; 
//         })
//         .each("end", transitionKandel()) 

//   function transform(p) {
//     var k = h / p[2]; //*2;
//     return "translate(" + (center[0] - p[0] * k) + "," + (center[1] - p[1] * k) + ")scale(" + k + ")";
//     }
// }


loadIt = function(whichcsv){
    force.stop();
console.log("loading")
// loadData("citedByKandel.csv", .5); 
loadData(whichcsv, .3);       
}

function nodesBack(){
    force.start();
    overallView=true;
    // console.log(newCircle)
    // console.log(d3.select(newCircle));
    // doOther();
}
// doOther = function(){
// d3.select(".otherClass")
//     .transition()
//     .duration(500)
//     .attr("opacity", function(d){ 
//         d3.select(this).classed("fixed", d.fixed = true)
//         whatis[0]=d.x;
//         whatis[1]=d.y;
//     });
// }
// if(whatis.length>0){
//     minK(whatis)
// }
// }


var kforce;
var kcircle, kpath, ktext;
// function kandelNodesBack(){
// newCircle
//     .transition()
//     .duration(500)
//     .attr("r", function(d){ 
//         p1 = [d.x, d.y, 1000];
//         console.log(d.x+"x"+d.y+"y")
//         return rMap(d.cites)/8;
//     })
//     .each("end", function(){
//             // zoomingTransition();    
//         d3.select(this)
//         .transition()
//         .duration(500)
//         .attr("r",radius)
//         .each("end", function(){
//             d3.select(this)
//             .transition()
//             .duration(500)
//             .attr("r",function(d){ 
//                 p2 = [d.x, d.y, 1000];                
//                 return rMap(d.cites)/8;
//             })
//             .each("end", function(){
//                 d3.select(this)
//                 .transition()
//                 .duration(500)
//                 .attr("class","otherClass")                
//                 .attr("transform",otherTransform)
//             })
//         })        
//     })
//     otherTransform = function (d,i){
//             d.y = h/10; //not links[i].cites
//             d.x = w/2-thisPaperName/2;
//             return "translate(" + d.x+ "," + d.y + ")";
//     }     

//     kforce.start();
// }
// function makeNewNodes(){
//     console.log("make new nodes")
// var links = [];

// for (i=0; i<thisData.length; i++){ 
//     for (j=0; j<uniqueMostKeyed.length; j++){ 
//         if (keywords[i].indexOf(uniqueMostKeyed[j])!=-1){
//             links.push({"source":keywords[i],"target":uniqueMostKeyed[j],"sourceTitle":thisData[i].Sourcetitle.toLowerCase(), "cites":parseInt(thisData[i].Cited), "headline":thisData[i].Title, "authors":thisData[i].Authors}) 
//     }
// }
// }
// console.log(links.length);
// // if(links.length==){ 
// populateNewNodes()
// // }

// function populateNewNodes(){
// if (showReset==true){
//     resetZoom();
// }
// var t = [1];
// // var thisPaperName = getTextWidth(thisText, "10px Helvetica Neue");  // reports 84

// var newLabel = vis.selectAll("newlabel")
//     .data(t)
//     .enter()
//     .append("text").attr("class","paperTitle")
//     .attr("x", w/2-thisPaperName/2)
//     .attr("y", h/6)
//     .attr("fill","gray")
//     .text("All papers that cite Kandel's, grouped by major keywords")

// console.log("populateNewNodes")
// var nodes = {};
// var drag;
// var kmaxNodeCited;  
// var knodeCited = [];

// // Compute the distinct nodes from the links.
// links.forEach(function(link) {
//     // console.log(link.source+link.target);
//   link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, cites:link.cites, sTitle:link.sourceTitle, headline:link.headline, authors:link.authors});
//   link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
// });
// var kTicked = false;
// kforce = d3.layout.force()
//     .nodes(d3.values(nodes))
//     .links(links)
//     .size([w, h])
//     .linkDistance(20)
//     .charge(-200)
//     .on("tick",ktick)
//     .start();
// console.log(nodes)
// drag = kforce.drag() 
//     .on("dragstart", dragstart);   

// // console.log(nodes)
// // console.log(links)

// var thisMap;
// var thisWeight = [];
// var maxWeight;
// var rMap; 
// var khowLong = [];

// kpath = vis.selectAll("kpath")
//     .data(kforce.links())
//     .enter().append("path")
//     .attr("class","klink") 
//     .attr("opacity",.1)
//     .attr("stroke", function(d,i){
//         // console.log(d);
//         for (k=0; k<uniqueTypes.length; k++){
//            if(d.sourceTitle==uniqueTypes[k]){
//                 return color(k);
//            }
//         }
//         if(howLong.length>0){
//         if(howLong[i][0].length==1){
//             return "white";
//         }        
//         }
//     })    
//     // .attr("fill","silver")

// kcircle = vis.selectAll("kcircle")
//     .data(kforce.nodes())
//     .enter().append("circle")
//     .attr("class","knode")  
//     .attr("r", function(d,i){
//         khowLong.push(d.name);
//         thisWeight.push(d.weight);
//         maxWeight = d3.max(thisWeight, function(d){ return d; })
//         rMap = d3.scale.linear()
//             .domain([0,maxWeight])
//             .range([radius, radius*9])  

//         return radius/10;
//     })
//     .attr("fill", function(d,i){

//         if(isNaN(parseInt(d.cites))){
//             knodeCited.push(0);
//         }
//         else {
//             knodeCited.push(parseInt(d.cites))
//         }
//         kmaxNodeCited = d3.max(knodeCited, function(d){ return d; })

//         for (k=0; k<uniqueTypes.length; k++){
//            if(d.sTitle==uniqueTypes[k]){
//                 return color(k);
//            }
//         }
//         if(khowLong.length>0){
//         if(khowLong[i][0].length==1){
//             return "white";
//         }        
//         }
//     })
//      .attr("stroke", function(d,i){
//         if(khowLong[i][0].length==1){
//             return "black";
//         } 
//         if(khowLong[i][0].length>1){
//             return "none";
//         }   
//     })   
//     .attr("stroke-width",.3)
//     .attr("opacity", function(d,i){
//         thisMap = d3.scale.linear()
//             .domain([0,kmaxNodeCited])
//             .range([.9, 1])  
//         return thisMap(knodeCited[i]);       
//     })

//     .on("dblclick", dblclick)
//     .call(drag);

//     kcircle
//         .transition()
//         .duration(2000)
//         .attr("r", function(d,i){
//             if(khowLong[i][0].length==1){
//                 return rMap(d.weight);
//             }
//             return radius;
//         });

//     function dblclick(d) {
//         d3.select(this).classed("fixed", d.fixed = false);
//     }
//     function dragstart(d) {
//         d3.select(this).classed("fixed", d.fixed = true);
//     }

// // text = svg.append("g").selectAll("text")
// ktext= vis.selectAll("ktext")
//     .data(kforce.nodes())
//     .enter().append("text")
//     .attr("class","kandellabels")
//     .attr("x", 8)
//     .attr("y", ".31em")
//     .text(function(d,i) {
//     if(khowLong.length>1){
//         if(khowLong[i][0].length==1){
//              return d.name;           
//         }        
//     } 
//     });


// $('circle').tipsy({
//     gravity: 'w', 
//     html: true, 
//     delayIn: 500, 
//     title: function() {

//         var d = this.__data__;  
//             console.log(d)
//         if (d.name[0].length==1){
//          return "Major Keyword: "+d.name;
//         }
//          return "Paper Keywords:"+'<br>'+d.name+'<br>'+'<br>'+"Title:"+ '<br>'+d.headline;
//     }
// });
// }
// exitK = function exitKandel(){
//     kforce.stop()
//     transitionKOut();    
// }

// function transitionKOut(){
//     console.log("k out")

//    kcircle.transition()
//     .duration(3000)
//     .attr("opacity",0)

//     // ktext
//     // .attr("opacity",0)

//     // kpath
//     // .transition()
//     // .duration(3000)    
//     // .attr("fill","none")
//     // .attr("stroke-opacity",.1)
    
//     // d3.selectAll(".paperTitle").attr("opacity",0)
    
// // }
// // function transitionKOut(){
// //     console.log("k out")

//    kcircle.transition()
//     .duration(4100)
//     .attr("transform", newTransform);

// //     ktext
// //     .attr("opacity",0)

//     kpath
//     .transition()
//     .duration(4000)    
//     .attr("d", linkArc)
    
// //     d3.selectAll(".paperTitle").attr("opacity",0)
    
//     function newTransform(d,i){
//             d.y = h; //not links[i].cites
//             return "translate(" + d.x+ "," + d.y + ")";
//     }    
// }

// minK = function minimizeK(whatis){

//     console.log("minK")
//     if (overallView==true){ //if big network is shown
//         kforce
//             .size([radius/2, radius/2]) //same parameters as kandel circle
//             .linkDistance(radius/4)
//             .charge(-1)
//             .on("tick",ktick)
//             .start();

//        kcircle
//             .transition()
//             .duration(4000)
//             .attr("r",radius/8)
//             .attr("cx", whatis[0])
//             .attr("cy",whatis[1])            
//             .attr("transform", minTransform)


//         kpath
//             .transition()
//             .duration(4000)
//             .attr("transform", "translate(" + (whatis[0]) + ","+(whatis[1])+")")
//             .attr("d", linkArc)

//     }
// //endoffunction
// }
// function mintick() {
//   kpath
//   .attr("d", linkArc);
//   kcircle
//   .attr("transform", minTransform)

//   // ktext
//   // .attr("transform", minTransform);
// }
// // // Use elliptical arc path segments to doubly-encode directionality.
// function ktick() {
//   kpath
//   .attr("d", linkArc);
//   kcircle
//   .attr("transform", transform);
//   ktext
//   .attr("transform", transform);
// }
// function minTransform(d) {
//   // d.x = w/4;
//   // d.y = h/2;      
//   return "translate(" + d.x+ "," + d.y + ")";
// }
// function transform(d) {
//   d.x =Math.max(radius, Math.min(w - radius, d.x));
//   d.y =Math.max(radius, Math.min(h - radius, d.y));      
//   return "translate(" + d.x+ "," + d.y + ")";
// }
// }













function stopBigNet(){
force.stop()
  circle.transition()
    .duration(2000)
    .attr("transform", newTransform)
     .each("end", function(){
        otherDone = true;  
       if(otherDone==true){
       kforce.start();
       otherDone = false;
   }               
    })    

    path
    .transition()
    .duration(2000)    
    .attr("d", linkArc);

// d3.selectAll(".otherClass")
//     .transition()
//     .duration(1000)
//     .attr("transform",otherTransform)

    function newTransform(d,i){
            d.y = h; //not links[i].cites
            return "translate(" + d.x+ "," + d.y + ")";
    } 

    // otherTransform = function (d,i){
    //         d.y = h/10; //not links[i].cites
    //         d.x = w/2-thisPaperName/2;
    //         return "translate(" + d.x+ "," + d.y + ")";
    // }         
}

















// $( document ).ready(function() {
svg.call(d3.behavior.zoom() //setting up zoom abilities
   .scale(1.0)
   .scaleExtent([initialZoom, maxZoom]) 
   .on("zoom", function(){
        var t = d3.event.translate;
        var s = d3.event.scale;     
        zoomInOut(t, s);
    })
);
var zoomInOut = function(t, s) {
        // console.log(t)
if (showReset==true){
    $('#reset').slideDown("slow");
}
if (showReset==false){
    $('#reset').slideUp("slow");
}
if (s>=initialZoom){
    showReset = true;
}
if (s<initialZoom){
    showReset = false;
}

  vis.attr("transform",
      "translate("+d3.event.translate+ ")"
      + " scale(" + d3.event.scale + ")");
};   

d3.select("#reset").on("click", resetZoom);

function resetZoom(){
console.log("reset viz")
vis.attr("transform",
      "translate("+ 0 + "," + 0 + ")"
      + " scale(" + initialZoom + ")");

    showReset = false;
    $('#reset').slideUp("slow");
};

 //don't let people zoom in all of these ways - will mess up clicks etcs
svg.on("mousedown.zoom", null)
    .on("touchstart.zoom", null)
    .on("touchmove.zoom", null)
    .on("dblclick.zoom", null)
    .on("touchend.zoom", null);   




function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}
