/*
Abstraction is used to hide the implementation
abstraction consists of two main types:

1. Abstract class
2. Interface




[1] - Abstract Class

- abstract class cannot be instantiated ( cannot create a new object from it )
- attributes can be private
- attributes can be declared without initialization
// private String name;
- abstract class can have abstract functions or normal functions
- abstract methods must have the keyword abstract
// abstract void setName(String name);
- all abstract methods must be override in child class



public abstract class Pets {

    private String name;

    public abstract void makeSound();

    public void getName() {
        return name;
    }

}

class Dog extends Pets {

    public void makeSound() {
        System.out.println("Haw Haw");
    }
}






[2] - Interface


Different Classes (Objects) that can do a specific action but in a different way (Both Car, Bike, Plane can move but in a different ways)




-   in interface all variables / properties must be initialized and they are public, static, and final (their value cannot be changed)
    // String name = "Ahmed";
-   all functions in interface is abstract functions (functions without body)
    // void printName();
-   interface cannot be instantiated (we cannot create a new instance object from it) alternatively, we use it for inheritance
-   we must declare all functions from interface in child classes

// interface
public interface Animal {

    void drink(); // abstract function
    void eat(); // abstract function

}

// class Cat that inherit the interface Animal
public class Cat implements Animal {

    // we must implement all functions from interface Animal
    @Override
    public void drink() {
        System.out.println("Cat is drinking");
    }
    @Override
    public void eat() {
        System.out.println("Cat is eating");
    }

}

// class Dog that inherit the interface Animal
public class Dog implements Animal {

    // we must implement all functions from interface Animal
    @Override
    public void drink() {
        System.out.println("Dog is drinking");
    }
    @Override
    public void eat() {
        System.out.println("Dog is eating");
    }

}

*/
