import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import copy from 'copy-to-clipboard';
import styles from '../styles/CodeBlock.module.css';

const CodeBlock = ({ language, value }) => {
  const handleCopy = () => {
    copy(value);
    alert('Código copiado para a área de transferência');
  };

  return (
    <div className={styles.codeBlock}>
      <button onClick={handleCopy} className={styles.copyButton}>
        Copiar
      </button>
      <SyntaxHighlighter language={language} style={darcula}>
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
