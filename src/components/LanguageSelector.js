import React from 'react';
import ReactDOM from 'react-dom';

import {Appbar, Button} from 'muicss/react';

import InlineTextEdit from './InlineTextEdit';

const LanguageSelector = (props) => (
  <select
    style={{color: '#000'}}
    value={props.language}
    onChange={(event) => props.onChange(event.target.value)}>
    <option value="assembly_x86">Assembly (x86)</option>
    <option value="mips_assembler">Assembly (MIPS)</option>
    <option value="c_cpp">C/C++</option>
    <option value="csharp">C#</option>
    <option value="css">CSS</option>
    <option value="dart">Dart</option>
    <option value="diff">Diff</option>
    <option value="d">D</option>
    <option value="dockerfile">Dockerfile</option>
    <option value="gitignore">gitignore</option>
    <option value="golang">Go / Golang</option>
    <option value="groovy">Groovy</option>
    <option value="html">HTML</option>
    <option value="java">Java</option>
    <option value="javascript">Javascript</option>
    <option value="json">JSON</option>
    <option value="jsx">JSX</option>
    <option value="julia">Julia</option>
    <option value="latex">LaTeX</option>
    <option value="less">LESS</option>
    <option value="lua">Lua</option>
    <option value="makefile">Makefile</option>
    <option value="matlab">MATLAB</option>
    <option value="objectivec">Objective C</option>
    <option value="perl">Perl</option>
    <option value="pgsql">pgSQL</option>
    <option value="plain_text">Plain Text</option>
    <option value="python">Python</option>
    <option value="r">R</option>
    <option value="ruby">Ruby</option>
    <option value="rust">Rust</option>
    <option value="sass">SCSS</option>
    <option value="scala">Scala</option>
    <option value="scheme">Scheme</option>
    <option value="scss">SCSS</option>
    <option value="sh">Shell / Bash</option>
    <option value="sql">SQL</option>
    <option value="swift">Swift</option>
    <option value="yaml">YAML</option>
  </select>
);

LanguageSelector.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    language: React.PropTypes.string.isRequired
};

export default LanguageSelector;
