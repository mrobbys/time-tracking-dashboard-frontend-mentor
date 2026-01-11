// DOM Element
const contentWrapper = document.getElementById("content-wrapper");
const actionButtons = document.querySelector(".action-buttons");

// state
let stateData = [];
let isActiveBtn = "daily";

// fetch data
const fetchData = async () => {
  try {
    const res = await fetch("data.json");
    if (!res.ok) throw new Error("Failed to fetch data");
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// render data
const renderData = (timeframe) => {
  const timeframeText = {
    daily: { previousText: "Yesterday" },
    weekly: { previousText: "Last Week" },
    monthly: { previousText: "Last Month" },
  };

  const html = stateData
    .map(
      (item) => `
        <section class="rounded-xl relative pt-8">
          <div style="background-color: ${item.bgColor}" class="rounded-t-xl absolute top-0 left-0 right-0 h-10 z-10 overflow-hidden">
            <img src="${item.icon}" alt="${item.title}" width="64" class="absolute -top-2 right-4">
          </div>
          <div class="flex flex-col justify-between bg-[#1c1f4a] p-6 rounded-xl z-20 relative cursor-pointer transition-colors duration-300 hover:bg-[#34397b]">
            <div class="flex justify-between items-center">
              <h2 class="font-medium text-lg">${item.title}</h2>
              <img src="images/icon-ellipsis.svg" alt="" width="16" class="my-2" />
            </div>
            <div class="flex justify-between items-center md:flex-col md:items-start md:mt-4 md:gap-2">
              <p class="text-3xl font-light md:text-5xl">${item.timeframes[timeframe].current}hrs</p>
              <p class="text-sm text-[#bdc1ff]">${timeframeText[timeframe].previousText} - ${item.timeframes[timeframe].previous}hrs</p>
            </div>
          </div>
        </section>
    `,
    )
    .join("");

  // remove existing cards except profile card
  const existingCards = contentWrapper.querySelectorAll(
    "section:not(#profile)",
  );
  existingCards.forEach((card) => card.remove());
  contentWrapper.insertAdjacentHTML("beforeend", html);
};

// action buttons event listener
const actionButtonsEventListener = () => {
  actionButtons.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    // if no button is clicked, return
    if (!btn) return;

    isActiveBtn = btn.dataset.timeframe;
    
    // remove active class from all buttons
    actionButtons.querySelectorAll("button").forEach((b) => {
      b.classList.remove("text-[#bdc1ff]");
      b.classList.add("text-[#6f76c8]");
    });

    // add active class to clicked button
    btn.classList.add("text-[#bdc1ff]");
    btn.classList.remove("text-[#6f76c8]");

    // render data based on clicked button timeframe data attribute
    renderData(isActiveBtn);
  });
};

// event listener
document.addEventListener("DOMContentLoaded", async () => {
  stateData = await fetchData();
  // only proceed if data is fetched successfully
  if (stateData) {
    actionButtonsEventListener();
    renderData(isActiveBtn);
  }

  // set daily button as active on initial load
  const dailyBtn = document.getElementById("daily-btn");
  if (dailyBtn) {
    dailyBtn.classList.add("text-[#bdc1ff]");
    dailyBtn.classList.remove("text-[#6f76c8]");
  }
});
