<?php

use PHPUnit\Framework\TestCase;

require "./src/FactorialController.php";


class FactorialTest extends TestCase
{
    public function testFactorial()
    {
        $fact = new Factorial;
        $this->assertEquals(1, $fact->factorial(0));
        $this->assertEquals(1, $fact->factorial(1));
        $this->assertEquals(120, $fact->factorial(5));
        $this->assertEquals(null, $fact->factorial(-3));
        $this->assertEquals(null, $fact->factorial(1.5));
        $this->assertEquals(null, $fact->factorial(false));
        $this->assertEquals(null, $fact->factorial('string'));
        $randomNum = random_int(4, 9999);
        $this->assertEquals($fact->factorial($randomNum - 1) * $randomNum, $fact->factorial($randomNum));
    }
}
