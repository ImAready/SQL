/**
 * 전역 객체
 */
var todos = [];

/**
 * 최초 실행 함수
 */
function todoInit(){
    // Todo add button event
    let btn = document.querySelector('.input_wrap > button');
    btn.addEventListener("click", addTodoItem);
}

/**
 * Todo Item 추가 함수
 */
function addTodoItem(){
    let id = new Date().getMilliseconds(),
        value = document.querySelector('.input_wrap > input').value
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
    // Todo Complete event
    document.getElementById(id).addEventListener("change", completeItem);

    // todos에 item추가
    todos.push({id:id, item: value, compChk:false});
    creatCounting(todos);
}


/**
 * Todo Item 삭제 함수
 * @param {} event 
 */
function deleteItem(event){
    let listWrap = document.querySelector('.todo_list'),
        targetParent = event.currentTarget.parentNode,
        targetId = targetParent.querySelector('input').id;

    listWrap.removeChild(targetParent);

    // todos에서 item 삭제
    if(todos){
        todos = todos.filter(todos => todos.id != targetId)
    }
    creatCounting(todos);
}


/**
 * Todo Item 완료 함수
 * @param {} event 
 */
function completeItem(event){
    let targetId = event.currentTarget.id,
        parentNode = event.currentTarget.parentNode;
        isCheck = document.getElementById(targetId).checked;
        
   
    todos = todos.map(function(todos){
        if(todos.id == targetId){
            if(isCheck){
                todos.compChk = true;
                parentNode.setAttribute("style","color:green");
            }
            else{
                todos.compChk = false;
                parentNode.removeAttribute("style");
            }
        }
        return todos;
    });
    creatCounting(todos);
}


/**
 * Todo Item 카운팅 함수
 * @param {} todos 
 */
function creatCounting(todos){
    let todoCnt = document.querySelector('.todo_count'),
        totCnt = todos.length,
        comCnt = todos.filter(todos => todos.compChk).length,
        nonCnt = todos.filter(todos => !todos.compChk).length;
    const tmpl = `
                <span>
                    완료 <strong>${comCnt}</strong>건
                </span>
                <span>
                    미완료 <strong>${nonCnt}</strong>건
                </span>
                <span>
                    총 <strong>${totCnt}</strong>건
                </span>`
    todoCnt.innerHTML = tmpl;
}

