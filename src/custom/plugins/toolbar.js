/** Created by xwp on 2021-11-11 **/
import FroalaEditor from 'froala-editor'

FroalaEditor.DefineIconTemplate('revoke', '<i class="fa fa-rotate-left"></i>');
FroalaEditor.DefineIcon('revoke', {NAME: 'smartphone', template: 'revoke'});
FroalaEditor.RegisterCommand('undo', {
  title: '撤销',
  icon: 'revoke'
})

FroalaEditor.DefineIconTemplate('recovery', '<i class="fa fa-rotate-right"></i>');
FroalaEditor.DefineIcon('recovery', {NAME: 'right', template: 'recovery'});
FroalaEditor.RegisterCommand('redo', {
  title: '恢复',
  icon: 'recovery'
})

FroalaEditor.DefineIconTemplate('eliminate', '<i class="fa fa-eraser"></i>');
FroalaEditor.DefineIcon('eliminate', {NAME: 'eraser', template: 'eliminate'});
FroalaEditor.RegisterCommand('eraser', {
  title: '清除格式',
  icon: 'eliminate',
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.commands.clearFormatting()
  }
})

FroalaEditor.DefineIcon('clear', {NAME: 'remove', SVG_KEY: 'remove'});
FroalaEditor.RegisterCommand('clear', {
  title: '删除内容',
  focus: false,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.set('');
    this.events.focus();
  }
})


FroalaEditor.DefineIcon('insert', {NAME: 'plus', SVG_KEY: 'add'});
FroalaEditor.RegisterCommand('insert', {
  title: '插入HTML',
  focus: true,
  undo: true,
  refreshAfterCallback: true,
  callback: function () {
    this.html.insert('<div>Hello</div>');
  }
})

// FroalaEditor.DefineIconTemplate('eliminate', '<i class="fa fa-eraser"></i>');
// FroalaEditor.DefineIcon('eliminate', {NAME: 'eraser', template: 'eliminate'});
// FroalaEditor.RegisterCommand('eraser', {
//   title: '清除格式',
//   icon: 'eliminate',
//   focus: false,
//   undo: true,
//   refreshAfterCallback: true,
//   callback: function () {
//     this.commands.clearFormatting()
//   }
// })



