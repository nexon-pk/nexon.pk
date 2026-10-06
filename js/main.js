/**
 * NEXON Main Application Scripts
 * 100% Static GitHub Pages Compatible (Zero backend requirements, Zero emojis)
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // Theme Toggle (Dark & Light Mode)
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  function updateThemeUI(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexon_theme', theme);
    const mobileText = document.querySelector('.theme-mode-text');
    if (mobileText) {
      mobileText.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    updateThemeUI(nextTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  // Sync mobile text on load
  const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeUI(activeTheme);

  // 1. Sticky Header
  const header = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeMobileNav = () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // 3. Scrollspy & Active Link Observer
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  });

  sections.forEach(sec => navObserver.observe(sec));

  // 4. Reveal on Scroll Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Service Category Filters
  const filterBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterCategory === 'all' || category === filterCategory || (category && category.includes(filterCategory))) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 6. Direct Service Modal Autofill
  document.querySelectorAll('.request-service-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service-name');
      const projectTypeSelect = document.getElementById('modalProjectType');
      const descInput = document.getElementById('modalProjectDesc');

      if (projectTypeSelect && serviceName) {
        for (let opt of projectTypeSelect.options) {
          if (opt.text.toLowerCase().includes(serviceName.toLowerCase().split(' ')[0])) {
            projectTypeSelect.value = opt.value;
            break;
          }
        }
      }

      if (descInput && serviceName) {
        descInput.value = `Inquiring about NEXON's ${serviceName} service. Looking for project planning and scope options.`;
      }

      openModal('projectInquiryModal');
    });
  });

  // 7. Modals Management
  window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = btn.getAttribute('data-open-modal');
      openModal(target);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
      document.body.style.overflow = '';
    }
  });

  // 8. Toast Notification Utility
  window.showToast = function(message) {
    const toast = document.getElementById('siteToast');
    const toastText = document.getElementById('toastText');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 4000);
    }
  };

  // 9. Static-Ready Contact Form Handler
  // (Ready for integration with Formspree, Web3Forms, or EmailJS)
  const setupFormHandler = (formId, modalIdToClose, successMsg) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
      }

      /* 
       * NOTE FOR GITHUB PAGES DEPLOYMENT:
       * To send real emails via static hosting, connect this form to Formspree, Web3Forms, or EmailJS.
       * Example: fetch("https://formspree.io/f/YOUR_FORM_ID", { method: "POST", body: new FormData(form) })
       */
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        form.reset();
        if (modalIdToClose) {
          closeModal(modalIdToClose);
        }
        showToast(successMsg);
      }, 600);
    });
  };

  setupFormHandler('pageContactForm', null, 'Thank you. Your project inquiry has been received. Our leadership team will review and respond.');
  setupFormHandler('modalInquiryForm', 'projectInquiryModal', 'Thank you. Your project inquiry has been received. Our team will review the requirements.');
  setupFormHandler('modalTalentForm', 'talentApplicationModal', 'Application received. Our vetting team will review your portfolio and reach out.');

  // 10. Project Category Filter
  const projectFilterBtns = document.querySelectorAll('.project-tab-btn:not(.review-tab-btn)');
  const projectCards = document.querySelectorAll('.project-card-item');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-proj-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-proj-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 11. Review Category Filter
  const reviewFilterBtns = document.querySelectorAll('.review-tab-btn');
  const reviewCards = document.querySelectorAll('.review-card-item');

  reviewFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reviewFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-rev-filter');

      reviewCards.forEach(card => {
        const cat = card.getAttribute('data-rev-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 30);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 12. Project Detail Modal Population
  document.querySelectorAll('[data-project-trigger]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card-item');
      if (!card) return;

      const title = card.getAttribute('data-project-title') || 'Project Details';
      const cat = card.getAttribute('data-project-cat') || 'Engineering';
      const desc = card.getAttribute('data-project-desc') || '';
      const features = (card.getAttribute('data-project-features') || '').split(',');
      const tags = (card.getAttribute('data-project-tags') || '').split(',');
      const github = card.getAttribute('data-project-github') || 'https://github.com/ialikh72';

      const modalCat = document.getElementById('modalProjectCat');
      const modalHeading = document.getElementById('modalProjectHeading');
      const modalSummary = document.getElementById('modalProjectSummary');
      const modalFeatures = document.getElementById('modalProjectFeatures');
      const modalTags = document.getElementById('modalProjectTags');
      const modalGithub = document.getElementById('modalGithubLink');

      if (modalCat) modalCat.textContent = cat;
      if (modalHeading) modalHeading.textContent = title;
      if (modalSummary) modalSummary.textContent = desc;

      if (modalFeatures) {
        modalFeatures.innerHTML = '';
        features.forEach(f => {
          if (f.trim()) {
            const li = document.createElement('li');
            li.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span>${f.trim()}</span>`;
            modalFeatures.appendChild(li);
          }
        });
      }

      if (modalTags) {
        modalTags.innerHTML = '';
        tags.forEach(t => {
          if (t.trim()) {
            const span = document.createElement('span');
            span.className = 'project-tag';
            span.textContent = t.trim();
            modalTags.appendChild(span);
          }
        });
      }

      if (modalGithub) {
        modalGithub.href = github;
      }

      openModal('projectDetailModal');
    });
  });

  setupFormHandler('modalReviewForm', 'leaveReviewModal', 'Thank you! Your verified client review has been recorded.');
});
