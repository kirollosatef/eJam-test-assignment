# Humble Superhero API

A NestJS-based API that celebrates the extraordinary qualities of everyday team members by tracking their superpowers and humility scores.

## 🚀 Features

- Add new superheroes with their unique powers and humility scores
- Fetch a sorted list of superheroes based on their humility
- Input validation and error handling
- Pagination support
- Request logging with Morgan

## 🛠️ Technology Stack

- NestJS
- TypeScript
- Jest for testing
- Morgan for logging
- Class Validator

## 📋 Prerequisites

- Node.js
- npm or yarn

## 🏗️ Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd eJam-test-assignment
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn start:dev
```

The API will be available at `http://localhost:3000`.

## 🔍 API Endpoints

### Add a New Superhero

```http
POST /superheroes
```

Request body:

```json
{
  "name": "The Listener",
  "superpower": "Understanding complex problems",
  "humilityScore": 9
}
```

### Get All Superheroes

```http
GET /superheroes?page=1&limit=5
```

Response:

```json
{
  "data": [
    {
      "id": "uuid",
      "name": "The Listener",
      "superpower": "Understanding complex problems",
      "humilityScore": 9
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "lastPage": 1,
    "limit": 5
  }
}
```

## 🧪 Running Tests

```bash
# Unit tests
yarn test
```

## 🤝 Collaboration Notes

Here's how I envision collaborating with teammates on this project:

1. **Code Review Process**

   - Regular pull request reviews
   - Pair programming sessions for complex features
   - Documentation updates for any new endpoints
2. **Potential Areas for Collaboration**

   - Implementing additional superhero attributes
   - Adding role-based access control
   - Creating team-based superhero groups
3. **Best Practices**

   - Following NestJS best practices and patterns
   - Maintaining consistent code style
   - Regular updates to documentation

## 🔮 If I Had More Time...

1. **Technical Improvements**

   - Implement proper database storage (PostgreSQL/MongoDB)
   - Add authentication and authorization
   - Create detailed API documentation using Swagger
   - Add more comprehensive error handling
   - Add rate limiting for API endpoints
2. **Feature Enhancements**

   - Add superhero categories/teams
   - Implement a rating system for superpowers
   - Add historical tracking of humility scores
   - Create superhero achievement tracking
   - Add image upload for superhero profiles
3. **Testing & Quality**

   - Add more integration tests
   - Implement load testing
   - Set up CI/CD pipeline

## 📚 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

</p>
