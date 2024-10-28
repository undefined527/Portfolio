const TYPE_SPEED = 50; // miliseconds per character

const intersectionObserver = new IntersectionObserver(typeTextOnIntersection, {threshold: .5})
const typeTexts = document.querySelectorAll(".type-text");
const autoScrollAnchors = document.querySelectorAll("a[href^='#']");

const projects = [
    createProjectItem("Spirograph", "test"),
    createProjectItem("Psuedo 3D Rendering", "test"),
    createProjectItem("Snake", "test"),
]

function createProjectItem(projectName, projectDescription)
{
    const projectItem = document.createElement("div");
    projectItem.className = "project-item";

    const itemTitle = document.createElement("h1");
    itemTitle.innerHTML = projectName;
    projectItem.appendChild(itemTitle);

    const itemDescription = document.createElement("p");
    itemDescription.innerHTML = projectDescription;
    projectItem.appendChild(itemDescription);

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
            console.log("in")
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

projects.forEach(project => {
    document.querySelector("#projects-list").appendChild(project);
});