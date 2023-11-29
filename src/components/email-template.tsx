"use client";

export default function EmailTemplate({ content = 'Hello world' }: {
  content: string;
}) {
  return <div>
    {content}
  </div>
};
