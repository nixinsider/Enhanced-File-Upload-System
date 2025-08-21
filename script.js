// Enhanced File Upload System - jQuery Version
$(document).ready(function() {

    const $dragDropArea = $('#dragDropArea');
    const $dragDropPreview = $('#dragDropPreview');
    const $dragDropFile = $('#dragDropFile');
    const $dragDropPrompt = $('#dragDropPrompt');
    const $cropModal = $('#cropModal');
    const $cropperImage = $('#cropperImage');
    const $cropButton = $('#cropButton');
    let cropper;
    let currentImageElement;

    function handleFiles(files) {
        $dragDropPrompt.addClass('d-none');
        $dragDropPreview.removeClass('d-none');
        $.each(files, function(i, file) {
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const $img = $('<img>').attr('src', e.target.result)
                        .addClass('img-fluid rounded')
                        .css({maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', overflow: 'hidden', margin: '5px'});
                    $dragDropPreview.append($img);

                };
                reader.readAsDataURL(file);
            }
        });
    }

    $dragDropArea.on('dragenter dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('bg-light border-primary');
    }).on('dragleave drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('bg-light border-primary');
    }).on('drop', function(e) {
        const files = e.originalEvent.dataTransfer.files;
        handleFiles(files);
    });

    $dragDropFile.on('change', function() {
        handleFiles(this.files);
    });

    





});