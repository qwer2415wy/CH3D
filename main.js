// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyDwSA2qvdoAIqFeAQaSXtXyIZ2WbkaWbMY",
    authDomain: "ch2d-99336.firebaseapp.com",
	databaseURL:"https://ch2d-99336-default-rtdb.firebaseio.com",
    projectId: "ch2d-99336",
    storageBucket: "ch2d-99336.appspot.com",
    messagingSenderId: "657338167280",
    appId: "1:657338167280:web:ea7ce3a9a5305f57ecb735"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database().goOnline();
var database = firebase.database()
var time = new Date()
var m = time.getMonth()+1
var d = time.getDate()
if(m < 10){m = "0" + (time.getMonth()+1)}
if(d < 10){d = "0" + time.getDate()}
var Nowtime = "" + time.getFullYear() + m + d
var StartTime = '20210514'

//上傳資料
function save(){
    if(document.getElementById('div1').style.display == "block"){display()}
    var userId = document.getElementById('userId').value
    var temperature = document.getElementById('temperature').value
    if(userId == "" || temperature == ""){
        alert("請輸入座號及今日體溫!!!")
    }
    else{
        database.ref('DetailedRecords/' + Nowtime + '/' + userId ).once("value").then(function(snapshot){
        var val = snapshot.val();
        if(val == null){
            if(userId >= 0 && userId <= 35 && temperature > 30 && temperature < 45){
                if(temperature > 37.5){
                    database.ref('DetailedRecords/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        Warning : 1 ,
                        Date : Nowtime
                        })
                    database.ref('Records/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        })
                }
                else{
                    database.ref('DetailedRecords/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        Warning : 0 ,
                        Date : Nowtime
                        })
                    database.ref('Records/' + Nowtime + '/' + userId).set({
                        Temperature : temperature ,
                        })
                }
                alert('體溫上傳成功')
                document.getElementById('temperature').value = ''
            }
            else{
                alert('座號或體溫輸入有誤')
                document.getElementById('userId').value = ''
                document.getElementById('temperature').value = ''
            }
        }
        else{
            alert('今日體溫已回報完畢，不需要重複上傳')
            document.getElementById('temperature').value = ''
        }
        })
    }
}

//顯示表格
function display(){
    if(document.getElementById('div1').style.display == "block"){
        document.getElementById('div1').style.display = "none"
    }
    else{
        document.getElementById('div1').style.display = "block"
    }
    //var userId = document.getElementById('userId').value
    //if(userId == 50){
    //    document.getElementById('outputBtn').style.display = "block"
    //}
}

//獲取資料庫中的個人的每日體溫紀錄
function get(){
    clean()
    var userId = document.getElementById('userId').value
    if(userId >= 0 && userId <= 35 && userId != ''){
        var end = Nowtime - StartTime + 1
        if(document.getElementById('div1').style.display != "block"){display()}
        for(i = 0; i < end ; i++){
            var Refdate = (parseInt(StartTime,10)+i).toString()
            database.ref('DetailedRecords/' + Refdate + '/' + userId).once("value").then(function(snapshot){
                var val = snapshot.val();
                if(val != null){
                    create(val.Date,val.Temperature)
                }
            })
        }
    }
    else{
        if(document.getElementById('div1').style.display == "block"){display()}
        alert('請先輸入正常的座號，才可以查看紀錄')
        document.getElementById('userId').value = ''
        document.getElementById('temperature').value = ''
    }
}

//創建表格
function create(date,temperature){
    var td1 = document.createElement('td')
    td1.appendChild(document.createTextNode(date));
    var td2 = document.createElement('td')
    td2.appendChild(document.createTextNode(temperature));
    var tr1 = document.createElement('tr')
    tr1.appendChild(td1)
    tr1.appendChild(td2)
    var table = document.getElementsByTagName('table')[0]
    table.appendChild(tr1)
}

//清空表格
function fnExcelReport()
{
    var rootRef = firebase.database().ref("https://ch2d-99336-default-rtdb.firebaseio.com");
}