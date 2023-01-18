import csv


def get_temps():
    # list to store all temperatures
    temps = []

    # open csv file
    with open("temp_date.csv", "r", encoding="utf-8", errors="ignore") as temp_date:

        # read data from csv file
        temp_date_data = csv.reader(temp_date, delimiter=",")

        # loop over all lines in csv
        for each_day in temp_date_data:

            # get the temperature
            temp = each_day[0]

            # check if the temperature is a numeric value and if it's not empty
            if temp.isnumeric() and temp != "":

                # convert the temp to float
                temp = float(temp)

                # add current temperature to temps list
                temps.append(temp)

    return temps


def get_min_temp(temps):
    # get the minimum temperature from the temps list and print it
    print(f"Minimum Temp: {min(temps)}")


def main():
    temps = get_temps()
    get_min_temp(temps)


main()
