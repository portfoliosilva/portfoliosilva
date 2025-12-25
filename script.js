// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
const navMenu = document.querySelector(".nav-menu")

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
    })
  })
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header scroll effect
const header = document.querySelector(".header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Contact Form Handler
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")
const btnSubmit = document.querySelector(".btn-submit")
const btnText = document.querySelector(".btn-text")
const btnLoader = document.querySelector(".btn-loader")

const DISCORD_WEBHOOK_URL =
  "https://discord.com/api/webhooks/1453640058484822087/YgHaWqGzsQ5RMEdgvsYdiFX7yCAe95RN5_oCLayDxOFHgdFgR2j9Uy5V66PTkCXVbnMs"

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const reason = formData.get("reason")
  const message = formData.get("message")

  // Show loading state
  btnSubmit.disabled = true
  btnText.style.display = "none"
  btnLoader.style.display = "inline"
  formMessage.style.display = "none"

  // Create Discord embed
  const discordPayload = {
    embeds: [
      {
        title: "📬 Nova Mensagem de Contato",
        color: 3447003, // Blue color
        fields: [
          {
            name: "👤 Nome",
            value: name,
            inline: true,
          },
          {
            name: "📧 Email",
            value: email,
            inline: true,
          },
          {
            name: "🎯 Motivo",
            value: reason,
            inline: false,
          },
          {
            name: "💬 Mensagem",
            value: message,
            inline: false,
          },
        ],
        footer: {
          text: "Silva777Only Portfolio",
        },
        timestamp: new Date().toISOString(),
      },
    ],
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discordPayload),
    })

    if (response.ok) {
      formMessage.textContent = "✅ Mensagem enviada com sucesso! Entrarei em contato em breve."
      formMessage.className = "form-message success"
      contactForm.reset()
    } else {
      throw new Error("Erro ao enviar mensagem")
    }
  } catch (error) {
    console.error("Error:", error)
    formMessage.textContent = "❌ Erro ao enviar mensagem. Por favor, tente novamente."
    formMessage.className = "form-message error"
  } finally {
    btnSubmit.disabled = false
    btnText.style.display = "inline"
    btnLoader.style.display = "none"
    formMessage.style.display = "block"
  }
})

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all cards and sections
document.querySelectorAll(".about-card, .experience-card, .dream-card-large, .actor-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})
