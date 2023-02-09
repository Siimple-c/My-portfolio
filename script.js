const tabLinks = document.getElementsByClassName("tab");
const tabContents = document.getElementsByClassName("tab-contents");
const navItemContainer = document.getElementById('nav-item--container');
const navSection = document.getElementById('nav');
const scrollLinks = document.querySelectorAll('.scroll');
const overlay = document.querySelector('#overlay');
const contactForm = document.querySelector('form');
contactName = contactForm.querySelector('#name');
email = contactForm.querySelector('#email');
id = contactForm.querySelector('#id');
successMsg = contactForm.querySelector(".success-msg");

/***** scroll behaviour ******/

scrollLinks.forEach((scrollLink)=> {
  scrollLink.addEventListener('click', (e) => {
     e.preventDefault();
    //navigate to top start of section
    const id = e.currentTarget.getAttribute('href').slice(1);
    const sectionId = document.getElementById(id);
    const sectionPosition = sectionId.offsetTop;
    const navHeight = navSection.getBoundingClientRect().height;
    let scrollDest = sectionPosition - navHeight;
    window.scrollTo({
      top: scrollDest,
      left:0,
    });
    closeMenu();
  })
})

window.addEventListener('scroll', () => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navSection.getBoundingClientRect().height;
  
  if(scrollHeight > navHeight){
    navSection.classList.add('fixed-nav');
  }else{
    navSection.classList.remove('fixed-nav');
  }
  
});

/****Toggle sidebar in mobile view &
 Toggle details in about section
****/

const openTab = (tabName) => {
  for(tabLink of tabLinks){
    tabLink.classList.remove('active');
  }
  for(tabContent of tabContents){
    tabContent.classList.remove('active');
  }
  event.currentTarget.classList.add('active');
  document.getElementById(tabName).classList.add('active');
}

const openSidebar = () => {
  navItemContainer.style.right = "0";
  overlay.classList.add('active');
}

const closeSidebar = () => {
  navItemContainer.style.right = "-15rem";
  overlay.classList.remove('active');
}

/****Copyright-date****/

const currentDate = document.getElementById('date');
currentDate.textContent = new Date().getFullYear();

contactForm.addEventListener('submit', e => {
  e.preventDefault()
    submitContactForm(contactName.value, email.value, msg.value);
});

// Contact form api request & submission

function submitContactForm(name, email, msg){
  fetch("https://formsubmit.co/ajax/chuka.odunna@outlook.com", {
      method: "POST",
      headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          Name: name, 
          Email: email,
          Message: msg
      })
  })
      .then(response => response.json())
      .then(response => {
        if(response.success ){
        successMsg.style.display = 'block'
        setTimeout(()=>{successMsg.style.display = 'none'}, 2000);
        }
        contactForm.reset()
      })
      .catch(error => console.error('Error!', error.message));
    }