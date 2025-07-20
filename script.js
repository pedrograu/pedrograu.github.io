// Global variable to store resume data
let resumeData = null;

// Load resume data and initialize the page
async function initializePage() {
    try {
        const response = await fetch('data/resume.json');
        resumeData = await response.json();
        populatePage();
        setupEventListeners();
    } catch (error) {
        console.error('Error loading resume data:', error);
    }
}

// Populate the page with data from JSON
function populatePage() {
    if (!resumeData) return;

    // Update hero section
    document.querySelector('.hero-title').textContent = `Hi, I'm ${resumeData.personal.name}`;
    document.querySelector('.hero-subtitle').textContent = resumeData.personal.title;

    // Update about section
    document.querySelector('#about .section-content p').textContent = resumeData.about;

    // Update skills section
    const skillsContainer = document.querySelector('#skills .section-content');
    skillsContainer.innerHTML = '';
    
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
        const skillGroup = document.createElement('div');
        skillGroup.className = 'skill-group';
        
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = category;
        skillGroup.appendChild(categoryTitle);
        
        const skillsList = document.createElement('div');
        skillsList.className = 'skills-list';
        skills.forEach(skill => {
            const skillItem = document.createElement('span');
            skillItem.className = 'skill-item';
            skillItem.textContent = skill;
            skillsList.appendChild(skillItem);
        });
        skillGroup.appendChild(skillsList);
        skillsContainer.appendChild(skillGroup);
    });

    // Update education section
    const educationContent = document.querySelector('#education .section-content');
    educationContent.innerHTML = `
        <div class="education-item">
            <h3>${resumeData.education.degree}</h3>
            <p>${resumeData.education.institution}</p>
        </div>
    `;

    // Update experience section
    const experienceContainer = document.querySelector('#experience .section-content');
    experienceContainer.innerHTML = '';
    
    resumeData.experience.forEach(exp => {
        const experienceItem = document.createElement('div');
        experienceItem.className = 'experience-item';
        
        experienceItem.innerHTML = `
            <div class="experience-header">
                <img class="company-logo" src="${exp.logo}" alt="${exp.company} logo">
                <h3 class="experience-title">${exp.title}</h3>
                <span class="experience-company">
                    <a href="${exp.website}" target="_blank" rel="noopener">${exp.company}</a>, ${exp.location} (${exp.type})
                </span>
                <span class="experience-period">${exp.period}</span>
            </div>
            <div class="experience-description">
                <p>${exp.description}</p>
            </div>
        `;
        
        experienceContainer.appendChild(experienceItem);
    });

    // Update contact section
    const contactContent = document.querySelector('#contact .section-content');
    contactContent.innerHTML = `
        <div class="contact-info">
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <a href="mailto:${resumeData.personal.email}">${resumeData.personal.email}</a>
            </div>
            <div class="contact-item">
                <i class="fab fa-linkedin"></i>
                <a href="https://${resumeData.personal.linkedin}" target="_blank" rel="noopener">${resumeData.personal.linkedin}</a>
            </div>
        </div>
    `;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // PDF download button
    const downloadPdfBtn = document.getElementById('downloadPdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', generatePDF);
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// PDF Generation Functionality
function generatePDF() {
    if (!resumeData) {
        console.error('Resume data not loaded');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(resumeData.personal.name, 20, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(resumeData.personal.title, 20, 40);
    
    // Contact Information
    doc.setFontSize(10);
    doc.text(`Email: ${resumeData.personal.email}`, 20, 55);
    doc.text(`LinkedIn: ${resumeData.personal.linkedin}`, 20, 62);
    
    // About
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('About', 20, 80);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const aboutLines = doc.splitTextToSize(resumeData.about, 170);
    doc.text(aboutLines, 20, 90);
    
    // Skills
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Skills', 20, 120);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const skills = Object.entries(resumeData.skills).map(([category, skillsList]) => [
        category, 
        skillsList.join(', ')
    ]);
    
    doc.autoTable({
        startY: 130,
        head: [['Category', 'Technologies']],
        body: skills,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] },
        styles: { fontSize: 9 },
        columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 110 } }
    });
    
    // Education
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Education', 20, 200);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${resumeData.education.degree} - ${resumeData.education.institution}`, 20, 210);
    
    // Experience
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Work Experience', 20, 230);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    let currentY = 240;
    resumeData.experience.forEach((exp, index) => {
        if (currentY > 250) {
            doc.addPage();
            currentY = 20;
        }
        
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`${exp.title} - ${exp.company}`, 20, currentY);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.text(exp.period, 20, currentY + 5);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const descLines = doc.splitTextToSize(exp.description, 170);
        doc.text(descLines, 20, currentY + 15);
        
        currentY += 15 + (descLines.length * 4) + 10;
    });
    
    // Save the PDF
    doc.save(`${resumeData.personal.name.replace(' ', '_')}_Resume.pdf`);
} 