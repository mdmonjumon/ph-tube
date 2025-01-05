const secondToTime = (number) => {
    const years = parseInt(number / 31536000);
    number = number % 31536000;

    const months = parseInt(number / 2592000);
    number = number % 2592000;

    const days = parseInt(number / 86400);
    number = number % 86400;

    const hours = parseInt(number / 3600);
    number = number % 3600


    const minute = parseInt(number / 60);


    if (years === 0) {
        if (months === 0) {
            if (days === 0) {
                if (hours === 0) {
                    return `${minute} minutes ago`;
                }
                return `${hours} hours ${minute} minutes ago`;
            }
            return `${days} days ${hours} hours ${minute} minutes ago`;
        }
        return `${months} months ${days} days ${hours} hours ${minute} minutes ago`;
    }
    return `${years} years ${months} months ${days} days ${hours} hours ${minute} minutes ago`;
};



// category fetch from api
const loadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories));

}

// video fetch from api
const loadVideos = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(videos => displayVideos(videos.videos));
}

// fetch category base videos from api
const loadCategoriesBaseVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            displayVideos(data.category)
            
            // category button active class remove
            removeClass()
            // active button class add
            const activeButton = document.getElementById(`btn-${id}`)
            activeButton.classList.add('btn-secondary')
            
        });
}

// fetch search content base videos from api
document.getElementById('search-box').addEventListener('keyup', (e) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${e.target.value}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
})

// fetch video details
const loadDetails = (details) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${details}`)
        .then(res => res.json())
        .then(data => viewDetails(data.video))
}


// remove class function
const removeClass = ()=>{
    const allButton = document.getElementsByClassName('category-btn')
    for(const button of allButton){
        button.classList.remove('btn-secondary');
    }
}

// display categories button
const displayCategories = (data) => {
    const buttonContainer = document.getElementById('button-container');
    data.forEach(item => {
        
        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = `
    <button id=btn-${item.category_id} onclick="loadCategoriesBaseVideo(${item.category_id})" class="btn lg:text-xl category-btn">${item.category} </button>
    `;
        buttonContainer.append(buttonDiv)
    });
};

const buttons = document.getElementsByClassName('category-btn');
console.log(buttons)



// display all videos
const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = "";

    if (videos.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex flex-col gap-6 justify-center items-center h-80">
        <img src="./assets/Icon.png">
        <p class="text-2xl font-bold"> Oops!! sorry, There is no content here</p>
        </div>
        `;
        videosContainer.classList.remove('grid');
        videosContainer.append(div);
    }

    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videosContainer.classList.add('grid');
        videoCard.innerHTML = `
        
    <div>
        <figure class="h-60 relative">
            <img class="h-full w-full rounded-lg object-cover"
            src="${video.thumbnail}"
            alt="" />
            ${video?.others?.posted_date ? `<span class="absolute right-2 bottom-4 bg-black text-white p-1 rounded-md text-xs">${secondToTime(video?.others?.posted_date)}</span>` : ''}
        </figure>

        <div class="flex gap-3 mt-3">
        <img class="w-10 h-10 object-cover rounded-full" src="${video.authors[0].profile_picture}">
        <div class="space-y-2">
            <div>
            <h2 class="card-title">${video.title}</h2>
            </div>
            <div class="flex gap-2 items-center">
            <p>${video?.authors[0]?.profile_name}</p>
            ${video?.authors[0]?.verified === true ? '<img class="w-6" src="./assets/icons8-verified-48.png" alt="">' : ''}
            </div>
            <p>${video?.others?.views}</p>
            
            <div class="card-actions justify-center">
                <button onclick="loadDetails('${video.video_id}')" class="btn btn-info">Details</button>
            </div>
        </div>
        </div>
        
    </div>
    `;
        videosContainer.append(videoCard)
    });
}


const viewDetails = (details) => {
    const modalContainer = document.getElementById('modal');
    modalContainer.innerHTML = `
<!-- Open the modal using ID.showModal() method -->
<dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box space-y-2">
    <img class="w-full" src="${details.thumbnail}">
    <h3 class="text-xl font-bold">Title: ${details.title}</h3>
    <p>Authors: ${details.authors[0].profile_name}</p>
    <p>${details.description}</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
`;
    my_modal_5.showModal()
}






loadCategories();
loadVideos()