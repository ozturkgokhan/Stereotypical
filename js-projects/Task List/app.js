// Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
LoadEventListeners();

// Get tasks from local storage
GetTasksFromLocalStorage();

// Load Event Listeners
function LoadEventListeners(){
  // Add task
  form.addEventListener('submit', addTask);

  // Remove task
  taskList.addEventListener('click', removeItem);

  // Clear tasks
  clearBtn.addEventListener('click', clearTasks); 

  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
};

// Filter Tasks
function filterTasks(e){
  const tasks = document.querySelectorAll('.collection-item');
  const text = e.target.value.toLowerCase();

  if(taskList.innerHTML === ''){
      alert('No tasks to filter!');
  }else{
      tasks.forEach(function(task){
          const item = task.firstChild.textContent.toLowerCase();
          if(item.indexOf(text) != -1){
              task.style.display = 'block';
          }else{
              task.style.display = 'none';
          };
      });
  };
  // console.log(e.target.value);
};

// Clear Tasks
function clearTasks(e){
  // const tasks = document.querySelectorAll('.collection-item');

  // console.log(tasks);

  // tasks.forEach(function(task){
  //   task.remove();
  // })

  // !! Faster with innerHTML cleaning
  taskList.innerHTML = '';

  //Also clear items from local storage
  localStorage.removeItem('tasks');

  e.preventDefault();
};

// Remove Item
function removeItem(e){
  
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete the task?')){
      e.target.parentElement.parentElement.remove();

      // console.log(e.target.parentElement.parentElement.textContent);
      RemoveTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
    }
  }

  

  e.preventDefault();
};

// Add Event
function addTask(e){
  
  if(taskInput.value === ''){
    // do nothing
    alert('Enter a task to add!');
  } else{

    // create li from scratch
    // const li = document.createElement('li');
    // li.setAttribute('class','collection-item');
    // li.appendChild(document.createTextNode(taskInput.value));

    // const link = document.createElement('a');
    // // link.setAttribute('class','delete-item');
    // link.className = 'delete-item secondary-content';
    // link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // li.appendChild(link);

    // taskList.appendChild(li);

    // Create li and append to ul
    CreateTasks(taskInput.value);
    

  };

  // store task to the local storage
  StoreTaskIntoLocalStorage(taskInput.value);

  // clear input
  taskInput.value = '';

  e.preventDefault();
};

function StoreTaskIntoLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Deletes a task from local storage if exists
function RemoveTaskFromLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') !== null){
      tasks = JSON.parse(localStorage.getItem('tasks'));

      for(let i=0;i<tasks.length;i++){
        if(task === tasks[i]){
            tasks.splice(i,1);
        }
      }

      console.log(tasks);
      localStorage.setItem('tasks' , JSON.stringify(tasks));
  }
}

function GetTasksFromLocalStorage(){
   let tasks;
   if(localStorage.getItem('tasks') !== null){
      tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach(function(task){
        CreateTasks(task);
      });
   }
   
};

function CreateTasks(task){
  // create li from scratch
  const li = document.createElement('li');
  li.setAttribute('class','collection-item');
  li.appendChild(document.createTextNode(task));

  const link = document.createElement('a');
  // link.setAttribute('class','delete-item');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);
}