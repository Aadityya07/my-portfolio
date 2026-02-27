'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// ================= TESTIMONIALS MODAL =================
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

if (testimonialsItem.length > 0 && modalContainer && modalCloseBtn && overlay) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// ================= PROJECTS MODAL =================
const projectItems = document.querySelectorAll("[data-project-item]");
const projectModalContainer = document.querySelector("[data-modal-container-project]");
const projectModalCloseBtn = document.querySelector("[data-modal-close-btn-project]");
const projectOverlay = document.querySelector("[data-overlay-project]");

const projectModalImg = document.querySelector("[data-modal-project-img]");
const projectModalTitle = document.querySelector("[data-modal-project-title]");
const projectModalCategory = document.querySelector("[data-modal-project-category]");
const projectModalText = document.querySelector("[data-modal-project-text]");
const projectModalGithub = document.querySelector("[data-modal-github-link]");
const projectModalDeploy = document.querySelector("[data-modal-deploy-link]");

const projectModalFunc = function () {
  projectModalContainer.classList.toggle("active");
  projectOverlay.classList.toggle("active");
}

if (projectItems.length > 0 && projectModalContainer && projectModalCloseBtn && projectOverlay) {
  for (let i = 0; i < projectItems.length; i++) {
    projectItems[i].addEventListener("click", function (e) {
      e.preventDefault();
      const img = this.querySelector("[data-project-img]");
      const title = this.querySelector("[data-project-title]");
      const category = this.querySelector("[data-project-category]");
      const desc = this.querySelector("[data-project-desc]");
      const gitLink = this.querySelector("[data-github-link]");
      const deployLink = this.querySelector("[data-deploy-link]");

      projectModalImg.src = img.src;
      projectModalImg.alt = img.alt;
      projectModalTitle.innerHTML = title.innerHTML;
      projectModalCategory.innerHTML = category.innerHTML;
      projectModalText.innerHTML = desc.innerHTML;
      projectModalGithub.href = gitLink.innerText;
      projectModalDeploy.href = deployLink.innerText;

      projectModalFunc();
    });
  }
  projectModalCloseBtn.addEventListener("click", projectModalFunc);
  projectOverlay.addEventListener("click", projectModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

if (filterBtn.length > 0) {
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formInputs.length > 0 && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// ================= NAVIGATION WITH ANIMATION RESET =================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

if (navigationLinks.length > 0 && pages.length > 0) {
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      const targetPage = this.innerHTML.toLowerCase();

      for (let i = 0; i < pages.length; i++) {
        if (targetPage === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          
          // Reset Animations so they replay
          const animatedElements = pages[i].querySelectorAll('.scroll-reveal');
          animatedElements.forEach(el => el.classList.remove('in-view'));
          
          // Reset and Animate Skill Bars
          const skillBars = pages[i].querySelectorAll('.skill-progress-fill');
          skillBars.forEach(bar => { 
            bar.style.width = '0%'; 
            setTimeout(() => {
              const dataTag = bar.closest('.skills-item').querySelector('data');
              if(dataTag) {
                bar.style.width = dataTag.getAttribute('value') + '%';
              }
            }, 100); 
          });

          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      }
    });
  }
}

// ================= THEME TOGGLE =================
const themeBtn = document.querySelector("[data-theme-btn]");
const themeBtnIcon = document.querySelector("[data-theme-btn] ion-icon");
const localTheme = localStorage.getItem("theme");

if (localTheme === "light") {
  document.body.classList.add("light-theme");
  themeBtnIcon.setAttribute("name", "sunny-outline");
}

if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("light-theme");
    if (document.body.classList.contains("light-theme")) {
      themeBtnIcon.setAttribute("name", "sunny-outline");
      localStorage.setItem("theme", "light");
    } else {
      themeBtnIcon.setAttribute("name", "moon-outline");
      localStorage.setItem("theme", "dark");
    }
  });
}

// ================= ADVANCED SCROLL & SKILL ANIMATIONS =================

// 1. Add base class to animate elements
const scrollItems = document.querySelectorAll('.service-item, .project-item, .timeline-item, .skills-item, .blog-post-item');
scrollItems.forEach(el => {
  el.classList.add('scroll-reveal');
});

// 2. Observer setup
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add 'in-view' class to fade in/slide up
      entry.target.classList.add('in-view');

      // SKILL BAR LOGIC
      if (entry.target.classList.contains('skills-item')) {
        const progressBar = entry.target.querySelector('.skill-progress-fill');
        const dataTag = entry.target.querySelector('data');
        
        if (progressBar && dataTag) {
          const targetValue = dataTag.getAttribute('value');
          // Force a repaint so the transition triggers
          requestAnimationFrame(() => {
            progressBar.style.width = targetValue + "%";
          });
        }
      }
    }
  });
}, { threshold: 0.1 }); 

// 3. Start observing
scrollItems.forEach(el => scrollObserver.observe(el));

// 4. Force projects to show "All" on load (Fixes the blank project issue)
filterFunc("all");

// ================= AVATAR MODAL LOGIC =================
const avatarBtn = document.querySelector("[data-avatar-btn]");
const avatarModal = document.querySelector("[data-avatar-modal]");
const avatarOverlay = document.querySelector("[data-avatar-overlay]");
const avatarCloseBtn = document.querySelector("[data-avatar-close-btn]");

if (avatarBtn && avatarModal && avatarOverlay && avatarCloseBtn) {
  const toggleAvatarModal = function () {
    avatarModal.classList.toggle("active");
    avatarOverlay.classList.toggle("active");
    document.body.classList.toggle("hide-theme-btn"); /* This hides/shows the theme toggle */
  }

  avatarBtn.addEventListener("click", toggleAvatarModal);
  avatarOverlay.addEventListener("click", toggleAvatarModal);
  avatarCloseBtn.addEventListener("click", toggleAvatarModal);
}