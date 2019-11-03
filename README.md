# Fetch (team02)

A dog walking application. 

<br>

## Login 

Open <code>index.html</code> and you have the option to sign in as a Dog, Walker, User or to register a new user. 

![](readme/index.png)


Registering a new user takes you to another page to select the type of user you are registering (Dog or Walker). 

![](readme/register.png)

![](readme/signup.png)

<br>

---

To login as a user, from the <code>index.html</code> select the corresponding user you want to login as. 

![](readme/login.png)



Login credentials are case sensitive.

---

<strong>To login as Dog user:</strong>

Username: user

Password: user

---

<strong>To login as Walker user: </strong>

Username: user2

Password: user2

---

<strong>To login as an Admin: </strong>

Username: admin

Password: admin

---


## User functionality

The user can do three things: view and edit their profile, request a walk, and view walk history.

<br>

### Dog User

Once you sign in as a Dog user, this takes the user to the User Profile page. 

![](readme/dogprofile.png)

<br>

The user can edit their profile, their dog's profile, delete their account, signout. 

<br>

<strong>Request Walker </strong>

On this page, the user selects the dog that they would like walked and the parameters of the walk, such as length and needs. 

![](readme/requestwalk.png)

<br>

The estimated price updates automatically based on selected parameters. Once the user has selected their parameters, they select the dog's location on the map, and available walkers are shown. Selecting a walker shows a confirmation screen and the ability to enter pickup instructions for the dog, such as how to get to the dog.

![](readme/requestwalk2.png)

<br>

Clicking confirm brings the user to the walk status page.

![](readme/requestwalk3.png)

<br>

On the walk status page, the user gets updates from the walker on their location. We plan on using the Google Maps API for automated location updates in Phase 2, so this page approximates that functionality. The user can view the estimated time until the walk is complete, notes from the walker, and the estimated price. Once the walk is completed, the user is asked to rate their walker and report anything they were unsatisfied about. The user is also given the option to submit a complaint that is sent to an admin.

<br>

There is also a walk history page that displays all the walks the user has completed. 

![](readme/walkhistory.png)

<br>
<br>

### Walker User

Once you sign in as a Dog user, this takes the user to the User Profile page (same view as the dog user profile, without the dog)

<br>

<strong>Accept Walk </strong>

On this page, the walker clicks "Find Walk" to start looking for walks. 

Once a dog walking request is available, the view will show a walk description of the dog requesting for a walk. This includes the price of the walk, duration, and walking needs. 

![](readme/startwalk.png)

<br>

Once the walker accepts the walk, the view shows the walk in progress, with the ability of the walker to add notes while walking to update to the dog owner. As mentioned above, we plan on using the Google Maps API for automated location updates in Phase 2.

![](readme/walking.png)

<br>

Once the walk is finished, the right box allows for rating and comment input. 

![](readme/rating.png)

<br>
<br>

## Admin Functionality

The admin has access to all reports, all dog users, and all admins. 

<img src="readme/reports.png" style="width:400px;">
<img src="readme/allwalkers.png" style="width:400px;">
<img src="readme/alldogs.png" style="width:400px;">
<img src="readme/allwalks.png" style="width:400px;">


<br>
<br>
<br>
<br>