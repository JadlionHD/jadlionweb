/**
 * @type {import("pixi.js").Application}
 */
let app;

/**
 * @type {import("pixi.js")}
 */
const pixi = PIXI;

function initPixi() {
  app = new pixi.Application({
    width: "432",
    height: "575"
  });

  var image = pixi.Sprite.from("assets/pp.jpg");
  image.width = "432";
  image.height = "575";
  app.stage.addChild(image);

  displacementSprite = pixi.Sprite.from("assets/download.png");
  displacementFilter = new pixi.DisplacementFilter(displacementSprite);
  displacementSprite.texture.baseTexture.wrapMode = pixi.WRAP_MODES.MIRRORED_REPEAT;
  app.stage.addChild(displacementSprite);
  app.stage.filters = [displacementFilter];

  app.renderer.view.style.transform = "scale(1)";

  displacementSprite.scale.x = 9;
  displacementSprite.scale.y = 9;
  animate();
}
function animate() {
  displacementSprite.x += 10;
  displacementSprite.y += 4;
  requestAnimationFrame(animate);
}

initPixi();

document.querySelector("#pp").replaceWith(app.view);

let tempType = "";
let modal = document.getElementById("modal");
let container = document.getElementById("container");
let loading = document.getElementById("loadingLogo");

const animeSosmed = anime({
  targets: "#socialMedia .list-group .item",
  autoplay: false,
  translateY: -10,
  direction: "alternate",
  loop: true,
  delay: function (el, i, l) {
    return i * 200;
  },
  endDelay: function (el, i, l) {
    return (l - i) * 500;
  }
});
const animeSkills = anime({
  targets: "#skills .list-group .item",
  autoplay: false,
  translateY: -10,
  direction: "alternate",
  loop: true,
  delay: function (el, i, l) {
    return i * 50;
  },
  endDelay: function (el, i, l) {
    return (l - i) * 50;
  }
});
const animeCert = anime({
  targets: "#certificate .list-group .item",
  autoplay: false,
  keyframes: [{ scale: 0.1, duration: 200 }, { scale: 1 }],
  duration: 2000
});
const animeProject = anime({
  targets: "#projects .list-group .item",
  autoplay: false,
  loop: true,
  keyframes: [{ rotateZ: 1 }, { rotateZ: -1 }, { rotateZ: 0 }],
  duration: 2000
});
const animeLoading = anime({
  targets: "#loadingLogo .logo svg",
  loop: true,
  rotate: "1turn",
  easing: "linear",
  duration: 990
});

/**
 * @param {MouseEvent} ev
 */
function handleList(ev) {
  console.log(ev.getAttribute("listType"));
  const type = ev.getAttribute("listType");
  // document.getElementById("container").style.opacity = "0.3";
  // document.getElementById("container").style.filter = "blur(5px)";

  modal.style.display = "block";
  switch (type) {
    case "sosmed": {
      animeSosmed.play();
      document.getElementById("socialMedia").style.display = "block";
      tempType = type;
      break;
    }
    case "certificate": {
      animeCert.play();
      document.getElementById("certificate").style.display = "block";
      tempType = type;
      break;
    }
    case "projects": {
      animeProject.play();
      document.getElementById("projects").style.display = "block";
      tempType = type;
      break;
    }

    case "skills": {
      animeSkills.play();
      document.getElementById("skills").style.display = "block";
      tempType = type;
      break;
    }
  }
}

function closeTab() {
  modal.style.display = "none";

  switch (tempType) {
    case "sosmed": {
      document.getElementById("socialMedia").style.display = "none";
      tempType = "";
      animeSosmed.restart();
      animeSosmed.pause();
      break;
    }

    case "certificate": {
      document.getElementById("certificate").style.display = "none";
      tempType = "";
      animeCert.restart();
      animeCert.pause();
      break;
    }

    case "projects": {
      document.getElementById("projects").style.display = "none";
      tempType = "";
      animeProject.restart();
      animeProject.pause();

      break;
    }

    case "skills": {
      document.getElementById("skills").style.display = "none";
      tempType = "";
      animeSkills.restart();
      animeSkills.pause();
      break;
    }
  }
  // document.getElementById("container").style.opacity = "1";
  // document.getElementById("container").style.filter = "blur(0)";
}

// Handle Outside modal box
/**
 * @param {MouseEvent} ev
 */
window.onclick = (ev) => {
  if (ev.target === modal) {
    closeTab();
  }
};

/**
 *
 * @param {KeyboardEvent} ev
 */
window.onkeyup = (ev) => {
  if (modal.style.display !== "none" && ev.key === "Escape") {
    closeTab();
  }
};

addEventListener("DOMContentLoaded", (event) => {
  // setTimeout(() => {
  animeLoading.pause();
  container.classList.add("appear");
  loading.classList.add("hide");
  // }, 4000);

  // setTimeout(() => {
  container.style.display = "block";
  loading.style.display = "none";
  // }, 4500);
});
