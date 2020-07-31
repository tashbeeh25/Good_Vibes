const url = "http://localhost:3000/posts"
// Grab relevant HTML elements used throughout JS
const post = document.getElementById('Post');
const post2 = document.getElementById('Post2');
post2.style.display = "none"
const postContainer = document.getElementById("postContainer");

// INSERT PREVIOUS POSTS INTO POSTCONTAINER START -------------------------------------------------------------------------------------------------- //
fetch('http://localhost:3000/posts')
    .then(r => r.json())
    .then(jsonData => insertPost(jsonData))
    .catch(console.warn);
    
function insertPost(post){
    for (let i = 0; i < post.length; i++) {
        // Select individual post
        let postObject = post[i]; 

        // Create elements to store input from server
        let article = document.createElement("article");
        let articleHead = document.createElement("h1");
        let articleBody = document.createElement("p");
        let articleGIF = document.createElement("img");

        // // Create an object to store names, codes, and counters for emojis
        // emojiList = [{name:"love", code:"&#128525", count:0},
        //              {name:"cry", code:"&#128557", count:0},
        //              {name:"laugh", code:"&#128514", count:0},
        //              {name:"embarassed", code:"&#128517", count:0}]
        
        // // IMPORTANT, naming variables dynamically doesn't work here (I don't know why) so instead everything must be typed out
        // let loveEmoji = document.createElement("div");
        // let loveEmojiCounter = document.createElement("div");
        // let loveEmojiContainer = document.createElement("div");

        // let cryEmoji = document.createElement("div");
        // let cryEmojiCounter = document.createElement("div");
        // let cryEmojiContainer = document.createElement("div");

        // let laughEmoji = document.createElement("div");
        // let laughEmojiCounter = document.createElement("div");
        // let laughEmojiContainer = document.createElement("div");

        // let embarrassedEmoji = document.createElement("div");
        // let embarrassedEmojiCounter = document.createElement("div");
        // let embarrassedEmojiContainer = document.createElement("div");

        // let emojiContainer = document.createElement("div");

        // Get content for elements declared above
        let titles = postObject.title;
        let bodys = postObject.body;
        // Only try to render a gif if the server sends one
        if (postObject.gifUrl !== undefined){
            let gif = postObject.gifUrl;
            articleGIF.src = gif;
        }

        // Populate elements with data from server
        articleHead.textContent = titles;
        articleBody.textContent = bodys;

        // // // Set attributes for emojis including their image src, id, class, and number of clicks - doing this dynamically doesn't work
        // loveEmoji.innerHTML = "&#128525;";
        // loveEmoji.setAttribute('id', 'love');
        // loveEmojiContainer.setAttribute('class', 'smallEmojiContainer');
        // loveEmojiCounter.textContent = 0;

        // cryEmoji.innerHTML = "&#128557;";
        // cryEmoji.setAttribute('id', 'cry');
        // cryEmojiContainer.setAttribute('class', 'smallEmojiContainer');
        // cryEmojiCounter.textContent = 0;

        // laughEmoji.innerHTML = "&#128514;";
        // laughEmoji.setAttribute('id', 'laugh');
        // laughEmojiContainer.setAttribute('class', 'smallEmojiContainer');
        // laughEmojiCounter.textContent = 0;

        // embarrassedEmoji.innerHTML = "&#128517;";
        // embarrassedEmoji.setAttribute('id', 'embarrassed');
        // embarrassedEmojiContainer.setAttribute('class', 'smallEmojiContainer');
        // embarrassedEmojiCounter.textContent = 0;

        // emojiContainer.setAttribute('id','emojiContainer');

        // // Adding emojis to their individual containers, then adding these containers to the overall emoji container
        // loveEmojiContainer.appendChild(loveEmoji);
        // loveEmojiContainer.appendChild(loveEmojiCounter);
        // emojiContainer.appendChild(loveEmojiContainer);

        // cryEmojiContainer.appendChild(cryEmoji);
        // cryEmojiContainer.appendChild(cryEmojiCounter);
        // emojiContainer.appendChild(cryEmojiContainer);

        // laughEmojiContainer.appendChild(laughEmoji);
        // laughEmojiContainer.appendChild(laughEmojiCounter);
        // emojiContainer.appendChild(laughEmojiContainer);

        // embarrassedEmojiContainer.appendChild(embarrassedEmoji);
        // embarrassedEmojiContainer.appendChild(embarrassedEmojiCounter);
        // emojiContainer.appendChild(embarrassedEmojiContainer);

        // ATHEER START //
        let showComments = document.createElement("input");
        let commentForm = document.createElement("div"); 
        let commentField = document.createElement("input");
        let commentSubmit = document.createElement("input");
        let commentContainer = document.createElement("section"); //Creates section where all comments can be viewed
        
        showComments.setAttribute("type", "button");
        showComments.id = `showComments${i}`;
        showComments.setAttribute("onclick", "showComments(this)");
        showComments.style.cssText = "width: 10rem; padding: 1rem 1rem 1rem 0rem; margin: 0rem 1rem 1rem 1rem; font-family: 'Nanum Gothic', sans-serif; font-size: 1rem; border: none; border-radius: 0.2rem;"
        showComments.style.cursor = "pointer";

        commentContainer.id = `commentContainer${i}`; // assigns comment container a unique id based on the position of the post
        commentContainer.style.display = "none";
        commentForm.id = `commentForm${i}`;
        
        commentField.setAttribute("type", "text");
        commentField.id = `commentField${i}`;
        commentField.style.cssText = "width: 20rem; padding: 1rem; margin: 0rem 1rem 1rem 1rem; font-family: 'Nanum Gothic', sans-serif; font-size: 1rem; border: grey solid; border-radius: 0.2rem;"
        
        commentSubmit.setAttribute("type", "button");  
        commentSubmit.setAttribute("value", "Add Comment");
        commentSubmit.setAttribute("onclick", "postComment(this)")
        commentSubmit.style.cssText = "width: 10rem; padding: 1rem 0rem 1rem 1rem; margin: 0rem 1rem 1rem 1rem; font-family: 'Nanum Gothic', sans-serif; font-size: 1rem; border: none; border-radius: 0.2rem;"
        commentSubmit.id = `commentSubmit${i}`;


        commentForm.appendChild(commentField);
        commentForm.appendChild(commentSubmit);
        commentContainer.appendChild(commentForm);

        // Display all previous posted comments
        let previousComments = postObject.comments;
        for (let i = 0; i <= previousComments.length; i++) {
            showComments.setAttribute("value", `Comments (${previousComments.length})`);
            let commentElement = document.createElement("p")
            let comment = postObject.comments[i];
            commentElement.textContent = comment;
            commentElement.style.cssText = "margin: 0.5rem 0rem 0.5rem 1rem"
            commentContainer.appendChild(commentElement);
        }
        // ATHEER END //

        // Append elements to an article and append article to container section
        article.appendChild(articleHead);
        article.appendChild(articleBody);
        article.appendChild(articleGIF);

        addEmojiBar(article, articleHead, articleBody)

        postContainer.appendChild(article);

        // ATHEER START //
        postContainer.appendChild(showComments);
        postContainer.appendChild(commentContainer);
        // ATHEER END //

        // if (articleHead.textContent !== "" || articleBody.textContent !== ""){
        //     article.appendChild(emojiContainer);
        // }

        // // Make cursor into a pointer over emojis
        // loveEmoji.style.cursor = "pointer";
        // cryEmoji.style.cursor = "pointer";
        // laughEmoji.style.cursor = "pointer";
        // embarrassedEmoji.style.cursor = "pointer";


        // // Increase count upon clicking
        // loveEmoji.addEventListener("click", e => {
        //     loveEmojiCounter.textContent = parseInt(loveEmojiCounter.textContent) + 1;
        // })
        // cryEmoji.addEventListener("click", e => {
        //     cryEmojiCounter.textContent = parseInt(cryEmojiCounter.textContent) + 1;
        // })
        // laughEmoji.addEventListener("click", e => {
        //     laughEmojiCounter.textContent = parseInt(laughEmojiCounter.textContent) + 1;
        // })
        // embarrassedEmoji.addEventListener("click", e => {
        //     embarrassedEmojiCounter.textContent = parseInt(embarrassedEmojiCounter.textContent) + 1;
        // })
    }
}
// INSERT PREVIOUS POSTS INTO POSTCONTAINER END -------------------------------------------------------------------------------------------------- //

    
    
