import "./style.css";
import anime from "animejs";
import $ from "jquery";

function getElById<T>(id: string): T {
  return document.getElementById(id) as T;
}

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.display = "block";
});

let loading = true;
const main = getElById<HTMLElement>("main");
const profile = getElById<HTMLElement>("profile");

const randomLoading = [
  `
  <span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    class="m-auto"
    width="32"
    height="32"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <g transform="translate(50 50)">
      <g ng-attr-transform="scale(1)">
        <g transform="translate(-50 -50)">
          <path
            fill="#ffffff"
            stroke="#ffffff"
            stroke-width="0"
            d="M50,14c19.85,0,36,16.15,36,36S69.85,86,50,86S14,69.85,14,50S30.15,14,50,14 M50,10c-22.091,0-40,17.909-40,40 s17.909,40,40,40s40-17.909,40-40S72.091,10,50,10L50,10z"
          ></path>
          <path
            fill="#ffffff"
            d="M52.78,42.506c-0.247-0.092-0.415-0.329-0.428-0.603L52.269,40l-0.931-21.225C51.304,18.06,50.716,17.5,50,17.5 s-1.303,0.56-1.338,1.277L47.731,40l-0.083,1.901c-0.013,0.276-0.181,0.513-0.428,0.604c-0.075,0.028-0.146,0.063-0.22,0.093V44h6 v-1.392C52.925,42.577,52.857,42.535,52.78,42.506z"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="1s"
            ></animateTransform>
          </path>
          <path
            fill="#ffffff"
            d="M58.001,48.362c-0.634-3.244-3.251-5.812-6.514-6.391c-3.846-0.681-7.565,1.35-9.034,4.941 c-0.176,0.432-0.564,0.717-1.013,0.744l-15.149,0.97c-0.72,0.043-1.285,0.642-1.285,1.383c0,0.722,0.564,1.321,1.283,1.363 l15.153,0.971c0.447,0.027,0.834,0.312,1.011,0.744c1.261,3.081,4.223,5.073,7.547,5.073c2.447,0,4.744-1.084,6.301-2.975 C57.858,53.296,58.478,50.808,58.001,48.362z M50,53.06c-1.688,0-3.06-1.373-3.06-3.06s1.373-3.06,3.06-3.06s3.06,1.373,3.06,3.06 S51.688,53.06,50,53.06z"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              values="0 50 50;360 50 50"
              keyTimes="0;1"
              dur="4s"
            ></animateTransform>
          </path>
        </g>
      </g>
    </g>
  </svg>
</span>
The clock is ticking, please take a moment
`,
  `
  <span>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    class="m-auto"
    viewBox="0 0 16 16"
  >
    <path d="M9.167 4.5a1.167 1.167 0 1 1-2.334 0 1.167 1.167 0 0 1 2.334 0" />
    <path
      d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M1 8a7 7 0 0 1 7-7 3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 0 0 7 7 7 0 0 1-7-7m7 4.667a1.167 1.167 0 1 1 0-2.334 1.167 1.167 0 0 1 0 2.334"
    />
  </svg>
</span>
Girls are now praying, please wait warmly...
`
];
const randLoadingNum = Math.floor(Math.random() * randomLoading.length);

$(getElById("loading-footer")).append(randomLoading[randLoadingNum]);

if (randLoadingNum === 1) {
  anime({
    targets: "#loading-footer span svg",
    loop: true,
    rotate: "1turn",
    easing: "linear",
    duration: 990
  });
}

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

getElById<HTMLLIElement>("show-techs").addEventListener("click", () => {
  if (loading === false) {
    loading = true;
    anime({
      targets: "#certificates .items",
      delay: anime.stagger(100),
      keyframes: [{ opacity: 0 }]
    });

    anime({
      targets: "#skills-tabs",
      duration: 1000,
      keyframes: [
        {
          duration: 500,
          bottom: "200px"
        }
      ],
      changeComplete: function () {
        $(getElById("techs-languages")).fadeIn();
        anime({
          targets: "#techs-languages .items",
          duration: 3000,
          delay: anime.stagger(100),
          keyframes: [
            {
              duration: 1100,
              scale: 1.3,
              opacity: 1
            },
            {
              duration: 2500,
              scale: 1
            }
          ],
          changeComplete: function () {
            loading = false;
          }
        });
      }
    });
  }

  type = "skills";
});

getElById<HTMLLIElement>("show-certificate").addEventListener("click", () => {
  if (loading === false) {
    loading = true;

    anime({
      targets: "#techs-languages .items",
      delay: anime.stagger(100),
      keyframes: [{ opacity: 0 }]
    });

    anime({
      targets: "#skills-tabs",
      duration: 1000,
      keyframes: [
        {
          duration: 500,
          bottom: "200px"
        }
      ],
      changeComplete: function () {
        $(getElById("certificates")).fadeIn();
        anime({
          targets: "#certificates .items",
          duration: 3000,
          delay: anime.stagger(100),
          keyframes: [
            {
              duration: 1100,
              scale: 1.3,
              opacity: 1
            },
            {
              duration: 2500,
              scale: 1
            }
          ],
          changeComplete: function () {
            loading = false;
          }
        });
      }
    });
  }

  type = "skills";
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
      $(getElById("socials-footer")).fadeOut();
      type = "none";
      break;
    }
    case "projects": {
      $(getElById("projects")).fadeOut().fadeTo(500, 0);
      break;
    }
    case "skills": {
      $(getElById("skills")).fadeOut().fadeTo(500, 0);
      $(getElById("techs-languages")).fadeOut();
      anime({
        targets: "#skills-tabs",
        delay: 500,
        keyframes: [
          {
            duration: 500,
            bottom: 0
          }
        ],
        changeComplete: function () {
          anime({
            targets: "#techs-languages .items",
            delay: anime.stagger(100),
            opacity: 0
          });
        }
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
    $(getElById("socials-footer")).delay(5000).fadeIn(1000);
    type = "socials";
  }
});

function showMain() {
  $(closeBtn).fadeOut(500);

  anime({
    targets: "#profile",
    duration: 200,
    easing: "cubicBezier(0.500, 0.070, 0.000, 0.770)",
    keyframes: [
      {
        opacity: 1
      }
    ],
    changeComplete: function () {
      $(main).fadeIn(500);
      $(profile).fadeIn(500);
    }
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
