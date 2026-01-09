document.addEventListener("DOMContentLoaded", () => {
    const generateButton = document.getElementById("generateButton");
    const contentContainer = document.getElementById("contentContainer");
    const infoContainer = document.getElementById("infoContainer");

    generateButton.addEventListener("click", async () => {
        try {
            const queryParams = [
                "media_type=image"
            ];

            const apiUrl = `https://images-api.nasa.gov/search?${queryParams.join("&")}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.collection.items.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.collection.items.length);
                const randomItem = data.collection.items[randomIndex];
                const imageUrl = randomItem.links[0].href;
                const imageTitle = randomItem.data[0].title;
                const imageDescription = randomItem.data[0].description;

                // Display the image
                const image = new Image();
                image.src = imageUrl;
                contentContainer.innerHTML = "";
                contentContainer.appendChild(image);

                // Display image information
                infoContainer.innerHTML = `
                    <h2>${imageTitle}</h2>
                    <p>${imageDescription}</p>
                `;
            } else {
                contentContainer.innerHTML = "No images found.";
                infoContainer.innerHTML = "";
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });
});
