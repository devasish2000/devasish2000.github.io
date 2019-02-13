 // This is where most of the JS & jQuery will live
 // for the project that will manipulate our webpage


 // On Page Load
 $(document).ready(function(){


	controller.captureFormFields();
	model.initialDatabasePull();
	setInterval(function() {model.initialDatabasePull()}, 60000);
	view.updateCurrentTime();
	setInterval(function() {view.updateCurrentTime()}, 1000);


});


// view object
var view = {


	// function to update the Train Schedule Table


	updateDeviceScheduleTable: () => {


		controller.convertFrequency();


		$('#device-schedule-body').append(
			'<tr>'+
				'<th scope="row">' + deviceModel + '</th>' +
				'<td>' + deviceBrand + '</td>' +
				'<td>' + damageBrief + '</td>' +
				'<td>' + appointmentTime + '</td>' +
				'<td>' + returnTime + '</td>' +
				'<td>' + storeLocation + '</td>' +
				'<td>' + ticketNumbewr + '</td>' +
				// '<td>' + `<button class='delete btn btn-danger' data='${snapshot.key}'>` + '</td>'+

				
				// '<button class="delete btn btn-danger" data='+ trainKey +'>x</button>'+ 
				// '<button class="delete btn btn-danger" data='${snapshot.key}'>'
				// `<button class='delete btn btn-danger' data='${snapshot.key}'>`+
				
				
				'</tr>'
			);
	},
	updateCurrentTime: () => {
		// $('.currentTime').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
		// $('.currentTime').text(moment().format());
		$('.currentTime').text(moment().format("MMM Do YYYY, h:mm:ss a"));
		
		
	}
};