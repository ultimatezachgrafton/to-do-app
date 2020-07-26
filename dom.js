var inputArray = JSON.parse(window.localStorage.getItem("input"));

// // Load localStorage items
// document.addEventListener('DOMContentLoaded', function () {
//   loadElements();
// });

// function loadElements() {
//   for (var i = 0; i < inputArray.length; i++) {
//     let li = document.createElement("li");
//     let toDoItem = document.createTextNode(inputArray[i]);

//     console.log(li, toDoItem, inputArray.length);

//     // check if t is complete/incomplete
//     // if (toDoItem.status = "complete") {
//     //   toDoItem.style.textDecoration = "line-through";
//     // } else {
//     //   toDoItem.style.textDecoration = "none";
//     // }

//     toDoItem.id = inputArray[i];
//     li.appendChild(toDoItem);

//     document.getElementById("ul-list").appendChild(toDoItem);

//     // Do not like this heavy handed linebreak...
//     linebreak = document.createElement("br");
//     document.getElementById("ul-list").appendChild(linebreak);

//     console.log(inputArray[i].value);
//     console.log(toDoItem);
//   }
// }

document.getElementById("input-item").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
      newElement();
  }
});

// Create a new list item when hitting "Enter"
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("input-item").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue !== '') {
      var toDoItem = { value: inputValue, status: "incomplete" };
      document.getElementById("ul-list").appendChild(li);
      inputArray.push(toDoItem);
      window.localStorage.setItem("input", JSON.stringify(inputArray));
      console.log(window.localStorage.getItem("getItem = " + "input"));
    }  
    document.getElementById("input-item").value = "";
    console.log(inputArray);
}

document.getElementById("ul-list").addEventListener("click",function(e) {
  // e.target is our targetted element.
  console.log(e.target);
  if (e.target.style.textDecoration == "line-through") {
    e.target.parentElement.removeChild(e.target);
    let index = inputArray.indexOf(e.target);
    let remove = inputArray.splice(index, 1);
    window.localStorage.removeItem(e.target);
    console.log(remove);
  } else {
    e.target.style.textDecoration="line-through";
  }
  console.log(e.target);
});

// when selected loaded values, selects all - does not delete
// does not load new entries