import React from 'react';
import ReactDOM from 'react-dom';

import {Button, Form, Input} from 'muicss/react';

class InlineTextEdit extends React.Component {
  static propTypes = {
    onUpdate: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
    className: React.PropTypes.string
  }

  static defaultProps = {
    style: {
      color: '#ddd',
      border: '1px dashed #ddd',
      textDecoration: 'none',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '8px',
      paddingRight: '8px'
    },
    className: ''
  }

  state = {
    editing: false,
    editing_value: ''
  }

  style = {}

  timeout = null

  constructor(props) {
    super(props);

    //TODO: use componentWillReceiveProps instead?
    Object.assign(this.style, InlineTextEdit.defaultProps.style);
    Object.assign(this.style, this.props.style);
  }

  onEditClicked(event) {
    //Make sure we do not bubble out
    event.stopPropagation();
    //Do not actually navigate anywhere (will mess with react-router).
    //May be better to use a button instead.
    event.preventDefault();

    this.setState({
      editing: true,
      editing_value: this.props.value
    });
  }

  onOkClicked(event) {
    event.stopPropagation();

    const value = this.state.editing_value;

    if (this.props.onUpdate(value))
      this.setState({editing: false});
  }

  onCancelClicked(event) {
    event.stopPropagation();

    this.setState({editing: false});
  }

  onBlur(event) {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.setState({editing: false});
    }, 200);
  }

  onChange(event) {
    this.setState({editing_value: event.target.value});
  }

  onKeyPress(event) {
    if (event.key == 'Enter') {
      if (this.props.onUpdate(event.target.value))
        this.setState({editing: false});
    }
  }

  componentWillUnmount() {
    if (this.timeout != null) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  render() {
    if (!this.state.editing) {
      return (
        <span>
          <a href="#"
            onClick={(event) => this.onEditClicked(event)}
            style={this.style}
            className={this.props.className}>
            {this.props.value}
          </a>
        </span>
      );
    }

    return (
      <div className='inline-text-edit'>
        <span className='mui-form--inline'>
          <Input
            type="text"
            autofocus={true}
            value={this.state.editing_value}
            onChange={(event) => this.onChange(event)}
            className='inline-text-edit-input'
            onBlur={(event) => this.onBlur(event)}
            onKeyPress={(event) => this.onKeyPress(event)}
            style={{backgroundColor: '#404246', color: '#ddd'}}
          />
          <Button
            variant='raised'
            size='small'
            color='primary'
            className='icon-ok inline-edit-ok'
            onClick={(event) => this.onOkClicked(event)}>
          </Button>
          <Button
            variant='raised'
            size='small'
            color='danger'
            className='icon-cancel inline-edit-cancel'
            onClick={(event) => this.onCancelClicked(event)}>
          </Button>
        </span>
      </div>
    );
  }
}

export default InlineTextEdit;
