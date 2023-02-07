<?php


class Factorial
{

    public function factorial($num)
    {
        // if passed number is not integer
        if (!is_int($num)) {
            return null;
        } else {
            // base case 1
            if ($num < 0) {
                return null;
            }
            // base case 2
            else if ($num == 0) {
                return 1;
            }
            // recursive case
            else {
                return ($num * $this->factorial($num - 1));
            }
        }
    }
}
