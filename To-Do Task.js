if (!localStorage.getItem("userId")) {
  // window.location.href = "to-do list";
  navigateTologgedIn();
}

let arr = [];
let nameArry = {};
let userId = 0;

document.addEventListener("DOMContentLoaded", function () {
  userId = localStorage.getItem("userId");

  if (localStorage.getItem("nameArray")) {
    nameArry = JSON.parse(localStorage.getItem("nameArray"));
    arr = nameArry[userId] ? nameArry[userId] : [];
    renderNames();
  };
});

function validInput() {
  // let element =$("#demo"); 
  let input = document.getElementById("myInput");
  let len = nameArry[userId] ? nameArry[userId] : [];
  let demo = input.value;
  arr.push(input.value);
  addName(demo, len.length - 1);
  storeNames();
  input.value = "";
  console.log(demo);
};


function renderNames() { //todo box
  let values = "";
  arr.forEach((name, index) => {
    values += `
              <div class="todo-item-footer">
                  <button>${name}</button>
                 </div> 
                 <div class = "add">
                 <button id="edit"value="EDIT" onclick="editFunction('${name}', ${index})">EDIT</button>
                 </div>
                 <div class= "remove">        
                <button id="remove"value="REMOVE" onclick="removeFunction(${index})">REMOVE</button>
                  </div>      
        `;
  });

  $("#todoSection").html(values);
}

function addName(name) {
  let len = nameArry[userId] ? nameArry[userId] : [];

  $("#todoSection").append(` <div class="todo-item-footer">
                       <button>${name}</button>
                       </div> 
                       <div class = "add">
                       <button id="edit"value="EDIT" onclick="editFunction('${name}', ${len.length -1})">EDIT</button>
                       </div>
                       <div class= "remove">        
                       <button id="remove"value="REMOVE" onclick="removeFunction(${len.length -1})">REMOVE</button>
                    </div>  
`);
};

function editFunction(text, index) {
  $("#myInput").val(text);
  $("#demo1").html("Edit");
  $("#demo1").attr("onclick", `editSubmit(${index})`);
}

function editSubmit(index) {
  console.log(index);
  var demo = $("#myInput").val();
  console.log(arr);
  arr[index] = demo;
  $("#myInput").val("");
  $("#demo1").html("Add");
  $("#demo1").attr("onclick", `validInput()`);
  storeNames();
  renderNames();
}

function removeFunction(index) {
  console.log(index);
  arr.splice(index, 1);
  $("#myInput").val("");
  $("#demo1").html("Add");
  storeNames();
  renderNames();
};

function storeNames() {
  nameArry[userId] = arr;
  localStorage.setItem("nameArray", JSON.stringify(nameArry));
}

function logout() {
  localStorage.removeItem("userId");
  // window.location.href = "weblive1.html";
  navigateTologgedIn();
}

function navigateTologgedIn() {
  let domain = window.location.href.split("/").slice(0, 5).join("/");
  location.replace(`${domain}/weblive1.html`);
}

function password() {
  $("#myForm").show();
}

function changepass() {
  var curp = $("#curpass").val();
  var newp = $("#newpass").val();
  var confp = $("#confpass").val();
  let iscurp = false;
  let isnewp = false;
  let isconfp = false;

  const userId = localStorage.getItem("userId");
  // Validate current password
  const loggedInUser = getCurrentUser();
  if (loggedInUser && curp === loggedInUser.password) {
    $("#error1").html("");
    iscurp = true;
  } else {
    $("#error1").html("Incorrect current password");
    iscurp = false;
  }
  // Validate new password
  if (newp == "") {
    $("#error2").html("Please fill the new password field");
    isnewp = false;
  } else {
    $("#error2").html("");
    isnewp = true;
  }

  // Validate confirm password
  if (confp == "") {
    $("#error3").html("Please fill the confirm password field");
    isconfp = false;
  } else {
    $("#error3").html("");
    isconfp = true;
  }

  // Check if new password and confirm password match
  if (isnewp && isconfp && newp !== confp) {
    $("#error3").html("New password and confirm password do not match");
    isconfp = false;
  }
  if (iscurp && isnewp && isconfp) {
    loggedInUser.password = newp;
    storeNames();
    // Update old password in local storage
    const users = JSON.parse(localStorage.getItem("input"));
    const userIndex = users.findIndex(user => user.id === parseInt(userId));
    if (userIndex !== -1) {
      users[userIndex].password = newp;
      localStorage.setItem("input", JSON.stringify(users));
    }
    alert("Password changed successfully!");
    $("#signPassword").attr("onclick", `editSubmit('${userId}')`);
    window.location.href = "weblive1.html";
  }

  function getCurrentUser() {
    const loggedInUserId = localStorage.getItem("userId");
    if (loggedInUserId && localStorage.getItem("input")) {
      const users = JSON.parse(localStorage.getItem("input"));
      return users.find(user => user.id === parseInt(loggedInUserId));
    }
    return null;
  };
};