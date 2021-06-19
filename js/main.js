// CONFIGS
let isDev = 1;
let theme = document.body.dataset.theme;
let c0, c1;
switch (theme) {
  case "moon":
    (c0 = "#060606"), (c1 = "#f1f1f1");
    break;
  case "sun":
    (c0 = "#f1f1f1"), (c1 = "#060606");
    break;
}

//****// LOADING ANIMATION  //****//
const $lci = ".loading-circle",
  $lt1 = ".loading-text1",
  $lt2 = ".loading-text2",
  $lco = ".loading-container";

let ltl = gsap.timeline({
  repeat: "0",
  repeatDelay: 2,
  onStart: () => {
    console.log("loading animation started");
  },
  onComplete: () => {
    document.body.classList.add("loaded");
    console.log("loading animation done");
    loadingComplete();
  },
});

ltl
  .set($lci, { opacity: 0.2, width: "1px", height: "1px" })
  .set($lt1, { scale: 0, opacity: 0 })
  .to($lt1, { duration: 1, scale: 2, opacity: 1 }, "+=.1")
  .to($lci, { duration: 0.5, opacity: 1 }, "-=.9")
  .to($lci, { duration: 1, width: "100vmin", height: "100vmin" }, "-=.9")
  .to($lci, { duration: 0.5, width: "50vmin", height: "50vmin" })
  .to($lt1, { duration: 0.5, scale: "1" }, "<")
  .to($lci, { duration: 0.5, width: "0", height: "0" }, "+=.5")
  .to($lt1, { duration: 0.5, scale: "0" }, "<")
  .to($lt1, { duration: 0.5, display: "none" })
  .set($lt2, { display: "block", scale: 0, opacity: 0 })
  .to($lt2, { duration: 0.7, scale: 8, opacity: 1 }, "+=.1")
  .to($lci, { duration: 0.7, width: "150vmax", height: "150vmax" }, "<")
  .set("body", { backgroundColor: c0 })
  .set($lci, { position: "initial" })
  .to($lt2, { duration: 0.4, scale: 1, opacity: 1 }, "+=.1")
  .to($lt2, { duration: 0.4, left: "1.4em", top: "1em", ease: Linear }, "+=.3")
  .set($lco, { height: 0, width: 0 });

// isDev ? ltl.timeScale(5) : null; //fast forward loading animation
function loadingComplete() { 
  triggerHome();
  triggerAbout();
 }

//****// MOUSE TWEAKS  //****//
const $mouseCircle = ".mouse-circle";
$(document).on("mousemove", function (e) {
  if (!$($mouseCircle).hasClass("pause")) {
    gsap.to($mouseCircle, {
      left: e.pageX,
      top: e.pageY-$(window).scrollTop(),
      ease: "back.out(2)",
    });
  }
});

gsap.set(".mmoon", {
  xPercent: -50,
  yPercent: -50,
  y: -250,
});

gsap.to(".mmoon-container", 4, {
  rotation: 360,
  repeat: -1,
  ease: Linear.easeNone,
});

//****// NAVIGATION  //****//

const $nav = $(".navigation"),
  $nbg = $nav.children(".bg"),
  $nmenu = $nav.find(".menu");

let navOpen = gsap.timeline({ paused: true });
navOpen
  .to($nbg, 0.4, { width: "300vmax", height: "300vmax" })
  .to($nmenu, 0.3, { ease: "power2", opacity: 1 })
  .to(".mouse-circle", 1, {
    left: "50%",
    top: "50%",
    scale: 1.5,
    ease: "back.out(2)",
  });

let navClose = gsap.timeline({ paused: true });
navClose
  .to($nmenu, 0.2, { ease: "power2", opacity: 0 })
  .to($nbg, 0.4, { width: "1px", height: "1px" })
  .to(".mouse-circle", 1, {
    scale: 1,
    ease: "back.out(2)",
  }, "-=0.4");

$(".navigation .menu-switch").click(function (e) {
  e.preventDefault();
  $nav.toggleClass("open");

  if ($nav.hasClass("open")) {
    navOpen.restart();
    $(".mouse-circle").toggleClass("pause");
    gsap.to(".mouse-circle", {
      left: "50%",
      top: "50%",
      zIndex: "200",
      scale: 1.5,
      ease: "back.out(2)",
    });
  } else {
    $(".mouse-circle").toggleClass("pause");
    navClose.restart();
  }
});

//****// HOME ANIMATION  //****//
const $home = $(".home"),
  $hcontent = $(".home-content"),
  $himage = $(".home-image");
gsap.set($himage.children("img"), { scale: 0 });

function triggerHome() {
  gsap.set([$hcontent, $himage], { transformStyle: "preserve-3d" });
  gsap.to($himage.children("img"), 0.3, { scale: 1 });

  document.body.onmousemove = function (e) {
    tiltHome(e.pageX, e.pageY);
  };
  document.body.onmouseleave = function (e) {
    tiltHome(e.pageX / 3, e.pageY / 3);
  };
}

function tiltHome(cx, cy) {
  var sxPos = ((cx / window.innerWidth) * 100 - 50) * 3;
  var syPos = ((cy / window.innerHeight) * 100 - 50) * 3;
  gsap.to($hcontent, 2, {
    rotationY: -0.03 * sxPos,
    rotationX: 0.03 * syPos,
    transformPerspective: 500,
    transformOrigin: "center center -400",
    ease: Expo.easeOut,
  });

  gsap.to($himage, 2, {
    rotationY: -0.03 * sxPos,
    rotationX: 0.03 * syPos,
    transformPerspective: 500,
    transformOrigin: "center center -200",
    ease: Expo.easeOut,
  });
}



//****// HOME ANIMATION  //****//
const $aboutC = $(".about-container");

function triggerAbout() {
  
  // gsap.to($aboutC, {
  //   scrollTrigger: {
  //     trigger: $aboutC,
  //     start: "top center"
  //   }, 
  //   backgroundColor: "pink"
  // });
  // gsap.to($mouseCircle, {
  //   scrollTrigger: {
  //     trigger: $aboutC,
  //     start: "top center"
  //   }, 
  //   scale: .3
  // });

}
