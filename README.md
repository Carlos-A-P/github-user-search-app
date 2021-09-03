# Github User Search App

- Live website -(https://cpwd-github-user-search-app.netlify.app)

## Table of contents

- [The challenge](#the-challenge)
- [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page, Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- Have the correct color scheme chosen for them based on their computer preferences

## My process

### Screenshot

### End Result

![result](https://user-images.githubusercontent.com/85038929/132062706-318ed26a-2eb5-4d9a-bb4e-28596338d547.JPG)

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS FlexBox
- JavaScript
- Media Queries
- API

### What I learned

This is my first API project where I made an app able to gather information from github to display user profile information. I also learned how to use Figma design files in order to provide the most accurate measurements possible.

- I first made sure the user's name could be properly placed at the end of the api link. Then I placed each piece of information into my html. The most difficult part was making a custom date that the user joined which I was able to make using .split() and .slice()

```JavaScript
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
```

### Useful resources

- [GitHub REST API](https://docs.github.com/en/rest) - this is the link to find the github api

- [Debugging JavaScript in Visual Studio Code and Google Chrome](https://www.youtube.com/watch?v=AX7uybwukkk&ab_channel=JamesQQuick) - this video taught me how to debug my javascript using the debugger tool in developer tools

## Author

- Website - [Carlos Perez](https://cpwd-github-user-search-app.netlify.app/)
- Frontend Mentor - [@Carlos-A-P](https://www.frontendmentor.io/profile/Carlos-A-P)
- Twitter - [@WDCarlosP](https://www.twitter.com/WDCarlosP)
