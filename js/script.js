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

form.addEventListener("click", ()=> {
    form.classList.remove('error')
})

form.addEventListener('submit', function(e){
    e.preventDefault()
    
    const search = document.getElementById('username').value
    let originalName = search.split(' ').join('')

    fetch('https://api.github.com/users/'+originalName)
    .then((result) => result.json())
    .then((data) => {
        console.log(data)
        if (data.name === undefined){
            form.classList.add('error')
            return
        } else {
            twitter.parentElement.classList.remove('unavailable')
        }

        profileImage.innerHTML = `
        <img src="${data.avatar_url}"/>
        `
        nameMain.innerHTML = data.name
        userName.innerHTML = `@${data.login}`
        displayDate(data.created_at)
        // dateJoined.innerHTML = `Joined ${data.created_at}`
        
        if (data.bio === null) {
            bio.innerHTML = 'This profile has no bio'
            bio.classList.add('unavailable')
        } else {
            bio.innerHTML = data.bio
            bio.classList.remove('unavailable')
        }

        if (data.location === null){
            userLocation.innerHTML = 'Not Available'
            userLocation.classList.add('unavailable')
        } else {
           userLocation.innerHTML = data.location
           userLocation.classList.remove('unavailable') 
        }

        if (data.blog === ''){
            cite.innerHTML = 'Not Available'
            cite.classList.add('unavailable')
        } else {
           cite.innerHTML = data.blog
           cite.classList.remove('unavailable') 
        }

        if (data.twitter_username === null){
            twitter.innerHTML = 'Not Available'
            twitter.classList.add('unavailable')
        } else {
            twitter.innerHTML = `@${data.twitter_username}`
           twitter.classList.remove('unavailable') 
        }

        if (data.company === null){
            company.innerHTML = 'Not Available'
            company.classList.add('unavailable')
        } else {
            company.innerHTML = `@${data.company}`
            company.classList.remove('unavailable') 
        }
        
        followers.innerHTML = data.followers
        following.innerHTML = data.following
        repo.innerHTML = data.public_repos
    })
})

displayDate()
function displayDate(date) {
    let example = 'YYYY-MM-DDTHH:MM:SSZ'
    console.log(example)
    console.log(example.split('-'))
    let newdate = example.split('-')
    let year = newdate[0]
    let month = newdate[1]
    let dayNumbers = []
}
