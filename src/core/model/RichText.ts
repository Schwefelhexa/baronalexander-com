import RichText from '../../components/RichText';

export type NodeType = 'document' | 'paragraph' | 'text' | 'hyperlink';

interface Node<TType extends NodeType> {
  nodeType: TType;
}

interface Text extends Node<'text'> {
  value: string;
  marks: [];
  data: {};
}

interface Hyperlink extends Node<'hyperlink'> {
  content: [Text];
  data: { uri: string };
}

interface Paragraph extends Node<'paragraph'> {
  content: (Text | Hyperlink)[];
}

interface RichText extends Node<'document'> {
  data: {};
  content: Paragraph[];
}

export default RichText;

export type NodeTypes = {
  text: Text;
  hyperlink: Hyperlink;
  paragraph: Paragraph;
  document: RichText;
};
