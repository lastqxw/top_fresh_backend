tinymce.PluginManager.add('imageSelector', function (editor, url) {
    // Add a button that opens a window
    editor.addButton('imageSelector', {
        icon: 'image',
        tooltip: "添加本地图片",
        onclick: function () {
            console.log(editor)
            editor.settings.imageSelectorCallback(function (r) {
                console.log(11111)
                console.log('inserting image to editor: ' + r);
                editor.execCommand('mceInsertContent', false, '<img alt="Smiley face" src="' + r + '"/>');
            });
        }
    });

});