// GIF FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- // 
// Declare variables to access the Add Gif button and store a giphy key
const gifButton = document.getElementById('addGif');
const gifKey = "eUsp384YG39Rydonft2tUgjPPx7tMv7d";

// Get container for the gifs, which will store our search results
let gifContainer = document.getElementById("gifContainer");

// A counter to prevent further clicks generating a search bar after the initial click
let gifButtonClickCounter = 0;
gifButton.addEventListener("click", e => {
    if (gifButtonClickCounter === 0){
        gifButtonClickCounter++
        // Create search field for user to type gif and a button next to it, style them so that they are next to eachother
        // Styling via CSS does not seem to work so this is being done in the JS
        let searchField = document.createElement("input");
        searchField.style.display = 'inline-block';
        searchField.style.margin = "0rem 1rem 1rem 1rem";
        searchField.style.height = "2rem";
        searchField.style.width = "39%";

        let searchButton = document.createElement("button");
        searchButton.style.display = 'inline-block';
        searchField.setAttribute("id","searchButton");
        searchButton.style.height = "2.4rem";
        searchButton.style.width = "10%";
        searchButton.style.fontFamily = "Nanum Gothic"
        searchButton.textContent = "Search";

        // Get section of HTML that will store and render the search bar and append our search field to it
        let searchBarArea = document.getElementById("searchBar");
        searchBarArea.appendChild(searchField);
        searchBarArea.appendChild(searchButton);

        let cancelGif = document.createElement("button");
        cancelGif.style.display = 'inline-block';
        cancelGif.setAttribute("id","cancelGif");
        cancelGif.style.height = "2.4rem";
        cancelGif.style.width = "10%";
        cancelGif.style.fontFamily = "Nanum Gothic"
        cancelGif.textContent = "Cancel";
        
        searchBarArea.appendChild(cancelGif);

        // Listen for a click on the search button, then fetch the giphy API, using the user's query to return relevant gifs
        searchButton.addEventListener("click", e => { 
            // Empty our gif field
            gifContainer.innerHTML = "";

            let searchQuery = searchField.value;
            
            // Asynchronous function that gets data from giphy, extracts the body and returns JSON data if successful
            async function fetchData() {
                try {
                    const res = await fetch(`http://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=${gifKey}&limit=6`);
                    const data = await res.json();
                    return data;
                } catch (error) {
                    console.warn(error);
                }
            }

            // Function that uses the data fetched in a variable, we need to wait for the promise to resolve before working withe the data
            let dataStore;
            let pickImg;
            async function useData() {
                // Evaluation paused until fetchData() is resolved
                dataStore = await fetchData();

                let imgArray = [];
                let gifContainerSmall = document.createElement("div")
                for (let i = 0; i < dataStore.data.length; i++){
                    imgArray[i] = document.createElement("img");
                    imgArray[i].src = dataStore.data[i].images.fixed_height.url;
                    gifContainerSmall.appendChild(imgArray[i]);
                }

                gifContainer.appendChild(gifContainerSmall);

                cancelGif.addEventListener("click", e => {
                    gifButtonClickCounter--;
                    gifContainer.innerHTML = "";
                    searchBarArea.innerHTML = "";
                })

                for (let i = 0; i < dataStore.data.length; i++){
                    // Listen for clicks on gifs and store the url of the gif the user picks
                    imgArray[i].addEventListener("click", e => {
                        event.preventDefault()
                        pickImg = imgArray[i].src;

                        // Select only one gif and give it a green border
                        for (let j = 0; j < dataStore.data.length; j++){
                            imgArray[j].style.border = "none";
                        }
                        imgArray[i].style.border = "0.5rem solid green";

                        // Since this is asynchronous, we can remove the event listeners for the regular case as they will be
                        // evaluated before the asynchornous event listeners are

                        post.style.display = "none";
                        post2.style.display = "inline-block";

                        post2.addEventListener("click", switcharoo)
                        post2.addEventListener("click", renderPostWithGif);
                        post2.addEventListener("click", sendPostWithGif);

                        function renderPostWithGif(e){
                            e.preventDefault()
                            renderPost(e, pickImg);
                        }

                        function switcharoo(e){
                            e.preventDefault()
                            post.style.display = "inline-block";
                            post2.style.display = "none";
                        }

                        function sendPostWithGif(e){
                            e.preventDefault()
                            sendPost(e, pickImg);
                        }
                    })
                }
            }
            // Execute the above function
            useData();
        })
    }
})


