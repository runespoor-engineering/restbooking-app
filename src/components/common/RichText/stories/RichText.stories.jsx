import RichTextComponent from '../RichText';

export default {
  title: 'Components/Common/RichText/All stories',
  tags: ['autodocs'],
  component: RichTextComponent
};

export const Default = {
  args: {}
};

export const SimpleTextContent = {
  args: {
    markdown: 'Simple text without any HTML attributes'
  }
};

export const SimpleMarkdownContent = {
  args: {
    markdown:
      '## Help and Support\n' +
      'If, at any time, you start feeling that your gambling habits are getting out of control, there are some specialist organizations which offer support and guidance in such circumstances. The most helpful of them are:<br />\n' +
      '<a title="http://www.gamblersanonymous.org/" href="http://www.gamblersanonymous.org/">http://www.gamblersanonymous.org/</a><br />\n' +
      '<a title="http://www.ncpgambling.org/" href="http://www.ncpgambling.org/">http://www.ncpgambling.org/</a><br />\n'
  }
};

export const SupportChatButtonContent = {
  args: {
    markdown:
      '<div>Here you could see the button with expanded functionality: <openSupportChatButton>openSupportChatButton</openSupportChatButton></div>'
  }
};
