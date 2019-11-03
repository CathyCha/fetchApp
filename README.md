# Fetch (team02)

A dog walking application. 

<br>

### Login 

Login credentials are case sensitive. 

<br>

**To login as Dog user:**

Username: user

Password: user

<br>

**To login as Walker user: **

Username: user2

Password: user2

<br>

**To login as an Admin: **

Username: admin

Password: admin

<br>

### User functionality

The user can do three things: request a walk, view and edit their profile, and view walk history.

** Request Walker **
On this page, the user selects the dog that they would like walked and the parameters of the walk, such as length and needs. The estimated price updates automatically based on selected parameters. Once the user has selected their parameters, they select the dog's location on the map, and available walkers are shown. Selecting a walker shows a confirmation screen and the ability to enter pickup instructions for the dog, such as how to get to the dog. Clicking confirm brings the user to the walk status page.

On the walk status page, the user gets updates from the walker on their location. We plan on using the Google Maps API for automated location updates in Phase 2, so this page approximates that functionality. The user can view the estimated time until the walk is complete, notes from the walker, and the estimated price. Once the walk is completed, the user is asked to rate their walker and report anything they were unsatisfied about. The user is also given the option to submit a complaint that is sent to an admin.