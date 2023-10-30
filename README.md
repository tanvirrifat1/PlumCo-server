For backend technology:
Prisma,
Postgresql,
Zod,
Jwt,
Brcypt,
Typescript,
Epressjs,


For Frontend technology;
Nextjs app router
Tailwindcss
Daisyui
Redux toolkit
React-hook-form
Axios


Database query
User:
User model
Id
Email unique
Password
Role
contactNo
fullName
Location
profileImage

user
auth/signup
auth/signin

user (GET)
users/:id (PATCH)
users/:id (DELETE)

Service
services/create-service (POST)
services/ (GET) FILTER
services/:id (GET)
services/:id (PATCH)
services/:id (DELETE)



Service model
Id
Title
Description
Image
Available boolean
Price int
createdAt
updatedAt





Review & Rating
reviews/create-review (POST)
Reviews (GET)
Review/:id (DELETE) only can admin

Review model
Id
userId relational (F.K.)
serviceId relational (F.K.)
Review
Rating int

Profile
profile/ (GET)
profile/:id (PATCH)

Booking
Booking (POST) smoot clearly confirmation for booking
Booking (GET)
Booking  (PATCH)

Booking model
Id
userId
serviceId
date
createAt
updatedAt
Status pending | approved | cancel

Feedback
Feedback (POST)
Feedback (GET)
Feedback/:id (DELETE)

Feedback model
Id
userId (FK)
serviceId (FK)
Comments
Suggestions

Only for admin
Blog & FAQ
Blog (POST)
Faq (POST)
Blog (GET)
FAQ (GET)
Blog (delete)
faq(delete)

Blog model
id
Title
content
AuthorId
thumbnail
published
createdAt
updatedAt

Faq model
id 
Question
Answer

addToCart (POST)
addToCart (GET)
addToCart/:id (GET)
addToCart/:id (Delete)

addToCart model
Id
userId (FK)
serviceId (FK)




Admin-facing feature
Admin can user get, edit
Admin can service add, get, delete, edit

super-admin -facing feature
Add a new admin
