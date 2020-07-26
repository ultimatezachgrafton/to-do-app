var inputArray = [];

// Load localStorage items
document.addEventListener('DOMContentLoaded', function () {
  loadElements();
});

function loadElements() {
  inputArray = JSON.parse(window.localStorage.getItem("input"));
  let arrayLength = inputArray.length;
  for (var i = 0; i < arrayLength; i++) {
    let li = document.createElement("li");
    let t = document.createTextNode(inputArray[i].value);
    li.appendChild(t);
    document.getElementById("ul-list-item").appendChild(t);
    linebreak = document.createElement("br");
    document.getElementById("ul-list-item").appendChild(linebreak);
    console.log(inputArray[i].value);
  }
}

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
      document.getElementById("ul-list-item").appendChild(li);
      inputArray.push(toDoItem);
      window.localStorage.setItem("input", JSON.stringify(inputArray));
      console.log(window.localStorage.getItem("getItem = " + "input"));
    }  
    document.getElementById("input-item").value = "";
    console.log(inputArray);
}

document.getElementById("ul-list-item").onclick = function(e) {
  if (e.target.style.textDecoration == "line-through") {
    e.target.parentElement.removeChild(e.target);
    let index = inputArray.indexOf(e.target);
    let remove = inputArray.splice(index, 1);
    window.localStorage.removeItem(e.target);
    console.log(remove);
  } else {
    e.target.style.textDecoration="line-through";
  }
  console.log(inputArray);
}

// create objects out of input to keep track of strike-through
// when selected loaded values, selects all - does not delete