# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Step 1: Set Up Environment Variables

1. Copy the example `.env` file:

```bash
cp .env.example .env
```

2. Fill in all the required environment variables and secrets in the `.env` file.

### Step 2: Choose a Setup Method

#### Option 1: Using `docker-compose` (Recommended)

1. Run the application in watch mode with `docker-compose`:

```bash
docker-compose up --build --watch
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

#### Option 2: Using Traditional Setup

1. Copy the example `.env` file:

```bash
cp .env.example .env
```

2. Start the PostgreSQL database using Docker:

```bash
docker run --name postgres_container -e POSTGRES_USER=username -e POSTGRES_PASSWORD=password -e POSTGRES_DB=mydatabase -p 5432:5432 -d postgres:latest
```

3. Install dependencies:

```bash
npm install
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev --init
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

