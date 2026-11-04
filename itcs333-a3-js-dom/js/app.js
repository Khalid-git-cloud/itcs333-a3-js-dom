// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener("DOMContentLoaded", function() {
    
    // Get all necessary elements from the HTML DOM
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");
    
    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";

    // Function to update the remaining items counter
    function updateCounter() {
        const items = todoList.getElementsByTagName("li");
        let activeCount = 0;
        
        for (let i = 0; i < items.length; i++) {
            if (!items[i].classList.contains("completed")) {
                activeCount++;
            }
        }
        
        counter.textContent = activeCount + " item(s) left";
    }

    // Function to handle filtering visibility
    function filterTasks() {
        const items = todoList.getElementsByTagName("li");
        
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const isCompleted = item.classList.contains("completed");
            
            if (currentFilter === "all") {
                item.style.display = "";
            } else if (currentFilter === "active") {
                if (isCompleted) {
                    item.style.display = "none";
                } else {
                    item.style.display = "";
                }
            } else if (currentFilter === "done") {
                if (isCompleted) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            }
        }
    }

    // Function to add a new task item
    function addTask() {
        const taskText = todoInput.value.trim();
        
        if (taskText === "") {
            errorMsg.style.display = "block";
            return;
        }
        
        errorMsg.style.display = "none";
        
        const li = document.createElement("li");
        
        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = taskText;
        li.appendChild(span);
        
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
        todoInput.value = "";
        
        filterTasks();
        updateCounter();
    }

    // Event Listeners for Adding Tasks
    addBtn.addEventListener("click", addTask);

    todoInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Event Delegation on #todo-list
    todoList.addEventListener("click", function(event) {
        const target = event.target;
        const li = target.closest("li");
        
        if (!li) return;
        
        if (target.classList.contains("delete-btn")) {
            li.remove();
        } else {
            li.classList.toggle("completed");
        }
        
        filterTasks();
        updateCounter();
    });

    // Event Listeners for Filter Buttons
    filterAll.addEventListener("click", function() {
        currentFilter = "all";
        filterAll.classList.add("active");
        filterActive.classList.remove("active");
        filterDone.classList.remove("active");
        filterTasks();
    });

    filterActive.addEventListener("click", function() {
        currentFilter = "active";
        filterActive.classList.add("active");
        filterAll.classList.remove("active");
        filterDone.classList.remove("active");
        filterTasks();
    });

    filterDone.addEventListener("click", function() {
        currentFilter = "done";
        filterDone.classList.add("active");
        filterAll.classList.remove("active");
        filterActive.classList.remove("active");
        filterTasks();
    });

    updateCounter();
});