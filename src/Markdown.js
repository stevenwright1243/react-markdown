import React, { Component } from 'react';

import marked from 'marked';
import 'github-markdown-css';
import hljs from 'highlightjs';
import CopyToClipboard from 'react-copy-to-clipboard';
import defaultMd from './defaultmd';
import './hljs.css';
import './Markdown.css';


class MarkdownEditor extends Component {
  constructor(props) {
    super(props);

    this.state = { content: localStorage.getItem('markdownStorage') || defaultMd };

    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    const markdownInput = document.getElementById('markdown');
    if (window.localStorage) {
      markdownInput.addEventListener('input', () => {
        localStorage.setItem('markdownStorage', markdownInput.value);
      });
    }
  }

  rawMarkup() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
    });

    const rawMarkup = marked(this.state.content, { sanitize: true });
    return {
      __html: rawMarkup,
    };
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  render() {
    return (
      <div className="flex">
        <div className="width">
          <h3>Markdown</h3>
          <textarea
            id="markdown"
            defaultValue={this.state.content}
            onChange={this.handleChange}
          />
          <CopyToClipboard
            text={this.state.content}
            onCopy={() => this.setState({ copied: true })}
          >
            <button>Copy to clipboard</button>
          </CopyToClipboard>
        </div>
        <div className="width">
          <h3>Preview</h3>
          <div id="preview" className="markdown-body" dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
