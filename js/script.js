const body = document.querySelector('body')
const form = document.querySelector('form')
const theme = document.getElementById('theme')
const profileImage = document.getElementById('profile-picture')
const nameMain = document.getElementById('name')
const userName = document.getElementById('GitHub-username')
const dateJoined = document.getElementById('joined')
const bio = document.getElementById('bio')
const repo = document.getElementById('repo')
const followers = document.getElementById('followers')
const following = document.getElementById('following')
const userLocation = document.getElementById('location')
const cite = document.getElementById('cite')
const twitter = document.getElementById('twitter')
const company = document.getElementById('company')

theme.addEventListener('click', ()=>{
    body.classList.toggle("dark")
    setTheme()
    // darkMode = localStorage.getheme = localStorage.getItem('theme')tItem('darkMode')
})

function setTheme() {
    if (body.classList.contains('dark')){
        localStorage.setItem('darkMode', 'enabled')
    } else{
        localStorage.setItem('darkMode', null)
    }  
}    

if(localStorage.getItem('darkMode') === 'enabled'){
    body.classList.add('dark')
}

form.addEventListener('submit', function(e){
    e.preventDefault()
    const search = document.getElementById('username').value
    let originalName = search.split(' ').join('')
    console.log(originalName)

    fetch('https://api.github.com/users/'+originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data)

        profileImage.innerHTML = `
        <img src="${data.avatar_url}"/>
        `
        nameMain.innerHTML = data.name
        userName.innerHTML = `@${data.login}`
        dateJoined.innerHTML = `Joined ${data.created_at}`
        bio.innerHTML = data.bio
        followers.innerHTML = data.followers
        following.innerHTML = data.following
        repo.innerHTML = data.public_repos
        userLocation.innerHTML = data.location
        cite.innerHTML = data.blog
        twitter.innerHTML = `@${data.twitter_username}`
        company.innerHTML = `@${data.company}`
    })
})

