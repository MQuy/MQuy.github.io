To start with, I want share with you, guys about my slide which was prepared for this code interview.

### Good code

what is the good code? In my perspective, the good code has to have four conditions:
+ Need to work (It is obvious, right? what kind of good code, if noone can use it)
+ Easy to understand (not just only for the one who wrote that code but also for other developers who are involved). Normally, to achieve it, there are some principles like:
  + Follow convention
  + Meaningful name
  + Small
  + Consistent
  + Ubiquitous language
+ Open/easy to extend. For this one, we should structure our code into module, layer
  + Modularity
  + Layer (controller, use cases)
+ Testable (good code will help you write test much more easy)

### Use case

I think the best way to show bad code or good code is via realworld example.
In this case, It is sign up at RingMD's website. Following slides, it is about the use case, the bad code before I joined and how I refactor to make it become good code.
You know that company's information is sensitive, therefore, I had to modify a bit.

The sign up flow on website contains:
  + Create a new patient/doctor
  + Create a user balance
  + Send welcome email
  + Send hubspot analytic

### Bad code

We are all Ruby on Rails Developer, therefore, I will go straight into the problem.

1. The first thing, I want to talk is about architecture. Architecture is not based on tools and frameworks. It means that it does not depend on the delivery mechanism (for example rails).
There is no clearly boundaries, just controllers, models ... Use cases should be primary abstractions and central organizing of the system. It means when you look at a system you should see the intent of a system.

2. In user controller, we have create, show and update action.
Each action is usually a separate responsibilitiy. The coupling of multiple actions will bring more troubles than benefits.
It's hard to change code without the fear of breaking some other parts.

For example:
  + user_params method, we use for both create and update. What if someone changes the params for create without knowledge it will affect update.

3. in Create action:
Long method which do too many things:
  + Initialize user
  + Check condition to intialize doctor/patient
  + Create user, user balance
  + Send analytic
Nested condition
Unmeaningfull name
Controller know too much about business model logic. Ideally, controller defines expected input parameters, passes parameters to the use case layer, and retrieves only the information it needs to generate the action result

4. Model
I hear a lot of people recommending the skinny controller, fat model approach to Rails development. But I think with that approach, your model(activerecord) slowly becomes god class.
Ideally, in my opinion, model is only about persisting data. In user model, it knows about business logic like send mail, validate email or phone number based on auth method.

### Good code
First of all, we have to identify and pull out use cases(business logic) from rails app (controller, model).
For example, this case is web register, we move validation, store, send mail and hubspot out of controller, model.
We can see the clear boundary here.

Last year, I learned Elixir and functional programming concepts like Monads, Monoid, Immutable Data ... It widen my horizon in the way I program and this is one of an application of Monad named Railway programming. It is not only help us to focus on happy path but also provide a clean/nice way to handle error.
The happy path is from validate to send analytic without any error, if any thing went wrong, for example in validate, it will go direct to the end.

For controller, previously we combine doctor/patient into one action, it break single responsibility. Therefore, I move register into a separated controllers named doctor registration controller and patient registration controller
In user model, no more validate related to bussiness logic.

In account domain, there are web register for doctor, patient and outside canno access directly into the class, modules inside only throught boundaries.
For each one, you can see the flow as I mentioned above
For validation, I use dry-validation to validate the business logic related to user.
Store will persist user into data along with profile and balance.
