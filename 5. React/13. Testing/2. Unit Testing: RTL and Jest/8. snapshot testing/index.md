# Snapshot testing

## What is snapshot testing?

- It doesn't mean screenshot
- ?The component which we want to test, it copies the code from files for tha component into a new file
- The copied code is not exactly the same, sometimes it is not in human readable format

## When this useful?

- It is not useful during daily developmental phase of the application.
- It is useful when the application is about to be deployed / live.
- When the develpement of the application is almost complete and at the last momement lets assume if we make sudden changes to certain file by mistake then our live app will become buggy.
  Now if we make snapshot testing before making the app live. Then snapshot testing tells us that you have made certain changes at the last moment. Now if the changes are intentional then we can keep it and should update the snapshot but if those are by mistake then we should remove it.

## How to update the snapshots

press `u`

## snaphsot testing important points

1. Do not write snaphsot testing in the starting of the project.
2. Run test cases after completing your functionality
3. Make a standard for the code coverage (Like 70% to 80%)
