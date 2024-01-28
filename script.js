const todoList = [{todo: "Do the Dishes", date: "20-11-2024", id: 1},{todo: "clean car", date: "20-11-2024", id: 2}];
let todo;
let date;
let id;
loadTodos();

document.getElementById("todoItems").addEventListener("click", (event) => {
    if (event.target.id === "delete") {
        // console.log("Delete Cliked");
        const todoDiv = event.target.closest("div");
        const divID = parseInt(todoDiv.dataset.id);

        for(i = todoList.length - 1; i >= 0; i--){
            index = todoList.length - 1; 
            let foundID = todoList[i].id;
            // console.log("divID",divID, "foundID", foundID);
            // console.log(typeof divID, typeof foundID);
            if(divID === foundID){
                todoList.splice(i, 1);
                todoDiv.remove();
                alert("Todo has been deleted");
            }
        }
    }
    // console.log("delete not clicked") 
});

document.getElementById("addBtn").addEventListener("click", addToArray = () => {
    todo = document.getElementById("addNewBox").value;
    date = document.getElementById("date").value;
    if((todo === "") || (date === "")){
        alert("Fill in all the fields")
        return;
    }else{
        let element = todoList.length - 1;
        if(todoList.length === 0){
            todoList.push({todo: todo, date: date, id: id = 1});
            updateScreen(todo, date, id);
        }else{
            let lastID = todoList[element].id;
            todoList.push({todo: todo, date: date, id: id = lastID + 1});
            
            console.log(id);
            updateScreen(todo, date, id);
        }
    }
    
    //Debugging
    // console.log("button clicked");
    // element++;
    // console.log(todoList[element].id);
    // console.log(date);
});
//updates new todo to the screen
const updateScreen = (todo, date, id) => {
    document.getElementById("addNewBox").value = "";
    document.getElementById("date").value = "";
    let updateHTML = `
            <div data-id="${id}">    
            <input type="checkbox" id="checkbox">
            <input type="checkbox" name="" id="checkbox">
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
function loadTodos(){
    todoList.forEach((element) => {
        let updateHTML = `
            <div data-id="${element.id}">   
                <input type="checkbox" name="" id="checkbox">  
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
        let listDiv = document.getElementById("todoItems");
        listDiv.innerHTML += updateHTML;
    });

    // console.log(element);
    // console.log(todoList);
}
