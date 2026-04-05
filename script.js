// LOGIN SYSTEM
function login(){
    let username = document.getElementById("username").value;

    if(username === ""){
        alert("Enter username");
        return;
    }

    localStorage.setItem("user", username);
    window.location.href = "index.html";
}

// LOGOUT
function logout(){
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// CHECK LOGIN
window.onload = function(){

    let user = localStorage.getItem("user");

    // Redirect if not logged in
    if(!user && !window.location.href.includes("login.html")){
        window.location.href = "login.html";
    }

    // Show username
    let welcome = document.getElementById("welcome");
    if(welcome && user){
        welcome.innerText = "Welcome, " + user;
    }

    // GRAPH
    let ctx = document.getElementById("myChart");
    if(ctx){
        let data = JSON.parse(localStorage.getItem("usage")) || [120,150,180];

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Data1","Data2","Data3","Data4","Data5"],
                datasets: [{
                    label: "Energy Usage",
                    data: data,
                    borderWidth: 2
                }]
            }
        });

        // HISTORY
        let history = document.getElementById("history");
        if(history){
            data.forEach(d => {
                let li = document.createElement("li");
                li.innerText = d + " units";
                history.appendChild(li);
            });
        }
    }
}

// BILL CALCULATION + SAVE DATA
function calculateBill(){
    let units = document.getElementById("units").value;

    if(units === "" || units <= 0){
        alert("Enter valid units");
        return;
    }

    let bill = units * 5;

    document.getElementById("result").innerText = "Bill: ₹" + bill;

    // SAVE DATA
    let usage = JSON.parse(localStorage.getItem("usage")) || [];
    usage.push(units);
    localStorage.setItem("usage", JSON.stringify(usage));
}