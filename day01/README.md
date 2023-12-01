## First star

First day should be a warming up. Create the repo, the environment, make sure github profile swapping works properly, etc.

But not this year!

## Second star

I struggled a lot with this one because my solution was working for the test input but not for the actual input. I made the mistake of removing the first match from the string before looking for the last one. That will not work for cases like asdthreeightasd where both `three` and `eight` are matches (my error left the string as `ightasd` after finding first occurrence).