// ADD NEW POST FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
// Upon submit, display user input on current page
post.addEventListener("click", renderPost);
post.addEventListener("click", sendPost);

    
// function makePost(e, gifUrl = undefined){
//     e.preventDefault();

//     // Grab textContent of post title and post body
//     // Ensure you use .value to access the input the user makes
//     let postTitle = document.getElementById("postTitle").value;
//     let postBody = document.getElementById("postBody").value;
    
//     // Only grabs a gif if the user has attached one
//     if (gifUrl !== undefined){
//         let articleGIF = document.createElement("img");
//         articleGIF.src = gifUrl;
//     }

//     // Update page with new post - create article, h2, p, emojiContainer (div), and emojis for new post
//     let article = document.createElement("article");
//     let articleHead = document.createElement("h2");
//     let articleBody = document.createElement("p");

//     articleHead.textContent = postTitle;
//     articleBody.textContent = postBody;

//     // Append title, body and image to article
//     article.appendChild(articleHead);
//     article.appendChild(articleBody);
//     if (gifUrl !== undefined){
//         article.appendChild(articleGIF);
//     }

//     addEmojiBar(article, articleHead, articleBody)
    
//     // Render entire post on page
//     postContainer.appendChild(article);

//     // Clear text from input forms
//     document.getElementById("postTitle").value = "";
//     document.getElementById("postBody").value = "";
//     gifButtonClickCounter--
// }

