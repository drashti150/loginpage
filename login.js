// if (localStorage.getItem("userId")) {
//     // window.location.href = "to-do list";
//     window.location.href = "loginTodo.html";
//   }

let names = [];
let userId = 0;
let users = localStorage.getItem("input");
if (users) {
    users = JSON.parse(users);
}

$(document).ready(function () {
    $("#login1").click(function () {
        $(".login").show();
        $(".signup").hide();
    });

    $("#signup1").click(function () {
        $(".signup").show();
        $(".login").hide();
    });
});
$("#forpass").click(function () {
    $(".card").show();
    $(".box").hide();
});
$("#sendEmail").click(function () {
    $(".container").show();
    $(".card").hide();

});
$("#verify").click(function () {
    $("#myForm").show();
    $(".container").hide();
});
$(".btn").click(function () {
    $("#.box").show();
    $("#myForm").hide();
});


function validateLoginForm() {
    var mail1 = $("#logEmail").val();
    var password1 = $("#logPassword").val();
    let ismail1 = false;
    let ispassword1 = false;

    if (mail1 == "") {
        $("#msg").html("Please fill the email fields");
        ismail1 = false;
    } else {
        $("#msg").html("");
        ismail1 = true;
    }

    if (password1 == "") {
        $("#msg1").html("Please fill the password fields");
        ispassword1 = false;
    } else {
        if (password1.length < 4) {
            $("#msg1").html("Password should be at least 4 characters long.");
            ispassword1 = false;
        } else
            $("#msg1").html("");
        ispassword1 = true;
    }


    if (ismail1 && ispassword1) {
        // Check if the user is registered
        let user = getUser(mail1, password1);
        console.log(user);
        if (user) {
            localStorage.setItem("userId", user["id"]);
            alert("Login Successfully!", user.id);
            // window.location.href = "loginTodo.html";
        } else {
            alert("Invalid Email or Password.");
        };
    };
};

function getUser(email, password) {
    if (localStorage.getItem("input")) {
        var users = JSON.parse(localStorage.getItem("input"));
        for (var i = 0; i < users.length; i++) {
            if (email === users[i].email && password === users[i].password) {
                return users[i];
            };
        };
    };
    return null;
};

function validateSignupForm() {
    var name1 = $("#signFName").val();
    var name2 = $("#signLName").val();
    var mail = $("#signEmail").val();
    var password = $("#signPassword").val();
    let isname1 = isname2 = ismail = ispassword = false;

    if (name1 == "") {
        $("#errorMsg").html("Please fill the Firstname fields")
        isname1 = false;
    } else {
        $("#errorMsg").html("");
        isname1 = true;
    }

    if (name2 == "") {
        $("#errorMsg1").html("Please fill the Lastname fields")
        isname2 = false;
    } else {
        $("#errorMsg1").html("");
        isname2 = true;
    }
    if (mail == "") {
        $("#errorMsg2").html("Please fill the email fields");
        ismail = false;
    } else {
        if (isEmailExists(mail, users)) {
            $("#errorMsg2").html("Email already exists.");
            ismail = false;
        } else {
            $("#errorMsg2").html("");
            ismail = true;
        }
    }

    if (password == "") {
        $("#errorMsg3").html("Please fill the password fields")
        ispassword = false;
    } else {
        if (password.length < 4) {
            $("#errorMsg3").html("Password should be at least 4 characters long.");
            ispassword = false;
        } else {
            $("#errorMsg3").html("");
            ispassword = true;
        }
    }

    if (isname1 && isname2 && ismail && ispassword) {
        alert("Sign Up Successfully");
        window.location.href = "login.html";

        const signFName = $("#signFName").val();
        const signLName = $("#signLName").val();
        const signEmail = $("#signEmail").val();
        const signPassword = $("#signPassword").val();

        // Update the existing user check to include the new user
        if (localStorage.getItem("input")) {
            let localUsers = JSON.parse(localStorage.getItem("input"));

            if (!isEmailExists(signEmail, localUsers)) {
                localUsers.push({
                    id: localUsers.length,
                    fName: signFName,
                    lName: signLName,
                    email: signEmail,
                    password: signPassword,
                });
                storeNames(localUsers);
            }
        } else {
            const users = [{
                id: 0,
                fName: signFName,
                lName: signLName,
                email: signEmail,
                password: signPassword,
            }]
            storeNames(users);
        }

        // Clear the input fields
        $("#signFName").val("");
        $("#signLName").val("");
        $("#signEmail").val("");
        $("#signPassword").val("");
    }
};

