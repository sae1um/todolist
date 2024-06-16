const todoList = [
    { todo: "Do the Dishes", date: "20-11-2024", complete: false, id: 1 },
    { todo: "clean car", date: "20-11-2024", complete: false, id: 2 }
];
let todo;
let date;
let id;
let currentDiv;
// let globalInput;

let span = document.getElementsByClassName("close")[0];
let modal = document.getElementById("myModal");

loadTodos();


//Listen for button that is clicked (Delete, Checkbox, Edit)
document.getElementById("todoItems").addEventListener("click", () => {
    const todoDiv = event.target.closest("div");
    const divID = parseInt(todoDiv.dataset.id);
    if (event.target.id === "delete") {
        deleteToDo(todoDiv, divID);
    } else if (event.target.id === "checkbox") {
        toDochecked(todoDiv, divID);
    } else if (event.target.id === "edit") {
        editTodo(todoDiv, divID);
    }
});

//Delete todo that is clicked
function deleteToDo(todoDiv, divID) {
    for (i = todoList.length - 1; i >= 0; i--) {
        let foundID = todoList[i].id;
        if (divID === foundID) {
            todoList.splice(i, 1);
            todoDiv.remove();
            alert("Todo has been deleted");
        }
    }
}

//When ToDo is checked, style is applied, .complete value set to true
function toDochecked(todoDiv, divID) {
    let spans = todoDiv.querySelectorAll("span");
    let checkBox = todoDiv.querySelector("input");
    //Loop through TodoList to find the one that was clicked
    for (i = todoList.length - 1; i >= 0; i--) {
        let foundID = todoList[i].id;
        if (divID === foundID) {
            if (checkBox.checked) {
                spans.forEach(span => {
                    span.style.textDecoration = "line-through";
                });
                todoList[i].complete = true;
            } else if (!checkBox.checked) {
                spans.forEach(span => {
                    span.style.textDecoration = "none";
                });
                todoList[i].complete = false;
            }
        }
    }
}

//Add new todo to TodoList Array => Update Function is called
document.getElementById("addBtn").addEventListener("click", () => {
    todo = document.getElementById("addNewBox").value;
    date = document.getElementById("date").value;

    if (todo.trim() == "") {
        alert("Fill in all the fields")
        return;
    } else {
        let element = todoList.length - 1;
        if (todoList.length === 0) {
            todoList.push({ todo: todo, date: date, complete: false, id: id = 1 });
            updateScreen(todo, date, id);
        } else {
            let lastID = todoList[element].id;
            todoList.push({ todo: todo, date: date, complete: false, id: id = lastID++ });

            console.log(id);
            updateScreen(todo, date, id);
        }
    }
});

//Updates new todo to the screen
function updateScreen(todo, date, id) {
    document.getElementById("addNewBox").value = "";
    document.getElementById("date").value = "";
    let updateHTML = `
            <div data-id="${id}">
            <input type="checkbox" id="checkbox">
                <span id="todo">
                    ${todo}
                </span>
                <span id="doByDate">
                    ${date}
                </span>
                <button data-id="${id}" id="edit"><i class="fa-solid fa-pencil fa-lg" style="color: #ffffff;"></i></button>
                <button data-id="${id}" id="delete"><i class="fa-solid fa-trash fa-lg" style="color: #ffffff;"></i></button>
            </div>
        `;
    let listDiv = document.getElementById("todoItems");
    listDiv.innerHTML += updateHTML;
}

//Loads todos already in the array on refresh
function loadTodos() {
    let listDiv = document.getElementById("todoItems");
    listDiv.innerHTML = "";
    todoList.forEach((element) => {
        let updateHTML = `
            <div data-id="${element.id}">   
                <input type="checkbox" id="checkbox">  
                <span id="todo">
                    ${element.todo}
                </span>
                <span id="doByDate">
                    ${element.date}
                </span>
                <button data-id="${element.id}" id="edit"><i class="fa-solid fa-pencil fa-lg" style="color: #ffffff;"></i></button>
                <button data-id="${element.id}" id="delete"><i class="fa-solid fa-trash fa-lg" style="color: #ffffff;"></i></button>
            </div>
        `;
        listDiv.innerHTML += updateHTML;
    });
    console.log("all todos loaded");
}

function editTodo(todoDiv, divID) {
    document.getElementById("myModal").style.display = "block";
    todoInput = document.getElementById("edit-input");
    dateInput = document.getElementById("date-input");
    currentDiv = divID;
    for (i = todoList.length - 1; i >= 0; i--) {
        let foundID = todoList[i].id;
        if (divID === foundID) {
            todoInput.value = todoList[i].todo;
            // dateInput.value = todoList[i].date;
        }
    }
}

//Listen for save button press
document.getElementById("save-edit").addEventListener("click", () => {
    console.log("clicked");
    for(i = todoList.length - 1; i >= 0; i--){
        let listID = todoList[i].id;
        if(currentDiv === listID){
            let element = todoList[i];
            input = document.getElementById("edit-input").value;
            date = document.getElementById("date-input").value;
            element.todo = input;
            loadTodos();
            console.log("updated", todoList[i]);

        }
    }
    document.getElementById("myModal").style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
span.onclick = function() {
    modal.style.display = "none";
}