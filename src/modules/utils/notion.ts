import { Client } from "@notionhq/client"

// Initializing a client
const notion = new Client({
  auth: import.meta.env.VITE_NOTION_API_KEY,
})

export { notion }