'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';
import Image from 'next/image';

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const ALGOLIA_API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY!;
const AGENT_ID = process.env.NEXT_PUBLIC_AGENT_ID!;

if (
  !process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ||
  !process.env.NEXT_PUBLIC_ALGOLIA_API_KEY ||
  !process.env.NEXT_PUBLIC_AGENT_ID
) {
  throw new Error(
    'Missing required Algolia environment variables. Please check your .env.local file.'
  );
}

export function AlgoliaChat() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: `https://${ALGOLIA_APP_ID.toLowerCase()}.algolia.net/agent-studio/1/agents/${AGENT_ID}/completions?stream=true&compatibilityMode=ai-sdk-5`,
      headers: {
        'x-algolia-application-id': ALGOLIA_APP_ID,
        'x-algolia-api-key': ALGOLIA_API_KEY,
      },
    }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage({ text: inputValue });
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Header */}
      <header className="flex-shrink-0 border-b bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 max-w-7xl mx-auto">
          <Bot className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Algolia AI Assistant</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <ScrollArea className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6">
          <div ref={scrollRef} className="space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-12">
                <Bot className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">Welcome to Algolia AI Chat</p>
                <p className="text-sm mt-2">Ask me anything to get started!</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm">
                      {message.parts?.find((p) => p.type === 'text')?.text || ''}
                    </p>
                  ) : (
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>
                        {message.parts?.find((p) => p.type === 'text')?.text || ''}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Input Form */}
      <div className="flex-shrink-0 border-t bg-background">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Footer with Attribution and Disclaimer */}
      <footer className="flex-shrink-0 border-t bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:px-6 space-y-3">
          {/* AI Disclaimer */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <p>LLMs can make mistakes, verify their answers.</p>
            <p>Do not enter any information you wouldn&apos;t want someone to review or use.</p>
          </div>

          {/* Powered By Attribution */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Search powered by</span>
              <a
                href="https://www.algolia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/algolia-logo.svg"
                  alt="Algolia"
                  width={60}
                  height={20}
                  className="h-4 w-auto"
                />
              </a>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <div className="flex items-center gap-1.5">
              <span>AI powered by</span>
              <a
                href="https://ai.google.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:underline"
              >
                Google Gemini
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
