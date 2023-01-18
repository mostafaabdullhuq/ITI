while true; do

	# get weather data from api key passed as argument (silently) and save it to a variable
	apiResp=$(curl -s -X GET 'https://api.openweathermap.org/data/2.5/weather?lat=31.199004&lon=29.894378&appid='$1)

	# if curl done successfully
	if [ $? -eq 0 ]; then

		# extract the weather status from api response
		weather=$(echo $apiResp | cut -d "," -f4 | cut -d ":" -f2)

		# extract the temprature from api response
		temp=$(echo $apiResp | cut -d"," -f8 | cut -d":" -f3)

		#append the result as json to the log file
		echo "{"\"weather\":$weather', '\"temp\":\"$temp\"', '\"datetime\":\"$(date +"%Y-%m-%d:%I:%M:%S")\""}" >>datetime_weather.log

		# wait for 60 seconds
		sleep 60

	# if there's an error with curl
	else

		# add error line into log file
		echo "[+] Error with curl, please try again." >>datetime_weather.log

	# end if else condition
	fi
done
