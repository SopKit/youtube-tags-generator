let suggestions = [
    // "Channel",
    // "CodingLab",
    // "CodingNepal",
    // "YouTube",
    // "YouTuber",
    // "YouTube Channel",
    // "Blogger",
    // "Bollywood",
    // "Vlogger",
    // "Vechiles",
    // "Facebook",
    // "Freelancer",
    // "Facebook Page",
    // "Designer",
    // "Developer",
    // "Web Designer",
    // "Web Developer",
    // "Login Form in HTML & CSS",
    // "How to learn HTML & CSS",
    // "How to learn JavaScript",
    // "How to became Freelancer",
    // "How to became Web Designer",
    // "How to start Gaming Channel",
    // "How to start YouTube Channel",
    // "What does HTML stands for?",
    // "What does CSS stands for?",
];

// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
let linkTag = searchWrapper.querySelector("a");
let tagbox = document.querySelector(".tagbox");

let webLink;

document.querySelector("#copy").addEventListener("click",copyArrayToStringAndClipboard);
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        icon.onclick = ()=>{
            // webLink = `https://www.google.com/search?q=${userData}`;
            // linkTag.setAttribute("href", webLink);
            // linkTag.click();
            result(userData)

        }
        result(userData)
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }else{
        searchWrapper.classList.remove("active"); //hide autocomplete box
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    icon.onclick = ()=>{
        webLink = `https://www.google.com/search?q=${selectData}`;
        linkTag.setAttribute("href", webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove("active");
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    suggBox.innerHTML = listData;
}


let result=query=>{
    //  fetch('https://wholly-api.appspages.online/get/website-data.php?get_html='+encodeURIComponent('https://www.rapidtags.io/api/generator?type=YouTube&query='+query)).then((d)=>d.json()).then((e)=> {
        fetch('https://whollyapi.vercel.app/api/html?url='+encodeURIComponent('https://www.rapidtags.io/api/generator?type=YouTube&query='+query)).then((d)=>d.json()).then((e)=> {
        let html="";
        window.arr = e.tags;
        e.tags.forEach(element => {
            html+='<span class="tag">'+element+'<i class="fa fa-times"></i></span>';
        });
    tagbox.innerHTML = html;
    })

}

function copyArrayToStringAndClipboard() {
    if (!Array.isArray(arr)) {
      console.error("Input is not an array.");
      return;
    }
  
    const stringToCopy = arr.join(', ');
  
    // Create a temporary textarea element to copy the text to the clipboard
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = stringToCopy;
    document.body.appendChild(tempTextArea);
  
    // Select the text in the textarea
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); /* For mobile devices */
  
    // Copy the text to the clipboard
    document.execCommand('copy');
  
    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);
  
    console.log(`Copied to clipboard: ${stringToCopy}`);
    document.querySelector("#copy").innerHTML="Copied... ✅";
    setTimeout(()=>document.querySelector("#copy").innerHTML='Copy<i class="fa fa-copy">',2000)

  }
  