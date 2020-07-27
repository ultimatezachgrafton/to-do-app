var inputArray = JSON.parse(window.localStorage.getItem("localStorage"));

// Load localStorage items
document.addEventListener('DOMContentLoaded', function () {
  if (inputArray !== null) {
    loadElements(inputArray);
  }
});

function loadElements(inputArray) {
  for (var i = 0; i < inputArray.length; i++) {

    let listItemElement = document.createElement("li");
    listItemElement.id = inputArray[i].value;

    let textNode = document.createTextNode(inputArray[i].value);

    // check if complete/incomplete
    if (inputArray[i].status == "complete") {
      listItemElement.style.textDecoration = "line-through";
    }

    listItemElement.appendChild(textNode);
    
    document.getElementById("ul-list").appendChild(listItemElement);

    listItemElement.addEventListener("click", onItemClick);
  }
}

// Create a new list item when hitting "Enter"
document.getElementById("input-item").addEventListener("keyup", function(event) {
  event.preventDefault();
  let inputValue = document.getElementById("input-item").value;
  if (event.keyCode === 13 && inputValue !== '') {
      newElement(inputArray);
  }
});

function newElement(inputArray) {
  let listItemElement = document.createElement("li");
  let inputValue = document.getElementById("input-item").value;
  let textNode = document.createTextNode(inputValue);
  listItemElement.appendChild(textNode);

  if (inputValue !== '') {
    var newToDoItem = { value: inputValue, status: "incomplete" };
    document.getElementById("ul-list").appendChild(listItemElement);
    if (inputArray == null) {
      var inputArray = []; 
    }

    inputArray.push(newToDoItem);

    window.localStorage.setItem("localStorage", JSON.stringify(inputArray));
  }  
  document.getElementById("input-item").value = "";

  listItemElement.addEventListener("click", onItemClick);
}

function onItemClick() {
    if (event.target.style.textDecoration == "line-through") {
      event.target.parentElement.removeChild(event.target);

      // iterate through inputArray to find the matching value, delete it
      for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i].value == event.target.id) {

          let remove = inputArray.splice(i, 1);
          window.localStorage.removeItem(event.target);
          window.localStorage.setItem("localStorage", JSON.stringify(inputArray));
        }
      } 
    } else {
      for (var i = 0; i < inputArray.length; i++) {
        if (inputArray[i].value == event.target.id) {
          inputArray[i].status = "complete";
          event.target.style.textDecoration="line-through";
          window.localStorage.setItem("localStorage", JSON.stringify(inputArray));
        }
    }
  }
}