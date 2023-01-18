daysForc=$(echo $(curl -s -X GET 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/daily?lat=38.5&lon=-78.5' -H 'X-RapidAPI-Host: weatherbit-v1-mashape.p.rapidapi.com' -H 'X-RapidAPI-Key:ba70e9d0d6msh7594bd77a8a5d6fp123f3cjsn4a62b43f2c5c' |
    # remove unwanted json (get json from data key)
    grep -o "data\"\:\[.*\]" |
    # remove unwanted json (get data array only)
    grep -o "\[.*\]" |
    # remove unwanted [] (get json only)
    sed 's/\[//g' |
    sed 's/\]//g' |
    # get each day forecast separated by \n
    awk -F "\"app_max_temp\"" '{for (i=2; i <= NF;i++) print $i}'))

# remove old csv file
# rm temp_date.csv

echo "temp, date" >temp_date.csv

# for each day forecast in output json
for x in $daysForc; do

    # extract the temprature with regex
    temp=$(echo $x | grep -o "\"temp\":\(-\?\d\.\?\)\+")
    # if temprature found
    if [ $? -eq 0 ]; then

        # extract the date of forecast
        date=$(echo $x | grep -o "\"valid_date\":\"\(\d\-\?\)\+\"")

        # append the temprature and date as csv format to log csv file
        echo $(echo $temp | sed 's/"temp"://g') "," $(echo $date | sed 's/"valid_date"://g') >>temp_date.csv
    fi
done

# get the minimum value from temp
echo $(cat temp_date.csv | awk '(NR==1){min="NaN"}; (NR>1){if (min > $1) min=$1} END {print "Minimum Temprature: " min}')
