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
        // console.log(data)
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
        userName.innerHTML = `<a href="https://github.com/${data.login}" target="_blank"> @${data.login}</a>`
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
            twitter.innerHTML = `<a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>`
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

function displayDate(date) {
    // let example = '2021-08-23THH:MM:SSZ'
    let newdate = date.split('-')
    let year = newdate[0]
    let monthNum = newdate[1]
    let month
    switch(parseInt(monthNum)){
        case 01:
            month = 'Jan'
            break
        case 02:
            month = 'Feb'
            break
        case 03:
            month = 'Mar'
            break
        case 04:
            month = 'Apr'
            break
        case 05:
            month = 'May'
            break
        case 06:
            month = 'June'
            break
        case 07:
            month = 'July'
            break
        case 08:
            month = 'Aug'
            break
        case 09:
            month = 'Sep'
            break
        case 10:
            month = 'Oct'
            break
        case 11:
            month = 'Nov'
            break
        case 12:
            month = 'Dec'
            break                
    }
    let dayNumbers = []
    dayNumbers.push(newdate[2])
    let day = newdate[2].slice(0, 2)
    let userJoined = `Joined ${day} ${month} ${year}`
    dateJoined.innerHTML = userJoined
}
