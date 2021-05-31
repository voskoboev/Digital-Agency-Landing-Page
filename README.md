## Digital Agency Landing Page ‘Kallyas’
 ### Business Purpose: 
Presentation of digital agency services for potential clients.
### Conversion Assumptions:
1. Small amount of clients with particular service requirements;
2. Most of clients use modern mobile devices;
3. Most of clients are familiar with general page interactivity.
### Stack: 
SCSS, jQuery, Slick Slider, Reset.css, Perfect Pixel.
### Stack reasons:
#### 1. Reset.css:
- Project does not assume separated content structure for weak devices and slow internet connection.
#### 2. SCSS: </br>
   1. Widespread use (potential support);
   2. Provides modules;
   3. Useful syntactic structures.
#### 3. jQuery: </br>
   1.	Cross-browser compatibility;
   2.	Less code than pure JS;
   3.	Simple in support;   
   4.	Appropriate for small projects with frequent animations;
   5.	Convenient for projects with small clients conversion.
#### 4. Slick Slider (jQuery plug-in): </br>
   1. Widespread use (potential support);
   2. Useful settings API;
   3. Responsiveness.
### Tech Features:
1. Folder structure: mostly file-based, SCSS is BEM block-based (flat scheme). SCSS divided into 2 folders: ‘UI.blocks’ contains special UI blocks, ‘ancillary’ contains all auxiliary files used in project.
2. Full responsiveness implemented from 1920px width to 320px width.
3. Cross-browser compatibility is built and checked on modern browsers: ‘Chrome’, ‘Opera’, ‘Firefox’, ‘Edge’, ‘Yandex’. IE browsers excluded from analyses. Reductive browsers, e. g. ‘Opera Mini’, excluded from analyses as well.
4. Pictures optimized by quality reduction to 75%, most of the files converted to ‘webp’ extension for less file weight. ‘Webp’ is used where it provides better compression and average quality.
### Code Features:
#### HTML:
- Semantic layout;
#### SCSS:
1. BEM naming.
2. SCSS contains general file ‘index.scss’, compiled into CSS file with map, and auxiliary modules for clarification and diversification of project structure.
3. Font size determined in rem. It can be modified on the whole page by changing value in <body> tag.
4. Compiled CSS has prefixed properties.
#### JS:
1. JS contains 2 files: ‘vendor.js’ contains functions of external libraries configurations, common ‘index.js’ file is composed of  all other JS functions implied on the page.
2. Used procedural paradigm.
3. Programming logic is hided in functions.
4. Functions mostly correspond with BEM blocks.
5. Function declarations are used for readability. 
6. Functions calls placed on the top of files for convenience of search and debugging.


