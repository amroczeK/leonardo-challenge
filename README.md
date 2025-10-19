# Leonardo.ai Challenge
Welcome to my submission for the NextJS web app challenge :).

## Getting Started

First install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing
To test payload validation on API endpoint run:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"username": "a", "jobTitle": "a"}' localhost:3000/api/v1/user
```