//     // Grab textContent of post title and post body
//     // Ensure you use .value to access the input the user makes
//     let postTitle = document.getElementById("postTitle").value;
//     let postBody = document.getElementById("postBody").value;
//     // Only grabs a gif if the user has attached one
//     if (document.getElementById('postGIF')){
//         let gifUrl = document.getElementById('postGIF').src;
//     }

//     // Update page with new post - create article, h2, p, emojiContainer (div), and emojis for new post
//     let article = document.createElement("article");
//     let articleHead = document.createElement("h2");
//     let articleBody = document.createElement("p");
//     let articleGIF = document.createElement("img");

//     // // Create an object to store names, codes, and counters for emojis
//     // emojiList = [{name:"love", code:128525, count:0},
//     //              {name:"cry", code:128557, count:0},
//     //              {name:"laugh", code:128514, count:0},
//     //              {name:"embarrassed", code:128517, count:0}]

//     // // List of emojis, used to dynamically define all emoji elements, also allows the addition of more emojis with relative ease
//     // // Note that the variables must be declared gloablly with var for this to work, const and let result in the declaration being undefined
//     // for (let emoji of emojiList){
//     //     eval('var ' + emoji.name + 'Emoji' + '= ' + 'document.createElement("div")' + ';');
//     //     eval('var ' + emoji.name + 'EmojiCounter' + '= ' + 'document.createElement("div")' + ';');
//     //     eval('var ' + emoji.name + 'EmojiContainer' + '= ' + 'document.createElement("div")' + ';');
//     // }

//     // let emojiContainer = document.createElement("div");

