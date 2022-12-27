let inputNewTask = document.querySelector("#input-new-task");
let btnNewTask = document.querySelector("#btn-new-task");
let taskList = document.querySelector("#task-list");
let editWindow = document.querySelector("#edit-window");
let bgEditWindow = document.querySelector("#bg-edit-window");
let btnEditClose = document.querySelector("#btn-edit-close");
let btnUpdateTask = document.querySelector("#btn-update-task");
let idTaskEdit = document.querySelector("#id");
let inputEditWindow = document.querySelector("#input-edit-window");

btnNewTask.addEventListener("click", () => {
  if (inputNewTask.value != ""){
    let task = {
      name: inputNewTask.value,
      id: RamdomId(),
    };
    AddNewTask(task);
  }else{
    alert('Empty task');
  };
});

btnUpdateTask.addEventListener("click", (e) => {
  e.preventDefault();
  let idTask = idTaskEdit.innerHTML.replace('#', '');
  let task = {
    name: inputEditWindow.value,
    id: idTask,
  };
  let currentTask = document.getElementById(`${task.id}`);
  if (currentTask){
    let li = CraftTag(task);
    taskList.replaceChild(li, currentTask);
    AltWindow();
    inputEditWindow.value = "";
  };
});

btnEditClose.addEventListener("click", () => {
  AltWindow();
  inputEditWindow.value = "";
});

function RamdomId(){
  return Math.floor(Math.random() * 3000);
};

function AddNewTask(task){
  let li = CraftTag(task);
  taskList.appendChild(li);
  inputNewTask.value = "";
};

function CraftTag(task){
  let li = document.createElement("li");
  li.id = task.id;
  let span = document.createElement("span");
  span.classList.add('task-text');
  span.innerHTML = task.name;
  let div = document.createElement("div");
  let btnEdit = document.createElement("button");
  btnEdit.classList.add('btn-action');
  btnEdit.innerHTML = '<i class="fa fa-pencil"></i>';
  btnEdit.setAttribute('onclick', `Edit(${task.id})`);
  let btnErase = document.createElement("button");
  btnErase.classList.add('btn-action');
  btnErase.innerHTML = '<i class="fa fa-trash"></i>';
  btnErase.setAttribute('onclick', `Erase(${task.id})`);
  div.appendChild(btnEdit);
  div.appendChild(btnErase);
  li.appendChild(span);
  li.appendChild(div);
  return li;
};

function Edit(Id){
  let li = document.getElementById(`${Id}`);
  if (li) {
    idTaskEdit.innerHTML = '#' + Id;
    AltWindow();
  };
};

function Erase(Id){
 let li = document.getElementById(`${Id}`);
 if (li) {
  taskList.removeChild(li);
 };
};

function AltWindow(){
  bgEditWindow.classList.toggle("open");
  editWindow.classList.toggle("open");
};