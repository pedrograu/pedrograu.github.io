// Mobile navigation toggle
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .education-item, .experience-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Add hover effects for skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add click-to-copy functionality for contact links
document.querySelectorAll('.contact-item a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Add a subtle animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// PDF Generation Functionality
document.addEventListener('DOMContentLoaded', () => {
    const downloadPdfBtn = document.getElementById('downloadPdf');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', generatePDF);
    }
});

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Pedro Grau', 20, 30);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Software Engineer with 10+ years of experience', 20, 40);
    
    // Contact Information
    doc.setFontSize(10);
    doc.text('Email: pedrograu7@gmail.com', 20, 55);
    doc.text('LinkedIn: linkedin.com/in/pedrojgrau', 20, 62);
    
    // About
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('About', 20, 80);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const aboutText = 'Software Engineer with 10+ years of experience, specializing in product-focused solutions across the Gambling and Fintech industries — sectors where data availability and consistency are critical. Skilled at leading teams, managing backlogs, and integrating scalable systems. Known for continuous professional growth and delivering business-driven results.';
    const aboutLines = doc.splitTextToSize(aboutText, 170);
    doc.text(aboutLines, 20, 90);
    
    // Skills
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Skills', 20, 120);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const skills = [
        ['Programming Languages', 'Java 21, Kotlin, SQL'],
        ['Frameworks & Tools', 'Spring Framework, Axon Framework, Maven, Docker, OpenAPI'],
        ['Infrastructure & Communication', 'RabbitMQ, PostgreSQL, Redis, DynamoDB, MySQL'],
        ['Management & Soft Skills', 'Scrum Management, Team Leadership, Mentoring, Sales Analysis, Communication']
    ];
    
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
    doc.text('Bachelor in Computer Science - University of Seville', 20, 210);
    
    // Experience
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Work Experience', 20, 230);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const experiences = [
        {
            title: 'Software Backend Developer',
            company: 'Lastminute.com',
            period: '2024 - Present',
            description: 'Part of a team responsible for maintaining and enhancing a suite of ten microservices for an online travel agency handling +7k bookings per day. Applying hexagonal architecture and TDD daily on Java 21 and Kotlin code.'
        },
        {
            title: 'Software Backend Developer',
            company: 'Klearing, Marbella, Spain (Start-up, Fintech)',
            period: '2022 - 2024',
            description: 'Part of the backend team of a product that made payments and conversions smartly and efficiently. Working with microservice architecture using Java 17, Spring and Axon Framework.'
        },
        {
            title: 'Integration Technical Leader',
            company: 'Golden Race, Widnau, Switzerland (Gambling product)',
            period: '2018 - 2022',
            description: 'Acted as liaison between technical teams and business stakeholders, directly engaging with clients to define integration needs. Mentoring new coworkers and acting as a product owner of the team.'
        },
        {
            title: 'Software Backend Developer',
            company: 'Golden Race, Sevilla, Spain (Gambling product)',
            period: '2015 - 2018',
            description: 'GoldenRace is a betting product that handles millions of bets per day integrated on more than 500 customers around the world. Implementing JAVA 11 code using Spring Framework and Maven.'
        },
        {
            title: 'Software Backend Developer',
            company: 'Klicap, Sevilla, Spain (Start-up, partially working for GoldenRace)',
            period: '2015 - 2015',
            description: 'Started this job before finishing my degree. Duties included working on the company product, a suite for continuous integration with Jenkins, Sonar, Redmin, and Nexus.'
        }
    ];
    
    let currentY = 240;
    experiences.forEach((exp, index) => {
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
    doc.save('Pedro_Grau_Resume.pdf');
} 