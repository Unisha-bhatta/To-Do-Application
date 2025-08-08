document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add_button");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Add new task
    addButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText !== "") {
            const li = createTodoItem(taskText);
            todoList.appendChild(li);
            todoInput.value = "";
        }
    });

    // Allow pressing Enter to add task
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addButton.click();
        }
    });

    // Make the list sortable (drag-and-drop)
    makeListDraggable(todoList);
});

// Create a single to-do item element
function createTodoItem(text) {
    const li = document.createElement("li");
    li.draggable = true;

    const span = document.createElement("span");
    span.textContent = text;
    span.classList.add("task-text");

    // Toggle completed on click
    span.addEventListener("click", () => {
        span.classList.toggle("completed");
    });

    // Edit on double-click
    span.addEventListener("dblclick", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        input.className = "edit-input";

        input.addEventListener("blur", () => {
            span.textContent = input.value.trim() || span.textContent;
            span.style.display = "inline";
            input.remove();
        });

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                input.blur();
            }
        });

        span.style.display = "none";
        li.insertBefore(input, span);
        input.focus();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

// Enable drag-and-drop reordering
function makeListDraggable(list) {
    let draggedItem = null;

    list.addEventListener("dragstart", (e) => {
        draggedItem = e.target;
        e.dataTransfer.effectAllowed = "move";
    });

    list.addEventListener("dragover", (e) => {
        e.preventDefault();
        const target = e.target.closest("li");
        if (target && target !== draggedItem) {
            const bounding = target.getBoundingClientRect();
            const offset = bounding.y + bounding.height / 2;
            if (e.clientY - offset > 0) {
                target.after(draggedItem);
            } else {
                target.before(draggedItem);
            }
        }
    });

    list.addEventListener("drop", (e) => {
        e.preventDefault();
        draggedItem = null;
    });
}
