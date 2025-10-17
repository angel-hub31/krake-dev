let votosMinecraft=0;
let votosRoblox=0;

sumarLikeMinecraft=function(){
    votosMinecraft++;
    document.getElementById("lblMinecraft").innerText=votosMinecraft;
    
}
sumarCorazonMinecraft=function(){
    votosMinecraft=votosMinecraft+5;
    document.getElementById("lblMinecraft").innerText=votosMinecraft;
    
}
restarLikeMinecraft=function(){
    votosMinecraft--;
    document.getElementById("lblMinecraft").innerText=votosMinecraft;
  
}
sumarLikeRoblox=function(){
    votosRoblox++;
    document.getElementById("lblRoblox").innerText=votosRoblox;
   
}
sumarCorazonRoblox=function(){
    votosRoblox=votosRoblox+5;
    document.getElementById("lblRoblox").innerText=votosRoblox;
   
}
restarLikeRoblox=function(){
    votosRoblox--;
    document.getElementById("lblRoblox").innerText=votosRoblox;
  
}