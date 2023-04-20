const btnAddTask = document.getElementById('btn-add');//btn add tarefa
const inputNewTask = document.getElementById('input-Task'); //input nova tarefa
const tasksContainer = document.getElementById('tasks-container'); //lista tarefa container
const btnUpdateTask = document.getElementById('btnUpdateTask'); //botao atualizar tarefa
const idTarefaEdicao = document.getElementById('idTarefaEdicao'); //valor id da tarefa
const inputEditTaskName = document.getElementById('inputEditTaskName');

const updateTaskName = document.getElementById('editTaskName');
const myModal = document.getElementById('myModal')

const esconderTitulo = document.getElementById('title-list')

/*functios returns erros !! ignore
function errorCampovazio(){
    console.log("[DEBUG]: " + error);
}*/

//gerar ids
function generateId(){
    return Math.floor(Math.random() * 3000)
}

//nova tarefa
inputNewTask.addEventListener('keypress', (e) => {
    if(e.Keypress == 13){
        let task = {
            name: inputNewTask.value,
            id: generateId(),
        }
        addTask(task);
    }
    
})

//aidionar tarefa e ids
btnAddTask.addEventListener('click', ()=>{
    //const esconder_titulo = document.getElementById('title-list')
    let task = {
        name: inputNewTask.value,
        id: generateId(),
    }
    addTask(task);
    //esconder_titulo.classList.add('hidden')
})

function addTask(task){
    let tagDiv = createTag(task)
    tasksContainer.appendChild(tagDiv)
    inputNewTask.value = '';
}

function createTag(task){
    //criar os elementos referente a tarefa dinamicamente
    //CRIAR CONTAINER PARA OS ELEMENTO FILHOS
    let div = document.createElement('div'); //container tarefas
    div.classList.add('box-task')
    div.id = task.id;

    //CRIAR BOTAO CHECKBOX
    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox'
    checkbox.classList.add('checkbox')

    //CRAR TAG P -> PARAGRAFO
    let paragraph = document.createElement('p');
    //paragraph.id = nameId
    paragraph.classList.add('text-paragraph')
    paragraph.innerHTML = task.name;

//-------------------CRIANDO BOTAO EDITAR E ECLUIR TAREFA--------//
    //BOTAO EDITAR TAREFA
    let btn_edit = document.createElement('button')
    let icon_edit = document.createElement('img')

    btn_edit.type = 'button' //tipo botao
    btn_edit.classList.add('btn-edit') //class botao editar
    icon_edit.src = '/img/edit.svg' //imagem botao editar
    icon_edit.classList.add('img-edit') //class botao editar
    btn_edit.setAttribute('onclick', 'editTask('+task.id+')')


    //BOATO EXCLUIR TAREFA
    let btn_trash = document.createElement('button')
    let trash = document.createElement('img')

    trash.src = '/img/trash.svg' //imagem botao lixeira
    btn_trash.classList.add('btn-trash') //class botao lixeira
    trash.classList.add('trash')
    btn_trash.setAttribute('onclick', 'deleteTask('+task.id+')')
    

//----------------FIM DO CODIGO BOTAO EDITAR/EXCLUIR TAREFA--------//

    //tasksContainer.appendChild(div)      // adicionar a tag <div> do container da tarefas <div id='taskContainer>
    div.appendChild(checkbox)           // adciona a tag <input:checkbox> dentro da tag <div> criada anteriormente
    div.appendChild(paragraph)          // adiciona a tag <p> dentro da tag <div>
    
    //btn editar tarefa
    div.appendChild(btn_edit)
    btn_edit.appendChild(icon_edit)

    //btn excluir tarefa
    div.appendChild(btn_trash)
    btn_trash.appendChild(trash)              // adiciona a tag <p> dentro da tag <div>
    
    
    checkbox.addEventListener('click', () => {
        //verificação checkbox
       if (checkbox.checked){
           paragraph.style.color = 'red'
           paragraph.style.textDecoration = 'line-through'
       }
       else {
           paragraph.style.color = 'black'
           paragraph.style.textDecoration = 'initial'
       }
    })   

    //adiciona classe ao elemento e escconde o titulo
    const count_elements = tasksContainer.ELEMENT_NODE
    //adiciona uma class na tag p com o titulo -> (lista vazia)
    if( count_elements >= 1){
        esconderTitulo.classList.add('hidden')
    }
   return div;

}

//editar tarefa
function editTask(taskId){
    const myModal = document.getElementById('myModal');
    const confirm = document.getElementById('confirm') //btn confirmar
    const close = document.getElementById('close') //btn cancelar/x 

    let div = document.getElementById(''+ taskId +'')
    idTarefaEdicao.style.display = 'none'

    //mostrar modal
    myModal.style.display = 'block';

    if(div){
        idTarefaEdicao.innerHTML = '#' + taskId
        inputEditTaskName.value = div.innerText
    }

    //confirmar nova tarefa
    confirm.addEventListener('click', (e) => {
        myModal.style.display = 'none';

        let idtarefa = idTarefaEdicao.innerHTML.replace('#', '');
        let task = {
            name: inputEditTaskName.value,
            id: idtarefa,
        }

        //pegar a tarefa atual
        let tarefaAtual = document.getElementById(''+ idtarefa +'');
        if(tarefaAtual) {
            let div = createTag(task);
            tasksContainer.replaceChild(div, tarefaAtual);
        }
    })

    //fechar modal sem alterar o valor
    close.addEventListener('click', () => {
        myModal.style.display ='none'
    });
}

function deleteTask(taskId){
    let confirmacao = window.confirm('quer excluir? ')
    if(confirmacao){
        let div = document.getElementById(''+ taskId +'')
        if(div){
            tasksContainer.removeChild(div)
        }
    }

    //remover id do ltimo elemento e mostra o titulo
    const count_elements = tasksContainer.childElementCount
    //adiciona uma class na tag p com o titulo -> (lista vazia)
    if(count_elements === 1){
        esconderTitulo.classList.remove('hidden')
    }
}
