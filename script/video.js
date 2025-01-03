const loadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories));

}


const loadVideos = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(videos => displayVideos(videos.videos));
}



const displayCategories = (data) => {
    const buttonContainer = document.getElementById('button-container');
    data.forEach(item => {
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
    <button class="btn lg:text-xl">${item.category} </button>
    `;
        buttonContainer.append(buttonDiv)
    });
};

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
    <div>
        <figure class="h-60 relative">
            <img class="h-full w-full rounded-lg object-cover"
            src="${video.thumbnail}"
            alt="" />

            ${video?.others?.posted_date? `<span class="absolute right-2 bottom-4 bg-black text-white p-1 rounded-md">${video?.others?.posted_date}</span>` : ''}

            
        </figure>

        <div class="flex gap-3 mt-3">
        <img class="w-10 h-10 object-cover rounded-full" src="${video.authors[0].profile_picture}">
        <div class="space-y-2">
            <div>
            <h2 class="card-title">${video.title}</h2>
            </div>
            <div class="flex gap-2 items-center">
            <p>${video?.authors[0]?.profile_name}</p>
            ${video?.authors[0]?.verified === true? '<img class="w-6" src="./assets/icons8-verified-48.png" alt="">' : ''}
            </div>
            <p>${video?.others?.views}</p>
            
            <div class="card-actions justify-center">
                <button class="btn btn-info">Details</button>
            </div>
        </div>
        </div>
        
    </div>
    `;
        videosContainer.append(videoCard)
    });
}


























loadCategories();
loadVideos()