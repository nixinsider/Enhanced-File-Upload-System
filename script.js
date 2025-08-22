// Enhanced File Upload System - jQuery Version
$(document).ready(function() {

    // Main Page Elements
    const $dragDropArea = $('#dragDropArea');
    const $dragDropPreview = $('#dragDropPreview');
    const $dragDropFile = $('#dragDropFile');
    const $dragDropPrompt = $('#dragDropPrompt');
    const $mainContent = $('.mainContent');

    // Cropper Elements
    const $previewImgContainer = $('.previewImg');
    const $image = $('#image');
    const $saveCropButton = $('.saveCroppedImg');
    const $cancelCropButton = $('.cancelCrop');
    
    let cropper = null;
    let currentImageElement = null; // Variable to store the clicked image element
    const image = $image[0]; // Get the raw DOM element for Cropper.js

    // Function to handle file selection and preview
    function handleFiles(files) {
        $dragDropPrompt.addClass('d-none');
        $dragDropPreview.removeClass('d-none');
        $.each(files, function(i, file) {
            if (file.type.match('image.*')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const $img = $('<img>').attr('src', e.target.result)
                        .addClass('img-fluid rounded')
                        .css({
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'cover',
                            overflow: 'hidden',
                            margin: '5px',
                            cursor: 'pointer' // Add cursor pointer to indicate it's clickable
                        });
                    $dragDropPreview.append($img);
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Event Listeners for Drag and Drop ---
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


    // =================================================================
    // ===== Cropper Functionality =====
    // =================================================================

    // 1. Click on a preview image to open the cropper
    $dragDropPreview.on('click', 'img', function() {
        currentImageElement = $(this); // Store the clicked image
        const src = $(this).attr('src');
        $image.attr('src', src);

        $mainContent.hide();
        $previewImgContainer.removeClass('d-none');

        // Initialize Cropper.js
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 0.8,
            responsive: true,
        });
    });

    // 2. "Crop & Save" button action
    $saveCropButton.on('click', function() {
        if (!cropper) {
            return;
        }
        const croppedCanvas = cropper.getCroppedCanvas({
            width: 500,
            height: 500
        });
        const croppedImage = croppedCanvas.toDataURL('image/jpeg');

        // Update the original image in the drop zone
        if (currentImageElement) {
            currentImageElement.attr('src', croppedImage);
        }

        // Destroy the cropper instance
        cropper.destroy();
        cropper = null;

        // Hide the cropper and show the main content
        $previewImgContainer.addClass('d-none');
        $mainContent.show();
    });

    // 3. "Cancel" button action
    $cancelCropButton.on('click', function() {
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        $previewImgContainer.addClass('d-none');
        $mainContent.show();
    });
});
