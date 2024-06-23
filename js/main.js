(function ($) {
  "use strict";

  // Initiate the wowjs
  new WOW().init();

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner();

  try {
    // Button According to role
    let signInOrLogOut = document.querySelector(".signInOut");

    if (localStorage.getItem("userToken") != null) {
      signInOrLogOut.innerHTML = "Log Out";
      signInOrLogOut.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("userToken");
        window.location.href = "login.html";
      });
    } else {
      signInOrLogOut.innerHTML = "Sign In";
      signInOrLogOut.addEventListener("click", (e) => {
        window.location.href = "login.html";
        e.preventDefault();
        console.log("testtt");
      });
    }
  } catch (err) {
    console.log(err);
  }

  try {
    // profile hidden if not login
    let profileNavLink = document.querySelector(".profileNavLink");
    if (localStorage.getItem("userToken") != null) {
      profileNavLink.setAttribute("href", "./profile.html");
    } else {
      profileNavLink.remove();
    }
    // profile hidden if not login End
  } catch (err) {
    console.log(err);
  }

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-100px");
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  try {
    // Header carousel
    $(".header-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1500,
      items: 1,
      dots: true,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-chevron-left"></i>',
        '<i class="bi bi-chevron-right"></i>',
      ],
    });
  } catch (err) {
    console.log(err);
  }

  try {
    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 24,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        992: {
          items: 3,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }

  try {
    $(".testimonial-carousel").owlCarousel({
      autoplay: true,
      smartSpeed: 1000,
      margin: 24,
      dots: false,
      loop: true,
      nav: true,
      navText: [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>',
      ],
      responsive: {
        0: {
          items: 1,
        },
        992: {
          items: 3,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
})(jQuery);



