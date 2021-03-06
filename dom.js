let toDoArray
const ulItems = document.getElementById("ul-list")

// Load localStorage items
document.addEventListener('DOMContentLoaded', function () {
  toDoArray = getItemsFromStorage();
  loadElements(toDoArray);
});

function getItemsFromStorage() {
  const items = JSON.parse(window.localStorage.getItem("localStorage"));
  return !items ? [] : items;
}

function loadElements(toDos) {
  for (let toDo of toDos) {
    let listItemElement = document.createElement("li");
    listItemElement.id = toDo.value;
    listItemElement.textContent = toDo.value;
    // check if complete/incomplete
    if (toDo.status === "complete") {
      listItemElement.classList.add("completed");
    }
    ulItems.appendChild(listItemElement);
    listItemElement.addEventListener("click", onItemClick);
  }
}

// Create a new list item when hitting "Enter"
document.getElementById("input-item").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
      newElement(event.target.value);
  }
});

function newElement(value) {
  if (value !== '') { 
    let listItemElement = document.createElement("li");
    listItemElement.textContent = value;
    listItemElement.id = value;
    var newToDoItem = { value: value, status: "incomplete" };
    ulItems.appendChild(listItemElement)
    toDoArray.push(newToDoItem)
    writeToLocalStorage(toDoArray)
    toDoArray = getItemsFromStorage()
    document.getElementById("input-item").value = "";
    listItemElement.addEventListener("click", onItemClick);
  }
}

function writeToLocalStorage(value) {
    window.localStorage.setItem("localStorage", JSON.stringify(value))
}

function onItemClick() {
  const toDoItem = event.target
  toDoArray = getItemsFromStorage()
  if (toDoItem.classList.contains("completed")) {
    toDoItem.parentElement.removeChild(toDoItem);
    const newToDoArray = toDoArray.filter (toDo => toDo.value !== toDoItem.id)
    writeToLocalStorage(newToDoArray)
    toDoArray = getItemsFromStorage()
  } else {
    for (let toDo of toDoArray) {
      if (toDo.value === toDoItem.id) {
        toDo.status = "complete"
        toDoItem.classList.add("completed")
        writeToLocalStorage(toDoArray)
      }
    }
  }
}