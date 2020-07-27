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
      inputArray[i].style.textDecoration = "line-through";
    }

    listItemElement.appendChild(textNode);
  
    document.getElementById("ul-list").appendChild(textNode);

    // Do not like this heavy handed linebreak...
    linebreak = document.createElement("br");
    document.getElementById("ul-list").appendChild(linebreak);

    console.log("inputArray[i] value: " + inputArray[i].value);

    onItemClick(listItemElement);
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
    console.log("getItem = " + window.localStorage.getItem("localStorage"));
  }  
  document.getElementById("input-item").value = "";
  console.log("inputArray after newElement(): " + inputArray.length);

  onItemClick(listItemElement);
}

function onItemClick(li) {
  console.log("in onItemClick, li.id = " + li.id);
  li.addEventListener("click",function(e) {
    console.log("e.target = " + e.target);
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
}

// when selected loaded values, selects all - does not delete
// does not load new entries