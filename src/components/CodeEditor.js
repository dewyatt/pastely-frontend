import React from 'react';
import ReactDOM from 'react-dom';

import AceEditor from 'react-ace';

import brace from 'brace';
//import 'brace/ext/language_tools';

import 'brace/mode/assembly_x86';
import 'brace/mode/c_cpp';
import 'brace/mode/csharp';
import 'brace/mode/css';
import 'brace/mode/dart';
import 'brace/mode/diff';
import 'brace/mode/d';
import 'brace/mode/dockerfile';
import 'brace/mode/gitignore';
import 'brace/mode/golang';
import 'brace/mode/groovy';
import 'brace/mode/html';
import 'brace/mode/java';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/jsx';
import 'brace/mode/julia';
import 'brace/mode/latex';
import 'brace/mode/less';
import 'brace/mode/lua';
import 'brace/mode/makefile';
import 'brace/mode/matlab';
import 'brace/mode/mips_assembler';
import 'brace/mode/objectivec';
import 'brace/mode/perl';
import 'brace/mode/pgsql';
import 'brace/mode/plain_text';
import 'brace/mode/python';
import 'brace/mode/r';
import 'brace/mode/ruby';
import 'brace/mode/rust';
import 'brace/mode/sass';
import 'brace/mode/scala';
import 'brace/mode/scheme';
import 'brace/mode/scss';
import 'brace/mode/sh';
import 'brace/mode/sql';
import 'brace/mode/swift';
import 'brace/mode/text';
import 'brace/mode/yaml';

import 'brace/theme/tomorrow_night';

const CodeEditor = (props) => (
  <div className='code-editor'>
    <AceEditor
      theme='tomorrow_night'
      value={props.contents}
      mode={props.language}
      fontSize={22}
      showGutter={true}
      showPrintMargin={true}
      highlightActiveLine={true}
      width='100%'
      height='100%'
      onChange={props.onChange}
      editorProps={{$blockScrolling: 'Infinity'}}
    />
  </div>
);

CodeEditor.propTypes = {
    contents: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    language: React.PropTypes.string.isRequired
};

export default CodeEditor;
