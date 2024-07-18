//This div is where my profile information will appear
const overviewDiv = document.querySelector(".overview");
const username = "bhoyem";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToGallery = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const userInfo = async function () {
    const userData = await fetch(`https://api.github.com/users/${username}`);
    const fetchedData = await userData.json();
    //console.log(fetchedData);
    displayUserInfo(fetchedData);
    return fetchedData;
};

const displayUserInfo = function (fetchedData) {
    let div = document.createElement("div")
    div.classList.add("user-info");
    div.innerHTML = `
        <figure>
            <img alt="user avatar" src=${fetchedData.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${fetchedData.name}</p>
            <p><strong>Bio:</strong> ${fetchedData.bio}</p>
            <p><strong>Location:</strong> ${fetchedData.location}</p>
            <p><strong>Number of public repos:</strong> ${fetchedData.public_repos}</p>
        </div>
    `;
    overviewDiv.append(div);
    fetchRepos(fetchedData);
};

userInfo();

const fetchRepos = async function (fetchedData) {
    const userRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const fetchedRepos = await userRepos.json();
    console.log(fetchedRepos);
    repoListGenerator(fetchedRepos);
};

const repoListGenerator = function (repos) {
    filterInput.classList.remove("hide");
    for (let repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;
        console.log(repoName);
        repoDataCollector(repoName);
    }
});

const repoDataCollector = async function (repoName) {
    const specificDataJson = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificDataJson.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    let languages = [];
    for (let language in languageData) {
        languages.push(language);
    }
    console.log(languages);
    repoInfoDisplay(repoInfo, languages);
};

const repoInfoDisplay = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(div);
    repoData.classList.remove("hide");
    backToGallery.classList.remove("hide");
    reposSection.classList.add("hide");
};

backToGallery.addEventListener("click", function () {
    reposSection.classList.remove("hide");
    repoData.classList.add("hide");
    backToGallery.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const filterTerm = (e.target.value);
    console.log(filterTerm);
    const repos = document.querySelectorAll(".repo");
    console.log(repos);
    const searchTerm = filterTerm.toLowerCase();
    for (const repo of repos) {
        const lowerInnerText = repo.innerText.toLowerCase();
      //  console.log(lowerInnerText);
        if (lowerInnerText.includes(searchTerm)) {
            // console.log(`${lowerInnerText} found in ${repo}`);
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        };
    }
})