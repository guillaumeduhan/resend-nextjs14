export default function EmailTemplate({ content = 'Hello world' }: {
  content: string;
}) {
  return <div>
    <div dangerouslySetInnerHTML={{ __html: content }}></div>
  </div>
};
