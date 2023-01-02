const loadNewsCategories = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(categories => displayNewsCategories(categories.data.news_category))
    .catch(error => console.log(error))
}

const displayNewsCategories = categories => {
    const newsCategoryContainer = document.getElementById('news-categories')
    categories.forEach(newsCategory => {
        const {category_id, category_name } = newsCategory;
        const newsCategoryName = document.createElement('li')
        newsCategoryName.classList.add('nav-item')
        newsCategoryName.innerHTML = `
        <a onclick="searchNews('${category_id}')" class="nav-link  me-lg-4 me-xxl-5 fw-bold" aria-current="page" href="#">${category_name}</a>
        `;
        newsCategoryContainer.appendChild(newsCategoryName)
    })
}
loadNewsCategories();

const loadIndividualNews = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
        .then(res => res.json())
        .then(data => displayIndividualNews(data.data))
        .catch(error => console.log(error))
}

const displayIndividualNews = individualNews => {
    individualNews.sort((first, last) => last.total_view - first.total_view);
    const individualNewsField = document.getElementById('individual-news-container')
    individualNewsField.innerHTML = ''
    individualNews.forEach(singleNews => {
    const {thumbnail_url, title, details, author, total_view , _id } = singleNews;
        
    const individualNewsDiv = document.createElement('div')
        individualNewsDiv.classList.add("col");
        individualNewsDiv.innerHTML = `
    <div class="card h-100">
        <img src="${thumbnail_url}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title fw-bold">${title}</h5>
          <p class="card-text text-justify">${details.slice(0, 200)}...</p>
        </div>
        <div class=" d-flex justify-content-between align-items-center ms-4 my-4">
            <div class="d-flex  align-items-center ms-3 ">
            <img src="${author.img}" class="img-fluid  rounded-circle" alt="..." width="50" height="50" >
                <div class="ms-2 ">
                <h6 >${author.name ? author.name : 'No Author'}</h6>
                </div>
            </div>
            <div class="ms-3 ">
                <h6 >${total_view ? total_view : 'No Views Available'}</h6>
            </div>
            <div class="me-3 ">
            <button onclick="loadNewsDetails('${_id}')" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">Details</button>
            </div>
        </div>
    </div>
        `;
        individualNewsField.appendChild(individualNewsDiv)
    })
    toggleSpinner(false)
    const newsCountContainer = document.getElementById('news-count-field')
    newsCountContainer.innerText = individualNews.length
}

const searchNews = (id) => {
    loadIndividualNews(id)
    toggleSpinner(true)
}


const toggleSpinner = isLoading => {
    const newsLoading = document.getElementById('spinner')

    if (isLoading) {
        newsLoading.classList.remove('d-none')
    }
    else {
        newsLoading.classList.add('d-none')
    }
}

loadIndividualNews('02')

const loadNewsDetails = id => {
    fetch(` https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch(error => console.log(error))
}


const displayNewsDetails = news => {
    console.log(news)
    const newsTitle = document.getElementById('newsDetailsModalLabel')

    newsTitle.innerText = `${news.title}`;
    const newsDetailsBody = document.getElementById('newsDetailsCard')
    newsDetailsBody.innerHTML = `
    <img src="${news.thumbnail_url}" class="card-img-top" alt="...">
    <h6 class="fw-bold" >Author Name: ${news.author.name ? news.author.name : 'No author name'}</h6>
    <h6 class="card-title fw-bold" >Total View: ${news.total_view ? news.total_view : 'No view count'}</h6>
    <h6 class="card-title fw-bold">Rating: ${news.rating.number ? news.rating.number : 'No rating'}</h6>
    <p class="text-justify" > Details: ${news.details ? news.details : 'No Details'}</p>
    <p class="card-title fw-bold"> Published Details: ${news.author.published_date ? news.author.published_date : 'No Details'}</p>
    `
}

