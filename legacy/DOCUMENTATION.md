
# Documentation

## File Structure

```
portfolio-website/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── img/
│   │   └── [all image files]
│   ├── js/
│   │   └── main.js
│   ├── vendor/
│   │   ├── bootstrap/
│   │   ├── icofont/
│   │   ├── remixicon/
│   │   ├── owl.carousel/
│   │   ├── boxicons/
│   │   ├── venobox/
│   │   └── [other vendor files]
├── index.html
└── README.md
```

## index.html

This is the main HTML file that contains the structure and content of the website. It includes links to all the necessary CSS and JavaScript files.

## assets/css/style.css

This file contains custom CSS styles that are applied to the website. It overrides default styles and adds new ones for a personalized look and feel.

## assets/js/main.js

This file contains custom JavaScript code for interactive features and functionality on the website.

## assets/vendor/

This directory contains all third-party libraries and plugins used in the project, such as Bootstrap, jQuery, Owl Carousel, and VenoBox.

## Adding a New Section

To add a new section to the website, follow these steps:

1. **HTML**: Add a new section in `index.html`.
    ```html
    <section id="new-section" class="new-section">
        <div class="container">
            <div class="section-title">
                <h2>New Section</h2>
                <p>Description of the new section</p>
            </div>
            <div class="row">
                <!-- Content here -->
            </div>
        </div>
    </section>
    ```
2. **CSS**: Add styles for the new section in `assets/css/style.css`.
    ```css
    .new-section {
        padding: 60px 0;
    }
    .new-section .section-title {
        text-align: center;
        margin-bottom: 40px;
    }
    ```
3. **JavaScript**: If needed, add JavaScript functionality in `assets/js/main.js`.

## Customizing the Theme

To customize the theme, you can modify the CSS variables in `assets/css/style.css`.

```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --text-color: #333;
    --background-color: #f8f9fa;
    --primary-bright: #2980b9;
}
```

## Updating Content

To update the content, simply modify the relevant sections in `index.html`. For example, to update the About section:

```html
<section id="about" class="about">
    <div class="container">
        <div class="section-title">
            <h2>About</h2>
            <p>Who am I??? ⚡ </p>
        </div>
        <div class="row">
            <div class="col-lg-4" data-aos="fade-right">
                <img src="assets/img/Image1.jpg" class="img-fluid" alt="">
            </div>
            <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                <h3>Bachelor in CS </h3>
                <p>
                    Hello, my name is Filobatire Henein and welcome to my website!!
                    I am a productive, problem solver, and creative Computer science and software engineering student.
                </p>
                <h3>My Story </h3>
                <p>
                    [Your updated story here]
                </p>
            </div>
        </div>
    </div>
</section>
```

## Deployment

To deploy the website, you can use GitHub Pages or any other static site hosting service. For GitHub Pages:

1. Push your code to a GitHub repository.
2. Go to the repository settings.
3. Under the "GitHub Pages" section, select the source branch (e.g., `main`).
4. Save the changes, and your website will be available at `https://yourusername.github.io/repository-name`.

---

This documentation provides a comprehensive overview of the project, including setup, usage, and customization instructions. For further assistance, please feel free to reach out to me via email or LinkedIn.
