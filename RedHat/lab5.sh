echo $(top -n 1 | grep -A1 PID | tail -n 1 | awk '{print $10}')
