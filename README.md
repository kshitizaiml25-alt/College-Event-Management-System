#College Event Management

CampusHub — Production Audit
🔴 CRITICAL (Breaks core functionality)
#	Issue	Impact
1	Auth is localStorage-only — wiped on browser data clear, no real sessions	Anyone can fake login state
2	No real registration persistence — Google Form URLs are placeholders	Registrations lost on page refresh
3	No server-side validation — all forms are client-only	Data integrity broken
4	No role-based access — any URL is accessible by anyone	Security hole
5	No custom 404 page — Next.js default shows	Unprofessional
6	No favicon — browser tab is blank	Unprofessional
🟡 IMPORTANT (Affects professionalism)
#	Issue
7	Missing pages: FAQ, Privacy Policy, Terms & Conditions, Student Dashboard, My Registrations
8	Event cards show no seats remaining, no deadline — users can't decide
9	No toast/snackbar feedback — silent failures
10	No Open Graph / meta tags — bad social sharing
11	Footer missing legal links
12	Navbar has no active-link highlighting
13	Contact form doesn't send anything
14	Events data is too thin — no organizer, no detailed description, no capacity
15	No sitemap.xml or robots.txt
16	No README
🟢 NICE TO HAVE
Email confirmation on registration
QR code ticket download
Add-to-calendar button
Organizer dashboard
Admin panel
