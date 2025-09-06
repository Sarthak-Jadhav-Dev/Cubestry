export { default } from "next-auth/middleware";

export const config = {
    matcher:["/gemini/:path*","/openai/:path*", "/anthropic/:path*",  ]
};

