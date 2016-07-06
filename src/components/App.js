import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router';
import Modal from 'react-modal';

import uuid from 'uuid';

import mui from 'muicss';
import {Button, Divider} from 'muicss/react';

import SideDrawer from './SideDrawer';
import Header from './Header';
import Footer from './Footer';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import InlineTextEdit from './InlineTextEdit';

import config from 'config';

const API_BASE_URL = config['api_url'];

class App extends React.Component {
  static ModalStyle = {
    overlay: {
      zIndex: 99,
      backgroundColor: 'rgba(255, 255, 255, 0.3)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      minWidth: '200px',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#343434',
      color: '#ddd'
    }
  }

  state = {
    paste_title: 'Untitled',

    files: [
      {
        id: '499e073b-c28d-46b6-a836-ac1fe150547d',
        name: 'Welcome',
        contents: `\
This is a file, which is part of a paste.
A paste is composed of multiple files.

The name of this paste and this file are shown above, where they can be edited.
To the left, you can see the name of this particular file, and a button to add new files.
`,
        language: 'plain_text'
      }
    ],

    selected_file_id: '499e073b-c28d-46b6-a836-ac1fe150547d',

    modified: false,

    modal_is_open: false,
    modal_header: '',
    modal_content: ''
  };

  fetchPaste() {
    let url = `${API_BASE_URL}/view/${this.props.params.id}`
    this.request = fetch(url).then((response) => {
      if (this.ignoreLastFetch)
        return

      if (response.status != 200) {
        let header = <div className='mui--text-danger mui--text-headline'>Error</div>;
        let content =
          <div>
            Error retrieving paste!
          </div>
        ;
        this.openModal(header, content);
        return;
      }

      return response.json().then(data => {
        this.setState({
          paste_title: data.title,
          files: data.files,
          selected_file_id: data.files[0].id,
          modified: false
        })
      })
    })
  }

  componentDidMount() {
    if (this.props.params.id) {
      this.fetchPaste();
    }
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.params.id;
    let newId = this.props.params.id;
    if (newId !== oldId) {
      this.fetchPaste();
    }
  }

  componentWillUnmount() {
    this.ignoreLastFetch = true
  }

  handleSavePaste() {
    if (!this.state.modified)
      return;

    let url = `${API_BASE_URL}/create`
    let data = JSON.stringify({
      title: this.state.paste_title,
      files: this.state.files
    })
    this.request = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    }).then((response) => {
      if (response.status != 201) {
        return response.json().then(data => {
          this.errorModal(JSON.stringify(data, null, 4));
        })
      }
      return response.json().then(data => {
        let paste_id = data['id']
        let paste_url = window.location.origin + `/#/${paste_id}`;
        let header = <div className='mui--text-headline'>Saved!</div>;
        let content =
          <div>
            Share this URL: <a href={paste_url} target='_blank'>{paste_url}</a>
          </div>
        ;
        this.openModal(header, content);
        this.props.router.push(`/${paste_id}`)
      })
    })
    .catch(error => {
      this.errorModal(error.message);
    });
  }

  handleEditorChange(file_id, contents) {
    this.setState({
      files: this.state.files.map((file) => {
        if (file.id === file_id)
          return Object.assign({}, file, {contents})

        return file;
      }),
      modified: true
    });
  }

  handleSelectFile(selected_file_id) {
    this.setState({ selected_file_id });
  }

  handleAddFile() {
    if (this.state.files.length >= 15)
      return;

    var new_id = uuid.v4();

    this.setState({
      files: this.state.files.concat({
        id: new_id,
        name: 'New File',
        contents: '',
        language: 'plain_text'
      }),
      selected_file_id: new_id,
      modified: true
    });
  }

  handleDeleteFile(file_id) {
    if (this.state.files.length === 1) {
      var new_id = uuid.v4();
      this.setState({
        files: [
          {
            id: new_id,
            name: 'New File',
            contents: '',
            language: 'plain_text'
          }
        ],
        selected_file_id: new_id,
        modified: true
      });
      return;
    }

    const pos = this.state.files.map(function (file) { return file.id; }).indexOf(file_id);
    const selected_file_id = pos === 0 ? this.state.files[1].id : this.state.files[pos - 1].id;
    /*
    this.setState({
      files: this.state.files.slice(0, file_index)
            .concat(this.state.files.slice(file_index + 1)),
      selected_file_index
    });
    */
    this.setState({
      files: this.state.files.filter(file => file.id !== file_id),
      selected_file_id,
      modified: true
    });
  }

  handleEditPasteTitle(paste_title) {
    if (paste_title === '')
      return false;

    this.setState({
      paste_title,
      modified: true
    });
    return true;
  }

  updateFile(updated_file) {
    this.setState({
      files: this.state.files.map(file => {
        if (file.id === updated_file.id)
          return Object.assign({}, file, updated_file);

        return file;
      }),
      modified: true
    })
  }

  handleEditFileName(id, name) {
    if (name === '')
      return false;

    this.updateFile({id, name});
    return true;
  }

  handleChangeLanguage(id, language) {
    this.updateFile({
      id,
      language,
      modified: true
    });
  }

  openModal(header, content) {
    this.setState({
      modal_is_open: true,
      modal_header: header,
      modal_content: content
    });
  }

  errorModal(message) {
    let header = <div className='mui--text-danger mui--text-headline'>Error</div>;
    let content =
      <div>
        Error:
        <pre style={{backgroundColor: '#25282c'}}>
          {message}
        </pre>
      </div>
    ;
    this.openModal(header, content);
  }

  closeModal() {
    this.setState({modal_is_open: false});
  }

  render() {
    const selected_file = this.state.files.filter(file => {
      return file.id === this.state.selected_file_id;
    })[0];
    return (
      <div id='app'>
        <Modal
          isOpen={this.state.modal_is_open}
          style={App.ModalStyle}
          onRequestClose={(e) => this.closeModal()}>
          {this.state.modal_header}
          <Divider />
          <div style={{padding: '10px 0'}}>
            {this.state.modal_content}
          </div>
          <Divider />
          <Button
            onClick={(e) => this.closeModal()}
            variant='raised'
            style={{width: '100%'}}
            size='small'>
            Ok
          </Button>
        </Modal>
        <SideDrawer
          files={this.state.files}
          selected_file_id={this.state.selected_file_id}
          onSelectFile={(id) => this.handleSelectFile(id)}
          onAddFile={() => this.handleAddFile()}
          onDeleteFile={(id) => this.handleDeleteFile(id)}
        />
        <div id='app-main'>
          <Header
            paste_title={this.state.paste_title}
            onSavePaste={() => this.handleSavePaste()}
            onEditPasteTitle={(value) => this.handleEditPasteTitle(value)}
          />
          <div id='content'>
            <div id='content-top'>
              <div id='paste-item-header' className='mui--pull-left'>
                <InlineTextEdit
                  value={selected_file.name}
                  onUpdate={(value) => this.handleEditFileName(selected_file.id, value)}
                  className='mui--text-subhead'
                  style={{color: '#ddd', border: '1px dashed #ddd'}}
                />
              </div>
              <div className='mui--pull-right'>
                <LanguageSelector
                  language={selected_file.language}
                  onChange={(language) => this.handleChangeLanguage(selected_file.id, language)} />
              </div>
              <div className='mui--clearfix'></div>
            </div>
            <CodeEditor
              contents={selected_file.contents}
              language={selected_file.language}
              onChange={(value) => this.handleEditorChange(selected_file.id, value)}
            />
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
