const AmazonInstanse = document.getElementById('AmazonInstanse')
const Ownserver = document.getElementById('Own server')
const switchers = document.getElementsByClassName('container_footer_switchers')[0]






function activeSwitcher(target) {
    switch (target.textContent) {
        case 'Own server':
            Ownserver.style.display = 'flex'
            AmazonInstanse.style.display = 'none'
            switchers.getElementsByClassName('Own server')[0].classList.add('active')
            switchers.getElementsByClassName('Amazon Instanse')[0].classList.remove('active')
            break;
        case 'Amazon Instanse':
            Ownserver.style.display = 'none'
            AmazonInstanse.style.display = 'flex'
            switchers.getElementsByClassName('Amazon Instanse')[0].classList.add('active')
            switchers.getElementsByClassName('Own server')[0].classList.remove('active')
            break;


    }
}
switchers.addEventListener('click', (e) => activeSwitcher(e.target))
AmazonInstanse.style.display = 'none'