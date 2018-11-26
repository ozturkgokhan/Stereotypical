
document.getElementById('get-data').addEventListener('click', loadData);

function loadData(){

    //Create an XHR object

    const xhr = new XMLHttpRequest();

    // [OPTIONAL] -> used mostly for spinners/loaders
    xhr.onprogress = function(){
      console.log('READSTATE for onprogress: ' + xhr.readyState);
    };

    xhr.open('GET', 'data.txt', true);

    xhr.onload = function(){
      
      if(this.status === 200){
        document.getElementById('output').innerHTML = `<h1>${this.responseText}</h1>`;
      } else{
        console.log(this.statusText);
      }
    };

    xhr.send();
}