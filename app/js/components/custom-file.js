export function createImageUploader(maxImages) {
    let imageCount = 0;
    let selectedFiles = [];
    const uploadedImages = document.getElementById("uploadedImages");
    let filesUploaded = false;

    function isImageAllowed(file) {
        const allowedTypes = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
        return allowedTypes.includes(file.type);
    }

    function displayError(errorElementId, show = true) {
        const errorElement = document.getElementById(errorElementId);
        if (show) {
            errorElement.classList.add("error--active");
            setTimeout(() => {
                errorElement.classList.remove("error--active");
            }, 5000);
        } else {
            errorElement.classList.remove("error--active");
        }
    }

    function toggleUploadedImagesDisplay() {
        if (imageCount === 0) {
            uploadedImages.style.display = "none";
        } else {
            uploadedImages.style.display = "flex";
        }
    }

    function addImagePlaceholder(file) {
        if (imageCount < maxImages) {
            const fileExtension = file.name.split('.').pop();

            if (isImageAllowed(file)) {
                imageCount++;
                selectedFiles.push(file);

                const imageContainer = document.createElement("div");
                imageContainer.className = "custom-file__item";
                uploadedImages.style.display = "flex";

                const imageNumber = document.createElement("span");
                imageNumber.textContent = `Картинка ${imageCount}.${fileExtension}`;

                const imagePreview = document.createElement("img");
                imagePreview.className = "custom-file__preview";
                imagePreview.src = URL.createObjectURL(file);
                imagePreview.alt = file.name;
                imagePreview.width = 180;
                imagePreview.height = 144;

                const removeButton = document.createElement("button");
                removeButton.className = "custom-file__remove";
                removeButton.type = "button";
                removeButton.innerHTML = `
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path class="path" d="M13 1L1 13" stroke="#C9C5C9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path class="path" d="M1 1L13 13" stroke="#C9C5C9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                removeButton.addEventListener("click", function () {
                    uploadedImages.removeChild(imageContainer);
                    imageCount--;
                    selectedFiles = selectedFiles.filter((selectedFile) => selectedFile !== file);
                    toggleUploadedImagesDisplay();
                    updateImageNumbers();
                });

                imageContainer.appendChild(imagePreview);
                imageContainer.appendChild(imageNumber);
                imageContainer.appendChild(removeButton);
                uploadedImages.appendChild(imageContainer);
                toggleUploadedImagesDisplay();
                filesUploaded = true;
                displayError("photosLimitMinError", false);
            } else {
                displayError("photosError");
            }
        } else {
            displayError("photosLimitMaxError");
        }
    }

    function updateImageNumbers() {
        const imageContainers = uploadedImages.querySelectorAll(".custom-file__item");

        imageContainers.forEach((container, index) => {
            const imageNumber = container.querySelector("span");
            const currentText = imageNumber.textContent;
            const fileExtension = currentText.split('.').pop();
            imageNumber.textContent = `Картинка ${index + 1}.${fileExtension}`;
        });
    }

    document.getElementById("fileInput").addEventListener("change", function () {
        const files = this.files;
        for (const file of files) {
            addImagePlaceholder(file);
        }
    });

    document.getElementById("submitButton").addEventListener("click", function () {
        if (!filesUploaded) {
            displayError("photosLimitMinError");
            return;
        }

        console.log("Следующие файлы будут отправлены на сервер:");
        selectedFiles.forEach((file, index) => {
            console.log(`Файл ${index + 1}: ${file.name}`);
        });

        console.log(`Всего файлов: ${selectedFiles.length}`);
    });

    document.getElementById("registration__form").addEventListener("submit", function (event) {
        if (imageCount < 1) {
            displayError("photosLimitMinError");
            event.preventDefault();
        }
    });
}