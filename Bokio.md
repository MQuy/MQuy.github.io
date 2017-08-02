## Bokio

### Test the project
+ Source code: https://bitbucket.org/MQuy/bokio
+ Demo version: http://bokio-web.studynow.vn
+ Or watch online at youtube: https://www.youtube.com/watch?v=9fYaz41mmKo

### How to setup the project

+ Go to this url: http://railsinstaller.org/en
+ Download Ruby 2.3
+ After finishing installation, `git clone https://bitbucket.org/MQuy/bokio Bokio & cd Bokio`
+ run `gem install bundler` and `bundle install`
+ run `rails db:create && rails db:migrate` (if you have any problem, please check this link https://stackoverflow.com/questions/35545361/rails-the-system-cannot-find-the-path-specified)
+ run `rails s -p 4000` and keep this console

__Open a new console__
+ run `cd frontend`
+ run `bower install && npm install`
+ run `gulp serve` and it will open the new tab

__Run tests__
+ run `rspec spec`

__API Format__
+ Server: JSON Format
  + Import: POST `/user_transactions/bulk_import` with `{ data: xxxx }`
  + All: GET `/user_transactions`

### How about the project

#### Structure

```
├── app                               # Application source code
│   ├── controllers                   # The place to receive parameters which are sent from client
│   └── domains                       # Divide and handle business model
│       └── transaction               # Transaction is responsible for features like importing ....
│           └── page_impport          # Page Report contains three components: check data, parse data, store transactions.
│               ├── parser            # Receive data which is sent from client and parse it. After that returing results which are all the transaction rows
│               └── store             # Store transactions into database after receiving parser's output
├── frontend                          # Folder for frontend
├── spec                              # Test files
```

#### Domain Flow

![Bokio](http://i.imgur.com/rkkxNw2.png)

#### Walkthrough

+ The flow: I chose [Railway Oriented Programming](https://fsharpforfunandprofit.com/rop/)
+ The stucture: I applied DDD to map from businesss requirement/model to the code

The reason I chose railway oriented programming is that it not only helps me to focus on "the happy path" but also provide a clean way to handle error.

There are 3 subdomains inside Transaction/PageImport
1. Check the data:
+ Their role is checking whether the input data is correct or not.
+ If input data is correct, the data will be passed to __Parser__ subdomain
2. Parser: the current implementation is without knowledge about colum names which can be specified from user.
+ It will read line by line from the data above and get only the transaction rows with conditions
  + Row has to contain one column with **__date format__** and one column with **__number format__**
+ After filter all tranasction rows, it will build "plain old objects" for those transactions and pass it to __Store__ subdomain
3. Store:
+ It will persist those transactions into database, if there is any error, store will give error message for the __Output__

I hope with these, it will help you to have a big picture about my code.

Best regards
