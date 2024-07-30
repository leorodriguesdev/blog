import { useRef } from 'react';

const CodeBlock = ({ language, value }) => {
  const codeRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeRef.current.innerText);
  };

  return (
    <div className="code-block">
      <pre ref={codeRef}>
        <code className={`language-${language}`}>{value}</code>
      </pre>
      <button onClick={handleCopy}>Copy</button>
    </div>
  );
};

export default CodeBlock;
s