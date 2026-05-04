import projectData from './projects.js';
import supabase from './supabase.js';

document.addEventListener('DOMContentLoaded', () => {
    const projectContainer = document.getElementById('project-container');
    const domainFilters = document.getElementById('domain-filters');
    const domainSelect = document.getElementById('domain-select');
    const projectSelect = document.getElementById('project-select');
    const form = document.getElementById('enrollment-form');
    const loadMoreBtn = document.getElementById('load-more');

    let currentLimit = 30;
    let currentDomain = 'all';

    // Populate Domains in Filters and Select
    const domains = Object.keys(projectData);
    domains.forEach(domain => {
        // Add to filters
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.textContent = domain;
        btn.dataset.domain = domain;
        domainFilters.appendChild(btn);

        // Add to form select
        const option = document.createElement('option');
        option.value = domain;
        option.textContent = domain;
        domainSelect.appendChild(option);
    });

    // Render Projects
    function renderProjects(filterDomain = 'all', limit = 30) {
        projectContainer.innerHTML = '';
        let count = 0;
        let totalShown = 0;
        
        for (const [domain, projects] of Object.entries(projectData)) {
            if (filterDomain !== 'all' && filterDomain !== domain) continue;

            projects.forEach(project => {
                if (totalShown < limit) {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    card.innerHTML = `
                        <div class="domain-tag">${domain}</div>
                        <h3>${project}</h3>
                    `;
                    projectContainer.appendChild(card);
                    totalShown++;
                }
                count++;
            });
        }

        // Show/Hide Load More button
        if (totalShown < count) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    renderProjects(currentDomain, currentLimit);

    // Filter Logic
    domainFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            currentDomain = e.target.dataset.domain;
            currentLimit = 30; // Reset limit on domain change
            renderProjects(currentDomain, currentLimit);
        }
    });

    // Load More Logic
    loadMoreBtn.addEventListener('click', () => {
        currentLimit += 30;
        renderProjects(currentDomain, currentLimit);
    });

    // Dynamic Dropdown Logic
    domainSelect.addEventListener('change', (e) => {
        const selectedDomain = e.target.value;
        const projects = projectData[selectedDomain];

        projectSelect.innerHTML = '<option value="" disabled selected>Select a project</option>';
        projectSelect.disabled = false;

        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project;
            option.textContent = project;
            projectSelect.appendChild(option);
        });
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            college: document.getElementById('college').value,
            domain: domainSelect.value,
            project: projectSelect.value
        };

        try {
            const { error } = await supabase
                .from('applications')
                .insert([formData]);

            if (error) throw error;

            alert(`Thank you, ${formData.name}! Your application for "${formData.project}" has been submitted successfully.`);
            form.reset();
            projectSelect.disabled = true;
            projectSelect.innerHTML = '<option value="" disabled selected>Select a domain first</option>';
        } catch (error) {
            console.error('Error submitting application:', error.message);
            alert('Something went wrong. Please try again later.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Application';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
