var bar = document.querySelectorAll(".bar"),
    parBig = document.querySelector(".par.big"),
    parSmall = document.querySelector(".par.small"),
    screenTop = document.querySelector(".screen.top"),
    screenBottom = document.querySelector(".screen.bottom"),
    refresh = document.querySelector(".refresh"),
    starOne = document.querySelector(".star.one");


// basic setting
// tl.set(parBig, {
//     y: "30px"
// })
    .set(bar, {
        opacity: 0
    })

// animating

tl.to(parSmall, .3, {
    delay: 1,
    opacity: 0
})
    .to(screenTop, .3, {
        delay: .3,
        y: "-50%"
    })
    .to(screenBottom, .3, {
        delay: -.3,
        y: "50%"
    })

    // reset

    .set(screenTop, {
        y: "-100%"
    })
    .set(screenBottom, {
        y: "100%"
    })
    .set(bar, {
        opacity: 1
    })

    // animating
    .to(bar, .3, {
        scaleX: 1
    }, "-=.15")
    .staggerTo(bar, 1.5, {
        scaleY: .5,
        scaleX: 1,
        ease: Elastic.easeOut
    }, .025)
    .to(parBig, 1, {
        delay: -1.75,
        y: "0",
        opacity: 1,
        ease: Elastic.easeOut
    })

// refresh animation

refresh.addEventListener("click", function(){
    tl.restart();
});

// copy
balapaCop("Mario Maker Dialog", "rgba(255,255,255,.8)");