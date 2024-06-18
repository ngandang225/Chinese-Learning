import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function TextEditor({ initData, setData }) {
  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        'heading',
        '|',
        'fontSize',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'link',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
      ],
    },
    language: 'vi',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
  };
  return (
    <CKEditor
      editor={Editor}
      config={editorConfig}
      data={initData}
      onReady={(editor) => {
        // You can store the "editor" and use when it is needed.
        editor.editing.view.change((writer) => {
          writer.setStyle('min-height', '200px', editor.editing.view.document.getRoot());
        });
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setData(data);
      }}
    />
  );
}

export default TextEditor;
