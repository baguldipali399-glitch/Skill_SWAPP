function scrollToSection(sectionId) {

    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ==================== AUTH MODAL ==================== */

function openSignup() {

    isLoginMode = false;

    updateAuthModal();

    document.getElementById("authModal").classList.add("active");
}


function openLogin() {

    isLoginMode = true;

    updateAuthModal();

    document.getElementById("authModal").classList.add("active");
}


function closeModal() {

    document.getElementById("authModal").classList.remove("active");
}


function toggleAuthMode() {

    isLoginMode = !isLoginMode;

    updateAuthModal();
}


function updateAuthModal() {

    const title = document.getElementById("authTitle");
    const subtitle = document.getElementById("authSubtitle");

    const nameField = document.getElementById("nameField");

    const buttonText = document.getElementById("authButtonText");

    const switchText = document.getElementById("switchText");

    const switchButton = document.getElementById("switchButton");


    if (isLoginMode) {

        title.textContent = "Welcome Back";

        subtitle.textContent =
            "Login to continue your skill journey.";

        nameField.style.display = "none";

        buttonText.textContent = "Login";

        switchText.textContent =
            "Don't have an account?";

        switchButton.textContent =
            "Create Account";

    } else {

        title.textContent = "Join Skill Swap";

        subtitle.textContent =
            "Create your campus skill-sharing profile.";

        nameField.style.display = "block";

        buttonText.textContent =
            "Create Account";

        switchText.textContent =
            "Already have an account?";

        switchButton.textContent =
            "Login";
    }
}


/* ==================== AUTH HANDLER ==================== */

function handleAuth(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const name =
        document.getElementById("fullName").value.trim();


    if (!email || !password) {

        showToast("Please fill all required fields.");

        return;
    }


    if (!isLoginMode && !name) {

        showToast("Please enter your full name.");

        return;
    }


    if (password.length < 6) {

        showToast("Password must contain at least 6 characters.");

        return;
    }


    currentUser.email = email;


    if (!isLoginMode) {

        currentUser.name = name;

        showToast("Account created successfully!");

    } else {

        currentUser.name =
            localStorage.getItem("skillSwapUser") ||
            "Student";

        showToast("Login successful!");
    }


    localStorage.setItem(
        "skillSwapUser",
        currentUser.name
    );

    setTimeout(() => {

        closeModal();

        showDashboard();

    }, 700);
}


/* ==================== DASHBOARD ==================== */

function showDashboard() {

    document
        .getElementById("landingPage")
        .classList.add("hidden");

    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");


    updateUserInformation();
}


function updateUserInformation() {

    const userName =
        document.getElementById("userName");

    const userAvatar =
        document.getElementById("userAvatar");

    const profileName =
        document.getElementById("profileName");


    if (userName) {

        userName.textContent =
            currentUser.name;
    }


    if (profileName) {

        profileName.textContent =
            currentUser.name;
    }


    if (userAvatar) {

        userAvatar.textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();
    }
}


/* ==================== DASHBOARD NAVIGATION ==================== */

const dashboardSections = [
    "dashboard",
    "discover",
    "matches",
    "requests",
    "sessions",
    "wallet",
    "profile"
];


function showDashboardSection(sectionName, clickedButton) {

    dashboardSections.forEach(section => {

        const element =
            document.getElementById(
                section + "Section"
            );

        if (element) {

            element.classList.add(
                "hidden-section"
            );
        }
    });


    const target =
        document.getElementById(
            sectionName + "Section"
        );


    if (target) {

        target.classList.remove(
            "hidden-section"
        );
    }


    document
        .querySelectorAll(".sidebar .nav-item")
        .forEach(item => {

            item.classList.remove("active");

        });


    if (clickedButton) {

        clickedButton.classList.add("active");

    } else {

        const matchingButton =
            document.querySelector(
                `.nav-item[onclick*="'${sectionName}'"]`
            );

        if (matchingButton) {

            matchingButton.classList.add("active");
        }
    }


    const titles = {

        dashboard:
            "Good Evening, " +
            currentUser.name +
            " 👋",

        discover:
            "Discover Students",

        matches:
            "Your Matches",

        requests:
            "Swap Requests",

        sessions:
            "My Sessions",

        wallet:
            "Skill Wallet",

        profile:
            "My Profile"
    };


    const title =
        document.getElementById(
            "dashboardTitle"
        );


    if (title) {

        title.textContent =
            titles[sectionName] || "Skill Swap";
    }
}


function showDashboardSectionByName(sectionName) {

    const button =
        document.querySelector(
            `.nav-item[onclick*="'${sectionName}'"]`
        );

    showDashboardSection(
        sectionName,
        button
    );
}


/* ==================== MOBILE SIDEBAR ==================== */

function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList.toggle("open");
}


