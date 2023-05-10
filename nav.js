burger = document.querySelector('.burger')
navbar = document.querySelector('.header')
headerLeft = document.querySelector('.searchBox')
headerRight = document.querySelector('.header-right')



burger.addEventListener('click', () => {

    headerLeft.classList.toggle('v-class');
    headerRight.classList.toggle('v-class');
    navbar.classList.toggle('h-nav');
    


    //The toggle() method toggles between hide() and show() for the selected elements. This method checks the selected elements
    // for visibility. show() is run if an element is hidden. hide() is run if an element is visible - This creates a toggle effect.

})



