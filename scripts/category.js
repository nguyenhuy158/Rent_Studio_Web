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

// read data
const db = getDatabase();
const starCountRef = ref(db, "Category/");
onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        console.log(typeof data);
        console.log(Object.entries(data));
        const keys = Object.keys(data);
        keys.forEach((element) => {
                console.log(element);
                console.log(data[element]);
                // {name: 'Special Offer', thumbnailUrl: 'https://media.istockphoto.com/id/1182454657/photo/…20&c=qw37MGIiTL_jML3_Tbm4bM-jNLCrocSWj7DanhBr_bY='}
                const category = {
                        id: element,
                        name: data[element].name,
                        thumbnailUrl: data[element].thumbnailUrl,
                };
                console.log(category);
                var table = document.getElementById("tableCategory");
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = category.id;
                cell1.setAttribute("scope", "row");
                cell2.innerHTML = category.name;
                cell3.innerHTML = `<img width='200' heigh='200' src='${category.thumbnailUrl}'/>`;
                cell4.innerHTML = `<button class="edit">edit</button>
                <button class="delete">delete</button>`;
                cell4.dataset.categoryId = category.id;
        });

        Array.from(document.getElementsByClassName("edit")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const id =
                                        e.target.parentNode.dataset.categoryId;
                        });
                }
        );

        Array.from(document.getElementsByClassName("delete")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const id =
                                        e.target.parentNode.dataset.categoryId;
                        });
                }
        );
});

document.getElementById("buttonAdd").addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const thumbnailUrl = document.getElementById("thumbnailUrl").value;
        document.getElementById("name").value = "";
        document.getElementById("thumbnailUrl").value = "";

        console.log(`${name} ${thumbnailUrl}`);
        if (name !== "" && thumbnailUrl !== "") {
                // add to database
                const db = getDatabase();
                const category = {
                        name,
                        thumbnailUrl,
                };
                // Get a key for a new Post.
                const newPostKey = push(child(ref(db), "Category")).key;
                // Write the new post's data simultaneously in the posts list and the user's post list.
                const updates = {};
                updates["/Category/" + newPostKey] = category;
                update(ref(db), updates);
        }
});