//     // Populate elements
//     articleHead.textContent = postTitle;
//     articleBody.textContent = postBody;
//     // Only assigns gif if the user has attached one
//     if (document.getElementById('postGIF')){
//         articleGIF = postGIF;
//     }

//     // // Set attributes for emojis dynamically including their image src, id, class, and number of clicks
//     // for (let emoji of emojiList){
//     //     // The below line only works if innerHTML is used instead of textContent
//     //     eval(`${emoji.name}Emoji.innerHTML = "&#${emoji.code};";`);
//     //     eval(`${emoji.name}Emoji.setAttribute('id', "${emoji.name}");`);
//     //     eval(`${emoji.name}EmojiContainer.setAttribute('class', 'smallEmojiContainer');`);
//     //     eval(`${emoji.name}EmojiCounter.textContent = ${emoji.count};`)
//     // }

//     // emojiContainer.setAttribute('id','emojiContainer');

//     // // Adding emojis to their individual containers, then adding these containers to the overall emoji container
//     // for (let emoji of emojiList){
//     //     eval(`${emoji.name}EmojiContainer.appendChild(${emoji.name}Emoji);`);
//     //     eval(`${emoji.name}EmojiContainer.appendChild(${emoji.name}EmojiCounter);`);
//     //     eval(`emojiContainer.appendChild(${emoji.name}EmojiContainer);`)
//     // }

//     // Append title, body and image to article
//     article.appendChild(articleHead);
//     article.appendChild(articleBody);
//     article.appendChild(articleGIF);
//     // Only display emojis if the user posts something
//     // if (articleHead.textContent !== "" || articleBody.textContent !== ""){
//     //     article.appendChild(emojiContainer);
//     // }
//     addEmojiBar(article, articleHead, articleBody)
//     postContainer.appendChild(article);


//     // Clear text from input forms
//     document.getElementById("postTitle").value = "";
//     document.getElementById("postBody").value = "";


//     // // Add clicking functionality to emojis
//     // loveEmoji.addEventListener("click", e => {
//     //     loveEmojiCounter.textContent = parseInt(loveEmojiCounter.textContent) + 1;
//     // })
//     // cryEmoji.addEventListener("click", e => {
//     //     cryEmojiCounter.textContent = parseInt(cryEmojiCounter.textContent) + 1;
//     // })
//     // laughEmoji.addEventListener("click", e => {
//     //     laughEmojiCounter.textContent = parseInt(laughEmojiCounter.textContent) + 1;
//     // })
//     // embarrassedEmoji.addEventListener("click", e => {
//     //     embarrassedEmojiCounter.textContent = parseInt(embarrassedEmojiCounter.textContent) + 1;
//     // })



//     gifButtonClickCounter--
// });
// // ADD NEW POST FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //


// const loveEmoji = document.getElementById('love')
// loveEmoji.addEventListener("click", e => {
//     loveEmojiCounter++;
// })


// SEND TO SERVER FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
// Upon submit, send user input to server

function sendPost(e, gifUrl=undefined){

    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;

    //let postToSend = {title: postTitle, body: postBody, gifUrl: gifUrl};
    let postToSend = {title: postTitle, body: postBody, gifUrl: gifUrl, comments: []};


    let options = {
        method: 'POST',
        headers: {
            'ContentType': 'application/json'
        },
        body: JSON.stringify(postToSend)
    }
    
    fetch('http://localhost:3000/posts', options)
    .then(r => r.json())
    .catch(console.warn);

    // // Clear text from input forms, remove all gifs, remove gif search bar
    // // DO THIS ONLY AFTER ALL FUNCTIONALITY HAS BEEN INCLUDED
    //document.getElementById("postTitle").value = "";
    //document.getElementById("postBody").value = "";
    
    // All variabes to be cleared are global, except for the searchbar area
    let searchBarArea = document.getElementById("searchBar");
    console.log(gifButtonClickCounter);
    if (gifButtonClickCounter !== 0){
        gifButtonClickCounter--;
    }
    gifContainer.innerHTML = "";
    searchBarArea.innerHTML = "";
}
//     e.preventDefault();

