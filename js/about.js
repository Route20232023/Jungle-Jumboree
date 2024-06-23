let nums = document.querySelectorAll(".num-counter");
let section = document.querySelector(".counterrrr");
let started = false; // Function Started ? No

window.onscroll = function () {
  if (window.scrollY >= section.offsetTop-400) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};

function startCount(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}






$(document).ready(function() {
  var $slider=$("#slider");
  var slideLength = $("#slider > .slide").length -1 ;
  var ctrl=false;
  $(document).keydown(function (e) {
      if(e.keyCode==17) {
          ctrl=true;
          $("#slider").removeClass("_3D");
          $(".key.ctrl").addClass("active");
      }
  }).keyup(function (e) {
      if(e.which == 17){
          ctrl=false;
          $("#slider").addClass("_3D");
          $(".key.ctrl").removeClass("active");
      }
      if(e.which==39 || e.which==40){
          nextSlide();
          return;
      }
      if(e.which==37 || e.which==38){
          prevSlide();
          return;
      }
  });

  var is3D=false;
  $(".key").mousedown(function(){
      if($(this).hasClass("ctrl")){
          if($(this).hasClass("active")) is3D = true;
          $("#slider").removeClass("_3D");
      }
      $(this).addClass("active");
  }).mouseup(function(){
      if($(this).hasClass("down") || $(this).hasClass("right")) nextSlide();
      if($(this).hasClass("up") || $(this).hasClass("left")) prevSlide();
      console.log(is3D);
      if($(this).hasClass("ctrl active")){
          if(is3D){
              $(this).removeClass("active");
              $("#slider").addClass("_3D");
              is3D=false;
          } 
      }else{
          $(this).removeClass("active");
      }
  });

  function nextSlide() {
      lastElem().addClass("active");
      $slider.addClass("transfomer");
      setTimeout(function(){
          var $slicedSlide = $('.slide').slice(slideLength);
          $slider.prepend($slicedSlide);
          $(document).find(".slide.active").removeClass("active");
          $slider.removeClass("transfomer");
      },300);
  }

  function prevSlide(){
      var $slicedSlide = $('.slide').slice(0,1).addClass("active");
      $slider.append($slicedSlide);
      setTimeout(function(){
          lastElem().removeClass("active");
      },50);
  }

  function lastElem(){
      return $("#slider > .slide").last();
  }
});