 // This is where all the javascript will
 // live for the project that connects the view and model


// controller object
let controller = {


    // capture all the fields in the form area
    captureFormFields: () => {
        $('body').on("click", ".button-add", () => {
            // prevent form from submitting
             event.preventDefault();


             // variables from the form field values
            deviceModel = $('#device-model').val().trim();
            deviceBrand = $('#device-brand').val().trim();
            damageBrief = $('#damage-brief').val().trim();
            appointment = $('#appointment').val().trim();
            apptFrequency = $('#return-time').val().trim();
            repairTicket = $('#repair-num').val().trim();
            // trainKey = $('#train-key').val().trim();



            // console log all the entries for testing
            // console.log(deviceModel)
            // console.log(deviceBrand)
            // console.log(damageBrief)
            // console.log(appointment)
            // console.log(returnTime)
            // console.log(storeLocale)
            controller.nextArrival();
            controller.minutesAway();


            // clear all the fields in the form
            $('.form-control').val("");


            model.pushNewDevice();
            // view.updateTrainScheduleTable();


        });


 },

        
           


    // Time Calculation functions 


    nextArrival: () => {
       // First Time (pushed back 1 year to make sure it comes before current time)
       var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
       //difference between the times
       var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
       // Time apart (remainder)
       var timeRemainder = diffTime % trainFrequency;
       //minutes until Train
       var timeInMinutesTillTrain = trainFrequency - timeRemainder;
       //Next Train
       nextTrain = moment().add(timeInMinutesTillTrain, 'minutes');
       nextTrain = moment(nextTrain).format('h:mm A');
   },


   minutesAway: () => {
       // First Time (pushed back 1 year to make sure it comes before current time)
       var trainDepartureCoverted = moment(trainDeparture, "hh:mm").subtract(1, 'years');
       //difference between the times
       var diffTime = moment().diff(moment(trainDepartureCoverted), "minutes");
       // Time apart (remainder)
       var timeRemainder = diffTime % trainFrequency;
       //minutes until Train
       minutesAway = trainFrequency - timeRemainder;
       minutesAway = moment().startOf('day').add(minutesAway, 'minutes').format('HH:mm');
       return moment().format('HH:mm');
   },
   convertFrequency: () => {
       trainFrequency = moment().startOf('day').add(trainFrequency, 'minutes').format('HH:mm');
   }


};