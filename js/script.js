//This div is where my profile information will appear
const overviewDiv = document.querySelector(".overview");
const username = "bhoyem";
const repoList = document.querySelector(".repo-list");

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
    repoInfo(fetchedRepos);
};

//fetchRepos();

const repoInfo = function (repos) {
    for (let repo of repos) {
        const listItem = document.createElement("li");
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>"${repo.name}"</h3>`;
        repoList.append(listItem);
    }
};