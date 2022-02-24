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
        <div class="card h-100 pointer">
        <img src="${food.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${food.strMeal}</h5>
          <p class="card-text">${food.strInstructions.slice(0,120)}...</p>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#meal-details" onclick="getDetails(${foodId})">More Details</button>
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
    const modal = document.querySelector('#modal-dialog-box');
   
    const modalBody = document.createElement('div');
    modalBody.classList.add("row", "g-0");
    modalBody.innerHTML = `

       <div class="col-md-4" style="background-image:url(');background-repeat: no-repeat; background-position: center center; background-size: cover;">
          <div style="height:300px"></div>
      </div>
      <div class="col-md-8">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div class="card-body text-start">
              <h3 class="card-title"></h3>
              <p class="area">Type: <span>}</span></p>
              <p class="category">Category: <span></span></p>
              <p class="card-text">...</p>
              <p class="ingredients">Ingredients: <span>
               
              </span><span></span><span>
</span><span></span><span></span><span></span></p>
          </div>
      </div>
    
    
    `
    modal.textContent = '';
    modal.appendChild(modalBody);
    
}


// this is the toast


{/* <div><img src="${data.strMealThumb}" class="w-50" alt=""></div>
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
     </div> */}

