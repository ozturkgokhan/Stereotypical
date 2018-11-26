
document.querySelector('.get-jokes').addEventListener('click' , getJokes);


const test = document.getElementById('test');

function getJokes(e){
  const xhr = new XMLHttpRequest();

  const input = document.getElementById('number').value;

  if(input === 1){
    xhr.open('GET' , 'http://api.icndb.com/jokes/random/', true);
  } else{
    xhr.open('GET' , `http://api.icndb.com/jokes/random/${input}`, true);
  };
  
  xhr.onload = function(){
    if(this.status === 200){
      
      const jokes = JSON.parse(this.responseText);

      const list = document.querySelector('.jokes');

      if(jokes.type === 'success'){
        const values = jokes.value;

        let output = '';
        values.forEach(function(value){
            output += `
              <li>Joke #${value.id}: ${value.joke}</li>
            `;
        });

        list.innerHTML = output;
      }
    };
  }
  xhr.send()

}