/* ==================== MOBILE LANDING MENU ==================== */

function toggleMobileMenu() {

    const nav =
        document.querySelector(".navbar nav");

    const actions =
        document.querySelector(".nav-actions");


    if (nav.style.display === "flex") {

        nav.style.display = "none";
        actions.style.display = "none";

    } else {

        nav.style.display = "flex";
        nav.style.flexDirection = "column";
        nav.style.position = "absolute";
        nav.style.top = "76px";
        nav.style.left = "0";
        nav.style.right = "0";
        nav.style.padding = "20px";
        nav.style.background = "white";

        actions.style.display = "flex";
        actions.style.position = "absolute";
        actions.style.top = "230px";
        actions.style.left = "20px";
    }
}


/* ==================== REQUESTS ==================== */

function sendRequest(studentName) {

    showToast(
        `Swap request sent to ${studentName}!`
    );
}


function acceptRequest(button) {

    const card =
        button.closest(".request-card");

    if (!card) return;


    const actions =
        card.querySelector(".request-actions");


    actions.innerHTML = `
        <span class="request-status"
              style="background:#eaf9f0;color:#16834c;">
            Accepted
        </span>
    `;


    showToast(
        "Swap request accepted!"
    );
}


function declineRequest(button) {

    const card =
        button.closest(".request-card");

    if (!card) return;


    card.style.opacity = "0.5";


    const actions =
        card.querySelector(".request-actions");


    actions.innerHTML = `
        <span class="request-status"
              style="background:#fff0f0;color:#dc2626;">
            Declined
        </span>
    `;


    showToast(
        "Swap request declined."
    );
}


/* ==================== SEARCH ==================== */

function filterStudents() {

    const search =
        document
            .getElementById("studentSearch")
            .value
            .toLowerCase()
            .trim();


    const cards =
        document.querySelectorAll(
            ".student-card"
        );


    cards.forEach(card => {

        const searchableText =
            card
                .dataset
                .search
                .toLowerCase();


        if (
            searchableText.includes(search)
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";
        }
    });
}


/* ==================== PROFILE ==================== */

function editProfile() {

    showToast(
        "Profile editing is ready for backend integration."
    );
}


/* ==================== LOGOUT ==================== */

function logout() {

    document
        .getElementById("dashboardPage")
        .classList.add("hidden");


    document
        .getElementById("landingPage")
        .classList.remove("hidden");


    showToast(
        "You have been logged out."
    );
}


/* ==================== TOAST ==================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent =
        message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);
}


/* ==================== MODAL OUTSIDE CLICK ==================== */

document
    .getElementById("authModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeModal();
            }
        }
    );


/* ==================== ESCAPE KEY ==================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeModal();
        }
    }
);


/* ==================== INITIALIZATION ==================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const savedUser =
            localStorage.getItem(
                "skillSwapUser"
            );


        if (savedUser) {

            currentUser.name =
                savedUser;
        }


        console.log(
            "Skill Swap Campus initialized."
        );
    }
);
skill-swap-campus/
│
├── index.html
├── dashboard.html
├── discover.html
├── matches.html
├── sessions.html
├── profile.html
├── wallet.html
│
├── css/
│   ├── style.css
│   └── dashboard.css
│
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── dashboard.js
│   ├── discover.js
│   ├── matches.js
│   ├── sessions.js
│   ├── profile.js
│   └── wallet.js
│
├── database/
│   └── schema.sql
│
└── README.md
