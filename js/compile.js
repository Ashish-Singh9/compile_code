const button=document.getElementById("compile");
const langCode=document.getElementById("lang-code");
const out=document.getElementById("output");
var loader;
//adding event listner to button
button.addEventListener("click",function(){
    
    out.innerHTML="OUTPUT:";
    
    out.classList.add("loadFlex");
    loader=document.createElement("div")
    loader.classList.add("loader");
    out.append(loader);
    var lang=langCode.value;
    var code1=getCodeForComp();
    var a={code:code1,langId:lang};
    console.log(code1);
    var jsonobj=JSON.stringify(a);
    console.log(jsonobj);
  
    var request = new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");

    request.setRequestHeader("Content-Type", "application/json");

    request.send(jsonobj);
    request.addEventListener("load", function(event)
    {
      const data = JSON.parse(event.target.responseText);

      console.log(data);
      setTimeout(function(){ 
        console.log("hello"+a);
        getReq(data);
       }, 5000);
    })
});
  function getReq(data){
    out.classList.remove("loadFlex");
    loader.remove();
  const codeId_=data.codeId;
  console.log(data.error);
  if(data.error!='Code is null')
  {
    var request = new XMLHttpRequest();

    request.open("GET",`https://codequotient.com/api/codeResult/${codeId_}`);
  
    request.send();

    request.addEventListener("load", function(event)
    {
      const d = JSON.parse(event.target.responseText);
      const dq=JSON.parse(d.data);
      console.log(dq);
      //out.style.backgroundColor="white";
      if(dq.output)
      out.innerHTML=dq.output;
      else
      {
        
        out.innerHTML=dq.errors;
      }
      console.log(event.target.responseText);
    })
  }
  else
  {
    
    out.innerHTML+=` ${data.error}`;
  }
}
