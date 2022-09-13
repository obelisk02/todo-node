import FormTodo from "./components/form-todo.js";
import Filter from "./components/input-filter.js";

export default class Controller {
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');
        this.formTodo = new FormTodo();

        this.formTodo.onClick( (title, description) => this.addTodo(title,description) );

        //@tarea edit
        document.getElementById("btnEditModal").addEventListener("click", this.editTodo);

        //@tarea filter
        this.filter = new Filter();
        this.filter.onClick( (word) => this.filterWord(word) );
    }

    setModel(model){
        this.model = model;
    }

    render(){
        const todos = this.model.getTodos();
        todos.forEach(todo => this.createRow(todo));
        //console.log(todos);
    }

    toogleCompleted(id){
        this.model.toogleCompleted(id);
    }

    addTodo(title, description){
        const todo = this.model.saveTodo(title, description);
        this.createRow(todo);
        
    }

    removeTodo(id){
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    //@tarea
    showModal(id,title,description){
        $('#exampleModal').modal('show')
        document.getElementById('exampleModalLabel').textContent = id
        document.getElementById('recipient-name').value = title
        document.getElementById('message-text').value = description
        //this.editTodo(id,title,description)d
    }

    //@tarea
    editTodo(){
        let id = document.getElementById('exampleModalLabel').textContent 
        let title = document.getElementById('recipient-name').value 
        let description = document.getElementById('message-text').value
        // No quiere llamar por undefined propierties ???? this.model.updateTodo(id,title,description) 4

        const todos = JSON.parse(localStorage.getItem('todos'));
        todos[id-1].title = title;
        todos[id-1].description = description;
        localStorage.setItem('todos', JSON.stringify(todos))
        //this.render();
        location. reload()
    }

    //@tarea filter
    filterWord(word){
        console.log("Filtrando...");
      
        if (word === null){
            this.clearTable();
            this.render();
        }
        
        else{
            const wordFilter = this.model.filter(word);
            this.clearTable();
            //maper table
            wordFilter.forEach(todo => this.createRow(todo));
        }
  
    }

    //@tarea filter
    clearTable(){
        let maxId = this.model.currentId;
      
            for(let i=0; i<maxId; i++){
               if ( document.getElementById(i)){
                document.getElementById(i).remove();
               }
               
        }
    }

    createRow(todo){
        const row = table.insertRow();
        row.setAttribute('id', todo.id);
        row.innerHTML = `
            <td> ${todo.title} </td>
            <td> ${todo.description} </td>
            <td class="text-center"> </td>
            <td class="text-right"> </td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.onclick = () => this.toogleCompleted(todo.id);
        row.children[2].appendChild(checkbox);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeTodo(todo.id);
        row.children[3].appendChild(removeBtn);

        //@tarea edit 
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-warning', 'mb-1', 'ml-1');
        editBtn.innerHTML = '<i class="fa fa-edit"></i>';
        editBtn.onclick = () => this.showModal(todo.id, todo.title, todo.description);
        row.children[3].appendChild(editBtn);
    }
}