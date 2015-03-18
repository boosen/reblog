var opts = {
  container: 'epiceditor',  //显示编辑框的div
  textarea: 'content_editor', //epiceditor自动把编辑好的内容同步到这个textarea中
  basePath: '/bower',  //指定epiceditor的路径，最好是绝对路径
  clientSideStorage: false,  //是否使用客户端存储，true表示编辑的内容会存在客户端，下次打开页面会看到上次编辑的内容
  theme: {
    base: '/epiceditor/epiceditor/themes/base/epiceditor.css', //你可以选择editor的样式，样式文件在/public/epiceditor/
    preview: '/epiceditor/epiceditor/themes/preview/github.css',
    editor: '/epiceditor/epiceditor/themes/editor/epic-light.css'
  },
  button: {
    preview: true,
    fullscreen: true,
    bar: "auto"
  },
  string: {
    togglePreview: '预览',
    toggleEdit: '编辑',
    toggleFullscreen: '全屏'
  },
  autogrow: {
    minHeight: 400
  }
}
var editor = new EpicEditor(opts);
editor.load();
