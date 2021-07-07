## Digital Agency ‘Kallyas’ Landing Page 

### Summary:
- Valid, crossbrowser, responsive, optimized, pixel perfect;
- Gulp, Reset.css, SCSS, jQuery, Slick Slider, ESLint, Stylelint, Perfect Pixel.
- [Hosted Site](https://kallyas.netlify.app/)
### Business Purpose:

Presentation of digital agency services for potential clients.

### Conversion Assumptions:

1. A small amount of clients with particular service needs;
3. Most of clients use modern mobile devices.

### Stack:

Gulp, Reset.css, SCSS, jQuery, Slick Slider, ESLint, Stylelint, Perfect Pixel.

### Stack Reasons:

#### 1) Gulp: </br>

1. Simple setup;
2. Widespread use (potential support);
3. A large number of packages.

#### 2) Reset.css: </br>

1.  Lack of important text content;
2.  Web page has many elems with unique styles.

#### 3) SCSS: </br>

1.  Widespread use (potential support);
2.  Useful language structures;
3.  Convenient documentation.

#### 4) jQuery: </br>

1. Cross-browser compatibility;
2. Less code than plain JS;
3. Simple in support;
4. Appropriate for small projects with frequent animations;
5. Convenient for projects with small clients conversion.

#### 5) Slick Slider (jQuery plug-in): </br>

1. Widespread use (potential support);
2. Useful settings' API;
3. Responsiveness.

#### 6) ESLint, Stylelint:</br>
1. Widespread use (potential support);
2. Useful standard cfgs.

### Tech Features:

-   **Project in General**:
    -   Folder structure is mostly file based besides SCSS;
    -   SCSS has BEM based flat file structure;
    -  	Cross-browser compatibility was checked with ‘Chrome’, ‘Opera’, ‘Firefox’, ‘Edge’ and ‘Yandex’.
-   **HTML:**  Semantic layout.
-   **SCSS**:
    -   BEM naming methodology;
    -   UI blocks and auxiliary SCSS modules are splitted into two folders;
    -   Final CSS bundle compiled with prefixes.
 - **jQuery**: 
	 - Used procedural paradigm;
	 - Fns mostly correspond with BEM blocks;
	 - Outer fns' calls disposed on the top JS file for convenience of search and debugging.
-   **Gulp**: Configured individual project settings.
-   **ESLint, Stylelint:**  Used standard cfgs with several individual settings.

### Optimizations:
-   **HTML**: 
	- HTML entities changed with CSS pseudo-elems where possible;
	- Implemented loading="lazy" attribute for imgs and iframes. 
-   **CSS**:
	- Minified;
	- Styles isolated with BEM classes and SCSS modules;
	- Excluded excessive props inheritance where possible;
	- Excluded pseudo-classes where possible.
- **jQuery**:
	- Minified;
	- Excluded obsolete and ineffective jQuery methods where possible;
	- DRY, KISS, YAGNI.
- **Pics**:
	- Converted to 'webp' where it provides less size;
	- Compressed.
- **Video**: Compressed.
- **Fonts**: Preloaded.
### Sources:
[Template in PNG](https://yadi.sk/i/fGobJyPTymKI_A)