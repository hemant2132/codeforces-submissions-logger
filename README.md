# Codeforces Submissions Logger

**_A utility to log a user's submissions on Codeforces to a Google Sheet._**

<img src="https://user-images.githubusercontent.com/45938556/114232016-dd313380-9998-11eb-9b3f-0381bdeaf1a9.png">

## Purpose

The aim of this project is to analyse and track a user's progress on [Codeforces](https://codeforces.com/), in specific and [Competitve Programming](https://en.wikipedia.org/wiki/Competitive_programming), in general through his/her submissions. This is achieved by listening for the latest submission of the user and inserting the submission data to a [Google Sheet](https://www.google.com/sheets/about/) as a row.

On a personal front, I just made this to sort of automate things for me as I plan to reflect on the problems I solve during practice and on my performances in contests on Codeforces. I chose Google Sheets as the platform as I can easily access and edit the content there and it also provides options for filtering, sorting and visualising the data.

In the future, if things go well I plan to make something similar for team submissions. I might extend this idea to other Online Judges as well. Of course, contributions and feedback from the community are always welcome.

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

Enter these fields in the header row: <br>
Timestamp, Problem Link, Contest ID, Index, Name, Rating, Tags, Submission Link, Programming Language, Submission Verdict, Passed Test Count, Time Consumption, Memory Consumption, Points, Participation Type. <br>

You can skip some of them or can hide them on the worksheet. Also, you can enter them in any order.

### Authentication for google-spreadsheet node package

The project uses [google-spreadsheet](https://www.npmjs.com/package/google-spreadsheet), which is a [Google Sheets API](https://developers.google.com/sheets/api/reference/rest) (v4) wrapper for Node.js, for writing data to Google Sheets. It requires some level of authentication of make requests any requests.

This project works with the service account-based-approach. Follow the steps given [here](https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication?id=service-account).

You can make a new folder `config` in the root folder and save the JSON key file there. The `config` folder would not be tracked by git as it has been already mentioned in [.gitignore](.gitignore).

### .env file

For the environment variables, create a .env file in the root folder.

The environment variables required are:

- `CODEFORCES_HANDLE`: the codeforces handle of the user whose submissions need to be tracked
- `TIME_INTERVAL`: the time interval after which a request has to made to fetch the latest submission (in milliseconds). The Codeforces API mentions that it may be requested at most 5 times in one second, so set this value accordingly.
- `GOOGLE_SHEET_ID`: the long ID in the url of the Google sheet you wish to use
- `LAST_SUBMISSION_ID`: last Codeforces submission id of the user. This is used to avoid duplicate entry. You may keep this field empty.
- `TIME_ZONE`: the time zone you want to follow for the dates. See the whole list [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
- `JSON_KEY_FILE_PATH`: the path of the JSON key file you got by following the steps given [here](README.md#Authentication-for-google-spreadsheet-node-package).

Fill in the appropriate details in the .env file; it should look something like this:

```
CODEFORCES_HANDLE = hp1999
TIME_INTERVAL = 10000
GOOGLE_SHEET_ID = 1kKxZ8veEXAMPLeoX6xvPrealLyKPo-cXP0KWExO7oQQ
LAST_SUBMISSION_ID = 112317636
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
- You can authorize the Codeforces API to fetch unofficial submissions from Codeforces. Follow the instructions given [here](https://codeforces.com/apiHelp) and make changes to the existing code accordingly.

## License

This project is licensed under the terms of the [MIT license](https://choosealicense.com/licenses/mit/).
