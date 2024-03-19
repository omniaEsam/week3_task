let autoBtn = document.getElementById("auto-btn");
let nextBtn = document.getElementById("next-btn");
let prevBtn = document.getElementById("prev-btn");
let randomBtn = document.getElementById("random-btn");
let slider = document.querySelector(".slider")
let currentPostIndex = 0;
let autoplayInterval = null;
let posts = [];

let getPosts = async () => {
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts");
        posts = await response.json();

        for (let i = 0; i < posts.length; i++) {
            let slide = document.createElement("div");
            let title = document.createElement("h1");
            let postBody = document.createElement("p");
            slide.classList.add("slide");
            title.innerHTML = posts[i].title;
            postBody.innerHTML = posts[i].body;
            slide.appendChild(title);
            slide.appendChild(postBody);
            slider.appendChild(slide)
        }

    } catch (err) {
        console.log(err);
    }
    let slides = document.querySelectorAll(".slide");

        let showPost = (index) => {
            slides.forEach((slide, i) => {
                if (i === index) {
                    slide.classList.add("active")
                }
                else {
                    slide.classList.remove("active")
                }
            })
        }
        function nextPost() {
            currentPostIndex++;
            if (currentPostIndex === posts.length) {
                currentPostIndex = 0;
            }
            showPost(currentPostIndex)
        }
        function prevPost() {
            currentPostIndex--;
            if (currentPostIndex < 0) {
                currentPostIndex = posts.length - 1;
            }
            showPost(currentPostIndex)
        }

        function autoPlay() {
            if (!autoplayInterval) {
                autoplayInterval = setInterval(nextPost, 1000);
                autoBtn.innerHTML = "Pause play"
            } else {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
                autoBtn.innerHTML = "Auto play"
            }
        }
        function randomPost() {
            let newIndex = Math.floor(Math.random() * posts.length);
            currentIndex = newIndex;
            showPost(currentIndex);
        }

        nextBtn.addEventListener("click", nextPost)
        prevBtn.addEventListener("click", prevPost)
        autoBtn.addEventListener("click", autoPlay)
        randomBtn.addEventListener("click", randomPost)

        showPost(currentPostIndex)
}
getPosts()


