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

const sosMed = document.getElementById("socialMedia");
const certi = document.getElementById("certificate");
const prjct = document.getElementById("projects");
const skills = document.getElementById("skills");

/**
 * @param {MouseEvent} ev
 */
function handleList(ev) {
  console.log(ev.getAttribute("listType"));
  const type = ev.getAttribute("listType");
  // document.getElementById("container").style.opacity = "0.3";
  // document.getElementById("container").style.filter = "blur(5px)";

  modal.classList.remove("hide");
  modal.classList.add("appear");
  setTimeout(() => {
    modal.style.display = "block";
  }, 100);

  switch (type) {
    case "sosmed": {
      sosMed.classList.remove("hide");
      sosMed.classList.add("appear");
      setTimeout(() => {
        sosMed.style.display = "block";
        animeSosmed.play();
      }, 100);
      tempType = type;
      break;
    }
    case "certificate": {
      certi.classList.remove("hide");
      certi.classList.add("appear");
      setTimeout(() => {
        certi.style.display = "block";
        animeCert.play();
      }, 100);
      tempType = type;
      break;
    }
    case "projects": {
      prjct.classList.remove("hide");
      prjct.classList.add("appear");
      setTimeout(() => {
        prjct.style.display = "block";
        animeProject.play();
      }, 100);
      tempType = type;
      break;
    }

    case "skills": {
      skills.classList.remove("hide");
      skills.classList.add("appear");
      setTimeout(() => {
        skills.style.display = "block";
        animeSkills.play();
      }, 100);
      tempType = type;
      break;
    }
  }
}

function closeTab() {
  modal.classList.add("hide");
  modal.classList.remove("appear");
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);

  switch (tempType) {
    case "sosmed": {
      sosMed.classList.remove("appear");
      sosMed.classList.add("hide");
      setTimeout(() => {
        sosMed.style.display = "none";
      }, 300);
      tempType = "";
      animeSosmed.restart();
      animeSosmed.pause();
      break;
    }

    case "certificate": {
      certi.classList.remove("appear");
      certi.classList.add("hide");
      setTimeout(() => {
        certi.style.display = "none";
      }, 300);
      tempType = "";
      animeCert.restart();
      animeCert.pause();
      break;
    }

    case "projects": {
      prjct.classList.remove("appear");
      prjct.classList.add("hide");
      setTimeout(() => {
        prjct.style.display = "none";
      }, 300);
      tempType = "";
      animeProject.restart();
      animeProject.pause();

      break;
    }

    case "skills": {
      skills.classList.remove("appear");
      skills.classList.add("hide");
      setTimeout(() => {
        skills.style.display = "none";
      }, 300);
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
  setTimeout(() => {
    animeLoading.pause();
    container.classList.add("appear");
    loading.classList.add("hide");
  }, 2000);

  setTimeout(() => {
    container.style.display = "block";
    loading.style.display = "none";
  }, 2500);
});