function isEmailExists(email, users) {
    console.log(users);
    return users && users.some(user => user.email === email);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log(localStorage.getItem("input"));
    if (localStorage.getItem("input")) {
        names = JSON.parse(localStorage.getItem("input"));
    }
});

function storeNames(users) {
    console.log(users);
    localStorage.setItem("input", JSON.stringify(users));
}

function getUserByEmail(email) {
    if (localStorage.getItem("input")) {
        var users = JSON.parse(localStorage.getItem("input"));
        for (var i = 0; i < users.length; i++) {
            if (email === users[i].email) {
                return users[i];
            };
        };
    };
    return null;
};
const sendEmailButton = document.getElementById("sendEmail");
const emailInput = document.getElementById("email");
const otpBox = document.getElementById("otpbox");
const otpForm = document.getElementById("otpForm");

sendEmailButton.addEventListener("click", function () {
    const email = emailInput.value;

    // Validate email format
    if (!validateEmail(email)) {
        alert("Invalid email format. Please enter a valid email address.");
        return;
    }

    // Check if the email exists or not.
        var user = getUserByEmail(email);
    if (!user) {
        alert("Email not found.");
        return ;
    }

    // check email and send password
    const reset = generateVerificationCode();
    storeVerificationCode(email, reset);
    alert("Password reset email sent.");
    otpBox.style.display = "block";
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};


function getUserAndOTPByEmail(email) {
    var user = getUserByEmail(email);
    var otp = generateVerificationCode();

    return {
        user: user,
        otp: otp
    };
};
function storeVerificationCode(email, verificationCode) {
    const verificationData = {
        code: verificationCode,
        user: email,
    };
    localStorage.setItem("OTP", JSON.stringify(verificationData));
}

function generateVerificationCode() {
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += [Math.floor(Math.random() * 10)];
    }
    return OTP;
};

// //otp

otpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const otpCode = document.getElementById("otpCode").value;

    if (verifyOTP(otpCode)) {
        alert("OTP code is valid");
        // window.location.href = "weblive1.html";
        changepass(); 
        } else {
        alert("OTP code is invalid");
    }
});

function verifyOTP(enteredOTP) {
    const storedVerificationData = JSON.parse(localStorage.getItem("OTP"));
    console.log(storedVerificationData);  // Add this line for debugging

    if (storedVerificationData && storedVerificationData.code === enteredOTP) {
        return true;
    }

    return false;
};

// change password

function password() {
    $("#myForm").show();
  }
function changepass() {
    var curp = $("#curpass").val();
    var newp = $("#newpass").val();
    let iscurp = false;
    let isnewp = false;
  
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
  
    if (iscurp && isnewp) {
        loggedInUser.password = newp;
        storeNames(JSON.parse(localStorage.getItem("input"))); // Pass the users array
        alert("Password changed successfully!");

        const users = JSON.parse(localStorage.getItem("input"));
        const userIndex = users.findIndex(user => user.id === parseInt(userId));
        if (userIndex !== -1) {
            users[userIndex].password = newp;
            localStorage.setItem("input", JSON.stringify(users));
        }

        window.location.href = "login.html";
    }

    function getCurrentUser() {
        const loggedInUserId = localStorage.getItem("userId");
        if (loggedInUserId && localStorage.getItem("input")) {
            const users = JSON.parse(localStorage.getItem("input"));
            return users.find(user => user.id === parseInt(loggedInUserId));
        }
        return null;
    }
};