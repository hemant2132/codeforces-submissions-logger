# Codeforces Submissions Logger

**_A utility to log a user's submissions on Codeforces to a Google Sheet._**

<img src="https://user-images.githubusercontent.com/45938556/114232016-dd313380-9998-11eb-9b3f-0381bdeaf1a9.png">

## Purpose

The aim of this project is to **_analyse and track a user's progress_** on [Codeforces](https://codeforces.com/), in specific and [Competitve Programming](https://en.wikipedia.org/wiki/Competitive_programming), in general through his/her submissions. This is achieved by listening for the latest submission of the given user and inserting the submission data to a specified [Google Sheet](https://www.google.com/sheets/about/) as a row. The data is updated at regular intervals of time.

On a personal front, I have made this to sort of **_automate things_** for me as I wish to reflect on the problems I solve during practice and on my performances in contests on Codeforces. I chose Google Sheets as the platform as I can easily **_access and edit the content_** there and it also provides options for **_filtering, sorting and visualising the data_**.

In the future, if things go well I plan to handle team submissions separately, provide facility for fetching unofficial submissions and extend this idea to other Online Judges as well. Of course, contributions and feedback from the community are always welcome.

## Setup

### Install Node.js

This project is built on node.js. Install it from [here](https://nodejs.org/).

### Clone this repository

Clone the repository to your local machine by using the below command in your terminal:

```
$ git clone https://github.com/hemant2132/codeforces-submissions-logger
```

- Having cloned the copy to your local machine, enter into the project directory.

```
$ cd codeforces-submissions-logger
```

### Create Google Sheet doc

Create a spreadsheet on Google Sheets by following the steps given [here](https://support.google.com/docs/answer/6000292).

**Enter these fields in the header row**: <br>
Timestamp, Problem Link, Contest ID, Index, Name, Rating, Tags, Submission Link, Programming Language, Submission Verdict, Passed Test Count, Time Consumption, Memory Consumption, Points, Participation Type. <br>

It is recommended to keep all of these header values in your sheet, especially "Submission Link". Although you may skip or hide some of them in your worksheet. Also, you can arrange them in any order.

### Authentication for google-spreadsheet node package

The project uses [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet), which is a [Google Sheets API](https://developers.google.com/sheets/api/reference/rest) (v4) wrapper for Node.js, for writing data to Google Sheets. It requires some level of authentication to make requests.

This project works with the service account-based-approach. Follow the steps given [here](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account).

You can make a new folder `config` in the root folder and save the JSON key file there. The `config` folder would not be tracked by git as it has been already mentioned in the [.gitignore](.gitignore) file.

### .env file

For the environment variables, create a .env file in the root folder.

The environment variables required are:

- `CODEFORCES_HANDLE`: the codeforces handle of the user whose submissions need to be tracked
- `TIME_INTERVAL`: the time interval after which a request has to made to fetch the latest submission (in milliseconds). The Codeforces API mentions that it may be requested at most 5 times in one second, so set this value accordingly.
- `GOOGLE_SHEET_ID`: the long ID in the url of the Google sheet you wish to use
- `TIME_ZONE`: the time zone you want to follow for the dates. See the whole list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- `JSON_KEY_FILE_PATH`: the path of the JSON key file you got by following the steps given [here](README.md#Authentication-for-google-spreadsheet-node-package).

Fill in the appropriate details in the .env file; it should look something like this:

```
CODEFORCES_HANDLE = hp1999
TIME_INTERVAL = 60000
GOOGLE_SHEET_ID = 1kKxZ8veEXAMPLeoX6xvPrealLyKPo-cXP0KWExO7oQQ
TIME_ZONE = Asia/Kolkata
JSON_KEY_FILE_PATH = ./config/my-app-d1234da8abc1.json
```

### Build and Execute the project

- Run the following commands from the terminal.

```
npm i
npm start
```

- A "running" message will soon show up on the console. Congratulations, the setup is now complete.

### Additional Comments

- I have used [replit](https://replit.com/) to keep the project [always on](https://blog.replit.com/alwayson). You may use a similar hosting service.
- You can authorize the Codeforces API to fetch unofficial submissions. Follow the instructions given [here](https://codeforces.com/apiHelp) and make changes to the existing code accordingly.

## Usage

Since a Google Sheet has been used, you have all the options you can find in any other Google Sheet. You can filter the submissions by contest ID, problem index, tags, rating, participation type etc., sort the columns, visualise the data using charts, customise your sheet, make edits wherever you want, take notes and much more.

## License

This project is licensed under the terms of the [MIT license](https://choosealicense.com/licenses/mit/).
