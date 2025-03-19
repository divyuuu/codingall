This is the assessment for codingal front-end.



Part 1 Requirements:

1. Responsive navbar ✅

Navbar component has both normal and mobile views
Includes proper CSS to handle the layout changes


2. Countdown timer starting at 10 minutes ✅

In Navbar.jsx: const [timeRemaining, setTimeRemaining] = useState(10 * 60);
Timer implemented with useEffect and setInterval


3. End Class button with modal ✅

Modal appears when End Class is clicked
Implemented in EndClassModal component


4. End Class functionality ✅

Timer stops when End Class is confirmed: setIsTimerActive(false);
Modal closes after confirmation


5. Cancel button functionality ✅

Modal closes but timer continues running when Cancel is clicked


6. Mobile responsive layout ✅

CSS classes and media queries handle responsiveness


7. Hamburger menu in mobile view ✅

Implemented with isMobileMenuOpen state and toggle function



Part 2 Requirements:

1. Posts page in navigation bar ✅

Created at /posts/ route
Link added to the navbar


2. Posts from API ✅

Fetches from jsonplaceholder.typicode.com/posts
Handles pagination


3. Infinite scrolling ✅

Implemented with Intersection Observer API
Loads more content as user scrolls


4. Loading indicator ✅

Uses a Loader component during data fetching


5. Loading 10 posts at once ✅

API call includes limit=10 parameter


6. Error handling ✅

Try/catch blocks for API calls
Error state display with retry option