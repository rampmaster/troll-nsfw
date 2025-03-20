let scale = 1;
let fontSize = 16;
let isFirstClick = true;
const button = document.getElementById("myButton");
const fonts = ["Arial", "Verdana", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Brush Script MT"];

// Create audio element and set initial volume to 0.1
const audio = new Audio('./assets/music.mp3');
audio.volume = 0.1;

button.onclick = function() {
    scale += 0.2;
    fontSize += 2;
    this.style.transform = `scale(${scale})`;
    this.style.fontSize = `${fontSize}px`;

    if (isFirstClick) {
        this.textContent = "MORE";
        isFirstClick = false;
    } else {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = randomColor;
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        this.style.fontFamily = randomFont;

        // Increase volume by 10% each click, up to a maximum of 100%
        audio.volume = Math.min(audio.volume + 0.1, 1);
    }

    audio.play();

    // Generate a random number of images between 1 and 3
    const numImages = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numImages; i++) {
        fetch('./assets/anim.gif')
            .then(response => response.blob())
            .then(blob => {
                const img = new Image();

                img.onload = function() {
                    img.style.position = 'absolute';

                    // Set the position of the image to a random location on the screen
                    img.style.left = Math.random() * window.innerWidth + 'px';
                    img.style.top = Math.random() * window.innerHeight + 'px';

                    // Set the z-index of the image to a random integer between 1 and 100
                    img.style.zIndex = Math.floor(Math.random() * 100) + 1;

                    img.style.pointerEvents = 'none';

                    // Set the size of the image to a random value between 25% and 90%
                    const size = Math.random() * (50 - 25) + 25;
                    img.style.width = size + '%';
                    img.style.height = 'auto';

                    // Set the opacity of the image to a random value between 0.25 and 0.9
                    img.style.opacity = Math.random() * (0.9 - 0.25) + 0.25;

                    // Append the image to the body of the document
                    document.body.appendChild(img);
                }

                img.src = URL.createObjectURL(blob);
            });
    }}

document.body.onclick = function() {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.getElementById('overlay').style.backgroundColor = randomColor;
}