## Digital Agency Landing Page ‘Kallyas’
### Summary:
   - Responsive, crossbrowser, valid;
   - Gulp, Reset.css, SCSS, jQuery, Slick Slider, Perfect Pixel.
 ### Business Purpose: 
Presentation of digital agency services for potential clients.
### Conversion Assumptions:
1. Small amount of clients with particular service requirements;
2. Most of clients use modern mobile devices;
3. Most of clients are familiar with general page interactivity.
### Stack: 
Gulp, Reset.css, SCSS, jQuery, Slick Slider, Perfect Pixel.
### Stack Reasons:
#### 1. Gulp: </br>
   1. Simple setup;
   2. Widespread use (potential support);
   3. Frequent updates;
   4. A large number of packages.
#### 2. Reset.css: </br>
   1. The project does not contain importants text content;
   2. A small number of visitors with old or weak devices.
#### 3. SCSS: </br>
   1. Widespread use (potential support);
   2. Provides modules;
   3. Useful syntactic structures.
#### 4. jQuery: </br>
   1.	Cross-browser compatibility;
   2.	Less code than pure JS;
   3.	Simple in support;   
   4.	Appropriate for small projects with frequent animations;
   5.	Convenient for projects with small clients conversion.
#### 5. Slick Slider (jQuery plug-in): </br>
   1. Widespread use (potential support);
   2. Useful settings API;
   3. Responsiveness.
### Tech Features:
1. Folder structure: mostly file-based, SCSS is BEM flat scheme;
2. Full responsiveness implemented from 1920px width to 320px width;
3. Cross-browser compatibility is built and checked on modern browsers: ‘Chrome’, ‘Opera’, ‘Firefox’, ‘Edge’, ‘Yandex’. IE browsers excluded from analyses. Reductive browsers, e. g. ‘Opera Mini’, excluded from analyses as well;
4. Pictures optimized by quality reduction to 75%, most of the files converted to ‘webp’ extension for less file weight. ‘Webp’ is used where it provides better compression and average quality.
### Code Features:
#### HTML:
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Semantic layout;
#### SCSS:
1. BEM naming.
2. ‘index.scss’ contains most of styles, auxiliary modules locted in ‘UI.blocks’ and ‘ancillary’ folders added for clarification and diversification of project structure;
3. Font size determined in rem. It can be modified on the whole page by changing a value in the ‘body’ tag;
4. Compiled CSS has prefixed properties;
5. Compiled CSS is minified;
6. All styles, incliding libs, compiled into a one css file ‘bundle.min.css’.
#### JS:
1. Used procedural paradigm;
2. Programming logic is hided in functions;
3. Functions mostly correspond with BEM blocks;
4. Function declarations are used for readability; 
5. Functions calls placed on the top of files for convenience of search and debugging;
6. Js code is minified;
6. All js code, incliding libs, compiled into a one js file ‘bundle.min.js.


