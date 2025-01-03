const loadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories));




    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(videos => loadVideos(videos.videos));
}



const displayCategories = (data) => {
    const buttonContainer = document.getElementById('button-container');
    data.forEach(item => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
    <button class="btn">${item.category} </button>
    `;
        buttonContainer.append(buttonDiv)
    });
};

const loadVideos = (videos) => {

}
















loadCategories();
