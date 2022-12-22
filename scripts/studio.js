// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
        getDatabase,
        ref,
        set,
        onValue,
        get,
        child,
        push,
        update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
        getFirestore,
        collection,
        getDocs,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
        apiKey: "AIzaSyD33teXFSQYSI-nldLMRG5G01QLlHUhh68",
        authDomain: "rent-studio-2002.firebaseapp.com",
        databaseURL: "https://rent-studio-2002-default-rtdb.firebaseio.com",
        projectId: "rent-studio-2002",
        storageBucket: "rent-studio-2002.appspot.com",
        messagingSenderId: "108046001171",
        appId: "1:108046001171:web:bbead9206edab42f2c8be6",
        measurementId: "G-KQHHNXD8RS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// load data to dropdown list
// rewrite function
Document.prototype.createElementFromString = function (str) {
        const element = new DOMParser().parseFromString(str, "text/html");
        const child = element.documentElement.querySelector("body").firstChild;
        return child;
};
const db = getDatabase();
var starCountRef = ref(db, "Category/");
onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        keys.forEach((element) => {
                const node = document.createElementFromString(
                        `<option value="${element}">${data[element].name}</option>`
                );

                document.getElementById("studioCategoryId").appendChild(node);
        });
});

// read data
// starCountRef = ref(db, "Category/");
// onValue(starCountRef, (snapshot) => {
//         // clear all rows except header
//         var mytbl = document.getElementById("tableCategory");
//         mytbl.getElementsByTagName("tbody")[0].innerHTML = "";
//         // mytbl.rows[0].innerHTML;

//         const data = snapshot.val();
//         console.log(data);
//         console.log(typeof data);
//         console.log(Object.entries(data));
//         const keys = Object.keys(data);
//         keys.forEach((element) => {
//                 console.log(element);
//                 console.log(data[element]);
//         });
// });
