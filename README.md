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
   git clone https://github.com/CODonnie/url-shortener.git

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



### License

This project is licensed under the MIT License - see the LICENSE file for details.

### Acknowledgments

Thanks to the creators of the libraries and tools used in this project, including Node.js, MongoDB, Redis, and GraphQL.


### Notes:
- Replace `your-username` with your actual GitHub username in the clone URL.
- Make sure to replace placeholders like `<your-mongodb-atlas-connection-string>` with actual values in the `.env` section.

Feel free to copy and paste this `README.md` into your project folder!
