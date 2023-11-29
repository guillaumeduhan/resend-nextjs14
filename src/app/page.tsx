"use client";

import AttachmentIcon from '@/components/Icons/Attachment';
import { Editor } from 'novel';
import { useState } from 'react';


export default function Home() {
  const [data, setData] = useState<any>({
    from: 'newsletter@codewithguillaume.com',
    to: undefined,
    reply_to: 'reply@codewithguillaume.com',
    subject: undefined,
    content: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  const sendEmail = async () => {
    const { from, to, subject, content } = data;
    if (!from && !to && !subject && !content) return alert("Please enter from, to, subject & content");
    try {
      setLoading(true);

      const response = await fetch('/api/resend/emails/send', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response) console.log(response)
    } catch (error: any) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto">
        <div className="border rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col gap-2 pt-2">
          <input value={data.from} name="from" type="text" placeholder="From:" onChange={handleChange} />
          <input value={data.to} name="to" type="text" placeholder="To:" onChange={handleChange} />
          <input value={data.reply_to} name="reply_to" type="text" placeholder="Reply to:" onChange={handleChange} />
          <input value={data.subject} type="text" placeholder="Subject" name="subject" onChange={handleChange} />
          <Editor onUpdate={(value: any) => {
            const html = value.getHTML()
            console.log(html)
            handleChange({
              target: {
                name: 'content',
                value: html
              }
            })
          }} />
          {/* <textarea className="h-[300px]" placeholder="My e-mail..." name="content" onChange={handleChange} /> */}
          <div className="px-3 py-6 flex items-center gap-4">
            <button className='primary' disabled={loading} onClick={sendEmail}>
              {loading && 'loading...'}
              {!loading && 'Send'}
            </button>
            <div className='text-gray-500 text-2xl'>
              <AttachmentIcon />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
