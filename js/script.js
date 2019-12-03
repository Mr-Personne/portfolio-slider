var httpRequest = null;

const bodyTag = document.querySelector("body");
const mainTag = document.querySelector("main");
const headerTag = document.querySelector("header");
const bottomBar = document.querySelector(".bottom-bar");

const homeButton = document.querySelector(".home-button");
const skillsButton = document.querySelector(".skills-button");
const portfolioButton = document.querySelector(".portfolio-button");
const contactButton = document.querySelector(".contact-button");
const boutonArr = [homeButton, skillsButton, portfolioButton, contactButton];

function onClickSetup(){
    boutonArr.forEach(function(items){
        items.addEventListener("click", function(event){
            console.log(event);
            var phplink = event.target.id + ".php";
            var linkId = event.target.id;
            console.log(phplink," and ", linkId);
            ajaxCallAsynch(phplink , linkId);
        });
        
    });
};

function ajaxCallAsynch(pageToLoad, linkId){
    if (httpRequest != null){
        console.log("httpRequest en cours...");
    }
    else{
        httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", pageToLoad, true);
        httpRequest.send();

        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === 4){
                changeColors(linkId);
                mainTag.innerHTML = httpRequest.responseText;
                httpRequest = null;
            }
        }

    }
};

function changeColors(name){
    var bottomBar = document.querySelector(".bottom-bar");
    var currentActive = document.querySelector("#"+name);
    var codepenlogo = document.querySelector(".codepen-logo img");
    var githublogo = document.querySelector(".github-logo img");

    //gets rid of all possible active class on nav
    boutonArr.forEach(function(item){
        item.classList.remove("home-active", "skills-active",
                            "portfolio-active", "contact-active");
    });

    
    //gets rid of any possible color class on "footer"
    bottomBar.classList.remove("home-second-color", "skills-second-color",
                        "portfolio-second-color", "contact-second-color");

    //adds back current color class
    
    headerTag.classList = name+"-second-color";
    bodyTag.classList = name+"-main-color";
    bottomBar.classList.add(name+"-second-color");
    console.log("codepen logo : ",codepenlogo);
    currentActive.classList.add(name+"-active");

    //if on portfolio page or contact page = change logo color
    if (name == "portfolio" || name == "contact"){
        codepenlogo.src = "media/codepen-black.png";
        githublogo.src = "media/github-black.png";
    }
    else{
        codepenlogo.src = "media/codepen-white.png";
        githublogo.src = "media/github-white.png";
    }



    // headerTag.style.backgroundColor = "#5F6769";
    // bottomBar.style.backgroundColor = "#5F6769";

    // bodyTag.style.backgroundColor = "#719192";
};

onClickSetup();