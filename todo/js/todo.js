function todoInit(){
    // Todo add button event
    let btn = document.querySelector('.input_wrap > button');
    btn.addEventListener("click", addTodoItem);
}

function addTodoItem(){
    let id = new Date().getMilliseconds(),
        value = document.querySelector('.input_wrap > input').value,
        listWrap = document.querySelector('.todo_list');
    
    // input text 없을 때
    if(!value){
        alert("할 일을 입력해;");
    } 
    else { 
        let toToItem = document.createElement("li");
        const tmpl = `
                        <input type="checkbox" id="${id}">
                        <label for="${id}">${value}</label>
                        <button type="button">X</button>
                    `;
        // Todo Item 추가
        toToItem.innerHTML = tmpl;
        // Todo delete button event
        toToItem.querySelector('button').addEventListener("click", deleteItem);
        listWrap.appendChild(toToItem);
    }

}

function deleteItem(event){
    let listWrap = document.querySelector('.todo_list'),
        removeTarget = event.currentTarget.parentNode;
    listWrap.removeChild(removeTarget);
}

