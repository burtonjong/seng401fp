# EndlessOdyssey

EndlessOdyssey is a never-ending, AI-driven adventure game that dynamically generates stories based on player interactions. Powered by the OpenAI API, the game creates unique narratives where every decision shapes the journey, making each playthrough a personalized experience.

## Running the preview

#### Scripts for windows:

```bash
yarn dev:windows
or
npm run dev:windows
```

#### Scripts for mac/linux:

```bash
yarn dev
or
npm run dev
```

## Basic Example for Fetching Data

**Query Supabase data from Next.js**
To create a Supabase client and query data from an Async Server Component, create a new page.tsx file at /app/notes/page.tsx and add the following.

```typescript
import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
```

Alternatively, you can use a Client Component.

```typescript
"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("notes").select();
      setNotes(data);
    };
    getData();
  }, []);

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}
```

## Features

- **AI-Generated Storylines** – The game adapts to your choices, crafting unique narratives on the fly.
- **Infinite Adventures** – Explore limitless worlds, from fantasy kingdoms to futuristic sci-fi realms.
- **Interactive Conversations** – Engage with the AI using natural language and shape the story through dialogue.
- **Persistent Memory** – The AI remembers past interactions to create a more immersive and continuous experience.
- **Seamless Gameplay** – No predefined paths—just an evolving story based on your actions.

## Tech Stack

- **Front-End**: React, TypeScript, Tailwind CSS, ShadC
- **Back-End**: Java, Spring Boot
- **Database**: Supabase
- **LLM Provider**: OpenAI
- **Deployment**: Heroku, Docker
- **Additional Tools**: GitHub Actions for CI/CD

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (Newer versions may cause errors because util.\_extend API is deprecated. We use v20.11.1 which works)
- Java (JDK 17)
- Docker (optional, for containerized deployment)