//     let postTitle = document.getElementById("postTitle").value;
//     let postBody = document.getElementById("postBody").value;
//     // Create empty variable to store gifUrl, but only use it if a user attaches a gif
//     let gifUrl;
//     if (document.getElementById('postGIF')){
//         gifUrl = document.getElementById("postGIF").src;
//     }

//     // Creating post object to store user post
//     // Sends an empty gif URL if user doesn't choose a gif
//     let post = {title: postTitle, body: postBody, gifUrl: gifUrl}

//     let options = {
//         method: 'POST',
//         headers: {
//             'ContentType': 'application/json'
//         },
//         body: JSON.stringify(post)
//     }
    
//     fetch('http://localhost:3000/posts', options)
//     .then(r => r.json())
//     .catch(console.warn);
// });
// SEND TO SERVER FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //



// DISCARD FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
const discard = document.getElementById("Discard")
discard.addEventListener("click", e => {
    if (confirm("Are you sure you want to discard your post?")){
        window.location.reload();
    } else {
        // Do nothing
    }
})
// DISCARD FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //


// CHARACTER COUNT FUNCTIONALITY START ------------------------------------------------------------------------------------------------------------------- //
function countCharacters() {
    const titleCharacter = document.querySelector('#titleCount');
    const bodyCharacter = document.querySelector('#bodyCount');
    let postTitle = document.getElementById("postTitle");
    let postBody = document.getElementById("postBody");

    let titleMaxLength = 300;
    let bodyMaxLength = 10000;
    let titleLength = postTitle.value.length;
    let bodyLength = postBody.value.length;
    
    if (titleLength <= titleMaxLength) {
        titleCharacter.textContent = `Remaining Characters: ${titleMaxLength - titleLength}`
    }

    if (bodyLength <= bodyMaxLength) {
        bodyCharacter.textContent = `Remaining Characters: ${bodyMaxLength - bodyLength}`
    }
}

postTitle.addEventListener('keyup', countCharacters);
postBody.addEventListener('keyup', countCharacters);
// CHARACTER COUNT FUNCTIONALITY END ------------------------------------------------------------------------------------------------------------------- //


// NEW CLEANER CODE //

