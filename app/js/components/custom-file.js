export function createImageUploader(maxImages) {
    let imageCount = 0;

    function addImagePlaceholder(file) {
        if (imageCount < maxImages) {
            imageCount++;
            const uploadedImages = document.getElementById("uploadedImages");
            const imageContainer = document.createElement("div");
            imageContainer.className = "custom-file__item";
            uploadedImages.style.display = "flex";

            const imageNumber = document.createElement("span");
            const fileExtension = file.name.split('.').pop();
            imageNumber.textContent = `Картинка ${imageCount}.${fileExtension}`;

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
                updateImageNumbers();
            });

            imageContainer.appendChild(imageNumber);
            imageContainer.appendChild(removeButton);
            uploadedImages.appendChild(imageContainer);
        }
    }

    function updateImageNumbers() {
        const uploadedImages = document.getElementById("uploadedImages");
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
}