$(function () {

   'use strict'

   function getMean(data) {
      var mean = data.reduce(function (a,b){
         return a + b;
      })

      return mean.toFixed(2)
   }

   function getMedian(data) {

      var median;

      var sortedData = data.sort(data)

      var middleIndex = Math.floor(sortedData.length / 2)

      if (sortedData % 2 === 0) {
         var medianA = sortedData[middleIndex]
         var medianB = sortedData[middleIndex - 1]

         var median = (medianA + medianB) / 2

      }
      else {
         median = sortedData[middleIndex]
      }

      return median.toFixed(2)

   }


  function loadChart () {
     console.log('load char function')

     $.ajax({
        url: 'http://foundationphp.com/phpclinic/podata.php?&raw&callback=?',
        jsonpCallback: 'jsonReturnData',
        dataType: 'jsonp',
        data: {
           startDate: '20150301',
           endDate: '20150302',
           format: 'json'
         },
         success: function (response) {
            console.log(response)
         },
         error: function (error) {
            console.log("error ", error)
         }
      })
       
   }

  loadChart()
})