// FUNCTION TO ADD EMOJIS START //
function addEmojiBar(article, articleHead, articleBody){
     // Create an object to store names, codes, and counters for emojis
     emojiList = [{name:"love", code:"&#128525", count:0},
     {name:"cry", code:"&#128557", count:0},
     {name:"laugh", code:"&#128514", count:0},
     {name:"embarassed", code:"&#128517", count:0}]

    // IMPORTANT, naming variables dynamically doesn't work here (I don't know why) so instead everything must be typed out
    let loveEmoji = document.createElement("div");
    let loveEmojiCounter = document.createElement("div");
    let loveEmojiContainer = document.createElement("div");

    let cryEmoji = document.createElement("div");
    let cryEmojiCounter = document.createElement("div");
    let cryEmojiContainer = document.createElement("div");

    let laughEmoji = document.createElement("div");
    let laughEmojiCounter = document.createElement("div");
    let laughEmojiContainer = document.createElement("div");

    let embarrassedEmoji = document.createElement("div");
    let embarrassedEmojiCounter = document.createElement("div");
    let embarrassedEmojiContainer = document.createElement("div");

    let emojiContainer = document.createElement("div");

    // // Set attributes for emojis including their image src, id, class, and number of clicks - doing this dynamically doesn't work
    loveEmoji.innerHTML = "&#128525;";
    loveEmoji.setAttribute('id', 'love');
    loveEmojiContainer.setAttribute('class', 'smallEmojiContainer');
    loveEmojiCounter.textContent = 0;

    cryEmoji.innerHTML = "&#128557;";
    cryEmoji.setAttribute('id', 'cry');
    cryEmojiContainer.setAttribute('class', 'smallEmojiContainer');
    cryEmojiCounter.textContent = 0;

    laughEmoji.innerHTML = "&#128514;";
    laughEmoji.setAttribute('id', 'laugh');
    laughEmojiContainer.setAttribute('class', 'smallEmojiContainer');
    laughEmojiCounter.textContent = 0;

    embarrassedEmoji.innerHTML = "&#128517;";
    embarrassedEmoji.setAttribute('id', 'embarrassed');
    embarrassedEmojiContainer.setAttribute('class', 'smallEmojiContainer');
    embarrassedEmojiCounter.textContent = 0;

    emojiContainer.setAttribute('id','emojiContainer');

    // Adding emojis to their individual containers, then adding these containers to the overall emoji container
    loveEmojiContainer.appendChild(loveEmoji);
    loveEmojiContainer.appendChild(loveEmojiCounter);
    emojiContainer.appendChild(loveEmojiContainer);

    cryEmojiContainer.appendChild(cryEmoji);
    cryEmojiContainer.appendChild(cryEmojiCounter);
    emojiContainer.appendChild(cryEmojiContainer);

    laughEmojiContainer.appendChild(laughEmoji);
    laughEmojiContainer.appendChild(laughEmojiCounter);
    emojiContainer.appendChild(laughEmojiContainer);

    embarrassedEmojiContainer.appendChild(embarrassedEmoji);
    embarrassedEmojiContainer.appendChild(embarrassedEmojiCounter);
    emojiContainer.appendChild(embarrassedEmojiContainer);

    if (articleHead.textContent !== "" || articleBody.textContent !== ""){
        article.appendChild(emojiContainer);
    }

    // Make cursor into a pointer over emojis
    loveEmoji.style.cursor = "pointer";
    cryEmoji.style.cursor = "pointer";
    laughEmoji.style.cursor = "pointer";
    embarrassedEmoji.style.cursor = "pointer";

    // Increase count upon clicking
    loveEmoji.addEventListener("click", e => {
        if (loveEmojiCounter.textContent == 0){
            loveEmojiCounter.textContent = parseInt(loveEmojiCounter.textContent) + 1;
            cryEmojiContainer.style.visibility = "hidden";
            cryEmojiContainer.style.position = "absolute";
            laughEmojiContainer.style.visibility = "hidden";
            laughEmojiContainer.style.position = "absolute";
            embarrassedEmojiContainer.style.visibility = "hidden";
            embarrassedEmojiContainer.style.position = "absolute";
        } else {
            loveEmojiCounter.textContent = parseInt(loveEmojiCounter.textContent) - 1;
            cryEmojiContainer.style.visibility = "visible"
            cryEmojiContainer.style.position = "static";
            laughEmojiContainer.style.visibility = "visible";
            laughEmojiContainer.style.position = "static";
            embarrassedEmojiContainer.style.visibility = "visible";
            embarrassedEmojiContainer.style.position = "static";
        }
    })
    cryEmoji.addEventListener("click", e => {
        if (cryEmojiCounter.textContent == 0){
            cryEmojiCounter.textContent = parseInt(cryEmojiCounter.textContent) + 1;
            loveEmojiContainer.style.visibility = "hidden";
            loveEmojiContainer.style.position = "absolute";
            laughEmojiContainer.style.visibility = "hidden";
            laughEmojiContainer.style.position = "absolute";
            embarrassedEmojiContainer.style.visibility = "hidden";
            embarrassedEmojiContainer.style.position = "absolute";
        } else {
            cryEmojiCounter.textContent = parseInt(cryEmojiCounter.textContent) - 1;
            loveEmojiContainer.style.visibility = "visible"
            loveEmojiContainer.style.position = "static";
            laughEmojiContainer.style.visibility = "visible";
            laughEmojiContainer.style.position = "static";
            embarrassedEmojiContainer.style.visibility = "visible";
            embarrassedEmojiContainer.style.position = "static";
        }
    })
    laughEmoji.addEventListener("click", e => {
        if (laughEmojiCounter.textContent == 0){
            laughEmojiCounter.textContent = parseInt(laughEmojiCounter.textContent) + 1;
            cryEmojiContainer.style.visibility = "hidden";
            cryEmojiContainer.style.position = "absolute";
            loveEmojiContainer.style.visibility = "hidden";
            loveEmojiContainer.style.position = "absolute";
            embarrassedEmojiContainer.style.visibility = "hidden";
            embarrassedEmojiContainer.style.position = "absolute";
        } else {
            laughEmojiCounter.textContent = parseInt(laughEmojiCounter.textContent) - 1;
            cryEmojiContainer.style.visibility = "visible"
            cryEmojiContainer.style.position = "static";
            loveEmojiContainer.style.visibility = "visible";
            loveEmojiContainer.style.position = "static";
            embarrassedEmojiContainer.style.visibility = "visible";
            embarrassedEmojiContainer.style.position = "static";
        }
    })
    embarrassedEmoji.addEventListener("click", e => {
        if (embarrassedEmojiCounter.textContent == 0){
            embarrassedEmojiCounter.textContent = parseInt(embarrassedEmojiCounter.textContent) + 1;
            cryEmojiContainer.style.visibility = "hidden";
            cryEmojiContainer.style.position = "absolute";
            loveEmojiContainer.style.visibility = "hidden";
            loveEmojiContainer.style.position = "absolute";
            laughEmojiContainer.style.visibility = "hidden";
            laughEmojiContainer.style.position = "absolute";
        } else {
            embarrassedEmojiCounter.textContent = parseInt(embarrassedEmojiCounter.textContent) - 1;
            cryEmojiContainer.style.visibility = "visible"
            cryEmojiContainer.style.position = "static";
            loveEmojiContainer.style.visibility = "visible";
            loveEmojiContainer.style.position = "static";
            laughEmojiContainer.style.visibility = "visible";
            laughEmojiContainer.style.position = "static";
        }
    })
}
// FUNCTION TO ADD EMOJIS END //


