
function closeModal(){
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
}
function storeNick(){
    var nick = document.getElementById('nickname').value;
    localStorage['Nickname'] = JSON.stringify(nick);
    closeModal();
    // console.log("closed modal " + nick);
}
var count = 1;
function printMsg(e){    // callback function.
    var msgs = e.target.responseText;
    var msgs = JSON.parse(msgs); 
    if(count <= msgs.length){
        var newMsg = msgs[msgs.length-1];
        var msg = newMsg["message"];
        var name = newMsg["username"];
        var ul = document.getElementById('msgList');
        var li = document.createElement("li");
        li.setAttribute("class", "messege");
        var pUser = document.createElement("p");
        var pMsg = document.createElement("p");
        pUser.setAttribute("class", "user");
        pMsg.setAttribute("class", "userMsg");
        pUser.innerHTML = name;
        pMsg.innerHTML = msg;
        li.appendChild(pUser);
        li.appendChild(pMsg);
        ul.appendChild(li);
        document.getElementById('input').value = "";
        count++;
        updateScroll();
    }
    
}
function updateScroll(){
    var element = document.getElementById("scrollbar");
    element.scrollTop = element.scrollHeight;
}


function sendMsg(){
    var msg = document.getElementById('input').value;
    var name = JSON.parse(localStorage['Nickname']);
    var totMsg = {"username": name, "message": msg};
    // var ul = document.getElementById('msgList');
    // var li = document.createElement("li");
    // li.setAttribute("class", "messege");
    // var pUser = document.createElement("p");
    // var pMsg = document.createElement("p");
    // pUser.setAttribute("class", "user");
    // pMsg.setAttribute("class", "userMsg");
    // pUser.innerHTML = name;
    // pMsg.innerHTML = msg;
    // li.appendChild(pUser);
    // li.appendChild(pMsg);
    // var data = "hello servert"//JSON.stringify(li);
    postMessage(totMsg,printMsg);
}


function postMessage(data,callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/messages",true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener('load', function(e) {
        
        callback(e);
    });
    xhr.send(JSON.stringify(data));
}

