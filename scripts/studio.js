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

const categories = [];
const db = getDatabase();
var starCountRef = ref(db, "Category/");
onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        keys.forEach((element) => {
                // backup category
                const category = {
                        id: element,
                        name: data[element].name,
                        thumbnailUrl: data[element].thumbnailUrl,
                };
                categories.push(category);

                const node = document.createElementFromString(
                        `<option value="${element}">${data[element].name}</option>`
                );

                document.getElementById("studioCategoryId").appendChild(node);
        });
});

// read data
starCountRef = ref(db, "Studio/");
onValue(starCountRef, (snapshot) => {
        // clear all rows except header
        var mytbl = document.getElementById("tableStudio");
        mytbl.getElementsByTagName("tbody")[0].innerHTML = "";

        const data = snapshot.val();
        const keys = Object.keys(data);
        keys.forEach((element) => {
                // console.log(element);
                // console.log(data[element]);
                // { "CategoryId": "01", "description": "Our studio is located right in the center of Ho Chi Minh city, the vibrant economic capital of Vietnam, full of energy, entrepreneurship spirit and cultural richness. We are proud to count passionate and creative talents, coming from 15 different countries, offering a fun, diverse and international environment. We started the story in Vietnam in 2004. Join us to continue the success story! Let your talent and passion power our amazing products and gamification solutions for the world-leading brands.", "name": "JEWEL HOTEL", "price": 4000, "thumbnailUrl": "https://images.unsplash.com/photo-1671471983193-f76687e0a4fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" }
                const studio = {
                        id: element,
                        name: data[element].name,
                        thumbnailUrl: data[element].thumbnailUrl,
                        CategoryId: data[element].CategoryId,
                        description: data[element].description,
                        price: data[element].price,
                };
                var table = document
                        .getElementById("tableStudio")
                        .getElementsByTagName("tbody")[0];

                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);

                cell1.innerHTML = studio.id;
                cell2.innerHTML = studio.name;
                cell3.innerHTML = `<img style=" width: 100px; height: 100px; object-fit: cover; " src='${studio.thumbnailUrl}'/>`;
                const categoryName = categories.find(
                        (value) => value.id == studio.CategoryId
                ).name;
                cell4.innerHTML = categoryName;
                cell5.innerHTML = studio.description;
                cell6.innerHTML = studio.price;
                cell7.innerHTML = `<button class="edit btn btn-primary" type="button" data-toggle="modal" data-target="#modelEdit">edit</button>`;
                cell7.innerHTML += `<button class="delete btn btn-secondary">delete</button>`;
                cell7.dataset.studioId = studio.id;
                cell7.dataset.studioName = studio.name;
                cell7.dataset.studioThumbnailUrl = studio.thumbnailUrl;
                cell7.dataset.studioCategoryId = studio.CategoryId;
                cell7.dataset.studioDescription = studio.Description;
                cell7.dataset.studioPrice = studio.Price;
        });

        // edit
        Array.from(document.getElementsByClassName("edit")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                //  const id =
                                //          e.target.parentNode.dataset.categoryId;
                                //  const name =
                                //          e.target.parentNode.dataset
                                //                  .categoryName;
                                //  const thumbnailUrl =
                                //          e.target.parentNode.dataset
                                //                  .categoryThumbnailUrl;
                                //  const model =
                                //          document.getElementById("modelEdit");
                                //  document.getElementById(
                                //          "modelCategoryId"
                                //  ).innerHTML = id;
                                //  document.getElementById(
                                //          "modelCategoryName"
                                //  ).value = name;
                                //  document.getElementById(
                                //          "modelCategoryTumbnailUrl"
                                //  ).value = thumbnailUrl;
                        });
                }
        );
        // button update
        document.getElementById("update").addEventListener("click", (e) => {
                const id = document.getElementById("modelCategoryId").innerHTML;
                const name = document.getElementById("modelCategoryName").value;
                const thumbnailUrl = document.getElementById(
                        "modelCategoryTumbnailUrl"
                ).value;
                // update to database
                const db = getDatabase();
                const category = {
                        name,
                        thumbnailUrl,
                };

                const updates = {};
                updates["/Studio/" + id] = category;
                const result = update(ref(db), updates);
                console.log(result);
                $("#modelEdit").modal("hide");
        });
        // delete
        Array.from(document.getElementsByClassName("delete")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const id = e.target.parentNode.dataset.studioId;
                                const db = getDatabase();

                                const updates = {};
                                updates["/Studio/" + id] = null;

                                const result = update(ref(db), updates);
                                console.log(
                                        "🚀 ~ file: studio.js:180 ~ result",
                                        result
                                );
                        });
                }
        );
});

// add
document.getElementById("buttonAdd").addEventListener("click", (e) => {
        e.preventDefault();
        const studioStudioName =
                document.getElementById("studioStudioName").value;
        const studioThumbnailUrl =
                document.getElementById("studioThumbnailUrl").value;
        const studioCategoryId =
                document.getElementById("studioCategoryId").value;
        const studioDescription =
                document.getElementById("studioDescription").value;
        const studioPrice = document.getElementById("studioPrice").value;

        if (studioStudioName !== "" && studioThumbnailUrl !== "") {
                // clear input data
                document.getElementById("studioStudioName").value = "";
                document.getElementById("studioThumbnailUrl").value = "";
                document.getElementById("studioCategoryId").value = "";
                document.getElementById("studioDescription").value = "";
                document.getElementById("studioPrice").value = "";

                // add to database
                const db = getDatabase();
                const studio = {
                        name: studioStudioName,
                        thumbnailUrl: studioThumbnailUrl,
                        CategoryId: studioCategoryId,
                        description: studioDescription,
                        price: studioPrice,
                };

                // Get a key for a new Post.
                const newPostKey = push(child(ref(db), "Studio")).key;
                // Write the new post's data simultaneously in the posts list and the user's post list.
                const updates = {};
                updates["/Studio/" + newPostKey] = studio;
                const result = update(ref(db), updates);
                console.log(
                        "🚀 ~ file: studio.js:226 ~ document.getElementById ~ result",
                        result
                );
        }
});
