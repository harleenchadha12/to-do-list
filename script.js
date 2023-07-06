const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

item.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodo(this.value);
    this.value = "";
  }
});

const addTodo = (item) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <span>${item}</span>
    <input type="text" class="edit-input">
    <i class="delete-icon">X</i>
    <button class="edit-button">Edit</button>
  `;
  
  const itemText = listItem.querySelector("span");
  const editInput = listItem.querySelector(".edit-input");
  const deleteIcon = listItem.querySelector(".delete-icon");
  const editButton = listItem.querySelector(".edit-button");
  
  itemText.style.display = "inline-block";
  editInput.style.display = "none";
  
  function enableEditing() {
    itemText.style.display = "none";
    editInput.style.display = "inline-block";
    editInput.value = itemText.textContent;
    editInput.focus();
    editButton.textContent = "Save";
    editButton.removeEventListener("click", enableEditing);
    editButton.addEventListener("click", saveEditing);
  }
  
  function saveEditing() {
    itemText.textContent = editInput.value;
    itemText.style.display = "inline-block";
    editInput.style.display = "none";
    editButton.textContent = "Edit";
    editButton.removeEventListener("click", saveEditing);
    editButton.addEventListener("click", enableEditing);
  }
  
  function deleteItem() {
    listItem.remove();
  }
  
  editButton.addEventListener("click", enableEditing);
  deleteIcon.addEventListener("click", deleteItem);
  listItem.addEventListener("click", function () {
    this.classList.toggle("done");
  });
  
  listItem.appendChild(editButton);
  toDoBox.appendChild(listItem);
};
