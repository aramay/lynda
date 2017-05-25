/* JavaScript Document */

console.log("js file loaded")

var marqueeVars = {
   screenSize: '',
   width: 0,
   mobileSize: 600,
   autoPlay: true,
   currentPanel: 1,
   totalPanels: 0,
   timePassed: 0,
   timeToChange: 60,
   duration: 1250,
   inTransition: false,
   panelContent: Array
};


$(document).ready(function () {
   marqueeGatherData()
})

function marqueeGatherData () {

   $(".marquee_data .marquee_panel").each(function (index) {
      marqueeVars.totalPanels = index + 1

      var panel_image_l = $(this).attr("data-image")+"_l.jpg"
      var panel_image_s = $(this).attr("data-image")+"_s.jpg"

      var panel_caption = $(this).html();

      marqueeVars.panelContent[index] = `<div class='marquee_panel' data-image-s=${panel_image_s} style=background-image:url(${panel_image_l})>
          <div class='overlay' >x</div>
          <div class='panel_caption'>${panel_caption}</div>
      </div>`
      console.log(marqueeVars)
   })

   var marqueeAdvanceTimer = setInterval(marqueeAdvance, 100)
}

function marqueeAdvance () {

   var marqueeWidth = $(".marquee").width()
   var currentSize = marqueeVars.screenSize

   if (marqueeWidth > marqueeVars.mobileSize) {
      var newSize = "large"
   }
   else {
      var newSize = "small"
   }

   //set marquee screen size
   marqueeVars.screenSize = newSize

   // check to see if the currentSize and newSize have changed at all.
   if (currentSize !== newSize) {
      if (marqueeVars.screenSize === 'large') {
         // test and make sure that the screenSize is large.
         marqueeMultiPanel()
      }
   }

   if (marqueeVars.timePassed === marqueeVars.timeToChange) {
      marqueeVars.timePassed = 0
   }
   else {
      marqueeVars.timePassed += 1
   }
}


function marqueeMultiPanel () {
   marqueeVars.timePassed = 0
   console.log(marqueeVars.autoPlay)
   marqueeVars.autoPlay = true

   var newHtml = `<div class="marquee_stage_large">
                     <div class="marquee_container_1"></div>
                     <div class="marquee_nav"></div>
                     <div class="btn prev"></div>
                     <div class="btn next"></div>
                  </div>`

   $(".marquee").html('').append(newHtml)

   // loop through all of the data and total panels and create a navigation element for each one of those.
   for (var index = 0; index < marqueeVars.totalPanels; index++) {
      
      $(".marquee_nav").append("<div>x</div>")
      
   }

   // when trying to interact with the content, don't want the animations to play

   $(".marquee").hover(function(){
      console.log(marqueeVars.autoPlay)
      marqueeVars.autoPlay = false
   }, 
   function(){
      console.log(marqueeVars.autoPlay)
      marqueeVars.autoPlay = true
      marqueeVars.timePassed = Math.floor(marqueeVars.timeToChange / 2)
   })

   $(".marquee_nav div").on("click", function() {
      var navClicked = $(this).index()
      marqueeVars.currentPanel = navClicked + 1

      $(".marquee_stage_large").append(`<div class="marquee_container_2" style="opacity:0;"></div>`)

      $(".marquee_container_2").html(marqueeVars.panelContent[navClicked]).animate({opacity: 1}, marqueeVars.duration, function () {
         $(".marquee_container_1").removeClass()
         $(this).addClass(".marquee_container_1").removeClass(".marquee_container_2")
      })

      // animate the opacity of marquee_container_2.

   })

   $(".marquee_nav div:first").trigger("click")


}

var debugTimer = setInterval( setDebugger, 100) 

function setDebugger () {
   console.log("debugger")
   $(".var1").html("screenSize " + marqueeVars.screenSize)
   $(".var2").html("width " + marqueeVars.width)
   $(".var3").html("mobileSize " + marqueeVars.mobileSize)
   $(".var4").html("autoplay = " + marqueeVars.autoPlay)
   $(".var5").html("currentPanel " + marqueeVars.currentPanel)
   $(".var6").html("totalPanels " + marqueeVars.totalPanels)
   $(".var7").html("timePassed " + marqueeVars.timePassed)
   $(".var8").html("timeToChange " + marqueeVars.timeToChange)
   $(".var9").html("inTransition " + marqueeVars.inTransition)
}