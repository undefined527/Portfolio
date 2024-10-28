const TYPE_SPEED = 50; // miliseconds per character

const intersectionObserver = new IntersectionObserver(typeTextOnIntersection, {threshold: .5})
const typeTexts = document.querySelectorAll(".type-text");
const autoScrollAnchors = document.querySelectorAll("a[href^='#']");
const homeAnimationRects = document.querySelector("#home-animation").querySelectorAll(".rect");

const projects = [
    createProjectItemWithImage(
        "Portfolio",
        "You are currently viewing this project right now. I created this website to showcase some of the work I have done in java.",
        "images/portfolio-home.PNG",
        "https://github.com/undefined527/Portfolio"
    ),
    createProjectItemWithVideo(
        "Spirograph", 
        "I built this project in java with the of the java.swing GUI library. This project allows you to generate spirographs based off a set of initial conditions.", 
        '<iframe class="project-media" width="560" height="315" src="https://www.youtube.com/embed/u31qwQUeGuM?si=zqomWfHs3E69kKaE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
        ""
    ),
    createProjectItemWithImage(
        "Psuedo 3D Rendering", 
        "This is yet another project I made with the help of the java.swing GUI library. This project tries to recreate the type of rendering old-school 3d games such as doom would use. As the name implies, it isnt technically 3d.",
        "images/pseudo-3d.PNG",
        "https://github.com/undefined527/Pseudo3d"
    )
]

function createProjectItemWithVideo(projectName, projectDescription, youtubEmbed, github)
{
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";

    const itemTitle = document.createElement("h1");
    itemTitle.className = "project-title";
    itemTitle.innerHTML = projectName;
    projectItem.appendChild(itemTitle);

    const itemContent = document.createElement("div");
    itemContent.className = "project-item-content";
    projectItem.appendChild(itemContent);

    itemContent.innerHTML += youtubEmbed

    const itemDescriptionDiv = document.createElement("div");
    itemDescriptionDiv.className = "project-item-content-description";
    itemContent.appendChild(itemDescriptionDiv);

    const itemDescription = document.createElement("p");
    itemDescription.innerHTML = projectDescription;
    itemDescriptionDiv.appendChild(itemDescription);

    const itemGithubLink = document.createElement("a");
    itemGithubLink.href = github;
    itemGithubLink.title = "Github";
    itemDescriptionDiv.appendChild(itemGithubLink);

    const githubIcon = document.createElement("img");
    githubIcon.className = "brand-icon"
    githubIcon.src = "images/github-brands-solid.svg"
    itemGithubLink.appendChild(githubIcon);

    return projectItem;
}

function createProjectItemWithImage(projectName, projectDescription, imagePath, github)
{
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";

    const itemTitle = document.createElement("h1");
    itemTitle.className = "project-title";
    itemTitle.innerHTML = projectName;
    projectItem.appendChild(itemTitle);

    const itemContent = document.createElement("div");
    itemContent.className = "project-item-content";
    projectItem.appendChild(itemContent);

    const itemImage = document.createElement("img");
    itemImage.src = imagePath;
    itemImage.className = "project-media";
    itemContent.appendChild(itemImage);

    const itemDescriptionDiv = document.createElement("div");
    itemDescriptionDiv.className = "project-item-content-description";
    itemContent.appendChild(itemDescriptionDiv);

    const itemDescription = document.createElement("p");
    itemDescription.innerHTML = projectDescription;
    itemDescriptionDiv.appendChild(itemDescription);

    const itemGithubLink = document.createElement("a");
    itemGithubLink.href = github;
    itemGithubLink.title = "Github";
    itemDescriptionDiv.appendChild(itemGithubLink);

    const githubIcon = document.createElement("img");
    githubIcon.className = "brand-icon"
    githubIcon.src = "images/github-brands-solid.svg"
    itemGithubLink.appendChild(githubIcon);

    return projectItem;
}

function typeText(textBox)
{
    let text = textBox.dataset.originalText;
    let currentText = "";

    textBox.innerHTML = "";

    for (let j = 0; j < text.length; j++)
    {
        setTimeout(() => {
            currentText += text.charAt(j);
            textBox.innerHTML = currentText + "|";
        }, TYPE_SPEED * j);
    }

    setTimeout(() => {textBox.innerHTML = text}, TYPE_SPEED * text.length);
}

function typeTextOnIntersection(entry, observer)
{
    for (let i = 0; i < entry.length; i++)
    {
        if (entry[i].isIntersecting)
        {
            typeText(entry[i].target);
        }
        else if (entry[i].target.innerHTML != "")
        {
            observer.unobserve(entry[i].target);
        }
    }
}

for (let i = 0; i < typeTexts.length; i++)
{
    typeTexts[i].innerHTML = "";
    intersectionObserver.observe(typeTexts[i]);
}

for (let i = 0; i < autoScrollAnchors.length; i++)
{
    autoScrollAnchors[i].addEventListener("click", (e) => {
        e.preventDefault();

        window.scrollTo({
            top: document.querySelector(autoScrollAnchors[i].getAttribute("href")).offsetTop - document.getElementById("header").clientHeight,
            behavior: "smooth"
        })
    })
}

for (let i = 0; i < projects.length; i++)
{
    const project = projects[i];
    
    if (i % 2 == 0)
    {
        project.querySelector(".project-title").className += " align-left";
        project.querySelector(".project-item-content").className += " align-left";
    }
    else 
    {
        project.querySelector(".project-title").className += " align-right";
        project.querySelector(".project-item-content").className += " align-right";
    }

    document.querySelector("#projects-list").appendChild(project);
}

window.onload = () => 
{
    for (let i = 0; i < homeAnimationRects.length; i++)
        {
            const rect = homeAnimationRects[i];

            rect.style.width = ((0.9**((i + 1))) * (rect.parentElement.offsetHeight * 0.8)) + "px";
            rect.style.height = ((0.9**(i + 1)) * (rect.parentElement.offsetHeight * 0.8)) + "px";
            
            rect.style.animation = `spin ${50/(i + 1)}s linear infinite`;
        }
}