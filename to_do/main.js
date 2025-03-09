(function () {
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle
  }
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.placeholder = 'Введите название нового дела';
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    input.addEventListener('input', function () {
      button.disabled = false;
    });

    return {
      form,
      input,
      button
    }
  }

  function createArrTodo(arrName) {
    let done = false;
    let name = arrName;
    let id = 0;
    return {
      id,
      name,
      done
    }
  }

  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group', 'mb-5');
    return list
  }

  function createTodoItem(name, arrTodoCase, listName) {
    let item = document.createElement('li');
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    doneButton.addEventListener('click', function () {
      item.classList.toggle('list-group-item-success');
      for (let elem of arrTodoCase) {
        if (elem.name == name) {
          elem.done = !elem.done;
        }
      }
      localStorage.setItem(listName, JSON.stringify(arrTodoCase));
      console.log(arrTodoCase);
    })

    deleteButton.addEventListener('click', function () {
      for (let elem of arrTodoCase) {
        if (elem.name == name) {
          elem.done = false;
        }
      }
      if (confirm('Вы уверены?')) {
        item.remove()
      }
      deleteById(name, arrTodoCase, listName);
      console.log(arrTodoCase);
    })

    return {
      item,
      doneButton,
      deleteButton
    }
  }
  function deleteById(del, arrTodoCase, listName) {
    for (let item in arrTodoCase) {
      if (arrTodoCase[item].name == del) {
        arrTodoCase.splice(item, 1);
      }
      if (item != arrTodoCase.length) {
        arrTodoCase[item].id = Number(item + 1);
      }
      localStorage.setItem(listName, JSON.stringify(arrTodoCase))
    }
  }

  function createTodoApp(container, title = 'Список дел', listName) {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let arrTodoCase = JSON.parse(localStorage.getItem(listName)) || [];
    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(listName)) {
      for (let i = 0; i < JSON.parse(localStorage.getItem(listName)).length; i++) {
        let toDoItem = createTodoItem(JSON.parse(localStorage.getItem(listName))[i].name, arrTodoCase, listName);
        todoList.append(toDoItem.item)
        if (arrTodoCase[i][Object.keys(arrTodoCase[i])[2]]) {
          toDoItem.item.classList.toggle('list-group-item-success');
        }
      }
      console.log(arrTodoCase)
    }

    todoItemForm.form.addEventListener('submit', function (e) {
      e.preventDefault();
      document.querySelector('.btn-primary').disabled = true;
      if (!todoItemForm.input.value) {
        return
      }
      toDoItem = createTodoItem(todoItemForm.input.value, arrTodoCase, listName);
      let arrTodo = createArrTodo(todoItemForm.input.value);
      arrTodo.id = arrTodoCase.length + 1;
      arrTodoCase.push(arrTodo);
      localStorage.setItem(listName, JSON.stringify(arrTodoCase))
      todoList.append(toDoItem.item)
      todoItemForm.input.value = '';
      console.log(arrTodoCase);

    });
  }
  window.createTodoApp = createTodoApp;
})()