// FUNCTION TO RENDER POSTS //
function renderPost(e, gifUrl=undefined){
    e.preventDefault();

    // Grab textContent of post title and post body
    // Ensure you use .value to access the input the user makes
    let postTitle = document.getElementById("postTitle").value;
    let postBody = document.getElementById("postBody").value;
    let articleGif = document.createElement("img");
    
    // Only grabs a gif if the user has attached one
    if (gifUrl !== undefined){
        articleGif.src = gifUrl;
    }

    // Update page with new post - create article, h2, p, emojiContainer (div), and emojis for new post
    let article = document.createElement("article");
    let articleHead = document.createElement("h1");
    let articleBody = document.createElement("p");

    articleHead.textContent = postTitle;
    articleBody.textContent = postBody;

    // Append title, body and image to article
    article.appendChild(articleHead);
    article.appendChild(articleBody);
    if (gifUrl !== undefined){
        article.appendChild(articleGif);
    }

    addEmojiBar(article, articleHead, articleBody)
    
    // Render entire post on page
    postContainer.appendChild(article);
}
// FUNCTION TO RENDER POSTS //

// ATHEER START //
// Show comments button functionality

function showComments(button) {
    let containerNumber = `${button.id.slice(-1)}`;
    let x = document.getElementById(`commentContainer${containerNumber}`);
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }

}


// Function called when post comment button is pressed

let commentToPost = ""

function  postComment(button) {
    let comment = `${button.id}`;
    postNumber = comment.slice(-1); 

    let commentContainer = document.getElementById(`commentContainer${postNumber}`);

    comment = document.getElementById(`commentField${postNumber}`).value;
    commentToPost = (comment+postNumber);

    let postedComment = document.createElement("p");
    postedComment.textContent = comment;

    commentContainer.appendChild(postedComment);

    let options = {
        method: 'POST',
        headers: {
            'ContentType': 'application/json'
        },
        body: JSON.stringify(commentToPost)
    };
    
    fetch('http://localhost:3000/comments', options)
    .then(r => r.json())
    .catch(console.warn);
}
// ATHEER END //