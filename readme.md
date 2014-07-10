# What is this repository

This project is a base structure of a Node.js project.
You can use it as a bootstrap for today's workshop.


# Workshop's goal

## Minimum

Using this boilerplate you will have to implement, test and optimize an API server based on the following specifications.

This server has to be a very simple search engine. It must allow users to seach in a repository of text files (already existing in /src/contents/files/rfc).

Your server must expose two public API: 

* http://localhost:3000/search/{search-term}
* http://localhost:3000/download/{search-term}

The "search" API must read the "search-term" parameter and respond a JSON object containing the list of files names where the term has been found and the count of the occurences of this term in the file. Something like { results: [{ file: "rfc1593.txt", count: 16 }] }.

The "download" API must read the "search-term", search for files containing the term, build a zip file containing all matched files and stream it to the user.

Then : 

* You must cache results for a short period of time, it will save CPU time looking in files for the same term too often
* You must handle the case when 100 simultaneous search requests hit your server at the exact same time, it should not perform 100 search before caching the result for next requests. The first requests should trigger a seach in files while 99 other requests should quietly wait for the result of this search, only then respond the result to the user.

You will have to "stress test" your API using Apache Benchmark command line tool to simulate a lot of concurent requests on your server, and then optimize it to be as fast as possible.

Strongly recommanded third party node module (you can use any other usefull module you want): 

* async - https://github.com/caolan/async
* underscore - https://github.com/jashkenas/underscore
* zip-stream - https://github.com/ctalkington/node-zip-stream
* memory-cache - https://github.com/ptarjan/node-cache
* express - https://github.com/visionmedia/express


## Bonus

Pick bonuses your want to explore : 

* Add a route which allows users to add their custom text files to the "repository", the API should look like this (POST) http://localhost:3000/add/{URL_OF_FILE_TO_ADD}
* Add a simple API Key authentication system (via an Express Middleware) to secure the two created API
* For the /search/ API, add some contexte where the term has been found in the file to the JSON result (you could add the line, the sentense where the term has been found, the section of the rfc where it has been found).
* Configure Socket.io (Websocket) to display realtime statistics of your server usage (total request count, current requests counts, terms searched, etc.)


# What we want at the end of the day

You must send me (i.duplan@fivetouch.fr) a zip package of the /src folder of your projet.
It must be named following this format "aync-td-[firstname]-[lastname].zip".
It must contain a file "server.js" at root, when I will unzip your package, I must be able to launch the server with the command "node server.js" from scratch (no other command line, no configurations, etc.).
The server must listen on port 3000 by default.





