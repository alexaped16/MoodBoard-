
class moodBoard{
    constructor(){
    this.API_KEY = '563492ad6f9170000100000131a867745c5146cf86366ae1f0f2a969';
        this.gallery = document.querySelector('.gallery');
        this.searchForm = document.querySelector('.header form');
        this.loadMore = document.querySelector('.load-more');
        this.headingTitle = document.querySelector('.heading-title')
        this.pageIndex = 1;
        this.searchValueGlobal = '';
        this.eventHandler();
    }
    eventHandler(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImage(1);
        });
        this.searchForm.addEventListener('submit', (e)=>{
            this.pageIndex = 1;
            this.getSearchedImages(e);
        });
        this.loadMore.addEventListener('click', (e)=>{
            this.loadMoreImages(e);
        })
        this.headingTitle.addEventListener('click',()=>{
            this.pageIndex = 1;
            this.gallery.innerHTML = '';
            this.getImage(this.pageIndex);
        })
    }

    async getImage(index){
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        console.log(data)
    }

    async fetchImages(baseURL){
        const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            authorization: this.API_KEY
        }
        });
        const data = await response.json();
        return data;
    }

    GenerateHTML(photos){
        photos.forEach(photo=>{
        const item= document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
        <a href='${photo.src.original}' target="_blank">
            <img src="${photo.src.medium}">
            <h3>${photo.photographer}</h3>
        </a>
        `;
        this.gallery.appendChild(item)
        })
    }

    async getSearchedImages(e){
        this.loadMore.setAttribute('data-img', 'search');
        
        e.preventDefault();
        this.gallery.innerHTML='';
        const searchValue = e.target.querySelector('input').value;
        this.searchValueGlobal = searchValue;
        const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=12`
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos);
        e.target.reset();
    }

    async getMoreSearchedImages(index){
        const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`
        const data = await this.fetchImages(baseURL);
        console.log(data)
        this.GenerateHTML(data.photos);
    }

    loadMoreImages(e){
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img');
        if(loadMoreData === 'curated'){
        this.getImage(index)
        }else{
        this.getMoreSearchedImages(index);
        }
    }
}

const mB1 = new moodBoard;