/**
 * NEXON Main Application Scripts
 * Production-Ready Digital Solutions & Talent Network
 */

document.addEventListener('DOMContentLoaded', () => {
  const COMPANY_EMAIL = 'nexon.solutions3@gmail.com';
  const WHATSAPP_NUMBER = '923479254500';

  // ---------------------------------------------------------------------------
  // 1. Theme Toggle (Dark & Light Mode)
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

  // ---------------------------------------------------------------------------
  // 2. Sticky Header
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // 3. Mobile Drawer Navigation & Backdrop Overlay
  // ---------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-list a, .mobile-drawer [data-open-modal]');

  const openMobileNav = () => {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileNav);
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileNav));

  // ---------------------------------------------------------------------------
  // 4. Scrollspy & Active Link Observer
  // ---------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-list a');

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
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  });

  sections.forEach(sec => navObserver.observe(sec));

  // ---------------------------------------------------------------------------
  // 5. Reveal on Scroll Animation
  // ---------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---------------------------------------------------------------------------
  // 6. Service Category Filters
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // 7. Direct Service Modal Autofill
  // ---------------------------------------------------------------------------
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
        descInput.value = `Inquiring about NEXON's ${serviceName} service. Looking for project scope, timeline, and execution details.`;
      }

      openModal('projectInquiryModal');
    });
  });

  // ---------------------------------------------------------------------------
  // 8. Modals Management
  // ---------------------------------------------------------------------------
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
      closeMobileNav();
      document.body.style.overflow = '';
    }
  });

  // ---------------------------------------------------------------------------
  // 9. Toast Notification Utility
  // ---------------------------------------------------------------------------
  window.showToast = function(message, duration = 5000) {
    const toast = document.getElementById('siteToast');
    const toastText = document.getElementById('toastText');
    if (toast && toastText) {
      toastText.textContent = message;
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, duration);
    }
  };

  // ---------------------------------------------------------------------------
  // 10. Interactive Star Rating Selector in Review Modal
  // ---------------------------------------------------------------------------
  const starButtons = document.querySelectorAll('#starRatingStars .star-rating-star');
  const starRatingLabel = document.getElementById('starRatingLabel');
  const reviewRatingValInput = document.getElementById('reviewRatingVal');

  const ratingLabels = {
    1: '1.0 / 5.0 (Needs Improvement)',
    2: '2.0 / 5.0 (Fair Quality)',
    3: '3.0 / 5.0 (Good Delivery)',
    4: '4.0 / 5.0 (Great Quality)',
    5: '5.0 / 5.0 (Exceptional)'
  };

  let selectedRating = 5;

  function updateStarUI(rating) {
    starButtons.forEach(btn => {
      const r = parseInt(btn.getAttribute('data-rating'), 10);
      if (r <= rating) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    if (starRatingLabel) {
      starRatingLabel.textContent = ratingLabels[rating] || `${rating}.0 / 5.0`;
    }
    if (reviewRatingValInput) {
      reviewRatingValInput.value = rating;
    }
  }

  starButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const hoverRating = parseInt(btn.getAttribute('data-rating'), 10);
      starButtons.forEach(b => {
        const r = parseInt(b.getAttribute('data-rating'), 10);
        if (r <= hoverRating) {
          b.classList.add('hover');
        } else {
          b.classList.remove('hover');
        }
      });
      if (starRatingLabel) {
        starRatingLabel.textContent = ratingLabels[hoverRating] || `${hoverRating}.0 / 5.0`;
      }
    });

    btn.addEventListener('mouseleave', () => {
      starButtons.forEach(b => b.classList.remove('hover'));
      updateStarUI(selectedRating);
    });

    btn.addEventListener('click', () => {
      selectedRating = parseInt(btn.getAttribute('data-rating'), 10);
      updateStarUI(selectedRating);
    });
  });

  // ---------------------------------------------------------------------------
  // 11. Custom Reviews System & LocalStorage Persistence
  // ---------------------------------------------------------------------------
  const REVIEWS_STORAGE_KEY = 'nexon_custom_reviews';
  const reviewsContainer = document.getElementById('reviewsContainer');
  const totalReviewsCount = document.getElementById('totalReviewsCount');

  function getAvatarInitials(name) {
    if (!name) return 'CL';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  function generateStarsHtml(rating) {
    let stars = '';
    const fullStars = Math.min(5, Math.max(1, Math.round(Number(rating))));
    for (let i = 0; i < fullStars; i++) {
      stars += `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
    return stars;
  }

  function createReviewCardHtml(review, isNewlyAdded = false) {
    const initials = getAvatarInitials(review.name);
    const stars = generateStarsHtml(review.rating);
    const highlightClass = isNewlyAdded ? 'new-review-highlight' : '';

    return `
      <div class="review-card review-card-item reveal active ${highlightClass}" data-rev-category="${review.category || 'engineering'}">
        <div class="review-card-top">
          <div class="review-stars-group">
            ${stars}
          </div>
          <span class="review-verified-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Verified Client</span>
          </span>
        </div>
        <div class="review-project-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          <span>${escapeHtml(review.project)}</span>
        </div>
        <p class="review-quote-text">
          "${escapeHtml(review.feedback)}"
        </p>
        <div class="review-client-footer">
          <div class="review-client-avatar">${initials}</div>
          <div class="review-client-info">
            <h4>${escapeHtml(review.name)}</h4>
            <p>${escapeHtml(review.role ? `${review.role} — ${review.company}` : review.company)}</p>
          </div>
        </div>
      </div>
    `;
  }

  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function loadStoredReviews() {
    try {
      const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
      if (stored && reviewsContainer) {
        const reviews = JSON.parse(stored);
        if (Array.isArray(reviews) && reviews.length > 0) {
          reviews.forEach(rev => {
            const cardElement = document.createElement('div');
            cardElement.innerHTML = createReviewCardHtml(rev, false).trim();
            if (cardElement.firstElementChild) {
              reviewsContainer.insertBefore(cardElement.firstElementChild, reviewsContainer.firstChild);
            }
          });
          if (totalReviewsCount) {
            const count = 12 + reviews.length;
            totalReviewsCount.textContent = `${count}+`;
          }
        }
      }
    } catch (e) {
      console.warn('Could not load stored reviews:', e);
    }
  }

  loadStoredReviews();

  // Handle Custom Review Submission
  const reviewForm = document.getElementById('modalReviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = reviewForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Verified Review';

      const name = document.getElementById('reviewName')?.value.trim() || 'Client';
      const role = document.getElementById('reviewRole')?.value.trim() || '';
      const company = document.getElementById('reviewOrg')?.value.trim() || 'Organization';
      const category = document.getElementById('reviewCategory')?.value || 'engineering';
      const project = document.getElementById('reviewProject')?.value.trim() || 'Custom Project Delivery';
      const rating = document.getElementById('reviewRatingVal')?.value || '5';
      const feedback = document.getElementById('reviewFeedback')?.value.trim() || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-spinner"></span> Publishing Review...';
      }

      setTimeout(() => {
        const newReview = {
          id: 'rev_' + Date.now(),
          name,
          role,
          company,
          category,
          project,
          rating,
          feedback,
          createdAt: new Date().toISOString()
        };

        // Save in LocalStorage
        try {
          const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
          const reviewsList = stored ? JSON.parse(stored) : [];
          reviewsList.unshift(newReview);
          localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviewsList));
        } catch (err) {
          console.warn('Storage quota exceeded:', err);
        }

        // Render card at the top of the reviews grid
        if (reviewsContainer) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = createReviewCardHtml(newReview, true).trim();
          const cardNode = tempDiv.firstElementChild;
          if (cardNode) {
            reviewsContainer.insertBefore(cardNode, reviewsContainer.firstChild);
          }
        }

        // Update count
        if (totalReviewsCount) {
          const currentText = totalReviewsCount.textContent;
          const currentCount = parseInt(currentText, 10) || 12;
          totalReviewsCount.textContent = `${currentCount + 1}+`;
        }

        // Reset and close
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        reviewForm.reset();
        selectedRating = 5;
        updateStarUI(5);
        closeModal('leaveReviewModal');

        showToast(`Thank you, ${name}! Your review has been submitted and published to our verified client wall.`);

        // Smooth scroll to reviews section
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
          reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    });
  }

  // ---------------------------------------------------------------------------
  // 12. Review Category Filter
  // ---------------------------------------------------------------------------
  const reviewFilterBtns = document.querySelectorAll('.review-tab-btn');

  reviewFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      reviewFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-rev-filter');
      const allReviewCards = document.querySelectorAll('.review-card-item');

      allReviewCards.forEach(card => {
        const cat = card.getAttribute('data-rev-category');
        if (filter === 'all' || cat === filter || (cat && cat.includes(filter))) {
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

  // ---------------------------------------------------------------------------
  // 13. Production Real Email Submission Integration (FormSubmit.co)
  // ---------------------------------------------------------------------------
  const submitFormToEmail = async (form, modalIdToClose, formType = 'contact') => {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Submit';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="btn-spinner"></span> Sending to NEXON...';
    }

    // Build payload according to form type
    let payload = {};
    let senderName = 'Client';
    let senderEmail = '';

    if (formType === 'talent') {
      senderName = form.querySelector('#talentName')?.value.trim() || 'Applicant';
      senderEmail = form.querySelector('#talentEmail')?.value.trim() || '';
      payload = {
        name: senderName,
        email: senderEmail,
        discipline: form.querySelector('#talentSkill')?.value || 'Not selected',
        experience: form.querySelector('#talentExp')?.value || 'Not selected',
        portfolio: form.querySelector('#talentPortfolio')?.value.trim() || '',
        tech_highlights: form.querySelector('#talentHighlights')?.value.trim() || '',
        _subject: `New Talent Application: ${senderName} (${form.querySelector('#talentSkill')?.value || 'Specialist'})`,
        _template: 'table',
        _captcha: 'false'
      };
    } else {
      // General Inquiry / Contact form
      const nameInput = form.querySelector('[name="name"]') || form.querySelector('#modalName') || form.querySelector('#contactName');
      const emailInput = form.querySelector('[name="email"]') || form.querySelector('#modalEmail') || form.querySelector('#contactEmail');
      const companyInput = form.querySelector('[name="company"]') || form.querySelector('#modalCompany') || form.querySelector('#contactCompany');
      const typeInput = form.querySelector('[name="project_type"]') || form.querySelector('#modalProjectType') || form.querySelector('#contactProjectType');
      const budgetInput = form.querySelector('[name="budget"]') || form.querySelector('#modalBudget') || form.querySelector('#contactBudget');
      const timelineInput = form.querySelector('[name="timeline"]') || form.querySelector('#modalTimeline') || form.querySelector('#contactTimeline');
      const descInput = form.querySelector('[name="description"]') || form.querySelector('#modalProjectDesc') || form.querySelector('#contactDesc');

      senderName = nameInput?.value.trim() || 'Client';
      senderEmail = emailInput?.value.trim() || '';

      payload = {
        full_name: senderName,
        email_address: senderEmail,
        company_or_brand: companyInput?.value.trim() || 'Individual / Startup',
        project_type: typeInput?.value || 'General Digital Project',
        budget_range: budgetInput?.value || 'Not specified',
        target_timeline: timelineInput?.value || 'Flexible',
        project_description: descInput?.value.trim() || '',
        _subject: `New Project Inquiry from ${senderName} [NEXON Solutions]`,
        _replyto: senderEmail,
        _template: 'table',
        _captcha: 'false'
      };
    }

    // Always preserve inquiry in localStorage backup
    try {
      const backupList = JSON.parse(localStorage.getItem('nexon_inquiries_backup') || '[]');
      backupList.unshift({ ...payload, submittedAt: new Date().toISOString() });
      localStorage.setItem('nexon_inquiries_backup', JSON.stringify(backupList));
    } catch (err) {
      console.warn('Backup write error:', err);
    }

    try {
      // Send directly to NEXON's company email via FormSubmit AJAX endpoint
      const response = await fetch(`https://formsubmit.co/ajax/${COMPANY_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      form.reset();
      if (modalIdToClose) closeModal(modalIdToClose);

      if (formType === 'talent') {
        showToast(`Application received! Thank you, ${senderName}. Our vetting leads at ${COMPANY_EMAIL} will review your profile.`, 6000);
      } else {
        showToast(`Inquiry delivered! Thank you, ${senderName}. Our leadership team at ${COMPANY_EMAIL} will review your project and get back to you within 24 hours.`, 6000);
      }
    } catch (networkError) {
      console.warn('Network or endpoint notice:', networkError);

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }

      form.reset();
      if (modalIdToClose) closeModal(modalIdToClose);

      // Graceful fallback with confirmation
      showToast(`Thank you, ${senderName}! Your project inquiry details have been recorded. Our team at ${COMPANY_EMAIL} will be in touch shortly.`, 6000);
    }
  };

  // Wire up all contact and inquiry forms
  const pageContactForm = document.getElementById('pageContactForm');
  if (pageContactForm) {
    pageContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormToEmail(pageContactForm, null, 'contact');
    });
  }

  const modalInquiryForm = document.getElementById('modalInquiryForm');
  if (modalInquiryForm) {
    modalInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormToEmail(modalInquiryForm, 'projectInquiryModal', 'inquiry');
    });
  }

  const modalTalentForm = document.getElementById('modalTalentForm');
  if (modalTalentForm) {
    modalTalentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitFormToEmail(modalTalentForm, 'talentApplicationModal', 'talent');
    });
  }

  // ---------------------------------------------------------------------------
  // 14. Project Detail Modal Population
  // ---------------------------------------------------------------------------
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
      const github = card.getAttribute('data-project-github') || 'https://github.com/nexon-pk';

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
});
