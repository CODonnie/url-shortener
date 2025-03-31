# URL Shortener API (Bit.ly Clone)

This is a URL Shortener API that allows users to shorten URLs, track analytics (such as IP addresses and access timestamps), and set expiration times for short URLs. The project is built using Node.js, MongoDB, Redis, and GraphQL, following industry-standard practices for backend development.

## Features
- URL shortening
- URL analytics (IP address and timestamp tracking)
- Expiration time for short URLs (7 days by default)
- Caching of original URLs with Redis to improve performance
- JWT-based user authentication
- GraphQL API with mutations and queries for URL shortening and analytics retrieval

## Technologies Used
- **Node.js**: Backend framework
- **Express**: Web framework
- **MongoDB**: Database for storing URLs and user data
- **Redis**: Caching system for improved performance
- **GraphQL**: API for querying and mutating data
- **JWT**: Authentication system for securing user endpoints
- **shortid**: Generating short unique IDs for URLs
- **dotenv**: For environment variable management

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (for cloud database)
- Redis account (for cloud caching)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-shortener.git

2. Navigate into the project directory:

cd url-shortener


3. Install dependencies:

npm install


4. Create a .env file in the root directory and add the following environment variables:

MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-jwt-secret-key>
REDIS_URL=<your-redis-connection-url>


5. Start the server:

npm start

The server will run on http://localhost:5000.



API Documentation

Mutation: shortenedUrl

Shorten a given URL.

Arguments:

url (String!): The original URL to be shortened.


Response:

Returns the shortened URL.


Example:

mutation {
  shortenedUrl(url: "http://example.com") 
}

Response:

{
  "data": {
    "shortenedUrl": "http://localhost:5000/abcd1234"
  }
}


Query: getShortAnalytics

Retrieve analytics for a shortened URL.

Arguments:

shortId (String!): The short ID of the URL.


Response:

Returns an array of analytics objects containing IP address and timestamp.


Example:

query {
  getShortAnalytics(shortId: "abcd1234") {
    ip
    accessedAt
  }
}

Response:

{
  "data": {
    "getShortAnalytics": [
      {
        "ip": "192.168.1.1",
        "accessedAt": "2025-03-31T10:00:00.000Z"
      },
      {
        "ip": "192.168.1.2",
        "accessedAt": "2025-03-31T10:05:00.000Z"
      }
    ]
  }
}


Query: getUrl

Retrieve the original URL by providing the short ID.

Arguments:

shortId (String!): The short ID of the URL.


Response:

Returns the original URL.


Example:

query {
  getUrl(shortId: "abcd1234") {
    originalUrl
  }
}

Response:

{
  "data": {
    "getUrl": {
      "originalUrl": "http://example.com"
    }
  }
}


Expiration Handling

The shortened URLs have a default expiration time of 7 days.

After the expiration date, the URL will be deleted from the database and no longer accessible.


Deployment

Deploy to Render

1. Create an account on Render.


2. Link your GitHub repository and deploy the application.


3. Set the environment variables in the Render dashboard:

MONGO_URI

JWT_SECRET

REDIS_URL




Deploy to Railway

1. Create an account on Railway.


2. Link your GitHub repository and deploy the application.


3. Set the environment variables in the Railway dashboard:

MONGO_URI

JWT_SECRET

REDIS_URL




License

This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments

Thanks to the creators of the libraries and tools used in this project, including Node.js, MongoDB, Redis, and GraphQL.


### Notes:
- Replace `your-username` with your actual GitHub username in the clone URL.
- Make sure to replace placeholders like `<your-mongodb-atlas-connection-string>` with actual values in the `.env` section.

Feel free to copy and paste this `README.md` into your project folder!
