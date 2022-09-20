'use strict'
/* Write functions to: 
   Return the display of the string for a random person,
   Create a node and display the string that represents the person.
   Asynchronously handle the event.
   Add an event listener for the buttons.
*/

function randomChaos(person) {
   return(`
      ${person.name.first}
      ${person.name.last}
      call ${person.phone}
      or write ${person.email}
   `);
}

function finalResults(person) {
   const li = document.createElement('li');
   li.textContent = randomChaos(person);
   const xhrdata = document.getElementById('data');
   xhrdata.appendChild(li);
}

async function peopleSelector(event) {
   event.preventDefault();
   const targetId = event.target.getAttribute('id');
   const url = targetId === 'browsOpt' ? "https://randomuser.me/api/" : "/random-person"

   try {
      const response = await fetch(url);
      const data = await response.json();

      if(response.status == 200){
         finalResults(data.results[0]);
      }
   }catch (error){
      console.error(error)
   }
}

document.addEventListener('DOMContentLoaded', () => {
   const browsOptLink = document.getElementById('browsOpt');
      browsOptLink.addEventListener('click', peopleSelector);

   const servOptLink = document.getElementById('servOpt');
   servOptLink.addEventListener('click', peopleSelector);
});