# Arxiv Viewer V1: Add Types, View in JSON and as Table

Goal was to get the arxiv output in a more typesafe version & display in JSON and as a basic table.

Included changes:
- Updating the table component that is based on shadcn basic table
- Created an arxiv-api class with all the typing: a fully typed arxiv response but we actually only need to define the types we interact with.
- Setup a page that displays the arxiv api results nicely in JSON
- Setup another page that displays the arxiv api results in a table
- Added the ability to select items from the arxiv api table and then add them to the library.

A few issues to fix:
- Pass the ids separately from the data
- Figure out what causes the bug of querying for 10 and then 1 with the same author
- In the future lets do the validation with zod not manually.

**PRs:**
- PR 15: [Arxiv Viewer V1 | Arxiv API JSON & Table Viewers + Add to Library](https://github.com/drothermel/frontend_practice/pull/15)

## Final State

### JSON Viewer
![Screenshot 2024-12-18 at 2 43 57 AM](https://github.com/user-attachments/assets/e2f25ad7-a9a2-43c1-82a2-5026fe9f8ab4)
![Screenshot 2024-12-18 at 2 44 09 AM](https://github.com/user-attachments/assets/546c7475-73ca-41db-acbb-5a9266b9632f)

### Table Viewer
![Screenshot 2024-12-18 at 2 44 21 AM](https://github.com/user-attachments/assets/a0506f83-c663-4078-9795-7bf862597240)
![Screenshot 2024-12-18 at 2 44 41 AM](https://github.com/user-attachments/assets/c6dab24c-0ab2-4e0b-9f18-e7b0c8cfdf2e)
![Screenshot 2024-12-18 at 2 44 52 AM](https://github.com/user-attachments/assets/90d3593e-5d50-4050-b3be-bf1229d40026)
![Screenshot 2024-12-18 at 2 46 02 AM](https://github.com/user-attachments/assets/6fc4fe56-5a7d-4023-a48a-12b4aec642fb)

