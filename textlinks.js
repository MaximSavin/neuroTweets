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
// var secLoad = -1;
// var secondLoadVar;
// var secondLoad = -1;
var padding = 35;
var padX = 100;

var loadTwo;
var secLoadVar;
var secLoad = 0;


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
var width = window.outerWidth;
var height = window.innerHeight-50;
var w = 1400; //window.outerWidth-50;
var h = 744; //window.innerHeight-50;

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
var amplitude = [];
var dx;
var yvalues = [];
var xspacing = 8;   // How far apart should each horizontal location be spaced
var maxwaves = 5;   // total # of waves to add together
var theta = 0.0;
var startAngle = 0;
var angleVel = 0.23;

var linkArc;
    // var term = "neuron";
    var term = "neuroscience";
    // var term2 = "brain"

var prepText;

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    // document.getElementById('txt').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},1);
}
function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
startTime();


svg = d3.select("#container")
    .append("svg")
    .attr({
      "width": w,
      "height": h,
        })
    // .attr("transform",
    //   "translate("+ width/4 + "," + 0 + ")");  
 var vis = svg //for the visualization
    .append('svg:g')
    .attr("transform",
      "translate("+ 0 + "," + 0 + ")");  
// loadData("allresponses.csv", .1)
// loadData("1000brainTweetsArchiver.csv", .1)
loadData("2088archiver.csv", .1)
// loadData("1849neuron.csv",.1)
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
for (i = 0;i<thisData.length; i++){ 

    if (thisData[i].BrainTweets!="undefined"){
        // var test = 
        tweets[i] = thisData[i].BrainTweets.replace(/&#?[a-z0-9]+;/gi,"");
        keywords[i] = thisData[i].BrainTweets.split(" ");
        // keywords[i].push(unkeywords.toLowerCase());
        }
} //generates an array of all Names
for (i = 0;i<thisData.length; i++){ 
        for (j=0; j<keywords[i].length; j++){
        theseKeywords.push(keywords[i][j]);   
        }
    }
var keywordSorted = false;
    for (i=0; i<theseKeywords.length; i++){ 
        if(theseKeywords[i].length==0){
              theseKeywords.splice(i,1)
        }
    }







var common = 'this,qlsvbntnyh,http,the, I,in,t,co,and,im,rt,shit,bitch,bitches, s, from,those,that, it, is, we, all, a, an, by, to, you, me, he, she, they, we, it, i, are, to, for, of';
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
// uniqueMostKeyed = focusKeywords.filter( onlyUnique ); //finds unique authors
uniqueMostKeyed = ["brain","Doctor","special","lord",
"neuroscience","golden","age","via","membuat","autism","science","synapses","children","extra","area","research","exercise","dean","burnett","motivation","responsible","arrived","discovered","human","psychology"]
// uniqueMostKeyed = ["motor","disease","otak","utk","ALS","ice","icebucketchallenge","challenge","bucket","selama","awareness"]
for (i = 0; i<uniqueMostKeyed.length; i++){
   totalK[i]= keyConsolidation(uniqueMostKeyed[i])
    uniqueKDone=true;   
}

// uniqueMostKeyed
// colorSpectrum = colorbrewer.Spectral[5];
// colorSpectrum = colorbrewer.BuGn[9];

// colorSpectrum = colorbrewer.YlGnBu[9];
colorSpectrum = colorbrewer.PuBu[9];
// colorSpectrum =[
// "#9ecae1"
// ,"#6baed6"
// ,"#4292c6"
// ,"#2171b5"
// ,"#08519c"
// ,"#08306b"
// ]
// colorSpectrum = [
// "#fc5988" 
// ,"#8675ee"
// ,"#fcb752"
// ,"#89e2fe"
// ]

color = d3.scale.ordinal()
    .domain([0, uniqueMostKeyed.length])
    .range(colorSpectrum);
    console.log(uniqueMostKeyed.length)
if(uncommonArr.length>0){
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
var textOne;
$( document ).ready(function() {

        // $("#titlename").toggle();  //show   
$("body").keypress(function(){
    (b+=1);
    // if (b==1){
    //     // force.stop();
    //     // randomOne = true;
    //     // if(randomOne){
    //     //     loadTime = 1;//500;
    //     // }
    //     // force.stop();
    //     // randomOne = true;
    //     // if(randomOne){
    //     //     loadTime = 1;//500;
    //     // }
    //     // loadOne();
    // }            
    if (b==1){
        force.stop();
        randomOne = true;
        randomTwo = false;
        // randomOne = false;
        // randomTwo = true;
        clearInterval(firstLoadVar); //and stop loading stuff in
        firstLoad = 0;
        if(randomOne){
            loadTime = 100;
        }
        if(randomTwo){
            loadTime = 100;
        }
        loadOne();
    }
    if (b==2){   
          clearInterval(firstLoadVar); //and stop loading stuff in
       concordNodes(); //setting up view
   }
   if(b==3){
    // pushDown(secLoad);
        loadTime = 8000;
        loadTwo(); //scrolling headlines
 
        // $("#titlename").toggle();  //show    

    }
    if(b==4){
       firstPrep = false;
        secondPrep = true;          
        clearInterval(secLoadVar); //and stop loading stuff in
        clearInterval(firstLoadVar);

          // clearInterval(firstLoadVar); //and stop loading stuff in
        returnNodes();   
        // simpleNodes();
        b=0;        
    }
    if(b==5){
        // force.();
        b=0;        
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

firstPrep = true;
    simpleNodes();
}

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
var specialWord = [];
var thisTweet = [];

function simpleNodes(){
console.log(links.length);
   
// Compute the distinct nodes from the links.
links.forEach(function(link) {
    // console.log(link.source+link.target);
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, headline:link.headline, split:link.split.join(" "), length:link.split.length});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([w, h])
    .linkDistance(100)
    .charge(-100)
    .on("tick", function(){
        if(firstPrep){
            tick();
        }
        if(secondPrep){
            ktick();
        }
    })
    .start();
// force = d3.layout.force()
//     .nodes(d3.values(nodes))
//     .links(links)
//     .charge(-300)
//     .linkDistance(20)
//     .size([w, h]);

//     force.start();
//     for (var i = n; i > 0; --i) 
//     force.on("tick", function(){
//         if(firstPrep){
//             tick();
//         }
//         if(secondPrep){
//             ktick();
//         }
//     });
//     force.stop();

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
    // .attr("stroke","gray")
    .attr("opacity",0)
    .attr("fill","none")

circle = vis.selectAll("node")
    .data(force.nodes())
    .enter().append("circle")
    .attr("class",function(d,i){
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
        return 0;
    })
    .attr("fill", function(d,i){
        for(j=0; j<uniqueMostKeyed.length; j++){
           if(d.name==uniqueMostKeyed[j]){
                majorNodes.push(i);
            }
        }
            return "none";
    })
    .on("dblclick", dblclick)
    .call(drag);

nodesLength = d3.selectAll(circle[0]).size()-majorNodes.length;
jump = (Math.PI*2)/nodesLength; 

    function dblclick(d) {
        d3.select(this).classed("fixed", d.fixed = false);
    }
    function dragstart(d) {
        d3.select(this).classed("fixed", d.fixed = true);
    }

console.log("simple nodes")

text = vis.selectAll("labels")
    .data(force.nodes())
    .enter().append("text")
    .attr("class",function(d,i){
        return "labels"+i;
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr("fill",function(d,i){  
        for (k=0; k<uniqueKeywords.length; k++){
            for(j=0; j<d.name.length; j++){
                if(d.name[j]==uniqueKeywords[k] && d.name.length>1){
                    return color(k);
                }
            }
        }
                return "white";
    })
    .attr("opacity",1)
    .text(function(d,i) {
        return d.split;
    });
if(secondPrep){
    for(i=0; i<links.length; i++){
        d3.selectAll(".labels"+i)
        .transition()
        .text(function(d,i){
            return specialWord[i];
        })
    }
}
   prepText = vis.selectAll("labels")
            .data(force.nodes())
            .enter().append("text")
                    .attr("class",function(d,i){ 
                       return "labelsP"+i; })

// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
      circle
      .attr("transform", transprep);
      text.attr("transform", transprep);
}
function transprep(d) {
  d.x = width-radius;
  d.y = Math.max(radius, Math.min(h - radius, d.y));   
  return "translate(" + d.x+ "," + d.y + ")";
}
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
linkArc = function(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
}



// var fisheye = d3.fisheye.circular()
//       .radius(120);
//     svg.on("mouseover", function() {
//         force.stop();
//       // fisheye.focus(d3.mouse(this));
//       fisheye.focus([w/2, h/2]);

//       // circle.each(function(d) { d.fisheye = fisheye(d); })
//       //     .attr("cx", function(d) { return d.fisheye.x; })
//       //     .attr("cy", function(d) { return d.fisheye.y; })
//       //     .attr("r", function(d) { return d.fisheye.z * radius; });

//       text.each(function(d) { d.fisheye = fisheye(d); })
//           .attr("x", function(d) { return d.fisheye.x; })
//           .attr("y", function(d) { return d.fisheye.y; })
//           .attr("font-size", function(d) { return d.fisheye.z * 10+"pt"; });

//       // path
//       // .attr("d", changeArc);

//       // function changeArc(d){
//       //   // console.log(fisheye(d))
//       //   var dx = d.target.fisheye.x - d.source.fisheye.x,
//       //       dy = d.target.fisheye.y - d.source.fisheye.y,
//       //       dr = Math.sqrt(dx * dx + dy * dy);    
//       //       // console.log(dr+"inside changeArc");   
//       //   return "M" + d.source.fisheye.x + "," + d.source.fisheye.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.fisheye.x + "," + d.target.fisheye.y;     
//       // }  
        

//     });

var textSpecial;
concordNodes = function(){
var chunks1=[];
var chunks2 = [];
    console.log("concordNodes")

        for(var i=0; i<tweets.length; i++) {
            
        if(typeof(tweets[i]) == 'undefined')
            return;
//length can be 80 if using 14pt
//
            if(tweets[i].length>0){
            thisTweet[i] = tweets[i].split(" ");
            chunks[i] = tweets[i].split(term);
            if(chunks[i][0]!=null&&chunks[i][0].length<=70&&chunks[i][1]!=null&&chunks[i][1].length<=70){
               chunks1.push(lastNChars(70, chunks[i][0]));             
               chunks2.push(firstNChars(70, chunks[i][1]));             
            } else{}
        }
    }
    console.log(chunks2.length)
    console.log(chunks1.length)

for(i=0; i<links.length; i++){

       d3.selectAll(".labels"+i)
       .attr("y",0)
       .transition()
       .duration(2000)
       .attr("opacity",1)
        // .text(term)
        .attr("text-anchor","middle")
        .attr("transform", transAgain)
        .each("end", function(){
            d3.select(this)
            .transition()
            .duration(500)
            .attr("opacity",0)
        })

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
        // THIS IS THE LIVE FUNCTION
        var textBrain = vis.selectAll("label")
            .data(chunks1)
            .enter().append("text")
            .attr("class",function(d,i){ 
               return "brain"+i; })
            .attr("x", w/2)           
            .attr("y", function(d,i){
                return i*40;
            })
            .attr("text-anchor","middle")
            .attr("font-size","18px")
            .attr("opacity",0)
            .attr("fill",function(d,i){  
                for (k=0; k<uniqueKeywords.length; k++){
                    for(j=0; j<thisTweet[i].length; j++){
                        if(thisTweet[i][j]==uniqueKeywords[k]){
                            return color(k);
                        }
                        else{
                            return "white";
                        }
                    }
                }
            })
            .transition()
            .delay(1900)
            .duration(500)
            .attr("opacity",1)
            .text(term)

// console.log(specialWord)
           textOne = vis.selectAll("label")
            .data(chunks1)
            .enter().append("text")
            .attr("class",function(d,i){
                return "prefix"+i; })
            .attr("x", function(d,i){
                if(d[0]==null){
                    return 0;
                }else{
                return w/2-getTextWidth(term)*1.3;
                }
            })
            .attr("y", function(d,i){
                return i*40;
            })
            .attr("text-anchor","end")
            .attr("font-size","18px")
            .attr("opacity",1)
            .attr("fill",function(d,i){  
                for (k=0; k<uniqueKeywords.length; k++){
                    for(j=0; j<thisTweet[i].length; j++){
                        if(thisTweet[i][j]==uniqueKeywords[k]){
                            return color(k);
                        }
                    }
                }
                return "white";
            })
            .text(function(d,i){
                return d;
            })     

            var textTwo = vis.selectAll("label")
            .data(chunks2)
            .enter().append("text")
            .attr("class",function(d,i){ 
                return "suffix"+i;
            })
            .attr("text-anchor","start")
            .attr("x",function(d,i){
                return w/2+getTextWidth(term)*1.3; //+getTextWidth(d[1]);//getTextWidth(term)*2; //getTextWidth(d[1])
            })
            .attr("y", function(d,i){
                return i*40;

            })
            .attr("fill",function(d,i){  
                for (k=0; k<uniqueKeywords.length; k++){
                    for(j=0; j<thisTweet[i].length; j++){
                        if(thisTweet[i][j]==uniqueKeywords[k]){
                            return color(k);
                        }
                    }
                }
                return "white";
            })
            .attr("opacity",1)
            .attr("font-size","18px")
            .text(function(d,i){
                return d;
            })







                  var specialX = d3.scale.linear()
                    .domain([0, specialWord.length])
                    .range([0, w]); 
}

//THIS IS THE FUNCTION FOR SCROLLING CONCORDED VIEW
loadTwo = function(){
    secLoadVar = setInterval(function(){ 
    console.log("in here")
    // if (firstLoad<=links.length){
    // if (secLoad<=tweets.length){
    // if (chunks.length*40/h>secLoad){
        if(secLoad<=17){
        console.log(secLoad)   
                secLoad = secLoad+1;      
                pushDown(secLoad); 
        }
        else {
          clearInterval(secLoadVar); //and stop loading stuff in
        }
    },loadTime)
} 

 var fontMap = d3.scale.linear()
  .domain([0,17])
  .range([12, 24])

function pushDown(secLoad){
 for (j=0; j<secLoad*40; j++){

        d3.selectAll(".prefix"+j).attr("transform",null)
        .transition()
          .duration(loadTime/2)
          .ease("linear")
         // .attr("font-size", function(d,i){
         //    var heightNow = d3.select(this).y
         //      return fontMap(heightNow)+"pt";
         //  })
          .attr("transform", function(d,i){
                    // return "translate(0," + (-28) + ")"
                return "translate(0," + (-h*secLoad) + ")"
        })

        d3.selectAll(".suffix"+j).attr("transform",null)
        .transition()
          .duration(loadTime/2)
          .ease("linear")
          .attr("transform", function(d,i){
                // d.y = -h*secLoad;
                // console.log(d3.select(this).y)
                return "translate(0," + (-h*secLoad) + ")"
                // return "translate(0," + (-28) + ")"
        })


      d3.selectAll(".brain"+j)
       .transition()
       .duration(loadTime/10)
        .ease("linear")
       .attr("x",w/2)
          .attr("transform", function(d,i){
                return "translate(0," + (-h*secLoad) + ")"
        })

        // d3.selectAll(".special"+j)
        //             .transition()
        //             .duration(loadTime/10)
        //             .attr("opacity",1)
        //             .transition()
        //             .duration(loadTime)
        //             .ease("linear")
        //             .attr("font-size", 24*(Math.sqrt(s+1))+"pt")
        //             // .attr("y",0)
        //             .each("end", function(){
        //                 d3.select(this)
        //                 .transition()
        //                 .duration(loadTime/3)
        //             .ease("linear")
        //             .attr("font-size", 24/(Math.sqrt(s+1))+"pt")//24/(j/13)+"pt")
        //                 .attr("opacity",0)
        //             })
    }
}


        // .each("end", function(){
        //     if(secLoad<chunks.length){
        //     pushDown(secLoad+1)
        //     } else{}
        // });
        // d3.selectAll(".prefix"+i).attr("transform",null)
        // .transition()
        //   .duration(20000)
        //   .ease("linear")
        //   .attr("transform", function(d){
        //     return "translate(0," + (-h*17) + ")"
        // })       
      










  // push a new data point onto the back
  // chunks.push(chunks[secLoad]);

 // d3.selectAll(".prefix"+secLoad-1)
 //      .attr("transform", null)
 //    .transition()
 //      .duration(500)
 //      .ease("linear")
 //      .attr("transform", "translate(0," + y(-18) + ")")
  // redraw the line, and slide it to the left


//kindaworks
      // for (i=0; i<secLoad; i++){
      //   d3.selectAll(".prefix"+i)
      //   .transition()
      //     .duration(500)
      //     .ease("linear")
      //     .attr("transform", function(d){
      //       return "translate(0," + y(-18) + ")"
      //   })         
      // }
  // d3.selectAll(".prefix"+secLoad)
  //     .attr("transform", null)
  //   .transition()
  //     .duration(500)
  //     .ease("linear")
  //     .attr("transform", "translate(0," + y(-18) + ")")
  //     .each("end", function(){
  //       if(secLoad<chunks.length){
  //       pushDown(secLoad+1)
  //       } else{}
  //   });

// var onebefore = secLoad-1;
//     if(onebefore>0){
//         d3.selectAll(".prefix"+onebefore)
//           // .attr("transform", null)
//         .transition()
//           .duration(500)
//           .ease("linear")
//           .attr("transform", "translate(0," + y(-18) + ")")    
//   }
// }
 // for(j=0; j<chunks.length; j++){     
 //  d3.selectAll(".prefix"+j)
 //    .transition()
 //      .duration(500)
 //      .ease("linear")
 //      .attr("transform", function(d,i){
 //        if(i<secLoad){
 //            return "translate(0," + y(-18) + ")"
 //        }else{ return null }
 //        })
 //    }
 
  // pop the old data point off the front
  // chunks.shift();





// for (i=0; i<chunks.length; i++){
//     d3.selectAll(".prefix"+i)
//     .transition()
//     .attr("y", function(d,i){
//         if(i!=secLoad){
//             return i*50;
//         }
//         else{
//             return 40;
//         }
//     })
// }

// if(secLoad*40>h){
//     var onebefore = secLoad;
//             d3.selectAll(".prefix"+onebefore)
//             .transition()
//             .duration(loadTime).attr("y",.1);
//             }   
// }

  // var map = d3.scale.linear()
  // .domain([0,chunks.length])
  // .range([0,h])
    // d3.selectAll(".prefix"+secLoad)
    // .transition()
    // .attr("y", function(d,i){
    //     return map(secLoad);
    // })

// for(i=0; i<chunks.length; i++){
//     d3.selectAll(".prefix"+i)
//     .transition()
//     .attr("y", function(d){
//         return i*40;
//     })
// }
//     d3.selectAll(".prefix"+secLoad)
//     .transition()
//     .attr("y", 10)




loadOne = function(){
    console.log("in here")
    firstLoadVar = setInterval(function(){ 
    if (firstLoad<=links.length){
    // if (firstLoad<=30){
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
function transOne(d) {
  var map = d3.scale.linear()
  .domain([0,60])
  .range([w,50])
    d.x=map(s)+subradius*Math.cos(jump*2*firstLoad); //subradius*1.1
    d.y=h/2+subradius*Math.sin(jump*firstLoad*10);     //doing subrad*2 makes the amp bigger
      return "translate(" + d.x+ "," + d.y + ")";
    // d.x=map(s)+subradius*1.2*Math.cos(jump*2*firstLoad);
    // d.y=h/2+subradius*Math.sin(jump*firstLoad*4);     //doing subrad*2 makes the amp bigger
    //   return "translate(" + d.x+ "," + d.y + ")";
}
function transThru(d) {
    d.y = Math.max(radius, Math.min(h - radius, d.y));      
    d.x = -w;
  // var map = d3.scale.linear()
  // .domain([0,links.length])
  // .range([w,-w])
  //   d.x=map(firstLoad);
  //   d.y =Math.max(radius, Math.min(h - radius, d.y));      
      return "translate(" + d.x+ "," + d.y + ")";
}

//full circle
// function transNew(d) {
//     d.x=w/2+subradius*Math.cos(jump*firstLoad);
//     d.y=h/2+subradius*Math.sin(jump*firstLoad);     
//       return "translate(" + d.x+ "," + d.y + ")";
// }
// }
function transNew(d) {
  var map = d3.scale.linear()
  .domain([0,60])
  .range([w,50])
    d.x=map(s)+firstLoad;
    d.y =Math.max(radius, Math.min(h - radius, d.y));      
      return "translate(" + d.x+ "," + d.y + ")";
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

            d3.selectAll(".labelsP"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform", transOne);

            var onebefore = firstLoad-20;
            if(onebefore>=0){
            d3.selectAll(".labels"+onebefore)
            .transition()
            .duration(loadTime).attr("opacity",.1);

            d3.selectAll(".labelsP"+onebefore)
            .transition()
            .duration(loadTime).attr("opacity",.1);
            }
   




            d3.selectAll(".link"+firstLoad)
            .transition()
            .duration(loadTime).attr("d", linkArc);
       }
   // }
        // tickTwo = function(){
        if(randomTwo){
            // console.log("randomTwo")
             d3.selectAll(".node"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform",transNew);
            
            d3.selectAll(".labels"+firstLoad)
            .transition()
            .duration(loadTime)
            .attr("opacity",1);

            d3.selectAll(".labels"+firstLoad)
            .transition()
            .duration(loadTime).attr("transform", transNew)

 // var twobefore = firstLoad-40;
 //            if(twobefore>0){
 //            d3.selectAll(".labels"+twobefore)
 //            .transition()
 //            .duration(loadTime).attr("opacity",.4)
 //            .each("end", function(){
 //                d3.select(this)
 //                .transition()
 //                .duration(10000)
 //                .attr("transform",function(d){
 //                    d.x = -w;
 //                    d.y = Math.max(radius, Math.min(h - radius, d.y));      
 //                    return "translate(" + d.x+ "," + d.y + ")";
 //                })
 //            })
 //        }
            d3.selectAll(".link"+firstLoad)
            .transition()
            .duration(loadTime/2).attr("d", linkArc);
       }
    }
}
}






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
    for (i=0; i<chunks.length; i++){
                  d3.selectAll(".suffix"+i)
                    .transition()
                    .duration(2000)
                    .attr("opacity", 0) 
                d3.selectAll(".prefix"+i)
                    .transition()
                    .duration(2000)
                    .attr("opacity", 0)       
                d3.selectAll(".brain"+i)
                    .transition()
                    .duration(2000)
                    .attr("opacity", 0)      
    }
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
    // .attr("font-size", function(d,i){
    //         for(k=0; k<majorNodes.length; k++){
    //             if(i==k){ 
    //                 return "24pt";
    //             }else{
    //                 return "14pt";
    //             }
    //         }
    // })
    .transition()
    .duration(2000)
    .attr("opacity",1)
    .each("end", function(){
        force.start();
    })
}  
}







// returnNodes = function(){
//     console.log("return nodes")
//     for (i=0; i<chunks.length; i++){
//                   d3.selectAll(".suffix"+i)
//                     .transition()
//                     .duration(2000)
//                     .attr("opacity", .1) 
//                 d3.selectAll(".prefix"+i)
//                     .transition()
//                     .duration(2000)
//                     .attr("opacity", .1)       
//                 d3.selectAll(".brain"+i)
//                     .transition()
//                     .duration(2000)
//                     .attr("opacity", .1)      
//     }

//    force.start();
//    text
//    .transition()
//    .duration(1000)
//     .text(function(d,i) {
//         return specialWord[i];
//     }) 
//     .transition()
//     .duration(2000)
//     .each("end", function(){
//         force.start();
//     })   
// }
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


loadIt = function(whichcsv){
    force.stop();
console.log("loading")
loadData(whichcsv, .3);       
}

function nodesBack(){
    force.start();
    overallView=true;
}


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

    function newTransform(d,i){
            d.y = h; //not links[i].cites
            return "translate(" + d.x+ "," + d.y + ")";
    } 
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





