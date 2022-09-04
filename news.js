const loadCategories =async()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res =await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);

}
const displayCategories = (categories)=>{
    const categoriesContainer = document.getElementById('news-container');
    categories.forEach(item=>{
        const ul = document.createElement('ul');
        ul.classList.add('menu', 'menu-horizontal','rounded-box')
        ul.innerHTML =`
        <div class="row row-cols-auto list-unstyled  mx-auto d-block">
        <li><a onclick ="loadCatDetails('${item.category_id}')">${item.category_name}</a></li>
        </div>
        `;

        categoriesContainer.appendChild(ul)
    })
}


loadCategories();