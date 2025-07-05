// GOOGLE SHEETS CONFIGURATION
const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbwTWc4ywMxAqO3Lb8JMNrsea_m1rV6qmUoSdCQFGr2FGTyATnmUXuCxK82Aizt1nR-xpA/exec";

// Store messages in memory
let guestMessages = {};

// Page navigation functions
function showMainPage() {
  document.getElementById("mainPage").classList.remove("hidden");
  document.getElementById("menuPage").classList.add("hidden");
  document.getElementById("guestBookPage").classList.add("hidden");
}

function showMenu() {
  document.getElementById("mainPage").classList.add("hidden");
  document.getElementById("menuPage").classList.remove("hidden");
  document.getElementById("guestBookPage").classList.add("hidden");
}

function showGuestBook() {
  document.getElementById("mainPage").classList.add("hidden");
  document.getElementById("menuPage").classList.add("hidden");
  document.getElementById("guestBookPage").classList.remove("hidden");

  // Initialize guest book when shown
  if (document.getElementById("guestGrid").children.length === 0) {
    initializeGuestBook();
  }
}

// Guest book functions
function showConnectionStatus(message, isError = false) {
  const status = document.getElementById("connectionStatus");
  status.textContent = message;
  status.className = `connection-status ${isError ? "error" : "connected"}`;
  status.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 10px 15px;
    border-radius: 20px;
    color: white;
    font-size: 12px;
    z-index: 1000;
    display: block;
    background: ${isError ? "#ff6b6b" : "#4ecdc4"};
  `;

  setTimeout(() => {
    status.style.display = "none";
  }, 3000);
}

function initializeGuestBook() {
  const guestGrid = document.getElementById("guestGrid");
  guestGrid.innerHTML = "";

  guestNames.forEach((name) => {
    const guestCard = createGuestCard(name);
    guestGrid.appendChild(guestCard);
  });
}

function createGuestCard(name) {
  const card = document.createElement("div");
  card.className = "guest-card";
  card.setAttribute("data-name", name.toLowerCase());
  card.style.cssText = `
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;
    transition: all 0.3s ease;
    position: relative;
  `;

  const hasMessage = guestMessages[name];
  if (hasMessage) {
    card.style.borderLeft = "5px solid #4ecdc4";
  }

  card.innerHTML = `
    <div class="guest-name" style="font-size: 1.4em; font-weight: bold; color: #333; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 0.8em;">👤</span>${name}
    </div>
    <div class="message-area" style="margin-top: 15px;">
        ${
          hasMessage
            ? `<div class="saved-message" style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 10px; padding: 15px; margin-top: 10px; font-style: italic; color: #555; position: relative;">
                <span style="position: absolute; top: -5px; right: -5px; font-size: 20px;">💌</span>
                "${hasMessage}"
                <button onclick="editMessage('${name}')" style="background: #feca57; color: #333; border: none; padding: 5px 10px; border-radius: 15px; cursor: pointer; font-size: 12px; margin-top: 8px; transition: all 0.3s ease;">Edit</button>
            </div>`
            : `<div style="color: #666; font-size: 0.9em; margin-bottom: 10px;">Share your wishes for the happy couple!</div>
            <textarea 
                placeholder="Write your heartfelt message here..." 
                id="message-${name}"
                style="width: 100%; min-height: 80px; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px; resize: vertical; font-family: inherit; transition: border-color 0.3s ease;"
            ></textarea>
            <button onclick="saveMessage('${name}')" style="background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 14px; margin-top: 10px; transition: all 0.3s ease;">
                💌 Save Message
            </button>`
        }
    </div>
  `;

  // Add hover effects
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
    card.style.borderColor = "#ff6b6b";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)";
    card.style.borderColor = hasMessage ? "#4ecdc4" : "transparent";
  });

  return card;
}

async function saveMessage(name) {
  const messageInput = document.getElementById(`message-${name}`);
  const message = messageInput.value.trim();

  if (message) {
    const saveBtn = messageInput.nextElementSibling;
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = "⏳ Saving...";
    saveBtn.disabled = true;

    try {
      await saveToGoogleSheets(name, message);
      guestMessages[name] = message;

      const card = document.querySelector(
        `[data-name="${name.toLowerCase()}"]`
      );
      card.innerHTML = `
        <div class="guest-name" style="font-size: 1.4em; font-weight: bold; color: #333; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.8em;">👤</span>${name}
        </div>
        <div class="message-area" style="margin-top: 15px;">
            <div class="saved-message" style="background: #f8f9fa; border: 1px solid #e9ecef; border-radius: 10px; padding: 15px; margin-top: 10px; font-style: italic; color: #555; position: relative;">
                <span style="position: absolute; top: -5px; right: -5px; font-size: 20px;">💌</span>
                "${message}"
                <button onclick="editMessage('${name}')" style="background: #feca57; color: #333; border: none; padding: 5px 10px; border-radius: 15px; cursor: pointer; font-size: 12px; margin-top: 8px;">Edit</button>
                <div style="font-size: 12px; color: #4ecdc4; margin-top: 5px;">✅ Saved to database</div>
            </div>
        </div>
      `;
      card.style.borderLeft = "5px solid #4ecdc4";

      card.style.transform = "scale(1.05)";
      setTimeout(() => {
        card.style.transform = "scale(1)";
      }, 300);

      showConnectionStatus("Message saved successfully!");
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      guestMessages[name] = message;
      showConnectionStatus("Saved locally (check connection)", true);
    }
  } else {
    alert("Please write a message before saving!");
  }
}

function editMessage(name) {
  const card = document.querySelector(`[data-name="${name.toLowerCase()}"]`);
  const currentMessage = guestMessages[name];

  card.innerHTML = `
    <div class="guest-name" style="font-size: 1.4em; font-weight: bold; color: #333; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 0.8em;">👤</span>${name}
    </div>
    <div class="message-area" style="margin-top: 15px;">
        <div style="color: #666; font-size: 0.9em; margin-bottom: 10px;">Edit your message:</div>
        <textarea 
            id="message-${name}"
            style="width: 100%; min-height: 80px; padding: 12px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px; resize: vertical; font-family: inherit;"
        >${currentMessage}</textarea>
        <button onclick="saveMessage('${name}')" style="background: linear-gradient(45deg, #4ecdc4, #44a08d); color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer; font-size: 14px; margin-top: 10px;">
            💌 Update Message
        </button>
    </div>
  `;

  setTimeout(() => {
    document.getElementById(`message-${name}`).focus();
  }, 100);
}

async function saveToGoogleSheets(name, message) {
  if (GOOGLE_SHEETS_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
    console.log("Google Sheets not configured yet");
    return;
  }

  const params = new URLSearchParams({
    timestamp: new Date().toISOString(),
    name: name,
    message: message,
    action: "save",
  });

  try {
    const response = await fetch(`${GOOGLE_SHEETS_URL}?${params.toString()}`, {
      method: "GET",
      mode: "no-cors",
    });
    return { status: "success" };
  } catch (error) {
    throw new Error("Network error: " + error.message);
  }
}

// Search functionality
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchInput").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    const guestCards = document.querySelectorAll(".guest-card");

    guestCards.forEach((card) => {
      const name = card.getAttribute("data-name");
      if (name && name.includes(searchTerm)) {
        card.style.display = "block";
        if (searchTerm && name.startsWith(searchTerm)) {
          card.style.order = "-1";
        }
      } else {
        card.style.display = "none";
      }
    });
  });
});
