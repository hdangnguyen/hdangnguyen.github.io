/*!
* Start Bootstrap - Personal v1.0.1 (https://startbootstrap.com/template-overviews/personal)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-personal/blob/master/LICENSE)
*/

// ============================================================
// GA4 Click Tracking — Event Delegation
// Handles all click tracking from a single place.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // Helper: safely fire gtag events (guards against gtag not loaded yet)
    function trackEvent(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
        }
    }

    document.addEventListener('click', function (e) {
        var target = e.target.closest('a, button');
        if (!target) return;

        var href = target.getAttribute('href') || '';
        var text = (target.innerText || target.getAttribute('title') || '').trim();
        var page = window.location.pathname;

        // ----------------------------------------------------------
        // 1. CTA Buttons: "View My Projects" & "About My Journey"
        // ----------------------------------------------------------
        if (href.includes('projects.html') && target.classList.contains('btn')) {
            trackEvent('cta_click', {
                button_label: text || 'View My Projects',
                page_location: page
            });
        }

        if (href.includes('resume.html') && target.classList.contains('btn')) {
            trackEvent('cta_click', {
                button_label: text || 'About My Journey',
                page_location: page
            });
        }

        // ----------------------------------------------------------
        // 2. Project Cards — "View Case Study" links
        // ----------------------------------------------------------
        if (href.includes('/projects/') || href.match(/projects\/.*\.html/)) {
            // Try to get the project title from the card heading
            var card = target.closest('.card');
            var projectTitle = card
                ? (card.querySelector('h2') || card.querySelector('h3') || card.querySelector('h4') || {}).innerText || href
                : href;

            trackEvent('view_case_study', {
                project_name: projectTitle.trim(),
                project_url: href,
                page_location: page
            });
        }

        // ----------------------------------------------------------
        // 3. Social / Contact Links
        // ----------------------------------------------------------
        if (href.includes('linkedin.com')) {
            trackEvent('social_click', {
                platform: 'LinkedIn',
                page_location: page
            });
        }

        if (href.includes('github.com') && !href.includes('cdn.jsdelivr.net')) {
            trackEvent('social_click', {
                platform: 'GitHub',
                page_location: page
            });
        }

        if (href.startsWith('mailto:')) {
            trackEvent('contact_click', {
                method: 'Email',
                page_location: page
            });
        }

        // ----------------------------------------------------------
        // 4. Project Detail Page Links (Source Code / PDF Report)
        // ----------------------------------------------------------
        if (target.classList.contains('btn') && text.toLowerCase().includes('source code')) {
            trackEvent('project_link_click', {
                link_type: 'Source Code',
                page_location: page
            });
        }

        if (target.classList.contains('btn') && text.toLowerCase().includes('report')) {
            trackEvent('project_link_click', {
                link_type: 'PDF Report',
                page_location: page
            });
        }

        // ----------------------------------------------------------
        // 5. Download Resume button
        // ----------------------------------------------------------
        if (text.toLowerCase().includes('download') && text.toLowerCase().includes('resume')) {
            trackEvent('resume_download', {
                page_location: page
            });
        }

        // ----------------------------------------------------------
        // 6. Navbar Navigation Links
        // ----------------------------------------------------------
        if (target.classList.contains('nav-link')) {
            trackEvent('nav_click', {
                destination: text,
                page_location: page
            });
        }

    });

});