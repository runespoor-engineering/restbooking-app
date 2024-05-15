import RichText from '../RichText';

export default {
  title: 'Components/Organisms/PageComponents/RichText/All stories',
  tags: ['autodocs'],
  component: RichText
};

export const Default = {
  args: {
    staticData: {}
  }
};

export const SimpleTextContent = {
  args: {
    staticData: {
      content: 'Simple text without any HTML attributes'
    }
  }
};

export const SimpleMarkdownContent = {
  args: {
    staticData: {
      content:
        '## Help and Support\n' +
        'If, at any time, you start feeling that your gambling habits are getting out of control, there are some specialist organizations which offer support and guidance in such circumstances. The most helpful of them are:<br />\n' +
        '<a title="http://www.gamblersanonymous.org/" href="http://www.gamblersanonymous.org/">http://www.gamblersanonymous.org/</a><br />\n' +
        '<a title="http://www.ncpgambling.org/" href="http://www.ncpgambling.org/">http://www.ncpgambling.org/</a><br />\n'
    }
  }
};

export const SupportChatButtonContent = {
  args: {
    staticData: {
      content:
        '<div>Here you could see the button with expanded functionality: <openSupportChatButton>openSupportChatButton</openSupportChatButton></div>'
    }
  }
};
