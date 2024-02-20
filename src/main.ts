import "./style.css";
import anime from "animejs";
import $ from "jquery";

// import typescriptLogo from "./typescript.svg";
// import viteLogo from "/vite.svg";

function getElById<T>(id: string): T {
  return document.getElementById(id) as T;
}

let loading = true;
const main = getElById<HTMLElement>("main");
const profile = getElById<HTMLElement>("profile");
// const boxGroup = getElById<HTMLElement>("box-group");

anime({
  targets: "#preloader",
  easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
  delay: 2000,
  duration: anime.stagger(100),
  keyframes: [
    {
      duration: 1000,
      height: 0
    },
    {
      delay: 500,
      easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
      opacity: 0
    }
  ]
});

anime({
  targets: "#loading-group",
  delay: 2000,
  opacity: 0
});

let loadingObj = {
  num: "0%"
};

anime({
  targets: loadingObj,
  num: "100%",
  round: 1,
  duration: 1700,
  easing: "cubicBezier(0.355, 0.890, 0.755, 0.580)",
  update: function () {
    (document.getElementById("loading-bar") as HTMLElement).style.width = loadingObj.num;
    (document.getElementById("loading-percentage") as HTMLElement).innerText = loadingObj.num;
  },
  changeComplete: function () {
    $(getElById("loading-group")).fadeOut(500);
  }
});

setTimeout(() => {
  // show main

  $(main).show();
  anime({
    targets: "#main",
    delay: 2000,
    opacity: 1
  });

  anime({
    targets: "#box-group .box",
    delay: function (_el, i, _l) {
      return i * 200;
    },

    keyframes: [
      {
        opacity: 1,
        top: "50%",
        left: "50%",
        translateX: "-50%",
        translateY: "-50%",
        rotate: anime.stagger([-20, 100])
      }
    ],
    changeComplete: function () {
      $(profile).show();
    }
  });

  setTimeout(() => {
    anime({
      targets: "#list a",
      delay: anime.stagger(200),
      opacity: 1,
      changeComplete: function () {
        loading = false;

        anime({
          targets: "#box-group .box",
          delay: anime.stagger(200, { start: 2000 }),
          endDelay: anime.stagger(200, { start: 2000 }),
          direction: "alternate",
          keyframes: [
            {
              duration: 1000,
              scale: 1.2,
              "border-radius": "60px"
            },
            {
              duration: 1000,
              scale: 1
            }
          ],
          loop: true
        });

        $(getElById("loading-footer")).fadeIn(1000);
        setTimeout(() => {
          $(getElById("loading-footer")).fadeOut();
          $(getElById("footer"))
            .text(`© 2024 - ${new Date().getFullYear()} | Made with love ❤️ by Jadlion`)
            .fadeIn(1000);
        }, 5000);
      }
    });
  }, 3000);
}, 3000);

let clicked = false;
let type = "none";

getElById<HTMLLIElement>("show-skills").addEventListener("click", () => {
  console.log("ahaah");
  console.log({ loading, clicked });
  if (loading === false) {
    loading = true;

    anime({
      targets: "#skills-tabs",
      duration: 1000,
      keyframes: [
        {
          duration: 500,
          bottom: "100px"
        }
      ]
    });

    loading = false;
  }

  type = "skills";
});

getElById<HTMLLIElement>("show-certificate").addEventListener("click", () => {
  if (loading === false) {
    loading = true;
    loading = false;
  }
});

const closeBtn = getElById<HTMLButtonElement>("close");
closeBtn.addEventListener("click", () => {
  // if (loading === false && clicked === true) {
  // } else if (loading === false && clicked === false) {
  // }
  loading = true;

  showMain();
  switch (type) {
    case "socials": {
      $(getElById("socials")).fadeOut().fadeTo(500, 0);
      type = "none";
      break;
    }
    case "projects": {
      $(getElById("projects")).fadeOut().fadeTo(500, 0);
      break;
    }
    case "skills": {
      $(getElById("skills")).fadeOut().fadeTo(500, 0);
      anime({
        targets: "#skills-tabs",
        delay: 500,
        keyframes: [
          {
            duration: 500,
            bottom: 0
          }
        ]
      });

      type = "none";
      break;
    }
    case "about": {
      $(getElById("about")).fadeOut().fadeTo(500, 0);
      type = "none";
      break;
    }
    default: {
      type = "none";
      break;
    }
  }

  console.log("false");
  loading = false;
});

getElById<HTMLLinkElement>("link-about").addEventListener("click", () => {
  if (loading === false && clicked === false) {
    // Hide
    loading = true;

    hideMain();
    $(getElById("about")).fadeIn().fadeTo(500, 1);
    type = "about";
  }
});

getElById<HTMLLinkElement>("link-skills").addEventListener("click", () => {
  if (loading === false && clicked === false) {
    // Hide
    loading = true;

    hideMain();
    $(getElById("skills")).fadeIn().fadeTo(500, 1);
    type = "skills";
  }
});

getElById<HTMLLinkElement>("link-projects").addEventListener("click", () => {
  if (loading === false && clicked === false) {
    // Hide
    loading = true;

    hideMain();
    $(getElById("projects")).fadeIn().fadeTo(500, 1);
    type = "projects";
  }
});

getElById<HTMLLinkElement>("link-socials").addEventListener("click", () => {
  if (loading === false && clicked === false) {
    // Hide
    loading = true;

    hideMain();
    $(getElById("socials")).fadeIn().fadeTo(500, 1);
    type = "socials";
  }
});

function showMain() {
  $(main).fadeIn(500);
  $(profile).fadeIn(500);
  $(closeBtn).fadeOut(500);

  anime({
    targets: "#profile",
    duration: anime.stagger(100),
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    keyframes: [
      {
        duration: 1000,
        opacity: 1
      }
    ]
  });

  anime({
    targets: "#box-group",
    duration: anime.stagger(100),
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    keyframes: [
      {
        duration: 1000,
        opacity: 1
      }
    ]
  });

  anime({
    targets: "#preloader",
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    duration: anime.stagger(100),
    keyframes: [
      {
        duration: 500,
        height: 0
      },
      {
        delay: 500,
        easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
        opacity: 0
      }
    ],
    changeComplete: function () {
      loading = false;
      clicked = !clicked;
    }
  });
  return;
}

function hideMain() {
  $(main).fadeOut(500);
  $(profile).fadeOut(500);
  $(closeBtn).fadeIn(500);

  anime({
    targets: "#profile",
    duration: anime.stagger(100),
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    keyframes: [
      {
        duration: 1000,
        opacity: 0
      }
    ]
  });

  anime({
    targets: "#box-group",
    duration: anime.stagger(100),
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    keyframes: [
      {
        duration: 500,
        opacity: 0
      }
    ]
  });

  anime({
    targets: "#preloader",
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    duration: anime.stagger(100),
    keyframes: [
      {
        opacity: 1
      },
      {
        duration: 1000,
        height: "100vh"
      },
      {
        delay: 500,
        easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)"
      }
    ],
    changeComplete: function () {
      loading = false;
      clicked = !clicked;
    }
  });
  return;
}
