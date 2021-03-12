

var fs = require("fs");

// here is my passwordvalidation function ......
function passwordvalidation (password){
    return new Promise((resolve,reject) => {
        if (password.includes("@") || password.includes("#")) {
            if (password == confirmation_password) {
                resolve("valid")
            } else {
                reject("both are not same")
            }
        } else {
            reject("At password contain one special character and one number")
        }
    })
}

// from here my data has been written......
var writingfilepromise = (file,data) => {
    return new Promise((resolve,reject) => {
        var json_data = JSON.stringify(data,null,3)
        resolve (json_data)
        fs.writeFileSync(file, json_data);
        resolve (data)
    });
}

// from here my has been reading ...... for signup side!!!!!
var readingfilepromise = (file) => {
    return new Promise((resolve,reject) => {
        var readingfile = fs.readFileSync(file)
        var convert_data = JSON.parse(readingfile)
        var value = convert_data["user"]
        resolve(value)
    })
}

var readlinesync = require("readline-sync");
var candidate = readlinesync.question("enter your choice whether you want to login / signup:-  ")

//  here is my signup code function....
if (candidate == "signup"){
    var readlinesync = require("readline-sync");
    var username = readlinesync.question("enter your username:-   ")
    var password = readlinesync.question("enter your password:-   ");
    var confirmation_password = readlinesync.question("enter your confirmation_password:-   ");

    // checking the password.....
    if (password == confirmation_password){    
        passwordvalidation(password).then((messa) => {
            console.log(messa)
            readingfilepromise("user_details.json").then((message) => {
                for (var i=0; i<message.length; i++){
                    if (username == message[i]["username"]) {
                        console.log("allready exists")
                    }else{
                        var json_object = { "user": [{ "username": username, "password": password }] };
                        writingfilepromise("user_details.json",json_object).then((message) => {
                            console.log(message)
                        }).catch((error) => {
                            console.log(error)
                        })
                        console.log("Congrats" , username , "You have signed up successfully")

                        // more details of user when there user is not there in the json file 
                        var readlinesync = require("readline-sync");
                        var description = readlinesync.question(" tell about yourself:-   ")
                        var date_of_birth = readlinesync.question("enter your date_of_birth")
                        var hobbies = readlinesync.question("enter your hobbies:-   ")
                        var gender = readlinesync.question("enter your gender:-   ")
                        var few_details_of_user = {"user" : [{"username":username,"password":password,
                        "profile" : {"description" : description},
                            "date_of_birth" : date_of_birth,
                            "hobbies" : hobbies,
                            "gender" : gender }]
                        }
                        convert_data_string = JSON.stringify(few_details_of_user)
                        fs.writeFileSync("user_details.json",convert_data_string);
                    }
                }
            }).catch((error) => {
                console.log(error)
            })                

            var json_object = { "user": [{ "username": username, "password": password }] };
            // console.log(username)
            writingfilepromise("user_details.json",json_object).then((message) => {
                console.log(message)
                readingfilepromise("user_details.json").then((message) => {
                    console.log(message)
                }).catch((error) => {
                    console.log(error,"!!!....")
                })                
            }).catch((error) => {
                console.log(error,"!!!!!!")
            })
        }).catch((error) => {
            console.log(error,"......")
        })   
    } 

// here is my Login function side.......
}else if (candidate == "login"){
    function login(){
        var username1 = readlinesync.question("enter your username:-   ")
        var password2 = readlinesync.question("enter your password:-   ")
        // here is reading the file ....
        var readingfilepromise = (file) => {
            return new Promise((resolve,reject) => {
                var readingfile = fs.readFileSync(file)
                var convert_data = JSON.parse(readingfile)
                var value = convert_data["user"]
                resolve(value)
                for (var i=0; i<messege.length; i++){
                    if (username1 == messege[i]["username"] && password2 == messege[i]["password"]) {
                        console.log (convert_data)
                    }else{
                        console.log ("invalid username1 and password2")
                    }
                }
            })
        }
        readingfilepromise("user_details.json").then((message) => {
            console.log(message)
        }).catch((error) => {
            console.log(error)
        })
    }
    login();
}

