# Restaurant Finder #

### About ###
It's a simple **Web Application** helps you to find a nearest **Restaurant** for you. 
### Installtion Process ###
* Make sure your system has node & npm installed
* Clone the project and execute **npm install** to install all the required dependency
* Run the application using the command **npm run**
* You can use your own **API Keys** via **.env**
* If you want to change center location instead of **Monstarlab Bangladesh** then update the initial state **reduxSlice--->mapSlice.ts**

### Branch Terminology ###
There are three branches available
* **dev :** Determines the development branch. Where all collaborator's code will merge here
* **build :** contains the source code of the production build. just clone the build repository and run **serve -s build**
* **production :** contains production-ready code excluding all dev dependencies and test files. This branch is essential if we use any CI/CD approach to build dynamically
* **test :** contains source code with test files.  
*    **** production & test branch are for future implementation ****

### Production Build ###
* use your own favicon.ico
* Eliminate unused file
* Configure webpack if required.
* Run **npm run build**
* To serve it with a static server install **serve** with npm package manager (**npm install -g serve**) and run **serve -s build**


### Tests ###
* execute **npm run test** to excute the implemented tests.

### Technical Choices ###
* Used **Mapbox GL API** over **Google Map API**. It,s easy to implement to with react and well documented, and provides a much better sources for starters.
* Used **Redux-Toolkit** to implement **Redux** global store. Which is much better approach than using **Redux** in a traditional way.

### Trade-Offs ###
* Mapbox grid is not showing in proudction build because of **Bable Congigaration Incompitable issue**. Though in Development it's working fine.
* When implemented **Mapbox** used general implementation instead of built-in **react mapbox component**. It may reduce a better UI experience.
* For this particular application, we should have used **React Context Hook** insted of **Redux** since it compelled us to write more boilerplate codes. However, I should have used **redux store** in a more efficient way.
* In the future We may use a dynamic location instead of constant **Monstarlab Bangladesh**
* Should have implemented better test cases.
