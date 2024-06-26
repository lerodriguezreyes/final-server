## Server side deliverables for the project:
1. Have a REST API backend built with ExpressJS, MongoDB and Mongoose, that React app will communicate with.
   - ✔️ Completed 3/24/24.
2. Have a REST API backend with routes that perform all CRUD actions for at least one model (excluding the user model).
   - ✔️ Completed 3/24/24 for the comments model.
3. Have 3 database models or more:
   - ✔️ Completed User model on 3/24/24, status: fully functional.
   - ✔️ Completed Comment model on 3/24/24, status: fully functional. 
      - ✔️ protected comments with isOwner middleware to prevent CRUD operations if not author of said comment 3/26/24 
   - ✔️  Bill model, status: completed on 3/29/24 
   - ✔️  Bill routes completed 3/29/24, protects against duplicates.
   - ✔️ Bill create route with full integration of 3 api's completed with substantial help from Dustin.

PENDING TASKS:
- ⏰ Push comments to Bills, update bills after comments.
- ⏰ Protect bill delete route;