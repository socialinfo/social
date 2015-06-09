function bindEvent(){

	$('#startSimulation').on('click',function(){

		if(!isRun){
			handle = setInterval(runActivity,1000)
			isRun = true
			$('#startSimulation').text('stop'.toUpperCase())
			$('#startSimulation').removeClass('btn-primary')
			$('#startSimulation').addClass('btn-danger')
		}
		else{
			clearInterval(handle)
			isRun = false
			$('#startSimulation').text('start'.toUpperCase())
			$('#startSimulation').removeClass('btn-danger')
			$('#startSimulation').addClass('btn-primary')
		}
	})
}
