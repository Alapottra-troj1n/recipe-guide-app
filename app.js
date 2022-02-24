const searchBtn = document.querySelector('.search-btn');

const loader = document.querySelector('#spinner');
loader.style.display = 'none';
const foodContainer = document.querySelector('.food-container');

function loading() {
  loader.hidden = false;
  foodContainer.hidden = true;
}
function complete() {
  if(!loader.hidden){
      foodContainer.hidden = false;
      loader.hidden = true;
  }
}


searchBtn.addEventListener('click', ()=>{
    const searchValue = document.querySelector('#search-field').value;

    document.querySelector('#search-field').value = '';

    if(searchValue.length > 0){
      getSearchData(searchValue);
      loader.style.display = 'block';
      loading()
      document.querySelector('.error-input').style.display = 'none';
    }else{
      document.querySelector('.error-input').style.display = 'block';
      const foodContainer = document.querySelector('.food-container');
      foodContainer.textContent = '';
    }

    
   
    

});

const getSearchData = async (recipeId) =>{
        
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeId}`);
    const data = await response.json();
    displaySearchData(data.meals)
    
};

const displaySearchData = (data) =>{
    const foodContainer = document.querySelector('.food-container');
    foodContainer.textContent = '';
    for(food of data){
        const foodId = food.idMeal;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML =`
        <div class="card h-100 pointer" onclick='getDetails(${foodId})'>
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${food.strMeal}</h5>
          <p class="card-text">${food.strInstructions.slice(0,120)}...</p>
        </div>
      </div>
        `;
        foodContainer.appendChild(div);
        complete()
        loader.style.display = 'none';


    }

    

};

const getDetails = foodId =>{
    
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;

    fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data.meals[0]))

};

const showDetails = data =>{
    console.log(data);
    const toast = document.querySelector('#single-recipe');
    toast.textContent = '';
    const toastBody = document.createElement('div');
    toastBody.classList.add('toast-body');
    toastBody.innerHTML = `
    
    <div><img src="${data.strMealThumb}" class="w-50" alt=""></div>
    <h2 class="single-title">${data.strMeal}</h2>
    <div><p class="single-details">${data.strInstructions}</p></div>
     <div class="mt-2 pt-2 border-top">
       <a type="button" href="${data.strYoutube} " class="btn btn-primary btn-sm">
         Video Tutorial
       </a>
       <button
         type="button"
         class="btn btn-secondary btn-sm"
         data-bs-dismiss="toast">
         Close
       </button>
     </div>
    
    `
    toast.appendChild(toastBody);

    toast.classList.add('show');
    
}

