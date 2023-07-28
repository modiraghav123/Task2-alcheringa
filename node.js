fetch("https://www.coursehubiitg.in/api/codingweek/contributions")
.then((data) =>
  {
    return data.json();//converted to object  
  }).then((objectData)=>{
    console.log(objectData);
    var l=objectData.length;
    var point=[],names=[];
    var i=l-1;
    while(i>3)
    {
    var element =document.getElementById("clone");
    var clone1=element.cloneNode(true);
    clone1.id="clone"+i ;
    element.after(clone1);
    i=i-1;
  }
   
    for(var i=0;i<l;++i)
    {
        point[i]=objectData[i].points;
        names[i]=objectData[i].name;
    }
    for(var i=0;i<l;i++)
    {
        for(var j=0;j<(l-1-i);j++)
        {
            if(point[j+1]>point[j])
            {
                var t=point[j+1];
                point[j+1]=point[j];
                point[j]=t;
                var t1=names[j+1];
                names[j+1]=names[j];
                names[j]=t1;
            }
        }
        
    }
                var t=point[1];
                point[1]=point[0];
                point[0]=t;
                var t1=names[1];
                names[1]=names[0];
                names[0]=t1;
    console.log(point);
    console.log(names);
    for(var i=0;i<l;i++)
    {
        console.log(document.getElementsByClassName("name")[i].innerHTML=names[i]);
        console.log(document.getElementsByClassName("points")[i].innerHTML=point[i]);
        console.log(document.getElementsByTagName("img")[i].src=objectData[i].avatar);
        if(i>3){
            var x="clone"+i;
            console.log(i);
            var h2Element = document.getElementById(x).querySelector("h2.rank");
            h2Element.innerHTML = (i+1);  
        }
    }
    
    
   
}).catch((err)=>{
    console.log(err);
})
 
 