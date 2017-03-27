window.onload=initPage;
step=0;
time=new Date();

function initPage(){
   timeCul();
   alert("Hello,welcome to my jigsaw puzzle!");
   var table=document.getElementById("puzzleGrid");
   var tds=table.getElementsByTagName("td");
   for(var i=0;i<tds.length;i++){
       var td=tds[i];
       td.onclick=imageClick;  //点击图片交换图片
   }
}
function imageClick(){
   // alert("you are in imageclick function");
    if(IsCellEmpty(this)){
        alert("Please click a numbered image");
        return;
    }
    var row=this.id.charAt(4);
    var column=this.id.charAt(5);
    // alert(row+column);
    if(row>1){
        var testrow=parseInt(row)-1;            
        var testId="cell"+testrow+column;
        // alert(testId+"....");
        var testCell=document.getElementById(testId);
        if(IsCellEmpty(testCell)){
            swapImage(this,testCell);
            stepCul();
            return;
        }
    }
    if(row<4){
        var testrow=parseInt(row)+1;
        var testId="cell"+testrow+column;
        //  alert(testId+"....");
        var testCell=document.getElementById(testId);
        if(IsCellEmpty(testCell)){
            swapImage(this,testCell);
            stepCul();
            return;
        }
    }
    if(column>1){
        var testcolumn=parseInt(column)-1;
        var testId="cell"+row+testcolumn;
        //  alert(testId+"....");
        var testCell=document.getElementById(testId);
        if(IsCellEmpty(testCell)){
            swapImage(this,testCell);
            stepCul();
            return;
        }
    }
    if(column<4){
        var testcolumn=parseInt(column)+1;
        var testId="cell"+row+testcolumn;
        //  alert(testId+"....");
        var testCell=document.getElementById(testId);
        if(IsCellEmpty(testCell)){
            swapImage(this,testCell);
            stepCul();
            return;
        }
    }
    alert("Please click a image next to a empty image!");
}    
function stepCul(){
    step++;
    document.getElementById("steps").innerHTML="steps:"+step;
}
function timeCul(){
     
    var timeNow=new Date();
    var timeUse=(timeNow.getTime()-time.getTime())/1000;
    document.getElementById("time").innerHTML="time:"+parseInt(timeUse)+"s";
    setTimeout('timeCul()',1000);
}

//判断是否点击空格
function IsCellEmpty(cell){
    //alert("you are in IsCellEmpty function");
    var isEmpty=cell.firstChild;
    // if(isEmpty==null){
    //     return false;
    // }
   
    while(isEmpty.nodeName=="#text"){
         isEmpty=isEmpty.nextSibling;
    }
    //  if(isEmpty==null){
    //     return false;
    // }
    
    //alert(isEmpty.src);
    if(isEmpty.alt=="empty"){
        return true;
    }
    else
        return false;
}

function swapImage(selectedCell,destinationCell){
  //  alert("you are in swapImage function");
    selectedImage=selectedCell.firstChild;
    while(selectedImage.nodeName=="#text"){
        selectedImage=selectedImage.nextSibling;
    }
    destinationImage=destinationCell.firstChild;
    while(destinationImage.nodeName=="#text"){
        destinationImage=destinationImage.nextSibling;
    }
 
    destinationCell.appendChild(selectedImage);
    selectedCell.appendChild(destinationImage);

    isSuccess();
}


function isSuccess(){
  //  alert("you are in isSuccess function");
    var images=document.getElementById("puzzleGrid").getElementsByTagName("img");
    var finalOrder="";
    var order="";
    for(var i=0;i<images.length;i++){
        order=images[i].src.substr(-6,2);
        if(order!="ty"){
            finalOrder+=order;
        }
    }
    if(finalOrder=="010203040506070809101112131415"){
        documen.getElementById("puzzleGrid").className="win";
        alert("Congratulations!You succeed!");
    }
}