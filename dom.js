// Create a new list item when hitting "Enter"
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("input-item").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue !== '') {
      document.getElementById("ul-list-item").appendChild(li);
    }
    document.getElementById("input-item").value = "";
}


document.getElementById("input-item")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        newElement();
    }
});

// checkbox

  // markkDone()

  // deleteItem()